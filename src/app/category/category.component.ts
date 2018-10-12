import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})

// interface Linker {
//     title?: string;
//     link?: string;
// }

export class CategoryComponent implements OnInit {

    title = 'MR 工具箱';
    routerLinks = [
        {
            'categoryId': 6,
            'name': 'URL 编解码',
            'value': 'url-code'
        },
        {
            'categoryId': 7,
            'name': '生成二维码',
            'value': 'qr'
        },
        {
            'categoryId': 8,
            'name': '时间戳',
            'value': 'timestamp'
        },
        {
            'categoryId': 9,
            'name': 'JSON格式化',
            'value': 'json'
        }];

    lastUrl: string;

    constructor(private router: Router) {

        router.events.subscribe((e) => {

            if (e instanceof NavigationEnd ) {
                let url = e.urlAfterRedirects;
                if (!url) {
                    url = e.url;
                }
                this.activeUrl(url);
            } else if ( e instanceof NavigationStart ) {
                const url = e.url;
                this.activeUrl(url);
            }
        });
    }

    activeUrl(url: string) {

        console.log(url);
        if (this.lastUrl) {
            const lastElement: HTMLAnchorElement = document.getElementById(this.lastUrl) as HTMLAnchorElement;
            if (lastElement) {
                lastElement.classList.remove('active');
            }
        }

        if (url.indexOf('/') === 0) {
            url = url.substring(1);
        }

        const current: HTMLAnchorElement = document.getElementById(url) as HTMLAnchorElement;
        if (current) {
            this.lastUrl = url;
            current.classList.add('active');
        }
    }

    ngOnInit() {
        // UI刷新需要间隔下
        setTimeout(() => {
            this.activeUrl(this.router.url);
        });
    }

}
