import React, {Component} from 'react';
import {Button, Form, Message, Input} from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Router, Link} from '../../../routes'

class RequestsNew extends Component {
  state = {
    value : '',
    description : '',
    recipient : ''
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const {description, value, recipient} = this.state;

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.createRequest(
        description, web3.utils.toWei(value, 'ether'), recipient)
        .send({from: accounts[0]})

    } catch(err){

    }

  };


  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description : event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value : event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event => this.setState({ recipient : event.target.value })}
            />
          </Form.Field>
          <Button primary>Create Request</Button>
        </Form>
      </Layout>
    );

  }
}

export default RequestsNew;