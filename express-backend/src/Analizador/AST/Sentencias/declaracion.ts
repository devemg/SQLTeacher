import { ErrorSemantico } from "../Errores/error-semantico";
import { Expresion } from "../Expresiones/expresion";
import { TipoDato } from "../Expresiones/tipos/tipo-dato";
import { Simbolo, TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "./sentencia.base";

export class Declaracion extends Sentencia {
    tipoDato: TipoDato;
    listaIds: string[];
    expresion: Expresion;

    constructor(tipoDato: TipoDato, listaIds: string[], expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.tipoDato = tipoDato;
        this.listaIds = listaIds;
        this.expresion = expresion;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): void {
        this.listaIds.forEach(element => {
            if (!tablaSimbolos.exists(element)) {
                if (this.expresion) {
                    //comprobar tipos 
                    // se deben comprobar casteos implicitos
                    if (this.canCast()) {
                        let sim = new Simbolo(this.tipoDato, element,this.getValor(), tablaSimbolos.getAmbito(),this.linea, this.columna);
                        tablaSimbolos.add(sim);
                    } else {
                        throw new ErrorSemantico(`Los tipos para la variable ${element} no coinciden. `,this.linea, this.columna);
                    }
                } else {
                    let sim = new Simbolo(this.tipoDato, element,this.getValor(), tablaSimbolos.getAmbito(),this.linea, this.columna);
                    tablaSimbolos.add(sim);
                }
            } else {
                throw new ErrorSemantico(`La variable "${element}" ya existe. `,this.linea, this.columna);
            }
        });
    }

    /**
     * Revisa si se puede o no asignar un valor por los tipos
     * @param tipo tipo de dato de simbolo
     * @returns si se puede asignar el valor
     */
    canCast(): boolean {
        let exptipo = this.expresion.getTipo();
        if (exptipo === this.tipoDato) return true;
        if (this.tipoDato == TipoDato.ENTERO || this.tipoDato == TipoDato.DECIMAL) {
            return exptipo === TipoDato.ENTERO || exptipo === TipoDato.DECIMAL;
        }
        return false;
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }

    /**
     * Retorna el valor de la expresión o el valor por defecto si no existe expresión
     * @returns Valor
     */
    getValor(): any {
        if (this.expresion) {
            return this.expresion.getValor();
        } else {

            switch(this.tipoDato) {
                case TipoDato.BOOLEANO: return false; 
                case TipoDato.CADENA:  return '';
                case TipoDato.DECIMAL: return 0.0;
                case TipoDato.ENTERO: return 0;
                case TipoDato.FECHA: return { dia: 1, mes: 1, anio: 1};
                case TipoDato.HORA: return { hora: 12, minutos: 0, segundos: 0};
            }
        }
    }

}