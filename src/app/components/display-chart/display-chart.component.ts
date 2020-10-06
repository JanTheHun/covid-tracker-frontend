import { Component, Input } from '@angular/core'
import { ChartDataObject } from 'src/app/types/chart-data'

@Component({
  selector: 'app-display-chart',
  templateUrl: './display-chart.component.html',
  styleUrls: ['./display-chart.component.css']
})
export class DisplayChartComponent {

  chartData: ChartDataObject

  @Input('chartData')
  set setChartData(data: ChartDataObject) {
    if (data) {
      this.chartData = data
    }
  }
}
