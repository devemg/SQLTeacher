import { ErrorSemantico } from "../Errores/error-semantico";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Expresion } from "../base/expresion.base";
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
    getValor(tablaSimbolos: TablaSimbolos): any {
        const variable = tablaSimbolos.getSimbolo(this.nombre);
        if (variable) {
            return variable.valor;
        } else {
            throw new ErrorSemantico(`La variable "${this.nombre}" no existe`, this.linea, this.columna);
        }
    }

    /**
     * Obtiene el tipo de dato asignado al valor
     * @returns Tipo de dato
     */
    getTipo(tablaSimbolos: TablaSimbolos): TipoDato {
        const variable = tablaSimbolos.getSimbolo(this.nombre);
        if (variable) {
            return variable.tipoDato;
        } else {
            throw new ErrorSemantico(`La variable "${this.nombre}" no existe`, this.linea, this.columna);
        }
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }

}