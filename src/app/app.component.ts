import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  constructor() {
  }

    public clickedEvent: Event;

  childEventClicked(event: Event) {
    this.clickedEvent = event;
  }
}
