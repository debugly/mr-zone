import React, { Component } from 'react';

export class Timestamp extends Component {

    constructor(props) {
        super(props);
        let t = this.ct();
        this.state = {
            stamp: t
        };
    }

    ct() {
        let t = Math.floor(new Date().getTime() / 1000);
        return t;
    }

    tick() {
        let t = this.ct();
        this.setState({
            stamp: t
        });
    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            this.tick();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {

        const items = [
            {"lang":"Objective-C","code":"(UInt64)[[NSDate date] timeIntervalSince1970]"},
            {"lang":"Bash","code":"date +\"%s\""},
            {"lang":"JavaScript","code":"Math.floor(new Date().getTime() / 1000)"},
            {"lang":"Ruby","code":"Time.now"}
        ];

        const makeDiv = (e,key) => {
            return (
                <div className='mr2Row' key={key}>
                    <div className='mr2Cell uts_left_cell'>
                        {e.lang}
                    </div>
                    <div className='mr2Cell'> 
                        {e.code}
                    </div>
                </div>
            )
        };

        const itmesDiv = items.map(
            (e,idx) => {
               return makeDiv(e,""+idx)
            }
        );
        
        return (
            <div className="grid">
                <div className="content">
                    <div className='unixtimeWrap'>
                        <div className="uts">
                            Unix时间戳(秒): {this.state.stamp} 
                        </div>
                        <div className='utsHead'> 不同编程语言如何获取Unix时间戳？ </div>
                        <div className='mrTable uts_table'>
                            {itmesDiv}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Timestamp;