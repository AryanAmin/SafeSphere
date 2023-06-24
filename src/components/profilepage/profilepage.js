import { useParams } from "react-router-dom";
import './profilepage.css';
import ProfilePic from '../../assets/images/profile-pic.jpg';
import CryptoPieChart from "./Crypto-piechart";
import NFTPiechart from "./NFT-piechart";

const userList = {
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': {userFName: 'John',
                                                    userLName: 'Doe',
                                                    userProfilePicture: 'profile-pic.jpg',
                                                    userPosts: []
                                                },
}

function fetchUserCoinBalance(userAddress){
    const axios = require('axios');
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
    const axios = require('axios');
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
    const axios = require('axios');
    let url = '';
    let coin_balance = [];
    const config = {
        headers:{
            'accept': 'application/json',
            'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImUyMGViYWVlLWJhZDEtNDBjNy1iNjNlLTMxYjRkY2I2MTMwOSIsIm9yZ0lkIjoiMzQ1MDc1IiwidXNlcklkIjoiMzU0NzMyIiwidHlwZUlkIjoiNjE3NjI2NWYtNjJlZS00ODA5LTgxOTYtMDAyNmZmMWQxOWY0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODc1ODcwNjcsImV4cCI6NDg0MzM0NzA2N30.Kozfsy8I9k-kTM3YnkSUKBJ_TmMbDHUruvIhyzhSPvk'
        }
      };
    for(let i = 0; i < userBalance.length; i++){
        url = 'https://deep-index.moralis.io/api/v2/erc20/'+userBalance[i][1]+'/price?chain=eth';
        axios.get(url, config)
            .then(res=> {
                coin_balance.append([userBalance[i][0],res.usdPrice])
            })
            .catch(err=> console.log(err))
    }
    return coin_balance;
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

export default function Profilepage(props){
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
            <CryptoPieChart userId={props.userId}/>
        </div>
        <div class='NFT-distrib'>
            <NFTPiechart userId={props.userId}/>
        </div>
        <div class='posts'>
        Hi
        </div>
    </div>);
}