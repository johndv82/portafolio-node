const http = require('http')
const fs = require('fs')

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
    // Observa como vienen las rutas
    // console.log(req.url);
    let home = fs.readFileSync('./public/index.html')
    if (req.url === '/') {
        res.write(home);
        return res.end();
    }
    if (req.url === '/photos') {
        let photos = fs.readFileSync('./public/photos.html')
        res.write(photos);
        return res.end();
    }
    res.write(home);
    return res.end();
});

// Especificar el puerto del servidor
server.listen(8080, (err) => {
    console.log('Server listen on port 8080');
});