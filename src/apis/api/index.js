import { pairAbi } from '../../abi/pair.abi.js' // huiwanUsdtMdexABI
import { poolAbi } from '../../abi/pool.abi.js' //  huiwanUsdtLoopABI
import { trsAbi } from '../../abi/trs.abi.js' // huiwanTokenABI
import { usdtAbi } from '../../abi/usdt.abi.js' // usdtTokenABI
import Contract from '../contract/index.js'

const usdtAddr = `0xa71EdC38d189767582C38A3145b5873052c3e47a` // usdtTokenAddr
const trsAddr = `0xb4292e40B33daf0214364Fe27453110C69051D90` //  huiwanTokenAddr
const trsUsdtPairAddr = `0x6f26ddacd8b9c39deb1ef5aa742157a09c9a3a98` //  huiwanUsdtMdexAddr
const trsUsdtPoolAddr = `0x3e29F7FB187991DE1DDd7AFd7420870e28199665` //  huiwanUsdtLoopAddr


const usdtTokenAddr = usdtAddr
const huiwanTokenAddr = trsAddr
const huiwanUsdtMdexAddr = trsUsdtPairAddr
const huiwanUsdtLoopAddr = trsUsdtPoolAddr

const huiwanUsdtMdexABI = pairAbi
const huiwanUsdtLoopABI = poolAbi
const huiwanTokenABI = trsAbi
const usdtTokenABI = usdtAbi


export default new Contract({
    huiwanUsdtLoopAddr,
    huiwanTokenAddr,
    usdtTokenAddr,
    huiwanUsdtMdexAddr,
    huiwanUsdtLoopABI,
    huiwanTokenABI,
    usdtTokenABI,
    huiwanUsdtMdexABI
})