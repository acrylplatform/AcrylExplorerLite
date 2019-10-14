import React from 'react';

import EndpointRef from '../shared/EndpointRef';
import CurrencyRef from '../shared/CurrencyRef';
import TransactionBadge from '../shared/TransactionBadge';
import TransactionRef from '../shared/TransactionRef';
import BlockRef from '../shared/BlockRef';
import Spacer from '../shared/Spacer';

import Description from './Description';
import ScriptInfo from '../shared/ScriptInfo';
import DataInfo from '../shared/DataInfo';

import MoneyInfo from '../components/MoneyInfo';
import InvocationInfo from '../components/InvocationInfo';
import StateChangesInfo from '../components/StateChangesInfo';

const transactionToDictionary = (tx) => {
    switch (tx.type) {
        case 2:
        case 4:
            return transferTransactionToItems(tx);

        case 3:
            return issueTransactionToItems(tx);

        case 5:
            return reissueTransactionToItems(tx);

        case 6:
            return burnTransactionToItems(tx);

        case 7:
            return exchangeTransactionToItems(tx);

        case 8:
            return leaseTransactionToItems(tx);

        case 9:
            return cancelLeaseTransactionItems(tx);

        case 10:
            return aliasTransactionToItems(tx);

        case 11:
            return massPaymentTransactionToItems(tx);

        case 12:
            return dataTransactionToItems(tx);

        case 13:
            return scriptTransactionToItems(tx);

        case 14:
            return sponsorshipTransactionToItems(tx);

        case 15:
            return assetScriptTransactionToItems(tx);

        case 16:
            return scriptInvocationTransactionToItems(tx);

        default:
            return [];
    }
};

const scriptInvocationTransactionToItems = tx => {
    const paymentItems = [{
        label: 'Payment',
        value: tx.payment ? <MoneyInfo value={tx.payment}/> : ''
    }];

    const stateItems = tx.stateChanges ? [{
        label: 'State Changes',
        value: <StateChangesInfo changes={tx.stateChanges} />
    }] : [];

    return [
            ...buildTransactionHeaderItems(tx),
            {
                label: 'DApp Address',
                value: <EndpointRef endpoint={tx.dappAddress} />
            }, {
                label: 'Call',
                value: <InvocationInfo {...tx.call} />
            },
            ...paymentItems,
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx),
            ...stateItems
        ]
};

const dataTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        {
            label: 'Data',
            value: <DataInfo data={tx.data} />
        },
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const scriptTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        {
            label: 'Script',
            value: <ScriptInfo script={tx.script} />
        },
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const sponsorshipTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        {
            label: 'Sponsored Fee',
            value: tx.sponsoredFee ? tx.sponsoredFee.toString() : 'Cancelled'
        }, {
            label: 'Transaction Fee',
            value: tx.fee.toString()
        },
        buildSenderItem(tx)
    ];
};

const assetScriptTransactionToItems = tx => {
    return [
            ...buildTransactionHeaderItems(tx),
            {
                label: 'Asset',
                value: <CurrencyRef currency={tx.asset} />
            },
            buildScriptItem(tx),
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
};

const aliasTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        {
            label: 'Alias',
            value: <Description text={tx.alias} />
        },
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const cancelLeaseTransactionItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        {
            label: 'Lease',
            value: <TransactionRef txId={tx.leaseId} />
        },
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const leaseTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildAmountItem(tx),
        buildFeeItem(tx),
        buildRecipientItem(tx),
        buildSenderItem(tx),
        {
            label: 'Status',
            value: tx.status
        }
    ];
};

const reissueTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildQuantityItem(tx),
        buildReissuableItem(tx),
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const issueTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildQuantityItem(tx),
        {
            label: 'Decimals',
            value: tx.decimals
        },
        buildDescriptionItem(tx),
        buildReissuableItem(tx),
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const burnTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildAmountItem(tx),
        buildFeeItem(tx)
    ];
};

const transferTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildRecipientItem(tx),
        buildAmountItem(tx),
        buildFeeItem(tx),
        buildAttachmentItem(tx),
        buildSenderItem(tx)
    ];
};

const exchangeTransactionToItems = tx => {
    const assetPair = tx.buyOrder.assetPair;

    const items = [{
        label: 'Price',
        value: tx.price.toString()
    }, {
        label: 'Total',
        value: tx.total.toString()
    }];

    return [
        ...buildTransactionHeaderItems(tx),
        buildFeeItem(tx),
        buildAmountItem(tx),
        ...items,
        buildSenderItem(tx),
        buildRecipientItem(tx),
        {
            label: 'Pair',
            value: <React.Fragment><CurrencyRef currency={assetPair.amountAsset}/> / <CurrencyRef currency={assetPair.priceAsset}/></React.Fragment>
        },
        ...buildOrderItems(tx.buyOrder),
        ...buildOrderItems(tx.sellOrder)
    ];
};

const massPaymentTransactionToItems = tx => {
    const items = [{
        label: 'Total amount',
        value: tx.totalAmount.toString()
    }, {
        label: 'Transfers count',
        value: tx.transferCount,
    }];

    return [
        ...buildTransactionHeaderItems(tx),
        ...items,
        buildAttachmentItem(tx),
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const buildOrderItems = order => {
    return [{
        label: 'Order Id',
        value: order.id
    }, {
        label: 'Order Type',
        value: order.orderType
    },
        buildSenderItem(order),
        buildAmountItem(order),
    {
        label: 'Price',
        value: order.price.toString()
    },
        buildTimestampItem(order.timestamp)
    ];
};

const buildScriptItem = tx => ({
    label: 'Script',
    value: <ScriptInfo script={tx.script} />
});

const buildDescriptionItem = tx => ({
    label: 'Description',
    value: <Description text={tx.description}/>
});

const buildAttachmentItem = tx => ({
    label: 'Attachment',
    value: <Description text={tx.attachment} />
});

const buildTimestampItem = timestamp => ({
    label: 'Timestamp',
    value: timestamp.toLongString(),
});

const buildTransactionHeaderItems = tx => {
    return [{
        label: 'Type',
        value: <React.Fragment><span>{tx.type}</span><Spacer size={14}/><TransactionBadge type={tx.type} /></React.Fragment>
    }, buildVersionItem(tx), buildTimestampItem(tx.timestamp), {
        label: 'Block',
        value: <BlockRef height={tx.height} />
    },buildProofsItem(tx)];
};

const buildVersionItem = tx => ({
    label: 'Version',
    value: tx.version
});

const buildSenderAddressAndKeyItems = tx => ([
    buildSenderItem(tx),
    buildSenderPublicKeyItem(tx)
]);

const buildQuantityItem = tx => ({
    label: 'Quantity',
    value: tx.amount.toString()
});

const buildProofsItem = tx => ({
    label: 'Proofs',
    value: tx.proofs.join(' ')
});

const buildReissuableItem = tx => ({
    label: 'Reissuable',
    value: (!!tx.reissuable).toString()
});

const buildRecipientItem = tx => ({
    label: 'Recipient',
    value: <EndpointRef endpoint={tx.recipient} />
});

const buildSenderItem = tx => ({
    label: 'Sender',
    value: <EndpointRef endpoint={tx.sender} />
});

const buildSenderPublicKeyItem = tx => ({
    label: 'Sender PublicKey',
    value: tx.senderPublicKey
});

const buildFeeItem = tx => ({
    label: 'Fee',
    value: setAcryl(tx.fee.toString())
});

const buildAmountItem = tx => ({
    label: 'Amount',
    value: setAcryl(tx.amount.toString())
});

const setAcryl = str =>  {
    return str.includes('WAVES') ? str.replace('WAVES', 'ACRYL') : str;
}

export default transactionToDictionary;
