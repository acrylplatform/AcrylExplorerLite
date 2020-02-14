import React from "react";
import ServiceFactory from "../services/ServiceFactory";
import transactionMapper from "../addresses/TransactionMapper";
import FaucetBlock from "./LeftBlock";
import config from "../configuration/config.testnet";
import TransactionList from "../addresses/TransactionList";

export default class Faucet extends React.Component {
    state = {
        transactions: [],
        address: config.faucetAddress
    };
    setAcryl(str) {
        return str.replace("WAVES", "ACRYL");
    }

    async componentDidMount() {
        const address = this.state.address;
        try {
            const addressService = ServiceFactory.addressService();
            const transactions = await addressService.loadTransactions(address);
            const transactionMap = await transactionMapper(
                transactions,
                address
            );
            for (const transaction of transactionMap) {
                if (transaction.out) {
                    transaction.out.currency = this.setAcryl(
                        transaction.out.currency
                    );
                }
                if (transaction.in) {
                    transaction.in.currency = this.setAcryl(
                        transaction.in.currency
                    );
                }
            }
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
                        <TransactionList
                            transactions={this.state.transactions}
                            address={this.state.address}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
