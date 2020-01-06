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
        return (
            <div className="grid">
                <div className="content">
                    <div className='unixtimeWrap'>
                        <div className="uts">
                            Unix时间戳(秒): {this.state.stamp} 
                        </div>
                        <div className='utsHead'> 不同编程语言如何获取Unix时间戳？ </div>
                        <div className='mrTable uts_table'>

                            <div className='mr2Cell uts_left_cell'> Objective - C </div>
                            <div className='mr2Cell'> (UInt64)[[NSDate
                                date] timeIntervalSince1970]
                            </div>
                            
                            <div className='mr2Cell uts_left_cell'> Bash </div>
                            <div className='mr2Cell'> date +"%s"
                            </div>

                            <div className='mr2Cell uts_left_cell'> JavaScript </div>
                            <div className='mr2Cell'> Math.floor(new Date().getTime() / 1000)
                            </div>
                            
                            <div className='mr2Cell uts_left_cell'> Ruby </div>
                            <div className='mr2Cell'> Time.now
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Timestamp;