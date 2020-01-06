import React, { Component } from 'react';
import { isArray } from 'util';
import ImgCollapsed from '../Collapsed.gif'
import ImgExpanded from '../Expanded.gif'


export class JsonFormat extends Component {

    constructor(props){
        super(props);
        this.state = {
            inputJSON : "",
            formattedJson : "",
            quotes : true
        };
    
        this.onInputValueChanged = this.onInputValueChanged.bind(this);
        this.toggleQuotes = this.toggleQuotes.bind(this);
        this.collapsible = true;
        this.quotes = true;
        this.ImgExpanded = ImgExpanded;
        this.ImgCollapsed = ImgCollapsed;

        window.expImgClicked = (img) => {
            const container = img.parentNode.parentNode.nextSibling;
            if (!container) { return; }

            let display = 'none';
            let src = this.ImgCollapsed;

            if (container.style.display === 'none') {
                display = 'block';
                src = this.ImgExpanded;
            }

            container.style.display = display;
            img.src = src;
        };

    }

    toggleQuotes(e){
        let quotes = e.target.checked;
        //因为state里的quotes并不会立马改变，因此自己维护一个属性
        this.quotes = quotes;
        this.setState({
            quotes:quotes
        });
        this.format(this.state.inputJSON);
    }

    format(value) {
        if (!value) {
            this.setState({
                formattedJson : ''
            });
        } else {
            try {
                const json = JSON.parse(value);
                const result = this.doFormat(json, 0, false);
                this.setState({
                    formattedJson : result
                });
            } catch (e) {
                const style = 'Error';
                let result = '';
                result += '<span class="' + style + '">' + e.message + '</span>';
                this.setState({
                    formattedJson : result
                });
            }
        }
    }

    doFormat(obj, indent, comma) {

        function ObjectSize(o) {
            // https://stackoverflow.com/questions/5223/length-of-a-javascript-object
            let size = 0, key;
            for (key in o) {
                if (o.hasOwnProperty(key)) {
                    size++;
                }
            }
            return size;
        }


        function MakeRows(contents) {
            let result = '<div class="mrrow">';
            for (const i in contents) {
                result += '<div class="auto">' + contents[i] + '</div>';
            }
            result += '</div>';
            return result;
        }

        function MakeColumns(indentLevel, contents) {
            let result = '<div class="mrcolumn">';
            const c = 'mrindent' + indentLevel;
            result += '<div class="' + c + '"></div>';

            for (const i in contents) {
                result += '<div class="auto">' + contents[i] + '</div>';
            }
            result += '</div>';
            return result;
        }


        const commaHTML = comma ? '<span class="Comma">,</span>' : '';
        const objType = typeof obj;
        let html = '';

        if (isArray(obj)) {
            const size = obj.length;
            if (size === 0) {
                const style = 'ArrayBrace';
                html += '<span class="' + style + '">[ ]' + commaHTML + '</span>';
            } else {

                const clpsHtml = this.collapsible ? '<img src="' + this.ImgExpanded + '" onclick="this.expImgClicked(this)" />' : '';
                const contentTop = '<span class="ArrayBrace">[' + clpsHtml + '</span>';
                const contentBottom = '<span class="ArrayBrace">]' + commaHTML + '</span>';

                const rows = [];
                let index = 0;
                for (const prop in obj) {
                    const value = obj[prop];
                    const result = this.doFormat(value, 0, ++index < size);
                    rows.push(MakeColumns(1, [result]));
                }
                const contentCenter = MakeRows(rows);

                html += MakeRows([contentTop, contentCenter, contentBottom]);
            }
        } else if (objType === 'object') {
            if (obj == null) {
                const style = 'Null';
                html += '<span class="' + style + '">null</span>';
                return html + commaHTML;
            } else if ( obj instanceof Date) {
                // 不考虑这种情况，不会出现
                // https://stackoverflow.com/questions/4511705/how-to-parse-json-to-receive-a-date-object-in-javascript
                const style = 'Date';
                html += '<span class="' + style + '">' + obj.toString() + '</span>';
                return html + commaHTML;
            } else if ( obj instanceof RegExp) {
                // 不考虑这种情况，不会出现
                const style = 'RegExp';
                html += '<span class="' + style + '">' + obj.toString() + '</span>';
                return html + commaHTML;
            } else {
                // 统计对象有多少个属性
                const size = ObjectSize(obj);
                // 空对象
                if (size === 0) {
                    const content = '<span class="ObjectBrace">{ }' + commaHTML + '</span>';
                    html = MakeRows([content]);
                    return html;
                } else {
                    const clpsHtml = this.collapsible ? '<img src="' + this.ImgExpanded + '" onclick="window.expImgClicked(this)" />' : '';
                    const quotesHtml = this.quotes ? '\"' : '';
                    const contentTop = '<span class="ObjectBrace">{' + clpsHtml + '</span>';
                    const contentBottom = '<span class="ObjectBrace">}' + commaHTML + '</span>';

                    const rows = [];

                    let index = 0;
                    for (const prop in obj) {
                        const value = obj[prop];
                        const result = this.doFormat(value, 0, ++index < size);
                        const name =  '<span class="PropertyName">' + quotesHtml + prop + quotesHtml + ' : ' + '</span>';
                        rows.push(MakeColumns(0, [name, result]));
                    }
                    const rightRow = MakeRows(rows);
                    const contentCenter = MakeColumns(1, [rightRow]);
                    html += MakeRows([contentTop, contentCenter, contentBottom]);
                }
            }
        } else if (objType === 'number') {
            const style = 'Number';
            html += '<span class="' + style + '">' + obj + '</span>';
            return html + commaHTML;
        } else if (objType === 'boolean') {
            const style = 'Boolean';
            html += '<span class="' + style + '">' + obj + '</span>';
            return html + commaHTML;
        } else if (objType === 'function') {
            // 不考虑这种情况，不会出现
        } else if (objType === 'undefined') {
            // https://stackoverflow.com/questions/13796751/json-undefined-value-type
            // 这种情况也不会出现
            const style = 'Null';
            html += '<span class="' + style + '">undefined</span>';
            return html + commaHTML;
        } else {
            const str = obj.toString();
            const style = 'String';
            html += '<span class="' + style + '">"' + str + '"</span>';
            return html + commaHTML;
        }

        return html;
    }

    onInputValueChanged(event) {
        const value = event.target.value;
        this.setState({inputJSON: value});
        this.format(value);
    }

    render() {
        return (
            <div>
                <p>
                    <label>
                        <input type='checkbox' onChange= { this.toggleQuotes } checked={this.state.quotes} />
                        引号
                    </label>
                </p>
                
                <p>
                    <textarea rows="8" placeholder="请输入需要格式化的JSON..." ref="newText" value={this.state.inputJSON} onChange={ this.onInputValueChanged } ></textarea>
                </p>
                
                <pre className="CodeContainer" dangerouslySetInnerHTML={{__html: this.state.formattedJson}}/>
                
            </div>
        );
    }
}

export default JsonFormat;
