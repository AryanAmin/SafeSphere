export const queryForPieChart = `query queryPieChart {
    ethereum: TokenBalances(
      input: {filter: {owner: {_eq: "0x540cb04ebab67e05a620b97bb367ac5e4ed68f09"}, _and: {tokenType: {_eq: ERC721}}}, limit: 10, blockchain: ethereum}
    ) {
      TokenBalance {
        amount
        token {
          name
          symbol
        }
        tokenType
        blockchain
        tokenId
        tokenAddress
      }
    }
    polygon: TokenBalances(
      input: {filter: {owner: {_eq: "0x540cb04ebab67e05a620b97bb367ac5e4ed68f09"}, _and: {tokenType: {_eq: ERC721}}}, limit: 10, blockchain: ethereum}
    ) {
      TokenBalance {
        amount
        token {
          name
          symbol
        }
        tokenType
        blockchain
        tokenId
        tokenAddress
      }    }
  }`;

export const queryForTrending = (daapName, _gt = 1) => {
  if (daapName !== "blur" || daapName !== "opensea" || daapName !== "rarible") {
    return `query NFTCollectionSales {
      trending: CollectionStats(
        input: {filter: {lowestSalePriceInUSDC: {_gt: ${_gt}}, dappName: {_eq: ${daapName}}}, blockchain: ethereum, timeFrame: DAILY, order: {totalSaleVolumeInUSDC: DESC, lastTransactionBlockTimestamp: DESC}, limit: 20}
      ) {
        CollectionStat {
          dappName
          totalSaleVolumeInUSDC
          lastTransactionBlockTimestamp
          token {
            name
          }
        }
      }
    }`;
  }
};
