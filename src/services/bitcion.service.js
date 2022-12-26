import axios from 'axios';
import { storageService } from './storage.service';

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getTradingVolume
}

async function getRate(coins){
    return axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
}

async function getMarketPrice(){
    let Data = storageService.load('market-price')
    if(!Data){
        Data = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
        Data = Data.data
        storageService.store('market-price' , Data)
    }
    console.log(Data);
    return Data
}

async function getTradingVolume(){
    let Data = storageService.load('trading-volume')
    if(!Data){
        Data = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
        Data = Data.data
        storageService.store('trading-volume' , Data)
    }
    console.log(Data);
    return Data
}