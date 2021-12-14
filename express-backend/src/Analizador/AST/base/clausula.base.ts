export abstract class Clausula {
    linea: number;
    columna: number; 

    constructor(linea :number,columna: number) {
        this.linea = linea;
        this.columna = columna;
    }

}