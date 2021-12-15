import { Sentencia } from "../../base/sentencia.base";
import { TipoDato } from "../../Expresiones/tipos/tipo-dato";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";

export class CrearTabla extends Sentencia {

    name: string;
    ifExists: boolean;
    columnas: Array<ColumnaCrearTabla>;

    constructor(name: string, ifExists: boolean, columnas: Array<ColumnaCrearTabla>, linea: number, columna: number) {
        super(linea, columna);
        this.name = name;
        this.ifExists = ifExists;
        this.columnas = columnas;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): void {
        if (tablaSimbolos.currentDatabase) {
            console.log('CREATE DATABASE');
            //tablaSimbolos.currentDatabase.addTabla();
        }
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
}

export class ColumnaCrearTabla {

    nombre: string;
    tipo: TipoDato;
    isPrimaryKey: boolean;
    primaryNames: Array<string> | null;
    linea: number; 
    columna: number; 

    constructor(nombre: string, tipo: TipoDato, isPrimary: boolean,  names: Array<string> | null, linea: number, columna: number) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.isPrimaryKey = isPrimary;
        this.primaryNames = names;
        this.linea = linea;
        this.columna = columna;
    }
}