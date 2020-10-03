import { Component, OnInit, Input } from '@angular/core'
import { ChartDataObject } from 'src/app/types/chart-data'

@Component({
  selector: 'app-display-chart',
  templateUrl: './display-chart.component.html',
  styleUrls: ['./display-chart.component.css']
})
export class DisplayChartComponent implements OnInit {

  chartData: ChartDataObject

  @Input('chartData')
  set setChartData(data: ChartDataObject) {
    if (data) {
      this.chartData = data
      console.log(this.chartData)
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
