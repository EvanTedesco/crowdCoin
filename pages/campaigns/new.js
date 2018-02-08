import React, {Component} from 'react';
import Layout from '../../components/Layout'
import {Button, Form, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
  state = {
    minimumContribution : '',
    errorMessage : '',
    isLoading: false
  };

  onSubmit = async (event) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({isLoading: true, errorMessage: ''});
    try {
      event.preventDefault();
      await factory.methods.createCampaign(this.state.minimumContribution).send({
        from : accounts[ 0 ]
      });

    } catch (err) {
      this.setState({ errorMessage : err.message });
    }
    this.setState({isLoading: false});
  };

  render() {

    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              onChange={event => this.setState({ minimumContribution : event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage}/>
          <Button loading={this.state.isLoading} primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;