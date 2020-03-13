export const routeParams = {
    blockHeight: ':height',
    transactionId: ':transactionId',
    address: ':address',
    alias: ':alias'
};

const blocks = `/blocks`;

export const routes = {
    root: '/',
    nodes: {
        list: `/nodes`
    },
    peers: {
        list: `/peers`
    },
    faucet: {
        list: `/faucet`
    },
    blocks: {
        list: blocks,
        one: (height) => `${blocks}/${height}`
    },
    transactions: {
        one: (id) => `/tx/${id}`
    },
    addresses: {
        one: (address) => `/address/${address}`
    },
    aliases: {
        one: (alias) => `/aliases/${alias}`
    }
};
