import { Expresion } from "../../base/expresion.base";
import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";

export class InsertarRegistros extends Sentencia {

    nombreTabla: string; 
    columnas: Array<string> | null;
    values: Array<Expresion>;

    constructor(nombreTabla: string, columnas: Array<string> | null, values: Array<Expresion>, linea: number, columna: number) {
        super(linea, columna);
        this.nombreTabla = nombreTabla;
        this.columnas = columnas;
        this.values = values;
    }
    Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | void | undefined {
        throw new Error("Method not implemented.");
    }
    getCodigoAST(): { codigo: string; nombreNodo: string; } {
        throw new Error("Method not implemented.");
    }
}