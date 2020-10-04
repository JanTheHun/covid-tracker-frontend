import { Component, OnInit, ViewChild } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service'
import { ProcessResultService } from 'src/app/services/process-result.service'
import { QueryDto } from 'src/app/types/query-dto'
import { FIELDS } from 'src/app/constants/fields'
import { COLORS } from 'src/app/constants/colors'
import { ChartDataObject } from 'src/app/types/chart-data'

import { MatDrawer } from '@angular/material/sidenav'
import { MatExpansionPanel } from '@angular/material/expansion'

@Component({
  selector: 'app-graph-manager',
  templateUrl: './graph-manager.component.html',
  styleUrls: ['./graph-manager.component.css']
})
export class GraphManagerComponent {

  title = 'covid-frontend'

  @ViewChild('drawer') drawerRef: MatDrawer
  @ViewChild('fieldsSelectionList') fieldsSelectionListRef: MatExpansionPanel
  @ViewChild('dateSelection') dateSelectionRef: MatExpansionPanel

  selectedGridId: string = null
  selectedColumnNumber: string = '1'
  graphs: ChartDataObject[] = []
  
  selectedFields: string[] = []
  selectedColors: any = {}
  
  fromDate: Date
  toDate: Date
  
  mouseHoverMap: any = {}
  
  fields: any[]
  colors: any[]

  constructor(
    private webApi: WebApiService,
    private processResult: ProcessResultService
  ) {
    this.fields = FIELDS
    this.colors = COLORS
  }

  get gridColumns() {
    return Number(this.selectedColumnNumber)
  }

  get fieldNames() {
    return Object.keys(this.fields)
  }

  onSelectionChange(ev: any) {
    this.selectedFields = Object.assign([], ev.source['_value'])
    this.selectedFields.forEach(f => {
      if (!this.selectedColors.hasOwnProperty(f)) {
        let selectedColor = Object.assign({}, this.colors[0])
        this.selectedColors[f] = selectedColor.rgbCode
      }
    })
  }

  getFieldName(field: string) {
    return this.fields[field]
  }

  onMouseStatus(index: number, status: boolean) {
    this.mouseHoverMap[index] = status
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
    const graphData = this.graphs[index]
    console.log(graphData)
    this.selectedFields = graphData.query.fields
    this.selectedColors = graphData.selectedColors
    this.fromDate = graphData.query.from
    this.toDate = graphData.query.to
    this.fieldsSelectionListRef.close()
    this.dateSelectionRef.open()
    this.drawerRef.open()
  }

  onDeleteGraph(index: number) {
    let newGraphs = Object.assign([], this.graphs)
    newGraphs.splice(index, 1)
    this.graphs = newGraphs
  }

  onNewChartClick() {
    this.drawerRef.open()
  }

  resetForm() {
    this.selectedFields = []
    this.selectedColors = {}
    this.fromDate = null
    this.toDate = null
    this.fieldsSelectionListRef.close()
    this.dateSelectionRef.open()
  }

  onDeleteForm() {
    this.resetForm()
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
      let processed: ChartDataObject = this.processResult.processResult(result, query, this.selectedColors )
      let newGraphs = Object.assign([], this.graphs)
      newGraphs.push(processed)
      this.graphs = newGraphs
      this.resetForm()
      this.drawerRef.close()
    })
    .catch(error => {
      console.log('ERROR:', error)
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.drawerRef.open()
      this.dateSelectionRef.open()
    }, 0)    
  }

}
