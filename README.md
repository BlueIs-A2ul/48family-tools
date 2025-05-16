

# 48family-tools

## 项目简介

48family-tools 是一款针对丝芭系的脚本购票软件，本项目意在帮助大家合理购票。

## 使用文档

文档地址：https://github.com/BlueIs-A2ul/48family-tools



## 软件下载链接

- Github：https://github.com/BlueIs-A2ul/48family-tools/releases



## 软件功能

> 使用前请务必保证电脑已经下载chrome浏览器



目前实现的功能均基于48Family：

- 非竞价票的定时购买，包括普座，V座
- EP盘的定时购买(限时功能，后续会优化掉)



### 配置

配置的目标场次请最好复制[官网](https://48.gnz48.com/)给出的完整信息，如

- 广州5月25日 TEAM Z斗宿之诀·第七十一场
- 5月25日 CGT48 TEAM GII《美丽世界》·第十七场
- 5月24日 CKG48 TEAM C《重生计划》·第二十一场
- 北京壹空间5月24日B队剧场公演

内容不完全可能会导致运行失败



配置的时间请不要过长，尽量在3分钟以内。运行脚本时请预留一定网络缓冲时间，推荐在90s-120s提前启动脚本



### 安全声明

本应用完全基于**本地运行**，您所填写的账户密码只会保留在本地，无安全隐患



- 

## 安装步骤

1. 确保你已经安装了 Node.js 和 npm。

2. 克隆本仓库到本地：

```shell
git clone <仓库地址>
```

3. 进入项目目录：

```shell
cd 48family-tools
```

4. 安装依赖：

```shell
npm install
```

## 使用方法

在完成安装后，你可以按照以下步骤使用本软件：

1. 启动软件：

```shell
npm start #或使用 npm run dev进入vue开发环境
```

2. 根据软件提示进行操作，输入相关信息，如演出信息、购票数量等。

3. 等待购票流程完成。

## 注意事项

- 本软件仅用于合法的购票行为，请遵守相关法律法规和票务平台的规定。

- 在使用过程中，如果遇到问题或报错，请检查依赖版本是否兼容，或者查看相关文档和日志进行排查。

## 贡献

如果你对本项目感兴趣，可以通过以下方式进行贡献：

- 提交 issue 反馈问题或提出建议。
- 提交 pull request 进行代码改进或功能添加。
- 以及联系我的个人邮箱lizy20240915@163.com

## 许可证

本项目采用 [MIT 许可证](https://opensource.org/licenses/MIT)，详情请查看 LICENSE 文件。



## 软件开发

### 技术栈

Vue 3 + TypeScript + Playwright + Electron

### 模块

- src：Electron源代码
- main：Electron主程序，包括脚本的具体逻辑，以及配置的写入读取
- renderer：可视化页面的实现
