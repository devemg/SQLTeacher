import { Sentencia } from "../base/sentencia.base";
import { LogicaRelacional } from "../Expresiones/logica-relacional";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";

export class ClausulaCondicion extends Sentencia {
    condicion: LogicaRelacional;

    constructor(condicion: LogicaRelacional, linea: number, columna: number) {
        super(linea, columna);
        this.condicion = condicion;
    }   

    Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | void | undefined {
        throw new Error("Method not implemented.");
    }
    getCodigoAST(): { codigo: string; nombreNodo: string; } {
        throw new Error("Method not implemented.");
    }
}