# ACManager 新版前端
## 0. 所需软件、工具、依赖
- [git](https://git-scm.com/download/win) 版本控制工具
- [node](https://nodejs.org/zh-cn/) JavaScript运行时
- [nginx](http://nginx.org/en/download.html) Web服务器，可用于代理
## 1. 部署项目代码
### 1. 获取项目代码
先fork本项目  
选择一个将要部署本项目的目录，打开控制台并通过`cd`命令定位到此目录

```shell
git clone git@github.com:<your github account name>/acmanager-frontend.git
cd acmanager-frontend
```

### 2. 下载安装配置git（群里有）
- 电脑桌面右键打开git bash here
- 进入setting 找到ssh keys进入generating ssh keys 进入创建一个ssh秘钥页面（自己看英文）并按照上面代码在git中配置
- 返回进入把秘钥配置到git中（自己看英文）按照上面的代码在git中配置


### 3. 安装依赖并运行
通过以下命令安装依赖项
```shell
npm install
```
>可以通过 `npm config set registry https://registry.npm.taobao.org`命令更换npm淘宝源来加快nodejs包下载速度

运行项目（这里默认运行在8000端口上）
```shell
npm start
```
## 2.连接测试后端
1. 下载安装nginx(群里有)
2. 打开nginx目录下，conf文件夹中的nginx.conf文件，注释或删除掉原有的`location / `配置项,更换为以下配置

开发版本配置（开发测试时使用这种）
```
location / {
    index index.html;
    proxy_pass http://127.0.0.1:8000;
}

location /api/ {
    proxy_pass http://acmanager.sdustacm.club:8888/api/;
}
```
生产版本配置
```
location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    root /home/wzh/acmanager/dist/;
    try_files $uri $uri/ /index.html =404;
}

location /api/ {
    proxy_pass http://acmanager.sdustacm.club:8888/api/;
}
```
## 3. 运行
浏览器打开`http://127.0.0.1`即可  
