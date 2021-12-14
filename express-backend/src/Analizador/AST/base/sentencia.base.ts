import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";

export abstract class Sentencia {
    linea: number;
    columna: number; 

    constructor(linea :number,columna: number) {
        this.linea = linea;
        this.columna = columna;
    }

    abstract Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | undefined | void;

    abstract getCodigoAST(): { codigo: string, nombreNodo: string };

}