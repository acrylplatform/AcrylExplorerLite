const nodeUrl = 'https://nodestestnet.acrylplatform.com';
const getCoinsAddress = 'https://3h765xjw97.execute-api.eu-central-1.amazonaws.com/faucet';
const captchaKey = '6LcOH9gUAAAAAGTtomA98d1nW-JmLUC63E3XX6gl';
const faucetAddress = '3JNbXos1asm3ZG47QG1MWjknQhvMDqrrH2v';

export default {
    networkId: 'testnet',
    displayName: 'Testnet',
    apiBaseUrl: nodeUrl,
    spamListUrl: 'https://raw.githubusercontent.com/acrylplatform/acryl-community/master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Acryl%20Community.csv',
    nodes: [
        {url: nodeUrl, maintainer: 'Acryl'}
    ],
    getCoinsAddress :getCoinsAddress,
    captchaKey: captchaKey,
    faucetAddress: faucetAddress,
};
