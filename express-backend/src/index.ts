import { Sentencia } from "./Analizador/AST/Sentencias/sentencia.base";
import { TablaSimbolos } from "./Analizador/AST/TablaSimbolos/tabla-simbolos";
const express = require('express')
const app = express()
var cors = require('cors')
const gramatica = require('../dist/Analizador/gramatica');

app.use(express.json()); //permite parsear a json
app.use(cors()); //activamos cors

app.post('/ejecutar', function (req: any, res: any) {
    const text = req.body.code;
    console.log(text);
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
            res.status(200).send({
                output,
                astCode: "",
                errores: response.errores
            });
            /*console.log({
                output,
                astCode: "",
                errores: response.errores
            });*/
        } else {
            res.status(400).send({errores: response.errores});
            /*response.errores.forEach((element: any) => {
                console.log(element);
            });*/
        }
     } catch (e) {
         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!! ERROR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
         //console.log(e);
         console.error(e);
     }
    //res.send('Todo Ok');
})
 
app.listen(3000, () => {
    console.log('LISTEN ON PORT 3000');
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
