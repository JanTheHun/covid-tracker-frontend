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

  getConstants() {
    return new Promise((resolve, reject) => {
      this.http.get(this.webApiURL.concat('/constants')).subscribe(result => {
        resolve(result)
      }, error => {
        console.log(error)
        reject(`error calling web API: ${error}`)
      })
    })
  }

  getLatestData(country: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.webApiURL.concat('/latest'), { country }).subscribe(result => {
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

  getDictionary(language: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.webApiURL.concat('/dictionary'), { language }).subscribe(result => {
        resolve(result)
      }, error => {
        console.log(error)
        reject(`error calling web API: ${error}`)
      })
    })
  }
}
