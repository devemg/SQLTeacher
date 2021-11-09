import { Sentencia } from "./Analizador/AST/Sentencias/sentencia.base";
import { TablaSimbolos } from "./Analizador/AST/TablaSimbolos/tabla-simbolos";

const gramatica = require('../dist/Analizador/gramatica');
var fs = require('fs');

fs.readFile('src/codigo-fuente.txt', (err:any, data:any) => {
    if (err) {
        throw err;
    } 
    const text = data.toString();
    console.log("-----------------------------");
    const response = gramatica.parse(text);
    const ast = response.ast;
    try {
        if (ast) {
            let output = '';
            const tsGlobal = new TablaSimbolos('global');
            ast.forEach((sentencia: Sentencia) => {
                const salida = sentencia.Ejecutar(tsGlobal);
                if (salida) output+=salida;
            });
            //const astCode = getAST(ast);
            /*console.log({
                output,
                astCode: "",
                errores: response.errores
            });*/
            /*console.log({
                output,
                astCode: "",
                errores: response.errores
            });*/
        } else {
            console.log({errores: response.errores});
            /*response.errores.forEach((element: any) => {
                console.log(element);
            });*/
        }
     } catch (e) {
         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!! ERROR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
         //console.log(e);
         console.error(e);
     }
});

function getAST(sentencias: Sentencia[]) {
    let codigoFinal = 'digraph G { \n principal[label="AST"];\n';
    sentencias.forEach((sentencia) => {
        const codigo = sentencia.getCodigoAST();
        codigoFinal = codigoFinal + `
            ${codigo.codigo}\n
            principal -> ${codigo.nombreNodo};\n`;
        });
    codigoFinal = codigoFinal + '}';
    return codigoFinal;
}
