var express = require('express');// 웹페이지에 보이게해주는거
var path = require('path'); // 경로 관리
var serveStatic = require('serve-static');
var logger = require('morgan'); //log를 남겨줌
var cookieParser = require('cookie-parser'); // 쿠키를 처리
var bodyParser = require('body-parser'); // http가 전송 될때 바디를 처리

// 메인에서 한번만 연동하게 할라고 테스트 해보는 코드
var connectMongoDB = require('./src/connectMongoDB');


var connectRoutes = require('./src/connectRoutes');
var connectErrorHandlers = require('./src/connectErrorHandlers');

var app = express(); //express 객체 생성
// view engine setup

app.set('views', path.join(__dirname, 'views')); // 어떤 view를 사용 할 것인지 현재 폴더에 있는 views를 사용
app.set('view engine', 'ejs'); // view engine을 ejs를 쓰겟다. 기본값은 jade

//부트스트랩
// app.use(express.static('/node_modules/express/public/bootstrap'));
// app.use(express.static('/node_modules/express/public/bootstrap/dist/css'));


// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
// app.use(express.static('public'));
// app.get('/sbway2', function(req, res){
//   res.send('hello bento! <img src="/subway2.png">')
// })


 // app.get('/imgfile', function(req,res){
 //    fs.readFile('subway2.bmp', funtion(err,data){
 //        res.writeHead(200, {'Content-Type': 'text/html'});
 //        res.end(data);
 //      });
 // });


app.use(logger('dev')); // 개발 모드 에러 메시지 볼수 있음, product모드
app.use(bodyParser.json()); // bodyparser가 json 관련 처리를 해줌
app.use(bodyParser.urlencoded({extended: false})); // urlencoding 해줌
app.use(cookieParser()); // 쿠키 파서

app.use(express.static('./public'))//정적인 파일 저장하는 디렉토리 : 정적 자산이 포함된 디렉토리 이름을 미들웨어 함수인 express.static 에 전달하면
                                    //파일 직접적으로 제공해줌



function startApp(app) {//웹페이지 시작코딩
  var port = 3000;
  app.listen(port, function (err) {
    if (err) {
      console.log('Error createing a server at port: ' + 3000);
      process.exit(1);
    }
    console.log('서버가 ' + port + '번 포트에서 실행 중입니다.!!');
  });
}
// startApp(app);//페이지별로 다른데이터베이스에서 값 받아와야해서 일단 메인시작시키고 버튼누를때 db에 접속함
// connectRoutes(app);
// connectErrorHandlers(app);

connectMongoDB(app, function (err) {
  if (err) {
    console.log('몽고디비 연결 실패');
    console.error(err);
    process.exit(1);
  }

  connectRoutes(app);
  connectErrorHandlers(app);
  startApp(app);
});
