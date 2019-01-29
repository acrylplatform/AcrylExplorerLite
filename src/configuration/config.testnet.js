const nodeUrl = 'https://nodestestnet.acrylplatform.com';

export default {
    networkId: 'testnet',
    displayName: 'Testnet',
    apiBaseUrl: nodeUrl,
    spamListUrl: 'https://raw.githubusercontent.com/acrylplatform/acryl-community/master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Acryl%20Community.csv',
    nodes: [
        {url: nodeUrl, maintainer: 'Acryl'}
    ]
};
