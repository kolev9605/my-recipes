import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  x = 5;

  ngOnInit(): void {
    console.log('not empty ngoninit');
  }
}
