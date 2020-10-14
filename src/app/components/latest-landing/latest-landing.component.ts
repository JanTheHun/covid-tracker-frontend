import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service'
import { QueryDto } from 'src/app/types/query-dto'
import { ProcessResultService } from 'src/app/services/process-result.service'
import { ChartDataObject } from 'src/app/types/chart-data'
import { ModalService } from 'src/app/services/modal.service'
import { DictionaryService } from 'src/app/services/dictionary.service'

@Component({
  selector: 'app-latest-landing',
  templateUrl: './latest-landing.component.html',
  styleUrls: ['./latest-landing.component.css']
})
export class LatestLandingComponent implements OnInit {

  @Output() newchartclick = new EventEmitter()

  processedChartData: ChartDataObject
  latestData: any

  dictionary

  constructor(
    private webApi: WebApiService,
    private processResult: ProcessResultService,
    private modalService: ModalService,
    private dictionaryService: DictionaryService
  ) {
    this.dictionary = dictionaryService.dictionary
    console.log(this.dictionary)
  }

  onNewChartClick() {
    this.newchartclick.emit()
  }

  onLangChange() {
    this.dictionaryService.setLanguage('en')
    console.log(this.dictionary)
  }

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
        if (result[0].success === false || result[1].success === false) {
          this.modalService.openErrorDialog('Kommunikációs hiba a szerverrel, próbálja újra kicsit később!')  
        } else {
          this.processedChartData = this.processResult.processResult(result[0], query, selectedColors )
          this.latestData = result[1]
        }

      })
      .catch(error => {
        this.modalService.openErrorDialog('Nem sikerült a legfrissebb adatok betöltése')
      })

  }

}
