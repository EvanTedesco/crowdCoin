import React, {
  Component
} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card } from 'semantic-ui-react'


class CampaignShow extends Component {
  static async getInitialProps(props) {
    console.log(props.query.address);
    const campaign = await Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();


    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }
  renderCards() {
    const{
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    }= this.props;
    
    const items = [
      {
        header:manager,
        meta:'Address of the Manager',
        description:'The manager created this campaign and can create requests to withdraw ETH',
        style:{overflowWrap: 'break-word'}
      }
    ]
    return <Card.Group items={items}/>;
  }
  
  
  
  render() {
    return ( 
    <Layout >
      < h3 > I am a Campaign < /h3>
      {this.renderCards()}
    </Layout >
    );
  }
}

export default CampaignShow;