
import { ChartDataSets, ChartOptions } from 'chart.js'
import { Color, Label } from 'ng2-charts'
export interface ChartDataObject {
  lineChartData: ChartDataSets[]
  lineChartLabels: Label[]
  lineChartColors: Color[]
  lineChartOptions: ChartOptions
  lineChartLegend: boolean
  lineChartPlugins: any[]
  lineChartType: string,
  query?: any,
  queryFields?: any,
  selectedColors?: any
}
