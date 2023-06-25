import React, { useEffect, useState } from "react";
import "./trending.css";
import { useNavigate } from "react-router";
import {
  useGetTokenBalances,
  useLazyQueryWithPagination,
  useQuery,
} from "@airstack/airstack-react";
import { useStateValue } from "../../StateProvider";
import { queryForPieChart, queryForTrending } from "../../queries/queries";
import NFTList from "./NFTList";
import DappFilter from "./DappFilter";
import Navigation from "../navigation/Navigation";

function Trending() {
  const history = useNavigate();
  const [dapp, setDapp] = useState('opensea');
  const { data, loading, error } = useQuery(queryForTrending(dapp));
  const [{ user }] = useStateValue();
  const [trendingTokens, setTrendingTokens] = useState([]);

  const onChangeDapp = (selectedDapp) => {
    setDapp(selectedDapp);
}

const onSubmitHandler = (e) => {
  e.preventDefault();
  history(`/profile/${e.target.fname.value}`);
}

  useEffect(() => {
    if (data) {
      const { trending } = data;
      const trendingCollection = trending?.CollectionStat || [];
      setTrendingTokens(trendingCollection);
    }
  }, [data]);

  useEffect(() => {
    console.log("Trending Tokens information: ", trendingTokens);
  }, [trendingTokens]);

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
            <NFTList items={trendingTokens}/>
        </div>

    </div>
    </div>
  );
}

export default Trending;
