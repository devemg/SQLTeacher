import { ErrorSemantico } from "../Errores/error-semantico";
import { TipoDato } from "../Expresiones/tipos/tipo-dato";

export class TablaSimbolos {
    private ambito: string;
    private values: Array<Simbolo> = [];
    private padre: TablaSimbolos | undefined;

    constructor(ambito: string, tablaPadre?: TablaSimbolos) {
        this.ambito = ambito;
        this.padre = tablaPadre;
    }

    getAmbito(): string {
        return this.ambito;
    }

    mostrarEnConsola(): void {
        this.values.forEach(element => {
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
        this.values.forEach(element => {
            if (element.nombre === simbolo.nombre) {
                found = true;
                return;
            }
        });
        if (!found) {
            this.values.push(simbolo);
        } else {
            throw new ErrorSemantico(`La variable ${simbolo.nombre} ya existe`, simbolo.linea, simbolo.columna);
        }
    }

    /**
     * Obtiene un simbolo almacenado
     * @param variable 
     * @returns 
     */
     getSimbolo(variable: string): Simbolo | null {
        const list = this.values.filter(value => value.nombre.toLowerCase() === variable.toLowerCase());
        if (list.length > 0) {
            // si existe 
            return list[0];
        }
        return this.padre ? this.padre.getSimbolo(variable) : null;
    }

    exists(nombre: string): boolean {
        let i;
        for(i = 0; i < this.values.length; i++) {
            if (this.values[i].nombre == nombre) {
                return true;
            }
        }
        return this.padre ? this.padre.exists(nombre) : false;
    }
}

export class Simbolo {
    linea: number;
    columna: number;
    nombre: string;
    valor: any;
    tipoDato: TipoDato;
    ambito: string;

    constructor(tipoDato: TipoDato, nombre: string, valor: any, ambito: string, linea: number, columna: number) {
        this.tipoDato = tipoDato;
        this.nombre = nombre;
        this.valor = valor;
        this.ambito = ambito;
        this.linea = linea;
        this.columna = columna;
    }
}

export interface Fecha {
    dia: number;
    mes: number;
    anio: number;
}

export interface Hora {
    hora: number; 
    minutos: number; 
    segundos: number;
}