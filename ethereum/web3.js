import Web3 from 'web3';

let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //user is on browser with metamask enabled
  web3 = new Web3(window.web3.currentProvider)
} else {
  //user is on the server or doesn't have meta mask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/hMuO3tuHtC3bGib45xPr'
  );
  web3 = new Web3(provider);
}

export default web3;