import { ErrorSemantico } from "../Errores/error-semantico";
import { Expresion } from "./expresion";
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
    getValor(): any {
        const valIzq = this.exprIzq.getValor();
        const valDer = this.expDer.getValor();
        const tipoIz = this.exprIzq.getTipo();
        const tipoDer = this.expDer.getTipo();
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

    getTipo(): TipoDato {
        const tipoIz = this.exprIzq.getTipo();
        const tipoDer = this.expDer.getTipo();
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

    evaluarTipos(tipoIzq: TipoDato, tipoDer: TipoDato): boolean {

        return false;
    }
}