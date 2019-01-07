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

  confusingSymbols = '';
  confusingSymbolArr = ['I','l','0','O'];
  exceptConfusingSymbols = true;

  inputSm = '';
  inputLen: number;

  pwd = '';
  error = '';

  constructor() { }

  ngOnInit() {
    this.confusingSymbols = this.confusingSymbolArr.join(',');
  }

  generate(){

    this.pwd = "";
    this.error = "";

    const arrayIncludeArray = function(a:Array<string>,b:Array<string>){
      if (a === b) return true;
      if (a == null || b == null) return false;
      
      for (let i = 0; i < b.length; ++i) {
        if (!a.includes(b[i])){
          return false;
        }
      }

      return true;
    }

    const randomCharWithString = function(str:string){
      if(!str || str.length == 0){
        return null;
      }
      const len = str.length;
      const r = Math.floor(Math.random()*len);
      const c = str.substr(r,1);
      return c;
    }

    const randomCharExceptConfused = function(cArr:Array<string>,str:string){
      const arr = str.split("");
      if(arrayIncludeArray(cArr,arr)){
        return null;
      }
      let c = null;
      do {
        const r = randomCharWithString(str);
        c = arr[r]; 
      } while (cArr.includes(c));

      if (c == '0'){
        console.log('fuck!');
      }
      return c;
    } 
    let myConfusingArr = [];
    if(this.exceptConfusingSymbols){
      myConfusingArr = this.confusingSymbolArr;
    }

    let str = '';
    const pwdArr = [];

    if(this.useEn){
      str += this.english;
      const c = randomCharExceptConfused(myConfusingArr,this.english);
      if(c){
        pwdArr.push(c);
      }
    }

    if(this.useEN){
      str += this.ENGLISH;
      const c = randomCharExceptConfused(myConfusingArr,this.ENGLISH);
      if(c){
        pwdArr.push(c);
      }
    }

    if(this.useNum){
      str += this.number;
      const c = randomCharExceptConfused(myConfusingArr,this.number);
      if(c){
        pwdArr.push(c);
      }
    }

    if(this.useSm){
      str += this.symbol;
      const c = randomCharExceptConfused(myConfusingArr,this.symbol);
      if(c){
        pwdArr.push(c);
      }
    }

    if(this.inputSm && this.inputSm.length > 0){
      str += this.inputSm;
      const c = randomCharExceptConfused(myConfusingArr,this.inputSm);
      if(c){
        pwdArr.push(c);
      }
    }

    if(str.length > 0){
      const arr = str.split("");
      // 每个输入项都包含，因此密码长度不能小于输入项长度
      if(this.inputLen >= pwdArr.length){
        const need = this.inputLen - pwdArr.length;

        if(arrayIncludeArray(myConfusingArr,arr)){
            this.error = '生成密码的符号都是易混淆符号！';
            return;
        }

        for (let index = 0; index < need; index++) {
          let element = null;
          do {
            const r = Math.floor(Math.random() * arr.length);
            element = arr[r];
          } while (myConfusingArr.includes(element));
          pwdArr.push(element);
        }

        this.pwd = pwdArr.join("");
      }
    }
  }

}
