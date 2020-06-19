import React, { Component } from 'react';

export class Password extends Component {

    constructor(props){
        super(props);
        this.english = 'abcdefghigklmnopqrstuvwxyz';
        this.ENGLISH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.NUMBER  = '0123456789';
        this.SYMBOL  = '~!@#$%^&*()_+-=[]{}/?<>';
        this.confusingSymbolArr = ['I','l','0','o','O'];

        this.confusingSymbols = this.confusingSymbolArr.join(',');
        this.state = {
            useEn  : true,
            useEN  : true,
            useNum : true,
            useSm  : true,
            exceptConfusingSymbols : true,
            inputSm: '',
            inputLen: 0,
            pwd   : '',
            error : null
        };

        this.onInputSmChanged  = this.onInputSmChanged.bind(this);
        this.onInputLenChanged = this.onInputLenChanged.bind(this);
        this.generate          = this.generate.bind(this);
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
    
        const arrayIncludeArray = (a,b) => {
          if (a === b) return true;
          if (a == null || b == null) return false;
          
          for (let i = 0; i < b.length; ++i) {
            if (!a.includes(b[i])){
              return false;
            }
          }
          return true;
        }

        const randomElementInArray = (arr) => {
          const i = Math.floor(Math.random() * arr.length);
          let element = arr[i];
          return element;
        }
    
        const randomCharExceptConfused = (cArr,str) => {
          const arr = str.split("");
          
          if(arrayIncludeArray(cArr,arr)){
            return null;
          }

          let c = null;
          do {
            c = randomElementInArray(arr);
          } while (cArr.includes(c));
          
          return c;
        }

        let myConfusingArr = [];
        if(this.state.exceptConfusingSymbols){
          myConfusingArr = this.confusingSymbolArr;
        }
    
        let charArr = [];
        
        if(this.state.useEn){
          charArr.push(this.english);
        }
        
        if(this.state.useEN){
          charArr.push(this.ENGLISH);
        }
    
        if(this.state.useNum){
          charArr.push(this.NUMBER);
        }
    
        if(this.state.useSm){
          charArr.push(this.SYMBOL);
        }
        
        if(this.state.inputSm && this.state.inputSm.length > 0){
          charArr.push(this.state.inputSm);
        }
        
        const charLen = charArr.length;
        if(charLen > 0){
          const pwdArr = [];
          //密码长度大于生成密码的元组，那么确保每个元组都出现
          if (charLen < this.state.inputLen) {

            charArr.forEach(element => {
              const c = randomCharExceptConfused(myConfusingArr,element);
              if(c){
                pwdArr.push(c);
              }
            });

          }

          while(pwdArr.length < this.state.inputLen) {
            const e = randomElementInArray(charArr);
            let c = randomCharExceptConfused(myConfusingArr,e);
            if (c) {
              pwdArr.push(c);
            }
          }

          this.setState({
            pwd:pwdArr.join(""),
            error:null
          });

        } else {
          this.setState({error : '没有可用于生成密码的符号哦！'});
          return;
        }
    }

    pwdElement = (pwd,error) => {

        let pwd_input = (<div id='pwd-length' >
                         <textarea id='pwd-length-txt' rows="1" placeholder='密码长度'  defaultValue='' onChange={ (e) => {
                                this.setState({
                                    inputLen:e.target.value
                                },() => {
                                    this.generate();
                                });
                            } } ></textarea>
                            <button id='pwd-length-copy' onClick={
                            (e) => {
                                if (pwd && pwd.length > 0) {
                                    const superDiv = document.getElementById('pwd-txt')
                                    if(superDiv){
                                        superDiv.lastElementChild.select()
                                        document.execCommand('copy')
                                    }
                                } else {
                                    alert('请输入密码长度！')
                                }
                            }
                        }></button>
                         </div>
                        );

        var e = null;
        if (error && error.length > 0) {
            e = (
                <div>
                    <span className="error">{error}</span>
                </div>
            );
        } else if(pwd && pwd.length > 0) {
            e = (
                <div>
                    <h2>生成密码</h2>
                    {pwd_input}

                    <div id='pwd-txt'>
                        <textarea value={ pwd } readOnly></textarea>
                    </div>
                    
                </div>
            );
        } else {
            e = (
                <div>
                    <h2>生成密码</h2>
                    {pwd_input}
                </div>
            );
        }
        return e;
    }

    render() {
        let pwdElement = this.pwdElement(this.state.pwd,this.state.error)
        return (
            <div>
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
                </div>

                { pwdElement }

            </div>
        );
    }
}

export default Password;
