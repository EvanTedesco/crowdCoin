import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0x5Fb6fc8Ae66580b6B870C8459cc60642f895f656'
);

export default instance;

