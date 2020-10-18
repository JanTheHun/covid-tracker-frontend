import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service'
import { QueryDto } from 'src/app/types/query-dto'
import { ProcessResultService } from 'src/app/services/process-result.service'
import { ChartDataObject } from 'src/app/types/chart-data'
import { ModalService } from 'src/app/services/modal.service'

@Component({
  selector: 'app-latest-landing',
  templateUrl: './latest-landing.component.html',
  styleUrls: ['./latest-landing.component.css']
})
export class LatestLandingComponent implements OnInit {

  @Input('constants') 
  set setConstants(data: any) {
    if (data) {
      this.countries = data.countries
    }
  }

  @Input('defaultCountry')
  set setDefaultCountry(data: string) {
    if (data) {
      this.selectedCountry = data
      this.getLatestData()
    }
  }

  @Output() newchartclick = new EventEmitter()

  processedChartData: ChartDataObject
  latestData: any = null

  selectedCountry: string = null

  countries: string[] = []

  constructor(
    private webApi: WebApiService,
    private processResult: ProcessResultService,
    private modalService: ModalService
  ) {
  }

  onNewChartClick() {
    this.newchartclick.emit()
  }

  getLatestData() {

    const queryFields: any[] = [
      {
        field: 'new_cases',
        country: this.selectedCountry,
        color: '#0ff'
      },
      {
        field: 'new_cases_smoothed',
        country: this.selectedCountry,
        color: '#f00'
      }
    ]
    const selectedFields = queryFields.map(q => { return q.field })
    const query: QueryDto = {
      to: new Date(),
      from: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7)),
      fields: queryFields.map(q => { return q.field }),
      countries: [this.selectedCountry]
    }
    Promise.all([
      this.webApi.queryWebApi(query),
      this.webApi.getLatestData(this.selectedCountry)
    ])
      .then((result: any[]) => {
        if (result[0].success === false || result[1].success === false) {
          this.modalService.openErrorDialog('Kommunikációs hiba a szerverrel, próbálja újra kicsit később!')  
        } else {
          // this.processedChartData = this.processResult.processResult(result[0], query, selectedColors )
          this.processedChartData = this.processResult.processResultWithCountries(result[0], query, queryFields )
          this.latestData = result[1]
        }

      })
      .catch(error => {
        this.modalService.openErrorDialog('Nem sikerült a legfrissebb adatok betöltése')
      })
  }

  ngOnInit(): void {}

}
