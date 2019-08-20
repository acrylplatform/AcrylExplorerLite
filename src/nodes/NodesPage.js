import React from 'react';
import PropTypes from 'prop-types';

import ServiceFactory from '../services/ServiceFactory';
import Loader from '../shared/Loader';
import NodeListItem from './NodeListItem';

export default class NodesPage extends React.Component {
    state = {
        nodes: []
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        return ServiceFactory.nodesService().loadNodes(this).then(() => {});
    };

    render() {
        return (
            <React.Fragment>
                <div className="headline">
                    <span className="title">{ServiceFactory.configurationService().get().displayName} Nodes</span>
                </div>
                <table className="nodes table-sm-transform">
                    <thead>
                        <tr>
                            <th>Node</th>
                            <th className="version">Version</th>
                            <th className="height">Current height</th>
                            <th className="target">Base target</th>
                            <th className="utxs">UTxs</th>
                            <th className="txs">Maintainer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.nodes.map((node, index) => {
                            return (
                                    <NodeListItem key={index} node={node} />
                            );
                        })}
                    </tbody>
                </table>
                <Loader fetchData={this.fetchData} errorTitle="Failed to load node details">
                    <div></div>
                </Loader>
            </React.Fragment>
        );
    }
}
