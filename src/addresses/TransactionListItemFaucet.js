import React from 'react';
import PropTypes from 'prop-types';

import Address from './Address';
import TransactionRef from '../shared/TransactionRef';
import {TransactionDirections} from '../shared/TransactionDefinitions';
import TransactionArrow from '../shared/TransactionArrow';
import TransactionBadge from '../shared/TransactionBadge';

const Endpoints = ({direction, sender, recipient}) => {
    if (direction === TransactionDirections.OUTGOING) {
        return (
            <React.Fragment>
                <div className="line no-wrap">{recipient ? <Address address={recipient} /> : '\u00A0'}</div>
                <div className="line no-wrap"><Address address={sender} /></div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div className="line no-wrap"><Address address={sender} /></div>
            <div className="line no-wrap"><Address address={recipient} /></div>
        </React.Fragment>
    );
};

export default class TransactionListItemFaucet extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        const rowClassName = tx.isSpam ? 'spam' : '';

        return (
            <tr className={rowClassName}>
                <td data-label="ID / Type">
                    <div className="line no-wrap"><TransactionRef txId={tx.id}/></div>
                    <div className="line no-wrap"><TransactionBadge type={tx.type} direction={tx.direction}/></div>
                </td>
                <td data-label="Timestamp" className="timestamp">
                    <div className="line"><label>{tx.timestamp.date}</label></div>
                    <div className="line"><label>{tx.timestamp.time}</label></div>
                </td>
                <td data-label="Sender / Receiver">
                    <TransactionArrow type={tx.type} direction={tx.direction} />
                    <Endpoints direction={tx.direction} sender={tx.sender} recipient={tx.recipient} />
                </td>
            </tr>
        );
    }
}
