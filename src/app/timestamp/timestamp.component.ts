import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timestamp',
  templateUrl: './timestamp.component.html',
  styleUrls: ['./timestamp.component.css']
})
export class TimeStampComponent implements OnInit {

  title = '时间戳';
  currentDate: string;
  timestamp: string;

  constructor() { }

  ngOnInit() {
    this.initTimeStamp();
    const self = this;
    setInterval(function () {
      self.initTimeStamp();
    }, 1000);
  }

  initTimeStamp() {
    this.currentDate = new Date().toString();
    this.timestamp = '' + Math.round((new Date()).getTime() / 1000);
  }

}
