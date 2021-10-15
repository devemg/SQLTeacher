import { ErrorSemantico } from "../Errores/error-semantico";
import { TipoDato } from "../Expresiones/tipos/tipo-dato";

export class TablaSimbolos extends Array<Simbolo> {
    mostrarEnConsola(): void {
        this.forEach(element => {
            console.log('TABLA SIMBOLOS ---------------------------------------------------------------');
            console.log(element);
            console.log('------------------------------------------------------------------------------');
        });
    }

    /**
     * Agrega un nuevo símbolo
     * @param simbolo
     */
    add(simbolo: Simbolo) {
    let found = false;
        this.forEach(element => {
            if (element.variable === simbolo.variable) {
                found = true;
                return;
            }
        });
    if (!found) {
        this.add(simbolo);
    } else {
        throw new ErrorSemantico(`La variable ${simbolo.variable} ya existe`, simbolo.linea, simbolo.columna);
    }
    }

    /**
     * Obtiene un simbolo almacenado
     * @param variable 
     * @returns 
     */
    get(variable: string): Simbolo | null {
        const list = this.filter(value => value.variable === variable);
        return list.length > 0 ? list[0] : null;
    }
}

export class Simbolo {
    linea: number;
    columna: number;
    variable: string;
    valor: any;
    tipoDato: TipoDato;
    ambito: string;

    constructor(tipoDato: TipoDato, variable: string, valor: any, ambito: string, linea: number, columna: number) {
        this.tipoDato = tipoDato;
        this.variable = variable;
        this.valor = valor;
        this.ambito = ambito;
        this.linea = linea;
        this.columna = columna;
    }
}