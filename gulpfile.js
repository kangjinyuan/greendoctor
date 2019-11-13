//引入gulp及gulp插件
var gulp = require("gulp"),
	runSequence = require('run-sequence'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	convertEncoding = require('gulp-convert-encoding');

//定义js源文件路径
var app = "js/app.js",
	common = "js/common.js",
	init = "js/init.js",
	login = "js/login.js",
	rightNav = "js/rightNav.js",
	selectExcel = "js/selectExcel.js",
	upload = "js/upload.js",
	postUrl = "js/postUrl.js",
	editInit = "js/editInit.js",
	ChinaNumToEnglishNum = "js/ChinaNumToEnglishNum.js",
	//css文件路径
	appcss = "css/app.css",
	commoncss = "css/common.css",
	logincss = "css/login.css",
	maincss = "css/main.css";

var jsonArr = [app, common, init, login, rightNav, selectExcel, upload, postUrl, editInit, ChinaNumToEnglishNum, appcss, commoncss, logincss, maincss];

//生成对应的json文件
//teskName:任务名称
//path:存储路径

function revFile(teskName, jsonArr, path) {
	gulp.task(teskName, function() {
		return gulp.src(jsonArr)
			.pipe(rev())
			.pipe(rev.manifest())
			.pipe(gulp.dest(path));
	});
}

var replacePath = ['rev/rev-manifest.json', './*.html'];
var replacePagesPath = ['rev/rev-manifest.json', 'pages/*.html'];
var replacePartPath = ['rev/rev-manifest.json', 'part/*.html'];
var replaceMobilePath = ['rev/rev-manifest.json', 'mobile/*.html'];

function replaceFile(teskName, replacePathArr, savePath) {
	gulp.task(teskName, function() {
		return gulp.src(replacePathArr)
			.pipe(revCollector())
			.pipe(convertEncoding({
				iconv: {
					decode: {},
					encode: {
						addBOM: true
					}
				},
				to: "utf8"
			}))
			.pipe(gulp.dest(savePath));
	});
}

revFile("revJson", jsonArr, "rev");
replaceFile("replaceJson", replacePath, "./");
replaceFile("replacePagesJson", replacePagesPath, "pages");
replaceFile("replacePartJson", replacePartPath, "part");
replaceFile("replaceMobileJson", replaceMobilePath, "mobile");

//开发构建
gulp.task('dev', function(done) {
	condition = false;
	runSequence(
		['revJson'], ['replaceJson'], ['replacePagesJson'], ['replacePartJson'], ['replaceMobileJson'], done);
});

gulp.task('default', ['dev']);