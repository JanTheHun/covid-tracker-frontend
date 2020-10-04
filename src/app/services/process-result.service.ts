import { Injectable } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FIELDS } from 'src/app/constants/fields'
import { ChartDataObject } from 'src/app/types/chart-data'
@Injectable({
  providedIn: 'root'
})
export class ProcessResultService {

  lineChartOptions: ChartOptions = {
    responsive: true
  }
  lineChartLegend = true
  lineChartType = 'line'
  lineChartPlugins: any[] = []

  fields: any []
  constructor(
  ) {
    this.fields = FIELDS
  }

  processResult(result: any[], query: any, selectedColors: any ): ChartDataObject {

    let newLabels: Label[] = result.map( r => { return r['date'] })
    let newLineChartData: ChartDataSets[] = []
    let newLineChartColors: Color[] = []
    
    query.fields.map(f => {
      let newCases = result.map( r => { return r[f] })  
      newLineChartData.push({
        data: newCases,
        label: this.fields[f],
        fill: false
      })
      newLineChartColors.push({
        backgroundColor: selectedColors[f].rgbCode,
        borderColor: selectedColors[f],
      })
    })
    return {
      lineChartData: newLineChartData,
      lineChartColors: newLineChartColors,
      lineChartLabels: newLabels,
      lineChartOptions: this.lineChartOptions,
      lineChartLegend: this.lineChartLegend,
      lineChartType: this.lineChartType,
      lineChartPlugins: this.lineChartPlugins,
      selectedColors,
      query
    }
  }

}
