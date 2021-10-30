import { ErrorSemantico } from "../Errores/error-semantico";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Expresion } from "./expresion";
import { TipoDato } from "./tipos/tipo-dato";

export class ExpIncremento extends Expresion {
    
    variable: string;
    
    constructor(variable: string, linea: number, columna: number) {
        super(linea,columna);
        this.variable = variable;
    }

    /**
     * ++variable; primero se suma y luego se retorna el valor
     * variable++; se retorna el valor antes de hacer la suma 
     * 
     * @variable = 1; 
     * print (@variable++); -----> 1
     * print (++@variable); ------> 2
     *   
     * @param tablaSimbolos 
     */

    getValor(tablaSimbolos: TablaSimbolos) {
        const simbolo = tablaSimbolos.getSimbolo(this.variable);
       if (simbolo) {
        const valor = simbolo.valor;
        if (simbolo.tipoDato == TipoDato.ENTERO || simbolo.tipoDato == TipoDato.DECIMAL) {
            simbolo.valor = simbolo.valor + 1;
            return valor;
        } else {
            throw new ErrorSemantico(`La variable "${this.variable}" no es de tipo numerico`, this.linea, this.columna);
        }
       } else {
           throw new ErrorSemantico(`La variable "${this.variable}" no existe`, this.linea, this.columna);
       }

    }

    getTipo(tablaSimbolos: TablaSimbolos) {
        const simbolo = tablaSimbolos.getSimbolo(this.variable);
       if (simbolo) {
        return simbolo.tipoDato;
       } else {
           throw new ErrorSemantico(`La variable "${this.variable}" no existe`, this.linea, this.columna);
       }
    }
    
    getCodigoAST() {
        return { codigo: '', nombreNodo: '' };
    }
}
