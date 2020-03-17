import ServiceFactory from './ServiceFactory';

class RedirectService{
    redirectOnHome = (newPath) => {
        window.location.href = newPath ? newPath : '';
    }

    switchNetwork = (networkId, newPath) => {
        if(networkId){
            ServiceFactory.configurationService().select(networkId);
            this.redirectOnHome(newPath);
        }
    };

    parseUrl = () => {
        const pathArray = window.location.pathname.split('/');
        let networkId = null;
        let newPathname = "";
        if(pathArray[1] != '') {
            for (let i = 0; i < pathArray.length; i++) {
                if (pathArray[i] == 'testnet' || pathArray[i] == 'mainnet') {
                    networkId = pathArray[1];
                    newPathname += '';
                }else{
                    newPathname += pathArray[i];
                    newPathname += (i != pathArray.length - 1) ? '/' : '';
                }
            }
        }
        return {networkId, newPathname}
    }
}
const redirectService = new RedirectService();
export { redirectService };
