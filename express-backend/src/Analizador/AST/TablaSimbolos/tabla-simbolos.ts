import { ErrorSemantico } from "../Errores/error-semantico";
import { TipoDato } from "../Expresiones/tipos/tipo-dato";
import { BaseDeDatos } from "./base-de-datos";

export class TablaSimbolos {
    private ambito: string;
    private values: Array<Simbolo> = [];
    private padre: TablaSimbolos | undefined;
    private databases: Array<BaseDeDatos>;
    currentDatabase: BaseDeDatos | undefined;

    constructor(ambito: string, tablaPadre?: TablaSimbolos) {
        this.ambito = ambito;
        this.padre = tablaPadre;
        this.databases = tablaPadre? tablaPadre.databases : [];
        this.currentDatabase = tablaPadre?.currentDatabase;
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

    mostrarDBEnConsola(): void {
        this.databases.forEach(element => {
            console.log('BASES DE DATOS ---------------------------------------------------------------');
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

    crearDB(nombre: string, linea: number, columna: number): void {
        const index = this.databases.findIndex((db) => db.nombre === nombre);
        if(index === -1) {
            this.databases.push(new BaseDeDatos(nombre));
        } else {
            throw new ErrorSemantico(`La base de datos '${name}' ya existe`, linea, columna);
        }
        
    }

    eliminarDB(name: string, linea: number, columna: number): void {
        const index = this.databases.findIndex((db) => db.nombre === name);
        if(index > -1) {
            this.databases.splice(index, 1);
        } else {
            throw new ErrorSemantico(`La base de datos '${name}' no existe`, linea, columna);
        }
    }

    usarDB(name: string, linea: number, columna: number): void {
        const db = this.databases.find((db) => db.nombre === name);
        if(db) {
            this.currentDatabase = db;
        } else {
            throw new ErrorSemantico(`La base de datos '${name}' no existe`, linea, columna);
        }
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