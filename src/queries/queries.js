export const queryForPieChart = `query QB5 {
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