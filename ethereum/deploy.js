const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'moon express rhythm captain void saddle smoke pattern power dawn game outside',
  'https://rinkeby.infura.io/hMuO3tuHtC3bGib45xPr'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode
    })
    .send({
      gas: '1000000',
      from: accounts[0]
    });
  console.log('Contract deployed to ', result.options.address);
};

deploy();