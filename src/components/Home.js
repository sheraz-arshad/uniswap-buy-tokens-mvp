import React, { Component } from 'react';
import { BuyToken } from './BuyToken';
import { UniswapInteraction } from '../interactions-uniswap/uniswap'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.uniswap = new UniswapInteraction();
    }

    render() {
        return <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-around",
        }}>
            <BuyToken uniswap={this.uniswap}/>
            {/*<SellToken uniswap={this.uniswap}/>*/}
        </div>;
    }
}
