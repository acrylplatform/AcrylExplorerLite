import React from 'react';
import axios from 'axios';
import ServiceFactory from '../services/ServiceFactory';
import transactionMapper from '../addresses/TransactionMapper';
import FaucetBlock from './LeftBlock';

// import { broadcast, sponsorship, transfer, waitForTx } from '@acryl/acryl-transactions'

// export const MASTER_SEED = 'test acc 2'
// const API_BASE = 'https://nodestestnet.acrylplatform.com'

// const ttx = transfer({ recipient: '3JHj9mVz1URexGe4MHCCEMBm4gJTkhqJnv5', amount: 270000000, feeAssetId: null }, MASTER_SEED)
// broadcast(ttx, API_BASE)
import TransactionList from '../addresses/TransactionList';

export default class Faucet extends React.Component {
    state = {
        transactions: [],
        address: '3JNbXos1asm3ZG47QG1MWjknQhvMDqrrH2v'  
    }
    setAcryl(str) {
        return str.replace('WAVES', 'ACRYL');
    }

    componentDidMount(){
        const addressService = ServiceFactory.addressService();
        const address = this.state.address;
        addressService.loadTransactions(address).then(transactions => {
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
    }

    render() {
        return (
            <React.Fragment>
                <div className='grid FuacetSection'>
                    <div className='LeftBlock column-md-12'>
                        <FaucetBlock />
                    </div>
                    <div className='TransactionList column-md-12'>
                        <TransactionList transactions={this.state.transactions} address={this.state.address}/>
                    </div>
                </div>
               
            </React.Fragment>
        );
    }
}
