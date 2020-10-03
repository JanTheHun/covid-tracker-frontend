import { Component, OnInit, ViewChild } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service'
import { ProcessResultService } from 'src/app/services/process-result.service'
import { QueryDto } from 'src/app/types/query-dto'

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MatDrawer } from '@angular/material/sidenav'

@Component({
  selector: 'app-graph-manager',
  templateUrl: './graph-manager.component.html',
  styleUrls: ['./graph-manager.component.css']
})
export class GraphManagerComponent {

  @ViewChild('drawer') drawerRef: MatDrawer

  selectedGridId: string = null
  selectedColumnNumber: string = '1'
  graphs: any[] = []

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
  title = 'covid-frontend'

  selectedFields: string[] = ['new_cases']

  // fieldNames: string[] = []

  lineChartData: ChartDataSets[] = []
  lineChartLabels: Label[] = []
  lineChartColors: Color[] = []

  lineChartOptions: ChartOptions = {
    responsive: true
  }


  lineChartLegend = true
  lineChartPlugins = []
  lineChartType = 'line'

  fromDate: Date
  toDate: Date

  mouseHoverMap: any = {}

  constructor(
    private webApi: WebApiService,
    private processResult: ProcessResultService
  ) {
    this.toDate = new Date()
    this.fromDate = new Date(this.toDate.getTime() - (1000 * 60 * 60 * 24 * 30))
  }

  get gridColumns() {
    return Number(this.selectedColumnNumber)
  }

  get fieldNames() {
    return Object.keys(this.fields)
  }

  onMouseStatus(index: number, status: boolean) {
    this.mouseHoverMap[index] = status
  }

  onGridClick(gridId: string) {
    this.selectedGridId = gridId
    this.drawerRef.open()
  }

  onDateChange(event: any, field: string) {
    if (field === 'from') {
      this.fromDate = new Date(event.value)
    }

    if (field === 'to') {
      this.toDate = new Date(event.value)
    }
  }

  onEditGraph(index: number) {
    console.log(index)
  }

  onDeleteGraph(index: number) {
    let newGraphs = Object.assign([], this.graphs)
    newGraphs.splice(index, 1)
    this.graphs = newGraphs
  }

  onGoClick() {
    let selectedFields = Object.assign([], this.selectedFields)
    let query: QueryDto = {
      from: this.fromDate ? this.fromDate : "2020-03-01",
      to: this.toDate ? this.toDate : new Date(),
      fields: selectedFields,
      countries: ["HUN"]
    }
    this.webApi.queryWebApi(query)
    .then((result: any[]) => {
      let processed = this.processResult.processResult(result, selectedFields)
      let newGraphs = Object.assign([], this.graphs)
      newGraphs.push(processed)
      this.graphs = newGraphs
      this.drawerRef.close()
    })
    .catch(error => {
      console.log('ERROR:', error)
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.drawerRef.open()
    }, 0)    
  }

}
