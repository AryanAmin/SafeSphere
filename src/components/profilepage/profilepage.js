import { useParams } from "react-router-dom";
import './profilepage.css';
import ProfilePic from '../../assets/images/profile-pic.jpg';
import CryptoPieChart from "./Crypto-piechart";
import NFTPiechart from "./NFT-piechart";
import { useQuery } from "@airstack/airstack-react";
import { queryForPieChart } from "../../queries/queries";
import { queryForNFTChart } from "../../queries/queries";
import { useStateValue } from "../../StateProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import WarnsList from "./WarnsList";

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
    const profileAddress = useParams().id;
    const [tokenNameArray, setTokenNameArray] = useState([]);
    const [tokenValueArray, setTokenValueArray] = useState([]);
    const [nftNameArray, setNFTNameArray] = useState([]);
    const [nftValueArray, setNFTValueArray] = useState([]);
    const { data, loading, error } = useQuery(queryForPieChart(profileAddress));
    const { data_NFT, loading_nft, error_nft } = useQuery(queryForNFTChart);
    const [{ user }] = useStateValue();
    const [tokens, setTokens] = useState([]);
    const [nfts, setNFTs] = useState([]);
    const rugpulls = {'0x540cb04ebab67e05a620b97bb367ac5e4ed68f09': ['ai-otherside','ai-other']}

    useEffect(() => {
        if (data) {
            const {ethereum, polygon, ethereum_nft, polygon_nft} = data;
            const ethTokens = ethereum?.TokenBalance || [];
            const maticTokens = polygon?.TokenBalance || [];
            const ethTokens_nft = ethereum_nft?.TokenBalance || [];
            const maticTokens_nft = polygon_nft?.TokenBalance || [];
            setTokens([...ethTokens, ...maticTokens]);
            setNFTs([...ethTokens_nft, ...maticTokens_nft]);
            // console.log("Eth tokens nft", ethTokens_nft);
            console.log(data);
        }
    }, [data]);
    useEffect(() => {
        if (data_NFT) {
            const {ethereum_nft, polygon_nft} = data;
            const ethTokens_nft = ethereum_nft?.TokenBalance || [];
            const maticTokens_nft = polygon_nft?.TokenBalance || [];
            setNFTs([...ethTokens_nft, ...maticTokens_nft]);
            console.log("Eth tokens nft", ethTokens_nft);
            console.log(data_NFT);
        }
    }, [data_NFT]);

    useEffect(() => {
        if (nfts.length > 0){
            console.log("Length: ", nfts.length);
            // setTokenNameArray([]);
            // setTokenValueArray([]);
            for(let i =0; i < nfts.length; i++){
                console.log("Index: ", i, "Value: ", nfts.length);
                setNFTNameArray((prevState) => [...prevState, nfts[i].token.name]);
                setNFTValueArray((prevState) => [...prevState, nfts[i].amount.substring(0,5)]);
                // console.log("nftNameArray: ", nftNameArray, "nftValueArray: ", nftValueArray);
            }
        }
        console.log("nfts: ", nfts);
    }, [nfts]);

    useEffect(() => {
        if (tokens.length > 0){
            // console.log("Length: ", tokens.length);
            // setTokenNameArray([]);
            // setTokenValueArray([]);
            for(let i =0; i < tokens.length; i++){
                // console.log("Index: ", i, "Value: ", tokens.length);
                setTokenNameArray((prevState) => [...prevState, tokens[i].token.name]);
                setTokenValueArray((prevState) => [...prevState, tokens[i].amount.substring(0,5)]);
                // console.log("tokenNameArray: ", tokenNameArray, "tokenValueArray: ", tokenValueArray);
            }
            // console.log("token value array",tokenValueArray);
        }
        // console.log("Tokens: ", tokens);
    }, [tokens]);

    // useEffect(() => {
    //     console.log("Token Name Array Length: ", tokenNameArray);
    //     console.log("Token Name Array Length: ", tokenValueArray);
    // }, [tokenNameArray, tokenValueArray])

    useEffect(() => {
        console.log("nft Name Array Length: ", nftNameArray);
        console.log("nft value Array Length: ", nftValueArray);
    }, [nftNameArray, nftValueArray]);

    // tokens.map((token) => tokenNameArray.push(token.name));
    // tokens.map((token) => tokenValueArray.push(calculateTokenValue(token.tokenAmount, token.tokenDecimal, fetchTokenPrice(token.tokenAddress))));
    // const userId = useParams();
    // const userBalance = fetchUserCoinBalance(userId);
    // const userERC20Balance = fetchUserERC20Balance(userId);
    // const ERC20TokenPrice = fetchTokenPrice(userERC20Balance);
    // const nativeTokenPrice = fetchNativeTokenP
    

    // useEffect(()=>{ 
    //     console.log("Profile Address: ", profileAddress);
    // },[profileAddress])
    return (
        <div class="wrapper">
        {tokenNameArray.length < tokens.length || nftNameArray.length < nfts.length ? (
            <h1>hello it is updating..</h1>
        ):(
            <>
                <div class='profile-card'>
                    <div class="profile-pic">
                    <img src={ProfilePic} alt="profile-pic"></img>
                    </div>
                    <div class="user-name">
                        Jane Doe
                    </div>
                </div>
                <div class='Crypto-distrib'>
                    <CryptoPieChart userId={profileAddress} coin_names={tokenNameArray} coin_prices={tokenValueArray}/>
                </div>
                <div class='NFT-distrib'>
                    <NFTPiechart userId={profileAddress} coin_names={nftNameArray} coin_prices={nftValueArray}/>
                </div>
                <div class='user-warns'>
                    <h3>Links to Rugpulls</h3>
                    {rugpulls[profileAddress] !== undefined 
                    ? rugpulls[profileAddress].map((address) => (
                        <h3>{address}</h3>
                    ))
                    : 'All Clean!'}
                </div>
            </>
        )}
        </div>
    );
}