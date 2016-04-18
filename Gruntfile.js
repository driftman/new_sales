var fs=require('fs');
//var mkdirp=require('mkdirp');
var findControllerName=function (str){
	var first=str.search("'");
	var last=str.search("',");
	//var firstQ=str.search('""');
	//var lastQ=str.search("\",");
	first+=1;
	last=(last-first);
	// first=(first<firstQ)?first+1:firstQ+1;
	//last=(last<lastQ)?(last-first):(lastQ-first);
	console.log("file:"+str.substr(first,last));
	return  str.substr(first,last);
}

var findServiceName=function (str){
	var first=str.search('"');
	var last=str.search('",');
	//var firstQ=str.search('""');
	//var lastQ=str.search("\",");
	first+=1;
	last=(last-first);
	// first=(first<firstQ)?first+1:firstQ+1;
	//last=(last<lastQ)?(last-first):(lastQ-first);
	console.log("file:"+str.substr(first,last),first,last);
	return  str.substr(first,last);
}

var createIncludesFile=function(path,files){
   var includes=files.reduce(function(str,item){
		 //<script src="js/controllers.js"></script>
		    if(item.search('Ctrl')>-1){
				 	str+='<script src="'+item+'"></script>\n';
				}
		   return str;
	 },"");

	 console.log('includes',includes);

	 fs.writeFileSync(path,includes,'utf8',function(err){
		 if(err) throw err;
		 console.log('includes created in ', path);
	 });
}
var createDir=function(path){
	var getDirName = require('path').dirname;
	mkdirp(getDirName(path), function (err) {
		if (err) return cb(err);
		console.log("path created");
	});
}

module.exports=function(grunt){

	grunt.registerTask('service',function(){
		console.log("service");
		var file=fs.readFileSync('www/js/services.js','utf8').split('.factory(');
		var filesNames=file.map(findServiceName);
		console.log("fileNames",filesNames);
	});

	grunt.registerTask('controller',function(){
		console.log("controller");
		var file=fs.readFileSync('www/js/controllers.js','utf8').split('.controller(');
		var filesNames=file.map(findControllerName);
		var filesArray=file.map(function(item){
			return {'name':findControllerName(item),'content':item}});
			//createDir('build/controllers/');
			var filesCreated=filesArray.map(function(item){
				if(item.name.search('Ctrl')>-1)
				{
					fs.writeFileSync('build/controllers/'+item.name+'.js',"app.controller("+item.content,'utf8',function(err){
						if(err) throw err;
						console.log('done');});
					}
					return item.name+' created';});
					createIncludesFile('build/controllers/includes',filesNames);

					console.log("fileNames",filesNames);
	});

}
