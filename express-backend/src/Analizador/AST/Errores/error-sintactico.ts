export class ErrorSintactico extends Error {
    linea: number;
    columna: number;
    constructor(mensaje: string, linea: number, columna: number) {
        super(`Error Sintáctico0: ${mensaje} en línea ${linea} y columna ${columna}`);
        this.linea = linea;
        this.columna = columna;
    }
}