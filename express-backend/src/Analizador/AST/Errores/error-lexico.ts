export class ErrorLexico extends Error {
    linea: number;
    columna: number;
    constructor(mensaje: string, linea: number, columna: number) {
        super(mensaje);
        this.linea = linea;
        this.columna = columna;
    }

    getMessage(): string {
        return `Error Léxico: Caracter '${this.message}' no reconocido en línea ${this.linea} y columna ${this.columna}`;
    }
}