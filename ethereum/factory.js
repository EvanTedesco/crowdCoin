import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0xD030aeF9F2755c4bd2A769C0e871548295a4e963'
);

export default instance;

