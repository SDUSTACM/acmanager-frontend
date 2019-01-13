# acmanager-frontend
ACManager 新版前端
## 1. 部署
### 1. 获取项目代码并安装依赖
```shell
git clone git@github.com:SDUSTACM/acmanager-frontend.git
cd acmanager-frontend
```
```shell
npm install
```
运行项目（这里默认运行在8000端口上）
```shell
npm start
```
### 2.nginx配置
开发版本配置
```
location / {
    index index.html;
    proxy_pass http://127.0.0.1:8000;
}

location /api/ {
    proxy_pass http://127.0.0.1:8008/api/;
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
    proxy_pass http://127.0.0.1:8008/api/;
}
```
