import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})

export class QrCodeComponent implements OnInit {

  title = '生成二维码';
  inputValue: string;

  constructor() { }

  ngOnInit() {
  }

  dataChanged() {
    const size = 240;
    const value = this.inputValue;

    const c = document.getElementById('mr-qr') as HTMLCanvasElement;
    if (!c) {
        console.assert(false, 'can\'t find canvas!');
    }
    if (!value || value.length === 0) {

      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, size, size);

    } else {
      const QRious = require('qrious');
      const qr = new QRious({element: c});
      qr.set({
        value: value,
        size: size
      });
    }
  }

  saveRQImage() {
    const myCanvas = document.getElementById('mr-qr') as HTMLCanvasElement;
    const image = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    // window.location.href = image; // it will save locally
    this.saveFile(image, '二维码' + (new Date()).getTime() + '.png');
  }

  /**
   * 在本地进行文件保存
   * @param  {String} data     要保存到本地的图片数据
   * @param  {String} filename 文件名
   */
  saveFile(data, filename) {

    const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as HTMLAnchorElement;
    save_link.href = data;
    save_link.download = filename;

    const event = document.createEvent('MouseEvents') as MouseEvent;
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
  }
}
