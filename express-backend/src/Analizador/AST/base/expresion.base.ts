import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";

export abstract class Expresion {
    linea: number;
    columna: number; 

    constructor(linea :number,columna: number) {
        this.linea = linea;
        this.columna = columna;
    }

    abstract getValor(tabla: TablaSimbolos): any;

    abstract getTipo(tablaSimbolos: TablaSimbolos): any;

    abstract getCodigoAST(): { codigo: string, nombreNodo: string };
    
}