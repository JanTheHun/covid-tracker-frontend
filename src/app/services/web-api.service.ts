import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueryDto } from 'src/app/types/query-dto'

const webApiURL = "http://localhost:9000"

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(
    private http: HttpClient
  ) { }

  getLatestData() {
    return new Promise((resolve, reject) => {
      this.http.get(webApiURL.concat('/latest')).subscribe(result => {
        resolve(result)
      }, error => {
        reject(`error calling web API: ${error}`)
      })
    })
  }

  queryWebApi(queryObj: QueryDto) {
    return new Promise((resolve, reject) => {
      this.http.post(webApiURL.concat('/query'), queryObj).subscribe(result => {
        resolve(result)
      }, error => {
        reject(`error calling web API: ${error}`)
      })
    })
  }
}
