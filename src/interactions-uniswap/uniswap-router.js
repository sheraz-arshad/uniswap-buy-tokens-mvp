import { web3 } from './web3';
import { UniswapRouterAbi } from './uniswap-router-abi';

const routerAddress = '0x3884342d6Ddf2Fc02154Ed468586075b5406aa34';
export const uniswapRouterInstance = new web3.eth.Contract(UniswapRouterAbi, routerAddress);
