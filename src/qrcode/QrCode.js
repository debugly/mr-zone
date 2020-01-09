import React, { Component } from 'react';

export class QrCode extends Component {

    constructor(props){
        super(props);
        this.state = {
            inputValue : ""
        };
    
        this.onInputValueChanged = this.onInputValueChanged.bind(this);
        this.saveRQImage = this.saveRQImage.bind(this);
    }

    onInputValueChanged(event) {
        const value = event.target.value;
        this.setState({inputValue: value});

        const size = 240;

        const c = document.getElementById('mr-qr');
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
        const myCanvas = document.getElementById('mr-qr');
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
        const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;

        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
    }

    myCanvas() {
        var e = null;

        if(this.state.inputValue.length > 0) {
            e = (<div>
                <br/>
                <button onClick={ this.saveRQImage }>下载二维码</button>
            </div>);
        }
        return e;
    }

    render() {

        let e = this.myCanvas();
        return (
            <div>
                <textarea rows="2" placeholder="请输入..." ref="newText" value={this.state.inputValue} onChange={ this.onInputValueChanged } ></textarea>
                <canvas id="mr-qr" height="20" width="20"></canvas>
                {e}
            </div>
        );
    }
}

export default QrCode;
