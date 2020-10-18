import { Component } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedIndex: number = null
  selectedLanguage: string = 'hu'
  selectedCountry: string = null

  constants: any = null
  countries: any[] = []

  constructor(
    private webApi: WebApiService
  ) { }

  // getBrowserLocales(options = {}) {
  //   const defaultOptions = {
  //     languageCodeOnly: false,
  //   };
  
  //   const opt = {
  //     ...defaultOptions,
  //     ...options,
  //   };
  
  //   const browserLocales =
  //     navigator.languages === undefined
  //       ? [navigator.language]
  //       : navigator.languages;
  
  //   if (!browserLocales) {
  //     return undefined;
  //   }
  
  //   return browserLocales.map(locale => {
  //     const trimmedLocale = locale.trim();
  
  //     return opt.languageCodeOnly
  //       ? trimmedLocale.split(/-|_/)[0]
  //       : trimmedLocale;
  //   });
  // }

  switchToCharts() {
    this.selectedIndex = 1
  }
  
  async ngOnInit() {
    // console.log(this.getBrowserLocales())
    try {

      let constants: any = await this.webApi.getConstants()
      console.log(constants)
      this.constants = constants
      this.countries = constants.countries
      if (this.constants.selectedCountry) {
        this.selectedCountry = this.constants.selectedCountry
      } else {
        this.selectedCountry = 'HUN'
      }

      let dictionary = await this.webApi.getDictionary(this.selectedLanguage)
      console.log(dictionary)

    } catch(err) {

    }
  }
}
