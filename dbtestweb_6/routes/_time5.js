const http = require('http');
const hostname = 'ec2-54-180-155-65.ap-northeast-2.compute.amazonaws.com';
const port =4040;
const server = http.createServer((req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  res.end('Hello World\n');
});
server.listen(port,hostname,()=>{
  console.log('Server running at http://${hostname}:${port}/');
});
