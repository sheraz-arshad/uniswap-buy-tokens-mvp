import BigNumber from 'bn.js';
import { uniswapRouterInstance } from './uniswap-router';

export class UniswapInteraction {
    async getPath () {
        const path = [];
        const ETHAddress = await uniswapRouterInstance.methods.WETH().call();
        const MGXAddress = '0x1412f6Aa5ADC77C620715BB2a020AA690B85F68A';

        path.push(ETHAddress);
        path.push(MGXAddress);
        return path;
    }

    async convert (mgxAmount, ethAmount) {
        const [ from ] = await window.ethereum.enable();
        const deadline = Math.floor( new Date() / 1000 ) + 1000;
        const path = await this.getPath();
        console.log(mgxAmount,
            path,
            from,
            deadline,
        );
        const txObj = uniswapRouterInstance.methods.swapETHForExactTokens(
            mgxAmount,
            path,
            from,
            deadline,
        );

        return new Promise(
            (resolve, reject) => {
                txObj.send({
                    from,
                    value: new BigNumber(ethAmount)
                })
                    .on('transactionHash', (hash) => {
                        console.log("transactionHash: "+hash);
                        resolve(hash);
                    })
                    .on('error', (err) => {
                        reject(err);
                    })
            }
        );
    }

    async getPrice (mgxAmount) {
        const path = await this.getPath();
        const [ ethAmountInWei, ] = await uniswapRouterInstance.methods
            .getAmountsIn(mgxAmount, path)
            .call();

        return ethAmountInWei;
    }
}
