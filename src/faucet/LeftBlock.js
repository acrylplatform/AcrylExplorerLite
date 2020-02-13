import React from 'react';
import { broadcast, sponsorship, transfer, waitForTx } from '@acryl/acryl-transactions';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
const recaptchaRef = React.createRef();

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
    }
    onChange =  async(value)=> {
        if(value == null){
            await this.setState({isSubmiting: false});
        }else{
            await this.setState({isSubmiting: true, token: value});
        }
        await console.log("Captcha value:", value);
    }
    onSubmit = () => {
        const recaptchaValue = recaptchaRef.current.getValue();
        this.props.onSubmit(recaptchaValue);
    }
 
    addressChange(event) {
        this.setState({address: event.target.value});
    }

    getCoins(event) {
        // console.log('Отправленное имя: ' + this.state.address);
        event.preventDefault();
        axios.post('https://3h765xjw97.execute-api.eu-central-1.amazonaws.com/faucet', {
            address: this.state.address,
            token: this.state.token
          })
          .then((response) => {
            this.setState({responseMessage:response.data})
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
        });
        
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
                        sitekey="6LcOH9gUAAAAAGTtomA98d1nW-JmLUC63E3XX6gl"
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
