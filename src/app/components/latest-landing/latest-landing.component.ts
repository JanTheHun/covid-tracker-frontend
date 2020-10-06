import { Component, OnInit } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service'
import { QueryDto } from 'src/app/types/query-dto'
import { ProcessResultService } from 'src/app/services/process-result.service'
import { ChartDataObject } from 'src/app/types/chart-data'

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
    private processResult: ProcessResultService
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
    this.webApi.queryWebApi(query)
      .then((result: any[]) => {
        this.processedChartData = this.processResult.processResult(result, query, selectedColors )
      })
      .catch(error => {
        console.log('ERROR:', error)
      })
    this.webApi.getLatestData()
      .then((result: any[]) => {
        // console.log(result)
        this.latestData = result
      })
      .catch(error => {
        console.log('ERROR:', error)
      })
  }

}
