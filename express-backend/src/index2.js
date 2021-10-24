const gramatica = require('../dist/Analizador/gramatica');
var fs = require('fs');

fs.readFile('src/codigo-fuente.txt', (err, data) => {
    if (err) {
        throw err;
    } 
    const text = data.toString();
    gramatica.parse(text);
});
