const nodeUrl = 'https://nodes.acrylplatform.com';
const node1Url = 'https://node1.acrylplatform.com';
const node2Url = 'https://node2.acrylplatform.com';
const node3Url = 'https://node3.acrylplatform.com';
const node4Url = 'https://node4.acrylplatform.com';
const node5Url = 'https://node5.acrylplatform.com';

export default {
    networkId: 'mainnet',
    displayName: 'Mainnet',
    apiBaseUrl: nodeUrl,
    spamListUrl: 'https://raw.githubusercontent.com/acrylplatform/acryl-community/master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Acryl%20Community.csv',
    nodes: [{url: nodeUrl, maintainer: 'Acryl'},
        {url: node1Url, maintainer: 'Acryl'},
        {url: node2Url, maintainer: 'Acryl'},
        {url: node3Url, maintainer: 'Acryl'},
        {url: node4Url, maintainer: 'Acryl'},
        {url: node5Url, maintainer: 'Acryl'}]
};
