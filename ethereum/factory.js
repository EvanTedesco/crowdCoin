import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x29E9e74B975aB14591c62af4986ad3c74848C81a'
);

export default instance;