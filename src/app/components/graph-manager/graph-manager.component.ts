import { Component, OnInit, ViewChild } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service'
import { ProcessResultService } from 'src/app/services/process-result.service'
import { QueryDto } from 'src/app/types/query-dto'
import { FIELDS } from 'src/app/constants/fields'
import { COLORS } from 'src/app/constants/colors'
import { COUNTRIES } from 'src/app/constants/countries'
import { ChartDataObject } from 'src/app/types/chart-data'
import { ModalService } from 'src/app/services/modal.service'

import { MatDrawer } from '@angular/material/sidenav'
import { MatExpansionPanel } from '@angular/material/expansion'

@Component({
  selector: 'app-graph-manager',
  templateUrl: './graph-manager.component.html',
  styleUrls: ['./graph-manager.component.css']
})
export class GraphManagerComponent {

  title = 'CovidTracker'

  @ViewChild('drawer') drawerRef: MatDrawer
  @ViewChild('detailsSelectionPanel') fieldsSelectionListRef: MatExpansionPanel
  @ViewChild('dateSelection') dateSelectionRef: MatExpansionPanel

  selectedGridId: string = null
  selectedColumnNumber: string = '1'
  singleColumnWidth: number = 100
  graphs: ChartDataObject[] = []
  
  selectedFields: string[] = []
  selectedColors: any = {}
  
  selectedCountry: string = null
  selectedFieldName: string = null
  selectedColor: string = null

  queryFields: any[] = []
  
  fromDate: Date
  toDate: Date
  
  mouseHoverMap: any = {}
  
  fields: any[]
  colors: any[]
  countries: any[] = []

  constructor(
    private webApi: WebApiService,
    private processResult: ProcessResultService,
    private modalService: ModalService
  ) {
    this.fields = FIELDS
    this.colors = COLORS
    this.countries = COUNTRIES
    this.selectedCountry = this.countries[0]
  }

  get gridColumns() {
    return Number(this.selectedColumnNumber)
  }

  get fieldNames() {
    return Object.keys(this.fields)
  }

  get rowHeightString() {
    let rowHeightRatio = this.selectedColumnNumber === '1' ? Math.pow((100 / this.singleColumnWidth), 1.5) + 1 : 2
    return `${rowHeightRatio}:1`
  }

  get formInValid() {
    return (this.queryFields.length === 0)
  }

  allocateColorToFields() {
    for(let field of this.selectedFields) {
      if (!this.selectedColors[field]) {
        let unusedColors = this.colors.filter(c => {
          return Object.values(this.selectedColors).indexOf(c) === -1
        })
        if (unusedColors.length) {
          this.selectedColors[field] = unusedColors[0]
        } else {
          this.selectedColors[field] = this.colors[0]
        }
      }
    }
  }

  onSelectionChange(ev: any) {
    this.selectedFields = Object.assign([], ev.source['_value'])
    this.allocateColorToFields()
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
    const graphData = Object.assign([], this.graphs[index])
    console.log(graphData)
    this.queryFields = Object.assign([], graphData.queryFields)
    this.fromDate = graphData.query.from
    this.toDate = graphData.query.to
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
    this.queryFields = []
    this.selectedFieldName = ''
    this.selectedCountry = this.countries[0]
    this.selectedColor = ''
    this.fromDate = null
    this.toDate = null
    this.fieldsSelectionListRef.close()
    this.dateSelectionRef.close()
  }

  onDeleteDetailClick(index: number) {
    console.log(index)
    const newQueryFields = Object.assign([], this.queryFields)
    newQueryFields.splice(index, 1)
    this.queryFields = newQueryFields
  }

  onDeleteForm() {
    this.resetForm()
  }

  onAddDetailsClick() {
    console.log(this.selectedFieldName)
    console.log(this.selectedCountry)
    console.log(this.selectedColor)

    let newField = {
      field: this.selectedFieldName,
      country: this.selectedCountry,
      color: this.selectedColor
    }
    this.queryFields.push(newField)
  }

  onGoClick() {

    const currentQueryFields = Object.assign([], this.queryFields)

    let selectedFields: string[] = Array.from(new Set(currentQueryFields.map(q=> { return q.field })))
    let selectedCountries: string[] = Array.from(new Set(currentQueryFields.map(q=> { return q.country })))
    console.log('saved queryFields:', this.queryFields)
    let query: QueryDto = {
      from: this.fromDate ? this.fromDate : "2020-03-01",
      to: this.toDate ? this.toDate : new Date(),
      fields: selectedFields,
      countries: selectedCountries
    }
    console.log('graphs 1: ', this.graphs)
    this.webApi.queryWebApi(query)
    .then((result: any | { success: boolean }) => {
      if (result.success === false) {
        this.modalService.openErrorDialog('Kommunikációs hiba a szerverrel, próbálja újra kicsit később!')
      } else {
        let processed: ChartDataObject = this.processResult.processResultWithCountries(result, query, currentQueryFields )
        console.log('processed: ', processed)
        let newGraphs = Object.assign([], this.graphs)
        newGraphs.push(processed)
        this.graphs = newGraphs
        console.log('graphs 2: ', this.graphs)
        this.resetForm()
        this.drawerRef.close()
      }
    })
    .catch(error => {
      console.log('ERROR:', error)
      this.modalService.openErrorDialog('Nem sikerült a grafikon adatainak betöltése')
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.drawerRef.open()
      // this.dateSelectionRef.open()
    }, 0)    
  }

}
