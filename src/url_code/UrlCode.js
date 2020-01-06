import React from 'react';

export default class UrlCode extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            inputValue : "",
            outputValue : ""
        };
    
        this.onInputValueChanged = this.onInputValueChanged.bind(this);
        this.makeURLDecode = this.makeURLDecode.bind(this);
        this.makeURLEncode = this.makeURLEncode.bind(this);
        this.makeURLExchange = this.makeURLExchange.bind(this);
        this.makeURLClear = this.makeURLClear.bind(this);
        this.handleEdit = this.selectText.bind(this);
    }

    makeURLDecode() {
        const v = this.state.inputValue;
        if (v) {
            const ev = decodeURIComponent(v);
            this.setState({
                outputValue:ev
            });
        } else {
            this.setState({
                outputValue:''
            });
        }
    }

    makeURLEncode() {
        const v = this.state.inputValue;
        if (v) {
            const ev = encodeURIComponent(v);
            this.setState({
                outputValue:ev
            });
        } else {
            this.setState({
                outputValue:''
            });
        }
    }

    makeURLExchange() {
        const inputValue  = this.state.inputValue;
        const outputValue = this.state.outputValue;

        this.setState({
            inputValue:outputValue,
            outputValue:inputValue
        });
    }

    makeURLClear() {
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
                        <button onClick={ this.makeURLDecode } >URL解码</button>
                        <button onClick={ this.makeURLEncode } >URL编码</button>
                        <button onClick={ this.makeURLExchange } >交换输入输出</button>
                        <button onClick={ this.makeURLClear } >清空</button>
                    </p>
                
                    <textarea rows="5" placeholder="..." value={this.state.outputValue} onChange={(v)=>{}} ></textarea>
                </div>
            </div>
        )
    }
}