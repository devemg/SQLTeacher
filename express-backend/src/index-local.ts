import { Sentencia } from "./Analizador/AST/base/sentencia.base";
import { TablaSimbolos } from "./Analizador/AST/TablaSimbolos/tabla-simbolos";

const gramatica = require('../dist/Analizador/gramatica');
var fs = require('fs');

fs.readFile('src/sql-code.sql', (err:any, data:any) => {
    if (err) {
        throw err;
    } 
    const text = data.toString();
    const response = gramatica.parse(text);
    const ast = response.ast;
    try {
        if (ast) {
            const consola = {
                log: (element: any)=> console.log(element)
            }
            const tsGlobal = new TablaSimbolos('global');
            ast.forEach((sentencia: Sentencia) => {
                sentencia.Ejecutar(tsGlobal, consola);
            });
            console.log('...........................................');
            tsGlobal.errores.forEach(e => {
                console.log('----> ', e.message);
            });
        } else {
            console.log('errores en tiempo de compilación');
        }
     } catch (e) {
        console.log('error en tiempo de ejecución');
        //console.log(e.getMessage());
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
