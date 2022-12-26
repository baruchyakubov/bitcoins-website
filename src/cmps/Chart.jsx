import Chart from 'react-apexcharts'
import { Component } from 'react'

export class Chart1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: this.props.dataset.categories
        }
      },
      series: [{
        name: 'series-1',
        data: this.props.dataset.data
      }]
    }
  }
  render() {
    return (
      <section className="container">
        <Chart options={this.state.options} series={this.state.series} type="line" width="100%" height={320} />
      </section>
    )
  }
}
