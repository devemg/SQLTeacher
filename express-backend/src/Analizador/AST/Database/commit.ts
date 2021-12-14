import { Sentencia } from "../base/sentencia.base";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";

export class Commit extends Sentencia {

    constructor(linea: number, columna: number) {
        super(linea, columna);
    }
    Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | void | undefined {
        throw new Error("Method not implemented.");
    }
    getCodigoAST(): { codigo: string; nombreNodo: string; } {
        throw new Error("Method not implemented.");
    }
}