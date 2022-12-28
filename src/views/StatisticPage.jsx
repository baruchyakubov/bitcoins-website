import { Component } from 'react'
import { Chart1 } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcion.service'

export class StatisticPage extends Component {

    state = {
        dataset: null,
        dataset2: null
    }

    componentDidMount() {
        this.getMarketPrice()
        this.getTradingVolume()
    }

    getMarketPrice = async () => {
        try {
            const data = await bitcoinService.getMarketPrice()
            let dataset = this.setData(data)
            this.setState({ dataset })
        } catch (err) {
            console.log('error', err);
        }
    }

    getTradingVolume = async () => {
        try {
            const data = await bitcoinService.getTradingVolume()
            let dataset2 = this.setData(data)
            this.setState({ dataset2 })
        } catch (err) {
            console.log('error', err);
        }
    }

    setData = (data) =>{
        let dataset = {
            categories: [],
            data: []
        }
        data.values.forEach(value => {
            const date = new Date(value.x*1000)
            dataset.categories.unshift(date.toLocaleString())
            dataset.data.unshift(Math.trunc(value.y))
        })
        return dataset
    }

    render() {
        const { dataset , dataset2 } = this.state
        if(!dataset && !dataset2) return <div>Loading...</div>
        return (
            <section className='statistic-page container'>
                <h1>Market Price</h1>
                <Chart1 dataset={dataset}></Chart1>
                <h1>Trading Volume</h1>
                <Chart1 dataset={dataset2}></Chart1>
            </section>
        )
    }
}