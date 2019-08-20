import axios from 'axios';

import {nodeApi} from '../shared/NodeApi';
import {ApiClientService} from './ApiClientService';

export class NodesService extends ApiClientService {
    constructor(configurationService) {
        super(configurationService);
    }

    loadNodes = (_this) => {
        let chain = Promise.resolve();

        const nodes = this.configurationService.get().nodes.slice();

        nodes.map((node, index) => {
            const api = nodeApi(node.url);
            chain = chain
                .then(() => {
                    return new Promise((resolve, reject) => {
                        axios.all([
                            api.version(),
                            api.blocks.height(),
                            api.baseTarget(),
                            api.transactions.utxSize()
                        ]).then(axios.spread((version, height, baseTarget, unconfirmedTxCount) => {
                            const newNode = {
                                ...node,
                                version: version.data.version,
                                height: height.data.height,
                                baseTarget: baseTarget.data.baseTarget,
                                unconfirmedTxCount: unconfirmedTxCount.data.size
                            };
            
                            resolve({
                                index,
                                node: newNode
                            });
                        }))
                    })
                })
                .then((resolve) => {
                    let nodes = _this.state.nodes;
                    nodes[resolve.index] = resolve.node;
                    _this.setState({nodes});
                });
        });

        return chain;
    }
}
