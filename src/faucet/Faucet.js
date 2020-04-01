import React from 'react';
import ServiceFactory from '../services/ServiceFactory';
import transactionMapper from '../addresses/TransactionMapper';
import FaucetBlock from './LeftBlock';
import config from '../configuration/config.testnet';
import TransactionListFaucet from '../addresses/TransactionListFaucet';

export default class Faucet extends React.Component {
    state = {
        transactions: [],
        address: config.faucetAddress,
    };

    async componentDidMount() {
        const address = this.state.address;
        try {
            const addressService = ServiceFactory.addressService();
            const transactions = await addressService.loadTransactions(address);
            const transactionMap = await transactionMapper(
                transactions,
                address
            );
            await this.setState({ transactions });
        } catch (e) {
            await this.setState({ transactions: [] });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="grid FuacetSection">
                    <div className="LeftBlock column-md-12">
                        <FaucetBlock />
                    </div>
                    <div className="TransactionList column-md-12">
                        <TransactionListFaucet
                            transactions={this.state.transactions}
                            address={this.state.address}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
