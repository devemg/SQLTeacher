import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";

export abstract class Sentencia {
    linea: number;
    columna: number; 

    constructor(linea :number,columna: number) {
        this.linea = linea;
        this.columna = columna;
    }

    abstract Ejecutar(tsActual: TablaSimbolos): void;

    abstract getCodigoAST(): { codigo: string, nombreNodo: string };

}