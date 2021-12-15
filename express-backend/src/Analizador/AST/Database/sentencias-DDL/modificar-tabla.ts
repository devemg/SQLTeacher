import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";
import { ColumnaCrearTabla } from "./crear-tabla";

export class ModificarTabla extends Sentencia {

    name: string;
    newColumns: Array<ColumnaCrearTabla> | null;
    removeColumns: Array<string> | null;

    constructor(name: string, newColumns: Array<ColumnaCrearTabla>, removeColumns: Array<string>, linea: number, columna: number) {
        super(linea, columna);
        this.name = name;
        this.newColumns = newColumns;
        this.removeColumns = removeColumns;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): void {
        console.log(this.name, this.newColumns, this.removeColumns);
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
}