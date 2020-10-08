import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueryDto } from 'src/app/types/query-dto'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  webApiURL: string

  constructor(
    private http: HttpClient
  ) {
    this.webApiURL = environment.webApiURL
  }

  getLatestData() {
    return new Promise((resolve, reject) => {
      this.http.get(this.webApiURL.concat('/latest')).subscribe(result => {
        resolve(result)
      }, error => {
        console.log(error)
        reject(`error calling web API: ${error}`)
      })
    })
  }

  queryWebApi(queryObj: QueryDto) {
    return new Promise((resolve, reject) => {
      this.http.post(this.webApiURL.concat('/query'), queryObj).subscribe(result => {
        resolve(result)
      }, error => {
        console.log(error)
        reject(`error calling web API: ${error}`)
      })
    })
  }
}
