import React from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '../configuration/config.testnet';

export default class FaucetBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '', 
            isSubmiting:false,
            token:'',
            responseMessage:'',
        };
        this.addressChange = this.addressChange.bind(this);
        this.getCoins = this.getCoins.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(value){
        if(value == null){
            this.setState({isSubmiting: false});
        }else{
            this.setState({isSubmiting: true, token: value});
        }
    }
 
    addressChange(event){
        this.setState({address: event.target.value});
    }

    async getCoins(event) {
        event.preventDefault();
        try{
            const response = await axios.post(config.getCoinsAddress, {
                address: this.state.address,
                token: this.state.token
            })
            this.setState({responseMessage:response.data})
        } catch(e){
            console.error(e);
        }
    }

    render() {
        return (
            <React.Fragment>
                <form className='FaucetForm' onSubmit={this.getCoins}>
                    <label>
                        <p style={{fontWeight:"bold"}}>Testnet address</p>
                        Fill out your Testnet address to receive 10 ACRYL
                    </label>
                    <input type="text" value={this.state.address} onChange={this.addressChange} className='AdressInput'/>
                    <label>
                        Please enter the Captcha
                    </label>
                    <ReCAPTCHA
                        ref={this.recaptchaRef}
                        sitekey={config.captchaKey}
                        onChange={this.onChange}
                    />
                    <input type="submit" value="Отправить" disabled={!this.state.isSubmiting} className='SubbmitButton'/>
                    <span className='FaucetResponseMessage'>{this.state.responseMessage}</span><br />
                    <span>
                        If you experience any problems with the faucet, please contact us.
                    </span>
                </form>
            </React.Fragment>
        );
    }
}
