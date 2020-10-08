import { Component, OnInit } from '@angular/core';
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

  processedChartData: ChartDataObject
  latestData: any

  constructor(
    private webApi: WebApiService,
    private processResult: ProcessResultService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {

    const selectedFields = ['new_cases', 'new_cases_smoothed']
    const selectedColors: any = {
      'new_cases': '#00f',
      'new_cases_smoothed': '#f00'
    }
    const query: QueryDto = {
      to: new Date(),
      from: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7)),
      fields: selectedFields,
      countries: ["HUN"]
    }
    Promise.all([
      this.webApi.queryWebApi(query),
      this.webApi.getLatestData()
    ])
      .then((result: any[]) => {
        this.processedChartData = this.processResult.processResult(result[0], query, selectedColors )
        this.latestData = result[1]
      })
      .catch(error => {
        this.modalService.openErrorDialog('Nem sikerült a legfrissebb adatok betöltése')
      })

  }

}
