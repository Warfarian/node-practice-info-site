const express = require("express");
app = express();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;


app.get('*',(req,res)=>{
    let filePath =path.join(__dirname, path.normalize(req.url === '/' ? 'index.html' : req.url));
    let extensionName = path.extname(filePath)
    
    let contentType = 'text/html';

    switch(extensionName){
        case ('.html'):
            contentType = 'text/html'
            break
        case ('.css'):
            contentType = 'text/css'
            break
        case ('.json'):
            contentType = 'application/json'
            break
        case ('.png'):
            contentType = 'image/png'
            break
        case ('.jpg'):
            contentType = 'image/jpg'
            break
    }

    fs.readFile(filePath, (err, content)=> {
        if (err){
            if (err.code === 'ENOENT'){
                fs.readFile(path.join(__dirname,'404.html'), (err, content)=> {
                    if (err) throw err;
                    res.writeHead(404,{'Content-Type':'text/html'})
                    res.end(content, 'utf8');
                })
            }else{
                res.writeHead(500)
                res.end(`Server error : ${err.code}`)
            }
        }
        else{
            res.writeHead(200, {'Content-Type' : contentType });
            res.end(content,'utf8')
        }
    })

});

app.listen(PORT)
    
