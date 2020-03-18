import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public images = [
    {
      src: './assets/images/kitten.jpg',
    },
    {
      src: './assets/images/kitten2.jpg',
    },
    {
      src: './assets/images/kitten3.jpg',
    },
    {
      src: './assets/images/kitten4.jpg',
    },
    {
      src: './assets/images/kitten5.jpg',
    }
  ];
}
