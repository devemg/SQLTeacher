const gramatica = require('../../dist/Analizador/gramatica');
var fs = require('fs');

fs.readFile('src/codigo-fuente.txt', (err, data) => {
    if (err) {
        throw err;
    } 
    const text = data.toString();
    const response = gramatica.parse(text);
    const ast = response.ast;
    try {
        if (ast) {
            const tsGlobal = new TablaSimbolos('global');
            ast.forEach((sentencia) => sentencia.Ejecutar(tsGlobal));
 
             /*let codigoFinal = 'digraph G { \n principal[label="AST"];\n';
             $1.forEach((sentencia) => {
 
                 const codigo = sentencia.getCodigoAST();
                 codigoFinal = codigoFinal + `
                 ${codigo.codigo}\n
                 principal -> ${codigo.nombreNodo};\n`;
             });
             codigoFinal = codigoFinal + '}';*/
        } else {
             //errores.forEach((error) => console.log(error.getMessage()));
        }
     } catch (e) {
         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!! ERROR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
         //console.log(e);
         console.error(e);
     }
});
