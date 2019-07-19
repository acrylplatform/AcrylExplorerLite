import React from 'react';

import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';
import Loader from '../shared/Loader';
import ServiceFactory from '../services/ServiceFactory';

import TransactionList from './TransactionList';
import AssetList from './AssetList';
import GroupedAliasList from './GroupedAliasList';
import DataInfo from '../shared/DataInfo';
import ScriptInfo from '../shared/ScriptInfo';
import Tabs from './Tabs';
import Pane from './Pane';
import BalanceDetails from './BalanceDetails';
import transactionMapper from './TransactionMapper';

export default class SingleAddressPage extends React.Component {
    state = {
        balance: {},
        assets: [],
        aliases: [],
        transactions: [],
        data: [],
        script: {},
        selectedTabIndex: 0
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.address !== prevProps.match.params.address) {
            this.fetchData();
        }
    }

    setAcryl(str) {
        return str.replace('WAVES', 'ACRYL');
    }

    fetchData = () => {
        const { address } = this.props.match.params;
        const addressService = ServiceFactory.addressService();

        return addressService.loadBalance(address)
            .then(balance => {
                
                for (const item in balance) {
                    balance[item] = this.setAcryl(balance[item]);
                }
                return this.setState({ balance })
            })
            .then(_ => this.fetchTabData(this.state.selectedTabIndex));
    };

    fetchTabData = (selectedIndex) => {
        const { address } = this.props.match.params;
        const addressService = ServiceFactory.addressService();

        switch (selectedIndex) {
            case 0:
                return addressService.loadTransactions(address).then(transactions => {
                    return transactionMapper(transactions, address);
                })
                    .then(transactions => {
                        for (const transaction of transactions) {
                            if(transaction.out) {
                                transaction.out.currency = this.setAcryl(transaction.out.currency);
                            }
                            if(transaction.in) {
                                transaction.in.currency = this.setAcryl(transaction.in.currency);
                            }
                           
                        }
                        this.setState({ transactions });
                    });

            case 1:
                return addressService.loadAliases(address).then(aliases => this.setState({ aliases }));

            case 2:
                return addressService.loadAssets(address).then(assets => this.setState({ assets }));

            case 3:
                return addressService.loadData(address).then(data => this.setState({ data }));

            case 4:
                return addressService.loadScript(address).then(script => this.setState({ script }));
        }

        return Promise.resolve();
    };

    handleTabActivate = (selectedIndex) => {
        this.fetchTabData(selectedIndex);
        this.setState({ selectedTabIndex: selectedIndex });
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load address details">
                <React.Fragment>
                    <GoBack />
                    <Headline title="Address" subtitle={this.props.match.params.address} />
                    <BalanceDetails balance={this.state.balance} />
                    <Tabs onTabActivate={this.handleTabActivate} selectedIndex={this.state.selectedTabIndex}>
                        <Pane title="Last 100 transactions">
                            <TransactionList transactions={this.state.transactions} />
                        </Pane>
                        <Pane title="Aliases">
                            <GroupedAliasList aliases={this.state.aliases} />
                        </Pane>
                        <Pane title="Assets">
                            <AssetList assets={this.state.assets} />
                        </Pane>
                        <Pane title="Data">
                            <DataInfo data={this.state.data} />
                        </Pane>
                        <Pane title="Script">
                            <ScriptInfo script={this.state.script.script} />
                        </Pane>
                    </Tabs>
                </React.Fragment>
            </Loader>
        );
    }
}
