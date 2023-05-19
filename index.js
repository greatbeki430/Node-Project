
const http = require('http');
//import { exists } from 'fs';
//const exists = require('fs');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';

const port = 3000;
const server = http.createServer((req,res) =>{
    console.log('Request for', + req.url + ' by method ' +req.method);

    if(req.method == 'GET'){
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html'

        else fileUrl = req.url;


        var filePath = path.resolve('./public' +fileUrl);

        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath,(exists) =>{
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1></h1>Error 404:' +fileUrl+ 
                      ' not found</body></html>');

                return;
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                }
            })
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1></h1>Error 404:' +fileUrl+ 
              ' not an HTML file</body></html>');

        return;
        }
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1></h1>Error 404:' +res.method+ 
          ' not supported</body></html>');

    return;
    }
});

server.listen(port,hostname,() =>{
    console.log(`Server is running at http://${hostname}:${port}`)
});