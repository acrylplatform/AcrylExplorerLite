import React from 'react';
import PropTypes from 'prop-types';

const BalanceDetails = ({balance}) => {
    return (
        <div className="info-box grid grid-wrap">
            <div className="column-sm-6">
                <div className="line"><label>Regular Balance</label></div>
                <div className="line">{balance.regular}</div>
            </div>
            <div className="column-sm-6">
                <div className="line"><label>Generating Balance</label></div>
                <div className="line">{balance.generating}</div>
            </div>
            <div className="column-sm-6">
                <div className="line"><label>Available Balance</label></div>
                <div className="line">{balance.available}</div>
            </div>
            <div className="column-sm-6">
                <div className="line"><label>Effective Balance</label></div>
                <div className="line">{balance.effective}</div>
            </div>
        </div>
    );
};

BalanceDetails.propTypes = {   
    balance: PropTypes.shape({
        regular: PropTypes.string,
        generating: PropTypes.string,
        available: PropTypes.string,
        effective: PropTypes.string
    })
};
export default BalanceDetails;
