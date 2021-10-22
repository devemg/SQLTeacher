import { Expresion } from "./expresion";
import { TipoDato } from "./tipos/tipo-dato";

export class ExpIncremento extends Expresion {
    
    variable: string;
    
    constructor(variable: string, linea: number, columna: number) {
        super(linea,columna);
        this.variable = variable;
    }

    getValor() {
        
    }

    getTipo() {
        return TipoDato.ENTERO;
    }
    
    getCodigoAST() {
        return { codigo: '', nombreNodo: '' };
    }
}
