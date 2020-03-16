import ServiceFactory from '../services/ServiceFactory';

class RedirectService{
    redirectOnHome = (newPath) => {
        if(newPath){
            window.location.href = newPath;
        }else{
            window.location.href = '';
        }
    }

    switchNetwork = (networkId, newPath) => {
        if(networkId){
            ServiceFactory.configurationService().select(networkId);
            this.redirectOnHome(newPath);
        }
    };

    parseUrl = () => {
        const pathArray = window.location.pathname.split('/');
        var networkId = null;
        var newPathname = "";
        if(pathArray && pathArray[1] != '') {
            for (let i = 0; i < pathArray.length; i++) {
                if (pathArray[i] == 'testnet' || pathArray[i] == 'mainnet') {
                    networkId = pathArray[1];
                    newPathname += '';
                }else{
                    newPathname += pathArray[i];
                    newPathname += (i != pathArray.length - 1) ?'/': '';
                }
            }
        }
        // console.log(networkId, newPathname);
        return {networkId, newPathname}
    }
}
const redirectService = new RedirectService();
export { redirectService };
