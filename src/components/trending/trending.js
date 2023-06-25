import Navigation from "../navigation/Navigation";
import { useNavigate } from "react-router";
import './trending.css';

export default function Trending(){
    const history = useNavigate();
    const CollectionStat = [{
          "dappName": "blur",
          "tokenAddress": "0x23581767a106ae21c074b2276d25e5c3e136a68b",
          "totalSaleVolumeInUSDC": 18153.19741397,
          "lastTransactionBlockTimestamp": "2023-06-24T05:30:11Z"
    }];
    const onSubmitHandler = (e) => {
        e.preventDefault();
        history(`/profile/${e.target.fname.value}`);
    }
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
            
        </div>
        </div>
    );
}