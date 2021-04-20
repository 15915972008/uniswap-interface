import Contract from './index.js'
import Web3 from "web3";

// 将bignumber转换
// return Web3.utils.fromWei(str,'ether')
// 将小数 *18个0
// return Web3.utils.toWei(str,'ether')
const allReward = {
    starttime: 1618902000,
    rewardRate: Web3.utils.fromWei('115740740740740740', 'ether')
}

function isApprove() {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.getAccountStakedStatus(
                (result) => {
                    if (result === '0') {
                        resolve(false)
                    } else resolve(true)
                }, (error) => {
                    reject(error)
                }
            )
        })
    })
}
// 获取矿池月/年收益
function getInitreward() {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.getInitreward((result) => {
                let per = Web3.utils.fromWei(result, 'ether')
                resolve({
                    per_day: per * 1,
                    per_month: per * 30
                })
            }, (error) => {
                reject(error)
            })
        })
    })
}
// //获取授权地址未抵押的LP
function getUnStakedLp() {

    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.getBalanceFromhuiwanUsdtMdexContract(
                window.accountAddress,
                (result) => {
                    let temp = Web3.utils.fromWei(result, 'ether')
                    resolve(temp)
                }, (error) => {
                    reject(error)
                }
            )
        })
    })
}
// 获取授权地址在pool中抵押数量
function getStakedLp() {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.getPoolLP(
                window.accountAddress,
                (result) => {
                    let temp = Web3.utils.fromWei(result, 'ether')
                    resolve(temp)
                }, (error) => {
                    reject(error)
                }
            )
        })
    })
}
// // 抵押LP到pool中
function stakedLpToPool(amount) {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.stakingToHuiwanUsdtLoopContract(
                Web3.utils.toWei(amount, 'ether'),
                (result) => {
                    resolve(result)
                }, (error) => {
                    reject(error)
                }
            )
        })
    })
}
// // 解押LP到从pool中
function stakedLpOutPool(amount) {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.withdrawFromHuiwanUsdtLoopContract(
                Web3.utils.toWei(amount, 'ether'),
                (result) => {
                    resolve(result)
                }, (error) => {
                    reject(error)
                }
            )
        })

    })
}
// //检查交易状态
function checkedDeal(hash) {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve) => {
            Contract.getDealStatusByHash(
                hash,
                function(err, res) {
                    resolve(err, res)
                }
            )
        })
    })
}
// 未授权进行授权 approveHuiwanUsdtLoopAddr
function approve() {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.approveHuiwanUsdtLoopAddr(
                (result) => {
                    console.log(result)
                    resolve(result.result)
                }, (error) => {
                    reject(error)
                }
            )
        })
    })
}


// 获取池子里的当前收益
function getEarned() {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.getEarned(
                window.accountAddress,
                (result) => {
                    let temp = Web3.utils.fromWei(result, 'ether')
                    resolve(temp)
                }, (error) => {
                    reject(error)
                }
            )
        })
    })
}

function getReward() {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.getReward((res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
        })
    })
}


function getPoolData() {
    // getBalanceFromHuiwanTokenContract
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.getBalanceFromHuiwanTokenContract(
                (precoin) => {
                    Contract.getBalanceFromUsdtTokenContract((nextcoin) => {

                        let rate = nextcoin / precoin

                        getInitreward().then(result => {

                            Contract.getTotalSupply(res => {
                                let apy
                                if (res * 1 === 0) {
                                    apy = `0.00%`;
                                } else {
                                    nextcoin = Web3.utils.fromWei(nextcoin, 'ether')
                                    apy = ((result.per_day * rate) / nextcoin) * 360 * 100 + "%"
                                }
                                resolve({
                                    ...result,
                                    precoin,
                                    nextcoin,
                                    rate,
                                    apy
                                })
                            }, (error) => {
                                reject(error)
                            })


                        })

                    })
                }
            )
        })

    })
}


function getBalanceOf() {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            Contract.getBalanceFromUsdtTokenContract((res) => {
                resolve(Web3.utils.fromWei(res, 'ether'))
            }, (err) => {
                reject(err)
            })
        })
    })
}
// 当前挖矿产出
function getLastTime() {
    return Contract.initFnPromise().then(res => {
        return new Promise((resolve, reject) => {
            // getLastTime
            Contract.getLastTime(res => {
                let reword = (res * 1 - allReward.starttime) * allReward.rewardRate
                resolve(reword.toString())
            }, err => {
                reject(err)
            })
        })
    })
}
export default {
    isApprove,
    approve,
    getInitreward,
    getUnStakedLp,
    getStakedLp,
    stakedLpToPool,
    stakedLpOutPool,
    checkedDeal,
    getEarned,
    getReward,
    getPoolData,
    getBalanceOf,
    getLastTime
}