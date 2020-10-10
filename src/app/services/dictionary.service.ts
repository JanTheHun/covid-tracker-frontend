import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  DICTIONARY: any = {
    'en': {
      'new_chart': 'New chart'
    },
    'hu': {
      'new_chart': 'Új grafikon'
    }
  }

  selectedLang: string = 'hu'

  constructor() { }

  get dictionary() {
    return this.DICTIONARY[this.selectedLang]
  }

  setLanguage(lang: string) {
    this.selectedLang = lang
  }

}
