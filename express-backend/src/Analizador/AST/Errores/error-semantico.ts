export class ErrorSemantico extends Error {
    linea: number;
    columna: number;
    constructor(mensaje: string, linea: number, columna: number) {
        super(`Error Semántico: ${mensaje} en línea ${linea} y columna ${columna}`);
        this.linea = linea;
        this.columna = columna;
    }
}