import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor() {}
  x = 5;

  ngOnInit() {
    console.log('not empty ngoninit');
  }

  someMethod() {
    if (this.x >= 5) {
      console.log('hi');
    }
  }
}
