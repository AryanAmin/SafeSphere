import React, { useEffect, useState } from "react";
import "./Trending.css";
import {
  useGetTokenBalances,
  useLazyQueryWithPagination,
  useQuery,
} from "@airstack/airstack-react";
import { useStateValue } from "../../StateProvider";
import { queryForPieChart, queryForTrending } from "../../queries/queries";

function Trending() {
  const { data, loading, error } = useQuery(queryForTrending("opensea"));
  const [{ user }] = useStateValue();
  const [trendingTokens, setTrendingTokens] = useState([]);

  useEffect(() => {
    if (data) {
      const { trending } = data;
      const trendingCollection = trending?.CollectionStat || [];
      setTrendingTokens((tokens) => [...tokens, ...trendingCollection]);
    }
  }, [data]);

  useEffect(() => {
    console.log("Trending Tokens information: ", trendingTokens);
  }, [trendingTokens]);

  return (
    <div className="home-container">
      <h1>Trending</h1>
    </div>
  );
}

export default Trending;
