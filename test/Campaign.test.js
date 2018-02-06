const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;


beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data : compiledFactory.bytecode })
    .send({ from : accounts[0], gas : '1000000' });
  factory.setProvider(provider);

  await factory.methods.createCampaign('100').send({
    from : accounts[ 0 ],
    gas : '1000000'
  });

  [ campaignAddress ] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
      });
    isApprover = await campaign.methods.approvers(accounts[1]).call();
    assert.equal(isApprover, true);
  });

  it('ensures a campaign has a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '99',
        from: accounts[1]
      });
    } catch (err) {
      assert(err);
    }

    isApprover = await campaign.methods.approvers(accounts[1]).call();
    assert.equal(isApprover, false);
  });

  it('allows a manager to make a request', async () => {
    await campaign.methods.createRequest(
      'Video Tapes',
      '100',
      accounts[1]
    ).send({
      from: accounts[0],
      gas: '1000000'
    });
    const request = await campaign.methods.requests(0).call();
    assert.equal(request.description, 'Video Tapes');
    assert.equal(request.value, '100');
  });

  it('processes request', async () => {
    initialBalance = await web3.eth.getBalance(accounts[1]);
    initialBalance = web3.utils.fromWei(initialBalance, 'ether');
    initialBalance = parseFloat(initialBalance);



    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });
    await campaign.methods.createRequest(
      '_',
      web3.utils.toWei('5', 'ether', accounts[1]),
      accounts[1]
    ).send({
      from: accounts[0],
      gas: '1000000'
    });
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    finalBalance = await web3.eth.getBalance(accounts[1]);
    finalBalance = web3.utils.fromWei(finalBalance, 'ether');
    finalBalance = parseFloat(finalBalance);

    assert.equal(finalBalance, initialBalance + 5);


  });
});