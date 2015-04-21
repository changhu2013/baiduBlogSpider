var express = require('express');
var http = require('http');
var router = express.Router();
var request = require("request"); 
var cheerio = require('cheerio');
var fs = require("fs");
 
items = [];

/* GET home page. */
router.get('/', function(req, res, next) {

//编码
res.charset = 'utf-8';

//需要爬取的百度空间URL
var url = "http://hi.baidu.com/ae6623";

var list = "";
 
request(url,function(error,res,body){
	
	 
	if (!error && res.statusCode == 200) {
		
		//清空一次数组，由于不会在回调里面输出data，所以暂时麻烦先用这个，等我学会了回调，再重构这一段！
		items = [];
		//解析HTML 
		var $ = cheerio.load(body);
		//取到第一页所有文章a链接合集
        list = $('a.a-title');
		//遍历	 
        list.each(function(i,e){
        	var $e = $(e);
        	//放入数组，准备发回前端
        	items.push($e.attr('href'));
        	       	
        });
        
        console.log(items);
	}

});

//console.log('ITEMS:' + items);
for(var i=0;i<items.length;i++){
	//处理爬出的HTML到文件
	getArti( i,'http://hi.baidu.com' + items[i]);
}


 
res.send(items);
console.log('ok');
 	

});



/**
* 将爬出的数据写入本地
* i : 索引
* src : 单个百度网址
*/
var getArti = function(i,src){
	var data = '';
		// 请求
	var req = http.request(src, function(res){
	    // 编码
	    res.setEncoding("utf8");
	    
	    //拼接data
	    res.on('data', function(chunk){
	        data += chunk;
	    });
	    // 处理data
	    res.on('end', function(){
	        
	      
	      	//解析HTML数据
	        var $ = cheerio.load(data);
	        //拿到Title 百度博客文章标题
			var title = $('.content-title');
  			
  			//写入文件
	        wf(i + '.html',data);
	        console.log('正在获取第' + i + '个文章，获取URL：' + src + ' Title:' + title);
	        //console.log(data);
	    });

	});

	// 发送请求
	req.end();
	console.log("数据下载中...");
}




var wf = function(src,datas){
	 fs.writeFile(src, datas, function (err) {                                                                                                 
	       if (err) throw err;
	       console.log(src + '数据已保存！');
	    });
};


module.exports = router;
