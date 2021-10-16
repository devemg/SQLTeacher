import { ErrorSemantico } from "../Errores/error-semantico";
import { Expresion } from "./expresion";
import { TipoDato } from "./tipos/tipo-dato";
import { TipoLogicaRelacional } from "./tipos/tipo-operacion-logica-relacional";

export class LogicaRelacional extends Expresion {
   exprIzq: Expresion;
   expDer: Expresion;
   operador: TipoLogicaRelacional; 

    constructor(linea: number, columna: number, exprIzq: Expresion,expDer: Expresion,operador: TipoLogicaRelacional,) {
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
    getValor(): any {
        const valIzq = this.exprIzq.getValor();
        const valDer = this.expDer?.getValor(); // puede ser null cuando se tiene un  número negativo -> - EXPRESION
        const tipoIz = this.exprIzq.getTipo();
        const tipoDer = this.expDer?.getTipo();
        switch(this.operador) {
            case TipoLogicaRelacional.MAYOR: 
            if (this.evaluarTipos(tipoIz, tipoDer)) {
                return valIzq > valDer;
            }
            break;
            case TipoLogicaRelacional.MAYOR_IGUAL:
                if (this.evaluarTipos(tipoIz, tipoDer)) {
                    return valIzq >= valDer;
                }
            break;
            case TipoLogicaRelacional.MENOR:
                if (this.evaluarTipos(tipoIz, tipoDer)) {
                    return valIzq < valDer;
                }
            break;
            case TipoLogicaRelacional.MENOR_IGUAL: 
            if (this.evaluarTipos(tipoIz, tipoDer)) {
                return valIzq <= valDer;
            }
            break;
            case TipoLogicaRelacional.IGUAL: 
            if (this.evaluarTipos(tipoIz, tipoDer)) {
                return valIzq == valDer;
            }
            break;
            case TipoLogicaRelacional.DIFERENTE:
                if (this.evaluarTipos(tipoIz, tipoDer)) {
                    return valIzq != valDer;
                }
            break;
            case TipoLogicaRelacional.AND:
                if (this.evaluarTipos(tipoIz, tipoDer)) {
                    return valIzq && valDer;
                }
            break;
            case TipoLogicaRelacional.OR:
                if (this.evaluarTipos(tipoIz, tipoDer)) {
                    return valIzq || valDer;
                }
            break;
            case TipoLogicaRelacional.NOT:
                if (this.evaluarTipos(tipoIz, tipoDer)) {
                    return !valIzq;
                }
            break;
        }
    }

    /**
     * Obtiene el tipo de dato de la operación
     * Una operacion lógica o relacional siempre retornará un booleano
     * @returns TipoDato
     */
    getTipo(): TipoDato {
        return TipoDato.BOOLEANO;
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
            case TipoLogicaRelacional.MAYOR:
            case TipoLogicaRelacional.MENOR:
            case TipoLogicaRelacional.MAYOR_IGUAL:
            case TipoLogicaRelacional.MENOR_IGUAL:
            case TipoLogicaRelacional.IGUAL:
            case TipoLogicaRelacional.DIFERENTE: 
            return (tipoIzq == TipoDato.ENTERO || tipoIzq == TipoDato.DECIMAL) && 
                    (tipoDer == TipoDato.ENTERO || tipoDer == TipoDato.DECIMAL);
            case TipoLogicaRelacional.AND:
            case TipoLogicaRelacional.OR:
                return tipoIzq == TipoDato.BOOLEANO && tipoDer == TipoDato.BOOLEANO;
            default:
                throw new ErrorSemantico(`Operación lógica y relacional entre ${tipoIzq} y ${tipoDer} no soportada`, this.linea, this.columna);
        }
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
}