import React from 'react';
import PropTypes from 'prop-types';

import Currency from './Currency';
import TransactionRef from './TransactionRef';

const CurrencyRef = ({ currency }) => {
    if (currency === Currency.ACRYL) return currency.toString();

    return <TransactionRef txId={currency.id} text={currency.toString()} />;
};

CurrencyRef.propTypes = {
    currency: PropTypes.shape({
        id: PropTypes.string,
    }).isRequired,
};

export default CurrencyRef;
