import { TipoDato } from "../Expresiones/tipos/tipo-dato";

export class TablaDB {
    columnas: Array<ColumnaDB>;
    filas: Array<FilaDB>;
    nombre: string;
    composePrimaryKey: boolean;

    constructor(nombre: string, columnas: Array<ColumnaDB>) {
        this.columnas = columnas;
        this.filas = [];
        this.nombre = nombre;
        this.composePrimaryKey = true;
    }
}

export class ColumnaDB {
    nombre: string;
    tipo: TipoDato;
    isPrimaryKey: boolean;

    constructor(nombre: string, tipo: TipoDato, isPrimary: boolean) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.isPrimaryKey = isPrimary;
    }
}

export class FilaDB {
    values: Array<CampoDB> = [];
}

export class CampoDB {
    key: string;
    name: any;

    constructor(key: string, name: any) {
        this.key = key;
        this.name = name;
    }
}