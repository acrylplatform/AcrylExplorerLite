import React from 'react';

const socialLinks = [{
    id: 'github',
    url: 'https://github.com/acrylplatform'
}, {
    id: 'twitter',
    url: 'https://twitter.com/acrylplatform'
}, {
    id: 'facebook',
    url: '#'
}, {
    id: 'discord',
    url: '#'
}, {
    id: 'telegram',
    url: 'https://t.me/Acrylplatform'
}, {
    id: 'reddit',
    url: '#'
}];

const Footer = ({version}) => {
    return (
        <div className="menu-footer">
            <div>Version: {version}</div>
            <div>Brought to you by Acryl Team</div>
            <div>
                {socialLinks.map(item =>
                    (<a key={item.id} className={`social ${item.id}`} href={item.url} target="_blank"></a>))}
            </div>
            <div>
                <a className="fade" href="https://acrylplatform.com" target="_blank">acrylplatform.com</a>
            </div>
        </div>
    );
}

export default Footer;
