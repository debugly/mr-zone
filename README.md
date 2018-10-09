# MR.MR

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Problems

```
Can't bind to 'ngModel' since it isn't a known property of 'select'.
https://stackoverflow.com/questions/42656195/cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-select
```

```
Error: StaticInjectorError(AppModule)[HttpClient]:
打开根模块 AppModule，
从 @angular/common/http 中导入 HttpClientModule 符号，
把它加入 @NgModule.imports 数组。
```

```
[HPM] Error occurred while trying to proxy request /dev/h5/config/appid-config.json from localhost:4200 to https://qipai.56.com (ECONNRESET) (https://nodejs.org/api/errors.html#errors_common_system_errors)
配置里加上 changeOrigin: true,
```

```
ERROR in src/app/app.service.ts(35,46): error TS2345: Argument of type '{ responseType: "text"; }' is not assignable to parameter of type '{ headers?: HttpHeaders | { [header: string]: string | string[]; }; observe?: "body"; params?: Ht...'.
  Types of property 'responseType' are incompatible.
    Type '"text"' is not assignable to type '"json"'.

https://stackoverflow.com/questions/49771603/types-of-property-responsetype-are-incompatible
```

```
ERROR in src/app/qrcode/qrcode.component.ts(31,22): error TS2304: Cannot find name 'require'.

tsconfig.app.json => "types": ["node"]
```

```
Observer property value change.
https://stackoverflow.com/questions/44840735/change-vs-ngmodelchange-in-angular
```

```
Display Dynamic HTML
https://gist.github.com/klihelp/4dcac910124409fa7bd20f230818c8d1
https://stackoverflow.com/questions/45351434/safe-value-must-use-property-binding-after-bypass-security-with-domsanitizer
https://www.oodlestechnologies.com/blogs/How-To-Display-Dynamic-HTML-Without-Sanitizing-Or-Filtering-Using-Pipe
https://blog.csdn.net/big1989wmf/article/details/70144699
```

```
Responsive Layout
http://www.alloyteam.com/2015/04/zi-shi-ying-she-ji-yu-xiang-ying-shi-wang-ye-she-ji-qian-tan/
```

```
Shell脚本传递带有空格的参数
http://blog.51cto.com/dwf07223/1564600
```

```
js箭头函数
https://blog.fundebug.com/2017/05/25/arrow-function-for-beginner/
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
```
