import { useParams } from "react-router-dom";
import './profilepage.css';
import ProfilePic from '../../assets/images/profile-pic.jpg';
import CryptoPieChart from "./Crypto-piechart";
import NFTPiechart from "./NFT-piechart";
import { useQuery } from "@airstack/airstack-react";
import { queryForPieChart } from "../../queries/queries";
import { useStateValue } from "../../StateProvider";
import { useEffect, useState } from "react";
import axios from "axios";

const userList = {
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': {userFName: 'John',
                                                    userLName: 'Doe',
                                                    userProfilePicture: 'profile-pic.jpg',
                                                    userPosts: []
                                                },
}

function fetchUserCoinBalance(userAddress){
    // const axios = require('axios');
    const coins_list = ['eth', 'matic'];
    const config = {
        headers:{
            'accept': 'application/json',
            'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImUyMGViYWVlLWJhZDEtNDBjNy1iNjNlLTMxYjRkY2I2MTMwOSIsIm9yZ0lkIjoiMzQ1MDc1IiwidXNlcklkIjoiMzU0NzMyIiwidHlwZUlkIjoiNjE3NjI2NWYtNjJlZS00ODA5LTgxOTYtMDAyNmZmMWQxOWY0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODc1ODcwNjcsImV4cCI6NDg0MzM0NzA2N30.Kozfsy8I9k-kTM3YnkSUKBJ_TmMbDHUruvIhyzhSPvk'
        }
      };
    let coin_balance = []
    let url = '';
    for(let i = 0; i < coins_list.length; i++){
        url = 'https://deep-index.moralis.io/api/v2/'+userAddress+'/balance?chain='+coins_list[i];
        axios.get(url, config)
            .then(res=> {
                coin_balance.append([coins_list[i],res.balance])
            })
            .catch(err=> console.log(err))
    }
    return coin_balance;
}

function fetchUserERC20Balance(userId){
    // const axios = require('axios');
    const url = 'https://deep-index.moralis.io/api/v2/'+userId+'/erc20?chain=eth';
    let coin_balance = [];
    const config = {
        headers:{
            'accept': 'application/json',
            'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImUyMGViYWVlLWJhZDEtNDBjNy1iNjNlLTMxYjRkY2I2MTMwOSIsIm9yZ0lkIjoiMzQ1MDc1IiwidXNlcklkIjoiMzU0NzMyIiwidHlwZUlkIjoiNjE3NjI2NWYtNjJlZS00ODA5LTgxOTYtMDAyNmZmMWQxOWY0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODc1ODcwNjcsImV4cCI6NDg0MzM0NzA2N30.Kozfsy8I9k-kTM3YnkSUKBJ_TmMbDHUruvIhyzhSPvk'
        }
      };
    axios.get(url, config)
        .then(res=> {
            for(let i =0; i < res.length; i++){
                coin_balance.append([res[i]['name'],res[i]['token_address'],res[i]['balance'],res[i]['decimal']])
            }
        })
        .catch(err=> console.log(err))
    return coin_balance;
}

function fetchTokenPrice(userBalance){
    // const axios = require('axios');
    let url = '';
    let coin_balance = [];
    const config = {
        headers:{
            'accept': 'application/json',
            'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImUyMGViYWVlLWJhZDEtNDBjNy1iNjNlLTMxYjRkY2I2MTMwOSIsIm9yZ0lkIjoiMzQ1MDc1IiwidXNlcklkIjoiMzU0NzMyIiwidHlwZUlkIjoiNjE3NjI2NWYtNjJlZS00ODA5LTgxOTYtMDAyNmZmMWQxOWY0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODc1ODcwNjcsImV4cCI6NDg0MzM0NzA2N30.Kozfsy8I9k-kTM3YnkSUKBJ_TmMbDHUruvIhyzhSPvk'
        }
      };
    url = 'https://deep-index.moralis.io/api/v2/erc20/'+userBalance+'/price?chain=eth';
    axios.get(url, config)
        .then(res=> {
            return res.usdPrice
        })
        .catch(err=> console.log(err))
    // return coin_balance;
}

function fetchNativeTokenPrice(){
    const axios = require('axios');
    const coins_list = ['ethereum', 'matic-network'];
    const coins_list_moralis = ['eth', 'matic'];
    let url = '';
    let coin_balance = [];
    for(let i = 0; i < coins_list.length; i++){
        url = 'https://api.coingecko.com/api/v3/simple/price?ids='+coins_list[i]+'&vs_currencies=usd';
        axios.get(url)
            .then(res=> {
                coin_balance.append([coins_list_moralis[i],res[coins_list[i]['usd']]]);
            })
            .catch(err=> console.log(err))
    }
    return coin_balance;
}

function calculateTokenValue(tokenAmount, tokenDecimal, tokenPrice){
    const noOfTokens = +tokenAmount / Math.pow(10, tokenDecimal);
    const tokenValue = noOfTokens * tokenPrice;
    return tokenValue;
}

export default function Profilepage(props){
    const tokenNameArray = [];
    const tokenValueArray = [];
    const { data, loading, error } = useQuery(queryForPieChart);
    const [{ user }] = useStateValue();
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        if (data) {
            const {ethereum, polygon} = data;
            const ethTokens = ethereum?.TokenBalance || [];
            const maticTokens = polygon?.TokenBalance || [];
            setTokens((tokens) => [...tokens, ...ethTokens, ...maticTokens]);
        }
    }, [data]);

    useEffect(() => {
        console.log("Tokens: ", tokens);
    }, [tokens]);

    tokens.map((token) => tokenNameArray.push(token.name));
    tokens.map((token) => tokenValueArray.push(calculateTokenValue(token.tokenAmount, token.tokenDecimal, fetchTokenPrice(token.tokenAddress))));
    // const userId = useParams();
    // const userBalance = fetchUserCoinBalance(userId);
    // const userERC20Balance = fetchUserERC20Balance(userId);
    // const ERC20TokenPrice = fetchTokenPrice(userERC20Balance);
    // const nativeTokenPrice = fetchNativeTokenPrice(userId);
    const userId = props.userId;

    return (<div class="wrapper">
        <div class='profile-card'>
            <div class="profile-pic">
            <img src={ProfilePic} alt="profile-pic"></img>
            </div>
            <div class="user-name">
                Jane Doe
            </div>
        </div>
        <div class='Crypto-distrib'>
            <CryptoPieChart userId={props.userId} coin_names={tokenNameArray} coin_prices={tokenValueArray}/>
        </div>
        <div class='NFT-distrib'>
            <NFTPiechart userId={props.userId}/>
        </div>
        <div class='posts'>
        Hi
        </div>
    </div>);
}