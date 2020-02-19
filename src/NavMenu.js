import React from 'react';
import PropTypes from 'prop-types';
import {withRouter, Redirect} from 'react-router';

import {routes} from './shared/Routing';
import NavMenuItem from './NavMenuItem';

const items = [{
    title: 'General info',
    route: routes.root,
    icon: 'icon-general'
}, {
    title: 'Blocks',
    route: routes.blocks.list,
    icon: 'icon-blocks'
}, {
    title: 'Peers',
    route: routes.peers.list,
    icon: 'icon-peers'
}, {
    title: 'Nodes',
    route: routes.nodes.list,
    icon: 'icon-nodes'
}, {
    title: 'Faucet',
    route: routes.faucet.list,
    icon: 'icon-faucet'
}];

const NetworkShape = PropTypes.shape({
    networkId: PropTypes.string,
    displayName: PropTypes.string,
    url: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    spamListUrl: PropTypes.string
});

const networkId = 'testnet';
const pathname = '/faucet';

class NavMenu extends React.Component {
    static propTypes = {
        onAfterNavigate: PropTypes.func.isRequired,
        current: NetworkShape.isRequired
    };

    constructor(props) {
        super(props);

        const {pathname} = this.props.location;

        this.state = {
            items,
            current: items.find(item => item.route === pathname) || items[0]
        };
    }

    handleNavigate = item => {
        this.setState({
            current: item
        });

        this.props.onAfterNavigate();
    };

    render() {
        if (this.props.current.networkId != networkId && window.location.pathname == pathname) {
            return <Redirect to="/" />;
        } else {
            return (
                <div className="menu-list">
                    {this.state.items.map((item, index) => {
                        const current = this.state.current === item;
                        if (item.title != 'Faucet' || this.props.current.networkId == networkId) {
                            return (
                                <NavMenuItem
                                    key={index}
                                    item={item} current={current}
                                    onNavigate={this.handleNavigate}
                                />
                            );
                        }
                    })}
                </div>
            );
        }
    }
}

export default withRouter(NavMenu);
