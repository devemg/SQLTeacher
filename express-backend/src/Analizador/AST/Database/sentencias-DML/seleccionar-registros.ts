import { Clausula } from "../../base/clausula.base";
import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";

export class SeleccionarRegistros extends Sentencia {
    columnas: Array<string>; 
    nombreTabla: string; 
    clausulas: Array<Clausula>;
    
    constructor(nombreTabla: string, columnas: Array<string>, clausulas: Array<Clausula>, linea: number, columna: number) {
        super(linea, columna);
        this.nombreTabla = nombreTabla; 
        this.columnas = columnas;
        this.clausulas = clausulas;
    }

    Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | void | undefined {
        throw new Error("Method not implemented.");
    }
    getCodigoAST(): { codigo: string; nombreNodo: string; } {
        throw new Error("Method not implemented.");
    }
}
