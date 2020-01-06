import React, { Component } from 'react';

export class Password extends Component {

    constructor(props){
        super(props);
        this.english = 'abcdefghigklmnopqrstuvwxyz';
        this.ENGLISH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.NUMBER = '0123456789';
        this.SYMBOL = '-=#!$%*~';
        this.confusingSymbolArr = ['I','l','0','O'];

        this.confusingSymbols = this.confusingSymbolArr.join(',');
        this.state = {
            useEn : true,
            useEN : true,
            useNum : true,
            useSm : true,
            exceptConfusingSymbols : true,
            inputSm : '',
            inputLen: 0,
            pwd : '',
            error : null
        };

        this.onInputSmChanged = this.onInputSmChanged.bind(this);
        this.onInputLenChanged = this.onInputLenChanged.bind(this);
        this.generate = this.generate.bind(this);
    }

    onInputSmChanged(event) {
        const value = event.target.value;
        this.setState({inputSm: value});
        this.generate();
    }

    onInputLenChanged(event) {
        const value = event.target.value;
        this.setState({inputLen: value});
        this.generate();
    }

    generate(){

        this.setState({
            pwd:'',
            error:null
        });
    
        const arrayIncludeArray = function(a,b){
          if (a === b) return true;
          if (a == null || b == null) return false;
          
          for (let i = 0; i < b.length; ++i) {
            if (!a.includes(b[i])){
              return false;
            }
          }
    
          return true;
        }

        const randomCharWithString = function(str){
          if(!str || str.length == 0){
            return null;
          }
          const len = str.length;
          const r = Math.floor(Math.random()*len);
          const c = str.substr(r,1);
          return c;
        }
    
        const randomCharExceptConfused = function(cArr,str){
          const arr = str.split("");
          if(arrayIncludeArray(cArr,arr)){
            return null;
          }
          let c = null;
          do {
            const r = randomCharWithString(str);
            c = arr[r]; 
          } while (cArr.includes(c));
    
          return c;
        } 
        let myConfusingArr = [];
        if(this.exceptConfusingSymbols){
          myConfusingArr = this.confusingSymbolArr;
        }
    
        let str = '';
        const pwdArr = [];
        if(this.state.useEn){
          str += this.english;
          const c = randomCharExceptConfused(myConfusingArr,this.english);
          if(c){
            pwdArr.push(c);
          }
        }
        
        if(this.state.useEN){
          str += this.ENGLISH;
          const c = randomCharExceptConfused(myConfusingArr,this.ENGLISH);
          if(c){
            pwdArr.push(c);
          }
        }
    
        if(this.state.useNum){
          str += this.NUMBER;
          const c = randomCharExceptConfused(myConfusingArr,this.NUMBER);
          if(c){
            pwdArr.push(c);
          }
        }
    
        if(this.state.useSm){
          str += this.SYMBOL;
          const c = randomCharExceptConfused(myConfusingArr,this.SYMBOL);
          if(c){
            pwdArr.push(c);
          }
        }
    
        if(this.state.inputSm && this.state.inputSm.length > 0){
          str += this.state.inputSm;
          const c = randomCharExceptConfused(myConfusingArr,this.state.inputSm);
          if(c){
            pwdArr.push(c);
          }
        }
    
        if(str.length > 0){
          const arr = str.split("");
          // 每个输入项都包含，因此密码长度不能小于输入项长度
          if(this.state.inputLen >= pwdArr.length){
            const need = this.state.inputLen - pwdArr.length;
    
            if(arrayIncludeArray(myConfusingArr,arr)){
                this.setState({error : '生成密码的符号都是易混淆符号！'});
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
            
            this.setState({
                pwd:pwdArr.join(""),
                error:null
            });

          }
        }
    }

    render() {
        return (
            <div>
                <div className="item">
                    <label>
                        <input type='checkbox' onChange= { (e) => {
                            this.setState({
                                useEn:e.target.checked
                            },() => {
                                this.generate();
                            });
                        } } checked={this.state.useEn} />
                        小写英文:{this.english}
                    </label>
                </div>

                <div className="item">
                    <label>
                        <input type='checkbox' onChange= { (e) => {
                            
                            this.setState({
                                useEN:e.target.checked
                            },() => {
                                this.generate();
                            });
                        } } checked={this.state.useEN} />
                        大写英文:{this.ENGLISH}
                    </label>
                </div>

                <div className="item">
                    <label>
                        <input type='checkbox' onChange= {  (e) => {
                            this.setState({
                                useNum:e.target.checked
                            },() => {
                                this.generate();
                            });
                        }  } checked={this.state.useNum} />
                        数字:{this.NUMBER}
                    </label>
                </div>

                <div className="item">
                    <label>
                        <input type='checkbox' onChange= { (e) => {
                            this.setState({
                                useSm:e.target.checked
                            },() => {
                                this.generate();
                            });
                        }  } checked={this.state.useSm} />
                        符号:{this.SYMBOL}
                    </label>
                </div>

                <div className="item">
                    <label>
                        <input type='checkbox' onChange= { (e) => {
                            this.setState({
                                exceptConfusingSymbols:e.target.checked
                            },() => {
                                this.generate();
                            });
                        }  } checked={this.state.exceptConfusingSymbols} />
                        排除容易混淆符号:{this.confusingSymbols}
                    </label>
                </div>

                <div className="item">
                    <textarea rows="2" placeholder="添加额外自定义符号..." value={this.state.inputSm} onChange={ (e) => {
                            this.setState({
                                inputSm:e.target.value
                            },() => {
                                this.generate();
                            });
                        } } ></textarea>
                </div>

                <h3>生成密码</h3>

                <div className="item">
                    <textarea rows="1" placeholder="输入密码长度..."  defaultValue='' onChange={ (e) => {
                            this.setState({
                                inputLen:e.target.value
                            },() => {
                                this.generate();
                            });
                        } } ></textarea>
                </div>
                
                <div className="item">
                    <span>
                        { this.state.pwd }
                    </span>
                    <span className="error">{this.state.error}</span>
                </div>

            </div>
        );
    }
}

export default Password;
