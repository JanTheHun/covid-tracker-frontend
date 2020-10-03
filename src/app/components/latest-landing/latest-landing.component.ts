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

  constructor(
    private webApi: WebApiService,
    private processResult: ProcessResultService
  ) { }

  ngOnInit(): void {

    const selectedFields = ['new_cases', 'new_cases_smoothed']
    const query: QueryDto = {
      to: new Date(),
      from: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7)),
      fields: selectedFields,
      countries: ["HUN"]
    }
    this.webApi.queryWebApi(query)
      .then((result: any[]) => {
        console.log(result)
        this.processedChartData = this.processResult.processResult(result, selectedFields)
      })
      .catch(error => {
        console.log('ERROR:', error)
      })
  }

}
