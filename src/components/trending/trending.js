import Navigation from "../navigation/Navigation";
import { useNavigate } from "react-router";
import {useState} from 'react';
import './trending.css';
import DappFilter from "./DappFilter";
import NFTList from './NFTList';

export default function Trending(){
    const history = useNavigate();
    const [dapp, setDapp] = useState('opensea');

    const onChangeDapp = (selectedDapp) => {
        setDapp(selectedDapp);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        history(`/profile/${e.target.fname.value}`);
    }
    const CollectionStat = [{
        "dappName": "blur",
        "totalSaleVolumeInUSDC": 18153.19741397,
        "lastTransactionBlockTimestamp": "2023-06-24T05:30:11Z",
        "token": {
          "name": "Moonbirds"
        }
    },
    {
        "dappName": "opensea",
        "totalSaleVolumeInUSDC": 18153.19741397,
        "lastTransactionBlockTimestamp": "2023-06-24T05:30:11Z",
        "token": {
          "name": "Sun"
        }
    },
    {
        "dappName": "rarible",
        "totalSaleVolumeInUSDC": 18153.19741397,
        "lastTransactionBlockTimestamp": "2023-06-24T05:30:11Z",
        "token": {
          "name": "Star"
        }
    }];

    const filteredTrending = CollectionStat.filter((e) => {
        return e.dappName === dapp;
    });
    return (
        <div class="wrapper-trending">
        <div class="nav-bar">
            <Navigation />
        </div>
        <div class="search-bar-div">
            <form onSubmit={onSubmitHandler}>
                <input class="search-bar"type="text" id="fname" name="fname" />
                <input type="submit" value="Submit" />
            </form>
        </div>
        <div class="trending-body">
            <div class='filter-bar'>
            <DappFilter selected={dapp} onChangeFilter={onChangeDapp}/>
            </div>
            <div class='filtered-nfts'>
                <NFTList items={filteredTrending}/>
            </div>
            
        </div>
        </div>
    );
}