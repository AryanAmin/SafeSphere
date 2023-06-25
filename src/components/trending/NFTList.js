import './NFTList.css';

export default function NFTList(props){
    if (props.items.length === 0) {
        return <h2>Found no NFTs</h2>;
    }
return (<table class="nfts">
    <tr>
        <th>Token Name</th>
        <th>Total Sales Volume</th>
        <th>Last Transaction</th>
    </tr>
    {props.items.map((nft) => (
        <tr>
        <td>{nft.token.name}</td>
        <td>{nft.totalSaleVolumeInUSDC}</td>
        <td>{nft.lastTransactionBlockTimestamp}</td>
        </tr>
    ))}
  </table>);
}