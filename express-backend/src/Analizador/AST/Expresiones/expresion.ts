export abstract class Expresion {
    linea: number;
    columna: number; 

    constructor(linea :number,columna: number) {
        this.linea = linea;
        this.columna = columna;
    }

    abstract getValor(): any;

    abstract getTipo(): any;

    abstract getCodigoAST(): { codigo: string, nombreNodo: string };
    
}