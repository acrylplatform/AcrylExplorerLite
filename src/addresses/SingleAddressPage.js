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
        selectedTabIndex: 0,
    };

    GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
    componentDidMount() {
        if (this.GetURLParameter('tab') == 'data') {
            this.setState({ selectedTabIndex: 3 });
        }
    }
    componentDidUpdate(prevProps) {
        if (
            this.props.match.params.address !== prevProps.match.params.address
        ) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const { address } = this.props.match.params;
        const addressService = ServiceFactory.addressService();

        return addressService
            .loadBalance(address)
            .then(balance => {
                return this.setState({ balance });
            })
            .then(_ => this.fetchTabData(this.state.selectedTabIndex));
    };

    fetchTabData = selectedIndex => {
        const { address } = this.props.match.params;
        const addressService = ServiceFactory.addressService();

        switch (selectedIndex) {
            case 0:
                return addressService
                    .loadTransactions(address)
                    .then(transactions => {
                        return transactionMapper(transactions, address);
                    })
                    .then(transactions => {
                        this.setState({ transactions });
                    });

            case 1:
                return addressService
                    .loadAliases(address)
                    .then(aliases => this.setState({ aliases }));

            case 2:
                return addressService
                    .loadAssets(address)
                    .then(assets => this.setState({ assets }));

            case 3:
                return addressService
                    .loadData(address)
                    .then(data => this.setState({ data }));

            case 4:
                return addressService
                    .loadScript(address)
                    .then(script => this.setState({ script }));
        }

        return Promise.resolve();
    };

    handleTabActivate = selectedIndex => {
        this.fetchTabData(selectedIndex);
        this.setState({ selectedTabIndex: selectedIndex });
    };

    render() {
        return (
            <Loader
                fetchData={this.fetchData}
                errorTitle="Failed to load address details"
            >
                <React.Fragment>
                    <GoBack />
                    <Headline
                        title="Address"
                        subtitle={this.props.match.params.address}
                    />
                    <BalanceDetails balance={this.state.balance} />
                    <Tabs
                        onTabActivate={this.handleTabActivate}
                        selectedIndex={this.state.selectedTabIndex}
                    >
                        <Pane title="Transactions">
                            <TransactionList
                                transactions={this.state.transactions}
                                address={this.props.match.params.address}
                            />
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
