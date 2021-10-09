import { Expresion } from "./expresion";
import { TipoDato } from "./tipos/tipo-dato";

export class Valor extends Expresion {
    valor: any; 
    tipo: TipoDato;

    constructor(linea: number, columna: number, tipo: TipoDato) {
        super(linea, columna);
        this.tipo = tipo;
    }

    getValor(): any {
        return this.valor;
    }

    getTipo(): TipoDato {
        return this.tipo;
    }

}