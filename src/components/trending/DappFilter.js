import './DappFilter.css';
import {useState} from 'react';

export default function DappFilter(props){
    const dropdownChangeHandler = (event) => {
        props.onChangeFilter(event.target.value);
      };
  return (<div class="Dappfilter">
    <label>Filter by Dapp</label>
    <select value={props.selected} onChange={dropdownChangeHandler}>
      <option value='blur'>blur</option>
      <option value='opensea'>opensea</option>
      <option value='rarible'>rarible</option>
    </select>
</div>);
}