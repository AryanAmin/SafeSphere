import React, { useState } from "react";
import "./Navigation.css";
import {
  useGetTokenBalances,
  useLazyQueryWithPagination,
  useQuery,
} from "@airstack/airstack-react";
import { queryForPieChart } from "../../queries/queries";
import { useEffect } from "react";
import { Asset } from "@airstack/airstack-react";
import { useStateValue } from "../../StateProvider";

function Navigation() {
  const { data, loading, error } = useQuery(queryForPieChart);

  const [{ user }] = useStateValue();
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (user) {
      fetch({
        user,
        limit: 10,
      });
      setTokens([]);
    }
  }, [fetch, user]);

  useEffect(() => {
    if (data) {
      const { ethereum, polygon } = data;
      const ethTokens = ethereum?.TokenBalance || [];
      const maticTokens = polygon?.TokenBalance || [];
      setTokens((tokens) => [...tokens, ...ethTokens, ...maticTokens]);
    }
  }, [data]);

  useEffect(() => {
    console.log("Tokens: ", tokens);
  }, [tokens]);

  return (
    <div>
      <div className="navigation-container">
        <h1>Navigation</h1>
      </div>
      <div>
        <h3>Hello this is a an asset</h3>
        {tokens ? (
          tokens.map((token) => (
            <Asset
              key={token.tokenId} // Add a unique key prop for each item in the list
              chain="ethereum"
              address={token.tokenAddress} // Access token properties using 'token' variable
              tokenId={token.tokenId} // Access token properties using 'token' variable
              loading={<div>Loading...</div>}
              error={<div>Error loading asset.</div>}
              imgProps={{ alt: "my asset" }}
              preset="medium"
            />
          ))
        ) : (
          <h3>Loading right now...</h3>
        )}
      </div>
    </div>
  );
}

export default Navigation;
