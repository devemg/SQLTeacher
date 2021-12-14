import { ErrorSemantico } from "../Errores/error-semantico";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Expresion } from "../base/expresion.base";
import { TipoDato } from "./tipos/tipo-dato";
import { TipoAritmetica } from "./tipos/tipo-operacion-aritmetica";

export class Aritmetica extends Expresion {
   exprIzq: Expresion;
   expDer: Expresion;
   operador: TipoAritmetica; 

    constructor(linea: number, columna: number, exprIzq: Expresion,expDer: Expresion,operador: TipoAritmetica,) {
        super(linea, columna);
        this.expDer = expDer;
        this.exprIzq = exprIzq;
        this.operador = operador;
    }
    // 15 + 45
    // 15 + 45 - 79.78 + true *  487 / (1000*44) 
    /**
     * Retorna el valor real de la operación
     * @returns Valor
     */
    getValor(tablaSimbolos: TablaSimbolos): any {
        const valIzq = this.exprIzq.getValor(tablaSimbolos);
        const valDer = this.expDer?.getValor(tablaSimbolos); // puede ser null cuando se tiene un  número negativo -> - EXPRESION
        const tipoIz = this.exprIzq.getTipo(tablaSimbolos);
        const tipoDer = this.expDer?.getTipo(tablaSimbolos);
        switch(this.operador) {
            case TipoAritmetica.DIVISION: 
            if (this.evaluarTipos(tipoIz, tipoDer)) {
                /*if (tipoIz == TipoDato.ENTERO && tipoDer === TipoDato.ENTERO) {
                    return Math.trunc(valIzq / valDer);
                }*/
                return valIzq / valDer;
            }
            break;
            case TipoAritmetica.MULTIPLICACION:
                if (this.evaluarTipos(tipoIz, tipoDer)) {
                    return valIzq * valDer;
                }
            break;
            case TipoAritmetica.SUMA:
                if (this.evaluarTipos(tipoIz, tipoDer)) {
                    return valIzq + valDer;
                }
            break;
            case TipoAritmetica.RESTA: 
            if (!this.expDer) {
                if (tipoIz == TipoDato.ENTERO || tipoIz == TipoDato.DECIMAL) {
                    return -1 * valIzq;
                }
            }
            if (this.evaluarTipos(tipoIz, tipoDer)) {
                return valIzq - valDer;
            }
            break;
            case TipoAritmetica.MODULO: 
            if (this.evaluarTipos(tipoIz, tipoDer)) {
                /*if (tipoIz == TipoDato.ENTERO && tipoDer === TipoDato.ENTERO) {
                    return Math.trunc(valIzq % valDer);
                }*/
                return valIzq % valDer;
            }
            break;
            case TipoAritmetica.POTENCIA:
                if (this.evaluarTipos(tipoIz, tipoDer)) {
                    return valIzq ^ valDer;
                }
            break;
        }
    }

    /**
     * Obtiene el tipo de dato de la operación
     * @returns TipoDato
     */
    getTipo(tablaSimbolos: TablaSimbolos): TipoDato {
        const tipoIz = this.exprIzq.getTipo(tablaSimbolos);
        const tipoDer = this.expDer?.getTipo(tablaSimbolos);
        switch(this.operador) {
            case TipoAritmetica.SUMA: 
            if (tipoIz == TipoDato.ENTERO && tipoDer == TipoDato.ENTERO) {
                return TipoDato.ENTERO;
            } else if (tipoIz == TipoDato.DECIMAL && tipoDer == TipoDato.DECIMAL) {
                return TipoDato.DECIMAL;
            }else if (tipoIz == TipoDato.DECIMAL && tipoDer == TipoDato.ENTERO) {
                return TipoDato.DECIMAL;
            } else if (tipoIz == TipoDato.ENTERO && tipoDer == TipoDato.DECIMAL) {
                return TipoDato.DECIMAL;
            } else if (tipoIz === TipoDato.CADENA || tipoDer == TipoDato.CADENA) {
                return TipoDato.CADENA;
            } else {
                throw new ErrorSemantico(`Operación de suma entre ${tipoIz} y ${tipoDer} no soportada`, this.linea, this.columna);
            }
            break;
            case TipoAritmetica.RESTA: 
                if (!this.expDer) return tipoIz; // expDer puede ser nulo si se tiene un número negativo
            case TipoAritmetica.MULTIPLICACION:
            case TipoAritmetica.MODULO:
            case TipoAritmetica.DIVISION:
            if (tipoIz == TipoDato.ENTERO && tipoDer == TipoDato.ENTERO) {
                return TipoDato.ENTERO;
            } else if (tipoIz == TipoDato.DECIMAL && tipoDer == TipoDato.DECIMAL) {
                return TipoDato.DECIMAL;
            } else if (tipoIz == TipoDato.DECIMAL && tipoDer == TipoDato.ENTERO) {
                return TipoDato.DECIMAL;
            } else if (tipoIz == TipoDato.ENTERO && tipoDer == TipoDato.DECIMAL) {
                return TipoDato.DECIMAL;
            } else {
                throw new ErrorSemantico(`Operación de resta, módulo, división o multiplicación entre ${tipoIz} y ${tipoDer} no soportada`, this.linea, this.columna);
            }
            break;
            case TipoAritmetica.POTENCIA: 
            if (tipoIz == TipoDato.ENTERO && tipoDer == TipoDato.ENTERO) {
                return TipoDato.DECIMAL;
            } else if (tipoIz == TipoDato.DECIMAL && tipoDer == TipoDato.DECIMAL) {
                return TipoDato.DECIMAL;
            } else if (tipoIz == TipoDato.DECIMAL && tipoDer == TipoDato.ENTERO) {
                return TipoDato.DECIMAL;
            } else if (tipoIz == TipoDato.ENTERO && tipoDer == TipoDato.DECIMAL) {
                return TipoDato.DECIMAL;
            }  else {
                throw new ErrorSemantico(`Operación de potencia entre ${tipoIz} y ${tipoDer} no soportada`, this.linea, this.columna);
            }
            break;
        }
    }

    /**
     * Evalua según el operador si la los tipos de datos son compatibles
     * 
     * @param tipoIzq Tipo de dato de operando a la izquierda del operador
     * @param tipoDer Tipo de dato de operando a la derecha del operador
     * @returns 
     */
    evaluarTipos(tipoIzq: TipoDato, tipoDer: TipoDato): boolean {
        switch(this.operador) {
            case TipoAritmetica.SUMA: 
            return (tipoIzq == TipoDato.ENTERO || tipoIzq == TipoDato.DECIMAL || TipoDato.CADENA) && 
                    (tipoDer == TipoDato.ENTERO || tipoDer == TipoDato.DECIMAL || tipoDer == TipoDato.CADENA); 
            case TipoAritmetica.RESTA: 
            case TipoAritmetica.MULTIPLICACION:
            case TipoAritmetica.MODULO:
            case TipoAritmetica.DIVISION:
            case TipoAritmetica.POTENCIA: 
            return (tipoIzq == TipoDato.ENTERO || tipoIzq == TipoDato.DECIMAL) && 
                    (tipoDer == TipoDato.ENTERO || tipoDer == TipoDato.DECIMAL); 
        }
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: 'EXPRESION', nombreNodo: 'EXPRESION' };
    }
}