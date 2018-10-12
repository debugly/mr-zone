import {Component, OnInit} from '@angular/core';
import {isArray} from 'util';

/**
 * 源码参考 https://www.oschina.net/code/snippet_119610_11825
 * 采用 Angular + Flex 布局重构
 */


@Component({
    selector: 'app-json',
    templateUrl: './json.component.html',
    styleUrls: ['./json.component.scss']
})


export class JsonComponent implements OnInit {

    title = 'JSON格式化及高亮';
    ImgCollapsed = './assets/json/Collapsed.gif';
    ImgExpanded = './assets/json/Expanded.gif';

    inputJSON: string;
    formattedJson: string;
    collapsible = true;
    quotes = true;

    ngOnInit() {

        // 没办法只能把点击事件挂到 window 上了，应为 Angular 没发处理动态追加的 HTML 元素；
        // 如果借助 Renderer 去处理又不现实，破坏了我递归结构，并且效率上也不知道怎么样，因为 json 越大，生成的 div 嵌套就越多！

        (<any>window).expImgClicked = (img: HTMLImageElement) => {

            const container = img.parentNode.parentNode.nextSibling as HTMLDivElement;
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

    format() {
        if (!this.inputJSON) {
            this.formattedJson = '';
        } else {
            try {
                const json = JSON.parse(this.inputJSON);
                this.formattedJson = this.doFormat(json, 0, false);
            } catch (e) {
                const style = 'Error';
                let result = '';
                result += '<span class="' + style + '">' + e.message + '</span>';
                this.formattedJson = result;
            }
        }
    }

    toggleQuotes() {
        this.format();
    }

    doFormat(obj: Object, indent: number, comma: boolean) {

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


        function MakeRows(contents: string[]) {
            let result = '<div class="mrrow">';
            for (const i in contents) {
                result += '<div class="auto">' + contents[i] + '</div>';
            }
            result += '</div>';
            return result;
        }

        function MakeColumns(indentLevel: number, contents: string[]) {
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

                const clpsHtml = this.collapsible ? '<img src="' + this.ImgExpanded + '" onclick="window.expImgClicked(this)" />' : '';
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
                        const name =  '<span class="PropertyName">' + quotesHtml + prop + quotesHtml + '</span>';
                        rows.push(MakeColumns(0, [name + ' : ', result]));
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
}
