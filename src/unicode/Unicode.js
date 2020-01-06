import React, { Component } from 'react';

export class Unicode extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue : "",
            outputValue : ""
        };
    
        this.onInputValueChanged = this.onInputValueChanged.bind(this);
        this.convert2Unicode = this.convert2Unicode.bind(this);
        this.convert2Chinese = this.convert2Chinese.bind(this);
        this.exchangeCharacter = this.exchangeCharacter.bind(this);
        this.cleanCharacter = this.cleanCharacter.bind(this);
        this.handleEdit = this.selectText.bind(this);
    }

    convert2Unicode() {
        const v = this.state.inputValue;
        if (v) {
            const ev = escape(v).replace(/\%u/g,'\\u');;
            this.setState({
                outputValue:ev
            });
        } else {
            this.setState({
                outputValue:''
            });
        }
    }

    convert2Chinese() {
        const v = this.state.inputValue;
        if (v) {
            console.log(v);
            const ev = eval("'" + v + "'");
            console.log(ev);
            this.setState({
                outputValue:ev
            });
        } else {
            this.setState({
                outputValue:''
            });
        }
    }

    exchangeCharacter() {
        const inputValue  = this.state.inputValue;
        const outputValue = this.state.outputValue;

        this.setState({
            inputValue:outputValue,
            outputValue:inputValue
        });
    }

    cleanCharacter() {
        this.setState({
            inputValue:'',
            outputValue:''
        });
    }

    onInputValueChanged(event) {
        this.setState({inputValue: event.target.value});
    }

    selectText() {
        this.refs.newText.select();
    }

    render(){

        return (
            <div className="grid">
                <div className="content">

                    <textarea rows="5" placeholder="请输入..." ref="newText" value={this.state.inputValue} onChange={ this.onInputValueChanged } ></textarea>

                    <p className='buttons'>
                        <button onClick={ this.convert2Unicode } >中文 转 Unicode</button>
                        <button onClick={ this.convert2Chinese } >Unicode 转 中文</button>
                        <button onClick={ this.exchangeCharacter } >交换输入输出</button>
                        <button onClick={ this.cleanCharacter } >清空</button>
                    </p>
                
                    <textarea rows="5" placeholder="..." value={this.state.outputValue} onChange={(v)=>{}} ></textarea>
                </div>
            </div>
        )
    }
}

export default Unicode;
