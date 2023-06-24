import { useParams } from "react-router-dom";

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
        url = 'https://deep-index.moralis.io/api/v2/'+userAddress+'/balance?chain='+i;
        axios.get(url, config)
            .then(res=> {
                coin_balance.append([i,res.balance])
            })
            .catch(err=> console.log(err))
    }
    return coin_balance;
}

function fetchUserERC20Balance(userId){
    const url = 'https://deep-index.moralis.io/api/v2/'+userId+'/erc20?chain=eth';
    let coin_balance = [];
    axios.get(url, config)
        .then(res=> {
            for(let i =0; i < res.length; i++){
                coin_balance.append([res[i]['name'],res[i]['token_address'],res[i]['balance'],res[i]['decimal']])
            }
        })
        .catch(err=> console.log(err))
    return coin_balance;
}

export default function profilepage(){
    const userId = useParams();
    const userBalance = fetchUserCoinBalance(userId);
    const userERC20Balance = fetchUserERC20Balance(userId);
    
    return ();
}