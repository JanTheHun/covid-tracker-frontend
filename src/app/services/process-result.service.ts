import { Injectable } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class ProcessResultService {

  fields: any = {
    "total_cases": "Összes eset",
    "new_cases": "Új esetek",
    "new_cases_smoothed": "Új esetek (mozgóátlag)",
    "total_deaths": "Összes haláleset",
    "new_deaths": "Új halálesetek",
    "new_deaths_smoothed": "Új halálesetek (mozgóátlag)",
    "total_cases_per_million": "Összes eset 1 millió lakosra",
    "new_cases_per_million": "Új esetek 1 millió lakosra",
    "new_cases_smoothed_per_million": "Új esetek (mozgóátlag) 1 millió lakosra",
    "total_deaths_per_million": "Összes haláleset 1 millió lakosra",
    "new_deaths_per_million": "Új halálesetek 1 millió lakosra",
    "new_deaths_smoothed_per_million": "Új halálesetek (mozgóátlag) 1 millió lakosra",
    "total_tests": "Összes teszt",
    "new_tests": "Új tesztek",
    "new_tests_smoothed": "Új tesztek (mozgóátlag)",
    "total_tests_per_thousand": "Összes teszt ezer lakosra",
    "new_tests_per_thousand": "Új tesztek ezer lakosra",
    "new_tests_smoothed_per_thousand": "Új tesztek (moozgóátlag) ezer lakosra",
    "tests_per_case": "Egy pozitív esetre jutó tesztek száma",
    "positive_rate": "Pozitív tesztek aránya",
    "tests_units": "Tesztelő egységek",
  }

  lineChartOptions: ChartOptions = {
    responsive: true
  }
  lineChartLegend = true
  lineChartType = 'line'
  lineChartPlugins: any[] = []

  constructor() { }

  processResult(result: any[], selectedFields: string[]) {

    let newLabels: Label[] = result.map( r => { return r['date'] })
    let newLineChartData: ChartDataSets[] = []
    let newLineChartColors: Color[] = []
    
    selectedFields.map(f => {
      let newCases = result.map( r => { return r[f] })  
      newLineChartData.push({
        data: newCases,
        label: this.fields[f],
        fill: false
      })
      // newLineChartColors.push({
      //   backgroundColor: '#ff0'
      // })
    })
    return {
      lineChartData: newLineChartData,
      lineChartColors: newLineChartColors,
      lineChartLabels: newLabels,
      lineChartOptions: this.lineChartOptions,
      lineChartLegend: this.lineChartLegend,
      lineChartType: this.lineChartType,
      lineChartPlugins: this.lineChartPlugins
    }
  }

}
