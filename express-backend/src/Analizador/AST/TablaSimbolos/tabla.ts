import { TipoDato } from "../Expresiones/tipos/tipo-dato";

export interface TablaDB {
    columnas: Array<ColumnaDB>;
    filas: Array<FilaDB>;
}

export interface ColumnaDB {
    nombre: string;
    tipo: TipoDato;
    isCounter: boolean;
}

export interface FilaDB {
    values: Array<CampoDB>;
}

export interface CampoDB {
    key: string;
    name: any;
}