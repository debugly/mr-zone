import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-urlcode',
    templateUrl: './urlcode.component.html',
    styleUrls: ['./urlcode.component.css']
})
export class UrlCodeComponent implements OnInit {

    title = 'URL 编解码';
    inputValue: string;
    outputValue: string;

    constructor() { }

    ngOnInit() {
    }

    makeURLDecode() {
        const v = this.inputValue;
        console.log(v);
        if (v) {
            this.outputValue = decodeURIComponent(v);
        } else {
            this.outputValue = '';
        }
    }

    makeURLEncode() {
        const v = this.inputValue;
        if (v) {
            this.outputValue = encodeURIComponent(v);
        } else {
            this.outputValue = '';
        }
    }

    makeURLExchange() {
        const v = this.inputValue;
        this.inputValue = this.outputValue;
        this.outputValue = v;
    }

    makeURLClear() {
        this.inputValue = '';
        this.outputValue = '';
    }
}
