import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";
var fs = require('fs');

export class Commit extends Sentencia {

    constructor(linea: number, columna: number) {
        super(linea, columna);
    }
    Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | void | undefined {
        
    fs.writeFile('database.json', JSON.stringify(tsActual.databases,null,2), (err:any) => {
        if (err) {
        console.error(err);
        return;
        }
        //file written successfully
    });
    }
    getCodigoAST(): { codigo: string; nombreNodo: string; } {
        throw new Error("Method not implemented.");
    }
}