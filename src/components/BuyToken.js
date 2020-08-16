import React, { Component } from 'react';
import BigNumber from 'bn.js';
import { web3 } from '../interactions-uniswap/web3'

import {
    FormControl,
    Jumbotron,
    Button,
} from 'react-bootstrap';

export class BuyToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ethAmountInWei: new BigNumber(0),
            mgxAmount: '',
            errMsg: '',
            showError: false,
            convertDisabled: true,
            txHash: '',
        };
        this.uniswap = this.props.uniswap;
    }

    async componentDidMount () {
        await window.ethereum.enable();
    }

    handleMGXAmountChange = async ({
        target: {
            value: mgxAmount,
        },
    }) => {
        this.setState({
            mgxAmount,
            ethAmountInWei: new BigNumber(0),
            showError: false,
            convertDisabled: true,
        });

        try {
            mgxAmount = new BigNumber(mgxAmount)
                .mul(
                    new BigNumber(10).pow(new BigNumber(18))
                );
            const ethAmountInWei = await this.uniswap.getPrice(mgxAmount);
            this.setState({
                ethAmountInWei: new BigNumber(ethAmountInWei),
                convertDisabled: false,
            })
        } catch (e) {
            console.log(e.message)
            this.setState({
                showError: true,
                errMsg: e.message,
            });
        }
    };

    async convertAssets (e) {
        let {
            mgxAmount,
            ethAmountInWei
        } = this.state;

        this.setState({
            convertDisabled: true,
        });

        try {
            mgxAmount = new BigNumber(mgxAmount)
                .mul(
                    new BigNumber(10).pow(new BigNumber(18))
                );
            const txHash = await this.uniswap.convert(
                mgxAmount,
                ethAmountInWei,
            );
            this.setState({txHash});
        } catch (e) {
            this.setState({
                showError: true,
                errMsg: e.message,
            });
        }
    }

    render() {
        return (
            <Jumbotron style={{
                padding: "40px",
                margin: "5% auto",
                width: "400px",
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
            }}>
                <h3>Buy Tokens</h3>
                <br/>
                <div>
                    <label>Enter MGX Tokens Amount to Buy</label>
                    <FormControl
                        type="text"
                        value={this.state.mgxAmount}
                        placeholder="MGX Tokens Amount"
                        onChange={this.handleMGXAmountChange}
                    />
                </div>
                {
                    !!this.state.showError &&
                    <div>
                        <br/>
                        <p style={{color: 'red'}}>{this.state.errMsg}</p>
                    </div>
                }
                <br/>
                <p>Expected Ether Required: {
                    Math.ceil(
                        Number(web3.utils.fromWei(this.state.ethAmountInWei, 'ether')) * 100000000
                    ) / 100000000
                }</p>
                <br/>
                <Button
                    disabled={this.state.convertDisabled}
                    onClick={this.convertAssets.bind(this)}
                >
                    Convert!
                </Button>
                <br/>
                {
                    !!this.state.txHash &&
                    <p style={{'wordWrap': 'break-word'}}>
                        Tx Hash:
                        <br/>
                        <a href={`https://ropsten.etherscan.io/tx/${this.state.txHash}`} target="_blank">
                            {this.state.txHash}
                        </a>
                    </p>
                }
                <br/>
                <Button
                    onClick={() => {
                        this.setState({
                            ethAmountInWei: new BigNumber(0),
                            mgxAmount: '',
                            errMsg: '',
                            showError: false,
                            convertDisabled: true,
                            txHash: '',
                        });
                    }}
                >
                    Reset!
                </Button>
            </Jumbotron>
        );
    }
}
