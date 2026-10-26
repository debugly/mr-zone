# MR Tools

MR Tools 是一个 Chrome 新标签页扩展，将标签管理、开发工具箱和翻页时钟放在同一个页面中。

基于 [Tab Out](https://github.com/zarazhangrui/tab-out) 的标签管理功能，使用原生 HTML、CSS、JavaScript 和 Chrome Manifest V3 重构原 MR Zone 工具箱。无需安装 npm 依赖，无需构建或启动服务器。

当前版本：**1.1.0**。

## 功能

### 首页：标签管理

- 按域名分组展示打开的标签页，常用网站首页单独分组。
- 点击标签标题，切换到对应标签及浏览器窗口。
- 关闭单个标签、整组标签，或批量清理打开的标签。
- 检测重复标签，一键保留一份。
- 保存标签以便稍后阅读，支持勾选归档及归档搜索。
- 展示 localhost 标签的端口号，方便区分本地项目。
- 关闭标签时播放音效和纸屑动画。

### MR Tools：开发工具箱

点击首页顶部日期区域右侧的 **MR Tools** 进入工具箱。

| 工具 | 功能 |
| --- | --- |
| URL 编解码 | URL 编码、解码、交换输入输出、清空及复制 |
| 生成二维码 | 将文字或链接生成二维码，下载 PNG 图片 |
| 时间戳 | 显示当前 Unix 秒级时间戳，复制时间戳及查看常用语言示例 |
| JSON 格式化 | 实时解析 JSON、折叠对象和数组、切换属性名引号及复制格式化结果 |
| 密码生成器 | 设置长度、字符类别和自定义字符，排除混淆字符，生成及复制密码 |
| Unicode 编码 | 中文与 Unicode 转换、交换输入输出、清空及复制 |

工具之间切换及返回首页时，输入保留在当前页面内；刷新或关闭新标签页后不保留。密码使用 Web Crypto 随机数生成，不写入持久化存储。

### Digital Clock：翻页时钟

点击 **MR Tools** 左侧的 **Digital Clock** 进入时钟页面：

- 按设备本地时区显示日期、时、分、秒和时区名称。
- 数字变化时显示翻页动画。
- 页面进入后台时暂停刷新，恢复显示后校准时间。
- 适配不同屏幕尺寸，并响应系统的减少动态效果偏好。

工具箱和时钟页面均可通过 **Home** 返回首页。

## 安装

1. 克隆本仓库：

   ```bash
   git clone https://github.com/debugly/mr-zone.git
   cd mr-zone
   ```

2. 在 Chrome 地址栏打开 `chrome://extensions`。
3. 开启右上角的“开发者模式”。
4. 点击“加载已解压的扩展程序”，选择本仓库的 **`extension/`** 目录。
5. 打开新标签页即可使用。

请保留安装目录。Chrome 加载的是该目录中的扩展文件。

## 更新

在仓库目录执行：

```bash
git pull
```

随后打开 `chrome://extensions`，点击 MR Tools 的“重新加载”按钮，再重新打开新标签页。

## 数据与资源

- 稍后阅读的标签及归档使用 `chrome.storage.local` 保存在本机。
- 工具转换、密码生成和二维码编码在本地完成，无需远程计算服务。
- 页面沿用 Tab Out 的 Google Fonts 引用；字体加载可能产生网络请求；标签网站图标也通过 Google favicon 服务加载。
- 扩展使用 `tabs`、`activeTab` 和 `storage` 权限，提供标签管理和本地保存功能。

## 项目结构

```text
extension/
├── manifest.json       # 扩展配置及版本号
├── index.html          # 首页、工具箱及翻页时钟页面容器
├── app.js              # 标签分组、清理、稍后阅读及归档
├── background.js       # 后台事件及工具栏标签数量徽标
├── style.css           # 首页样式
├── tools.js            # 六个工具及工具箱页面切换
├── tools.css           # 工具箱样式
├── clock.js            # 本地时间及翻页动画控制
├── clock.css           # 时钟样式及动画
├── icons/              # 扩展图标
└── vendor/qrious.js     # 本地二维码编码器及依赖
```

旧版网站的构建产物、Service Worker 和自定义域名配置已清理，可通过 Git 历史查看；旧版 React 源码位于 `source` 分支。当前扩展从 `extension/` 加载。

## 开发与验证

直接编辑 `extension/` 中的文件，再重新加载扩展，无需构建。

如已安装 Node.js，可执行语法检查：

```bash
node --check extension/app.js
node --check extension/background.js
node --check extension/tools.js
node --check extension/clock.js
node --check extension/vendor/qrious.js
```

功能验收需要在 Chrome 扩展环境进行：检查标签切换和关闭、稍后阅读及归档、六个工具的输入输出、复制和二维码下载，以及时钟翻页和 Home 返回行为。语法检查不替代实际浏览器验收。

## 致谢与许可证

标签管理基于 [Zara 的 Tab Out](https://github.com/zarazhangrui/tab-out)，其 MIT 许可证保留在 [LICENSE.Tab-Out](LICENSE.Tab-Out)。

二维码模块从原 MR Zone 的 source map 中恢复，包含 QRious 和 Nevis 源码，保留各模块原始版权和许可证声明。QRious 文件包含 GPL 声明，具体以 [extension/vendor/qrious.js](extension/vendor/qrious.js) 中的声明为准。
