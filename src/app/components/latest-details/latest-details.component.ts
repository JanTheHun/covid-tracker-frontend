import { Component, OnInit, Input } from '@angular/core';
import { FIELDS } from 'src/app/constants/fields'

@Component({
  selector: 'app-latest-details',
  templateUrl: './latest-details.component.html',
  styleUrls: ['./latest-details.component.css']
})
export class LatestDetailsComponent implements OnInit {

  detailsToShow: string[] = [
    'new_cases',
    'new_cases_smoothed',
    'new_deaths',
    'new_deaths_smoothed',
    'total_cases',
    'total_deaths',
  ]

  fields: any[]
  data: any = null

  @Input('details')
  set setDetails(data: any) {
    if (data && data.length) {
      this.data = data[0]
      console.log(this.data)
    }
  }

  constructor(
  ) {
    this.fields = FIELDS
  }

  ngOnInit(): void {
  }

}
