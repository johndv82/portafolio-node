const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function(req, res){
    //Evitar solicitud de favicon.ico
    if(req.url == '/favicon.png'){
        res.writeHead(204);
        res.end();
        return;
    }

    //Obtén la ruta absoluta del archivo solicitado
    const filePath = path.join(__dirname, 'public', req.url);

    console.log('Ruta del archivo solicitado: ', filePath); //Mensaje de depuración

    //Verifica si filePath es un archivo o un directorio
    if(fs.statSync(filePath).isDirectory()){
        console.error('Se intentó leer un directorio: ', filePath);
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('Error del servidor');
        return;
    }

    //Lee el archivo solicitado y responde con su contenido
    fs.readFile(filePath, (err, content)=>{
        if(err){
            console.error('Error al leer el archivo: ', err);
            if(err.code == 'ENOENT'){
                console.error('Archivo no encontrado: ', filePath);
                res.writeHead(404, {'Content-Type':'text/html'});
                res.end('Archivo no encontrado');
            }else{
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('Error del servidor');
            }
        }else{
            const ext = path.extname(filePath);
            let contentType = 'text/html';
            switch(ext){
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'text/json';
                    break;
                case '.png':
                    contentType = 'text/png';
                    break;
                case '.jpg':
                    contentType = 'text/jpeg';
                    break;
            }
            console.log('Sirviendo archivo: ', filePath);

            //Archivo encontrado, evía el contenido como respuesta
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    });
});

const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
