import React, {
  Component
} from 'react';
import { Card } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';


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
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver.'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw funds from the contract. Requests must be approved by at least half of the contributors.'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this campaign.'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is the amount of ether this campaign has left to spend.'
      }
    ];
    return <Card.Group items={items}/>;
  }

  render() {
    return (
    <Layout >
      < h3 > I am a Campaign </h3>
      {this.renderCards()}
      <ContributeForm/>
    </Layout >);
  }
}

export default CampaignShow;