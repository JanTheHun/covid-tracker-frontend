import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedIndex: number = null

  constructor( ) { }

  switchToCharts() {
    this.selectedIndex = 1
  }
}
