import { pairAbi } from '../../abi/pair.abi.js' // pair-abi
import { poolAbi } from '../../abi/pool.abi.js' // pool-abi
import { ethAbi } from '../../abi/eth.abi.js' // pre-abi
import { usdtAbi } from '../../abi/usdt.abi.js' // next-abi
import Contract from '../contract/index.js'
import API from '../contract/api.js'

// pre-next  ETH/USDT
const trsAddr = `0x64FF637fB478863B7468bc97D30a5bF3A428a1fD` // pre
const usdtAddr = `0xa71EdC38d189767582C38A3145b5873052c3e47a` // next

const trsUsdtPairAddr = `0x524815d25b4241d4bce239fe8e6edf18d40b4007` // pre-next-pair
const trsUsdtPoolAddr = `0x86ad9E5EB64a73a134CAbDc8b3a1219DCa20956F` // pre-next-pool


const usdtTokenAddr = usdtAddr
const huiwanTokenAddr = trsAddr
const huiwanUsdtMdexAddr = trsUsdtPairAddr
const huiwanUsdtLoopAddr = trsUsdtPoolAddr

// pre-next  ETH/USDT
const huiwanTokenABI = ethAbi //pre-abi
const usdtTokenABI = usdtAbi //next-abi
const huiwanUsdtMdexABI = pairAbi
const huiwanUsdtLoopABI = poolAbi


const contract = new Contract({
    huiwanUsdtLoopAddr,
    huiwanTokenAddr,
    usdtTokenAddr,
    huiwanUsdtMdexAddr,
    huiwanUsdtLoopABI,
    huiwanTokenABI,
    usdtTokenABI,
    huiwanUsdtMdexABI
})


export default new API(contract)