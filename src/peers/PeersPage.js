import React from 'react';

import ServiceFactory from '../services/ServiceFactory';
import Loader from '../shared/Loader';
import PeerList from './PeerList';

export default class PeersPage extends React.Component {
    state = {
        peers: []
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        return ServiceFactory.peersService().loadPeers()
            .then(peers => {
                peers = this.convertPeers(peers);
                this.setState({peers});
            });
    };

    convertPeers = (peers) => {
        peers.map(peer => {
            let { address, declaredAddress } = peer;
            peer.address = this.convertAddress(address);
            peer.declaredAddress = this.convertAddress(declaredAddress);
            return peer;
        });
        return peers;
    };

    convertAddress = (address) => {
        if (/(\d+)/g.test(address)) {
            const groups = address.match(/(\d+)/g);
            address = `${groups[0]}.${groups[1]}.${groups[2]}.${groups[3].replace(/./g, '*')}:${groups[4]}`;
        }
        return address;
    }

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load peer details">
                <React.Fragment>
                    <div className="headline">
                        <span className="title">Peers</span>
                        <label className="right">
                            <span>Connected </span>
                            <span className="bold">{this.state.peers.length}</span>
                        </label>
                    </div>
                    <PeerList peers={this.state.peers} />
                </React.Fragment>
            </Loader>
        );
    }
}
