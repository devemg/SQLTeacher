import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Expresion } from "./expresion";
import { TipoDato } from "./tipos/tipo-dato";

export class Valor extends Expresion {
    valor: any; 
    tipo: TipoDato;

    constructor(linea: number, columna: number, tipo: TipoDato, valor: any) {
        super(linea, columna);
        this.tipo = tipo;
        this.valor = valor;
    }

    /**
     * Obtiene el valor almacenado
     * @returns valor
     */
    getValor(tablaSimbolos: TablaSimbolos): any {
       if (this.tipo == TipoDato.ENTERO || this.tipo == TipoDato.DECIMAL) {
        return Number(this.valor);
       }
       return this.valor;
    }

    /**
     * Obtiene el tipo de dato asignado al valor
     * @returns Tipo de dato
     */
    getTipo(): TipoDato {
        return this.tipo;
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }

}