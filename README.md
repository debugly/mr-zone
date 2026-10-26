# MR Tools

以 Tab Out 的 Chrome Manifest V3 扩展为基础，将原 MR Zone 工具箱迁移为原生 HTML / CSS / JavaScript。无需 React、构建工具或服务端。

## 使用

1. 打开 Chrome 的 `chrome://extensions`，开启开发者模式。
2. 选择“加载已解压的扩展程序”，选择本仓库的 `extension/`。
3. 打开新标签页。顶部日期区域右侧的 **MR Tools** 按钮进入工具箱；**Home** 回到标签管理页。

工具包括 URL 编解码、二维码生成及 PNG 下载、实时时间戳、JSON 格式化及树形折叠、密码生成器和 Unicode 编解码。工具间切换和返回时保留当前页面内的输入，不持久化密码。密码使用 Web Crypto 随机数，支持字符类别、自定义字符、长度及排除混淆字符。

## 结构

- `extension/index.html`：MR Tools 标签管理页面及工具箱容器。
- `extension/app.js`、`style.css`、`background.js`、`manifest.json`：以本地 Tab Out 为基础，保留核心逻辑并更新产品名称。
- `extension/tools.js`、`tools.css`：工具逻辑、页面切换及隔离样式。
- `extension/vendor/qrious.js`：从原 MR Zone source map 恢复的 QRious / Nevis 本地模块，保留原始许可证声明；无需 CDN 或动态代码执行。

旧版发布文件保留在仓库根目录，旧版 React 源码位于 Git 的 `origin/source` 分支。新的扩展从 `extension/` 加载。

Tab Out 来自 https://github.com/zarazhangrui/tab-out ，MIT 许可证见 `LICENSE.Tab-Out`。二维码依赖的许可证以其文件内声明为准。

## 检查

运行 `node --check extension/tools.js` 和 `node --check extension/vendor/qrious.js` 进行语法检查。标签操作、页面布局、复制和二维码下载应在 Chrome 扩展环境验收。
