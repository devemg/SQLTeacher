import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";
import { ClausulaCondicion } from "../clausulas/clausula-condicion";

export class EliminarRegistros extends Sentencia {
    nombreTabla: string; 
    condicional: ClausulaCondicion;

    constructor(nombreTabla: string, condicional: ClausulaCondicion, linea: number, columna: number) {
        super(linea, columna);
        this.nombreTabla = nombreTabla; 
        this.condicional = condicional;
    }

    Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | void | undefined {
        throw new Error("Method not implemented.");
    }
    getCodigoAST(): { codigo: string; nombreNodo: string; } {
        throw new Error("Method not implemented.");
    }
}