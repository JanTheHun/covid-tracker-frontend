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
        backgroundColor: selectedColors[f],
        borderColor: selectedColors[f],
        borderWidth: 1,
        pointRadius: 2
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

  processResultWithCountries(result: any[], query: any, queryFields: any[] ): ChartDataObject {
    // console.log(query)
    let newLabels: Label[] = Array.from(new Set(result.map( r => { return r['date'] })))
    let newLineChartData: ChartDataSets[] = []
    let newLineChartColors: Color[] = []
    
    let labelMode: string
    if (query.fields.length === 1 && query.countries.length > 1) {
      labelMode = 'singleField'
    } else if (query.fields.length > 1 && query.countries.length === 1) {
      labelMode = 'singleCountry'
    } else {
      labelMode = 'multiple'
    }
    labelMode = 'multiple'

    query.countries.forEach(country => {
      // console.log('country:', country)
      let newDataset = result.filter( r => { return r.iso_code === country })
      // console.log('new data set:', newDataset)
      let fields: any[] = queryFields.filter(q => { return q.country === country })

      fields.forEach(field => {
        let datasetToInsert: ChartDataSets[] = []
        // console.log('field:', field)
        let chartLabel: string
        if (labelMode === 'singleField') {
          chartLabel = country
        } else if (labelMode === 'singleCountry') {
          chartLabel = this.fields[field.field]
        } else {
          chartLabel = `${this.fields[field.field]}, ${country}`
        }
        console.log('label:', chartLabel)
        let chartDataSet = newDataset.map(d=> {return d[field.field]})
        datasetToInsert.push({
          data: chartDataSet,
          label: chartLabel,
          fill: false
        })
        console.log('inserted:', datasetToInsert)
        newLineChartColors.push({
          backgroundColor: field.color,
          borderColor: field.color,
          borderWidth: 1,
          pointRadius: 2
        })
        newLineChartData = newLineChartData.concat(datasetToInsert)
      })
    })

    console.log('line chart data:', newLineChartData)

    let returnObj = {
      lineChartData: newLineChartData,
      lineChartColors: newLineChartColors,
      lineChartLabels: newLabels,
      lineChartOptions: this.lineChartOptions,
      lineChartLegend: this.lineChartLegend,
      lineChartType: this.lineChartType,
      lineChartPlugins: this.lineChartPlugins,
      query, 
      queryFields: Object.assign([], queryFields)
    }
    console.log('return:', returnObj)
    return  returnObj
  }

}
