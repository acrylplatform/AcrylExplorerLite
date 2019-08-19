import React from 'react';
import PropTypes from 'prop-types';

export default class PeerListItem extends React.Component {
    static propTypes = {
        peer: PropTypes.object.isRequired
    };

    render() {
        const {peer} = this.props;
        return (
            <tr>
                <td data-label="Address">
                    <div className="line no-wrap">{peer.address}</div>
                </td>
                <td data-label="Declared address">
                    <div className="line no-wrap">{peer.declaredAddress}</div>
                </td>
                <td data-label="Node name">
                    <div className="line no-wrap">{peer.name}</div>
                </td>
                <td data-label="Node nonce">
                    <div className="line no-wrap">{peer.nonce}</div>
                </td>
            </tr>
        );
    }
}
