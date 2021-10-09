export class ErrorSemantico extends Error {
    linea: number;
    columna: number;
    constructor(mensaje: string, linea: number, columna: number) {
        super(mensaje);
        this.linea = linea;
        this.columna = columna;
    }

    getMessage(): string {
        return `Error Semántico: ${this.message} en línea ${this.linea} y columna ${this.columna}`;
    }
}