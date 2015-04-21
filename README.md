# baiduBlogSpider
百度博客爬虫

---

> * 1.爬取百度空间博客文章到本地
> * 2.爬取百度空间博客文章到数据库(Mongo)
> * 3.爬取百度空间博客评论到数据库(Mongo)

## 如何使用

### 1.安装插件 supervisor
```bat
npm install supervisor
npm install express
npm install express-generator
npm install cheerio
npm install request
```
### 2.进入目录，开启node

```bat
cd baiduBlogSpider
supervisor ./bin/www
```

### 3.访问端口，两次刷新进行爬取
```
http://127.0.0.1:3000/
```

### 4.在baiduBlogSpider文件夹中可以看到爬取的0--9.html文件，即是你爬取到的文章

ps 目前初始版本暂时还没做分页爬取，明天搞分页，具体实现代码在 routes/index.js中，后面会再重构。
