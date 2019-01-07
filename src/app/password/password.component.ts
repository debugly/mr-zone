import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  useEn = true;
  english = 'abcdefghigklmnopqrstuvwxyz';

  useEN = true;
  ENGLISH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useNum = true;
  number = '0123456789';

  useSm = true;
  symbol = '-=#!$%*~';

  inputSm = '';
  inputLen: number;

  pwd = '';

  constructor() { }

  ngOnInit() {
  }

  generate(){

    this.pwd = "";
    
    const randomChar = function(str:string){
      if(!str || str.length == 0){
        return null;
      }
      const len = str.length;
      const r = Math.floor(Math.random()*len);
      return str.substr(r,1);
    }

    let str = '';
    const pwdArr = [];

    if(this.useEn){
      str += this.english;
      pwdArr.push(randomChar(this.english));
    }

    if(this.useEN){
      str += this.ENGLISH;
      pwdArr.push(randomChar(this.ENGLISH));
    }

    if(this.useNum){
      str += this.number;
      pwdArr.push(randomChar(this.number));
    }

    if(this.useSm){
      str += this.symbol;
      pwdArr.push(randomChar(this.symbol));
    }

    if(this.inputSm && this.inputSm.length > 0){
      str += this.inputSm;
      pwdArr.push(randomChar(this.inputSm));
    }

    if(str.length > 0){
      const arr = str.split("");
      // 每个输入项都包含，因此密码长度不能小于输入项长度
      if(this.inputLen >= pwdArr.length){
        const need = this.inputLen - pwdArr.length;
        for (let index = 0; index < need; index++) {
          const r = Math.floor(Math.random() * arr.length);
          const element = arr[r];
          pwdArr.push(element);
        }

        this.pwd = pwdArr.join("");
      }
    }
  }

}
