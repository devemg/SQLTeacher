import { Expresion } from "./expresion";
import { TipoDato } from "./tipos/tipo-dato";

export class Variable extends Expresion {
    nombre: string; 

    constructor(nombre: string, linea: number, columna: number) {
        super(linea, columna);
        this.nombre = nombre;
    }

    /**
     * Obtiene el valor almacenado
     * @returns valor
     */
    getValor(): any {
       return 0;
    }

    /**
     * Obtiene el tipo de dato asignado al valor
     * @returns Tipo de dato
     */
    getTipo(): TipoDato {
        return TipoDato.ENTERO;
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }

}