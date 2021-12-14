import { Sentencia } from "../base/sentencia.base";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";

export class EliminarTabla extends Sentencia {

    name: string;
    ifExists: boolean;

    constructor(name: string, ifExists: boolean, linea: number, columna: number) {
        super(linea, columna);
        this.name = name;
        this.ifExists = ifExists;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): void {
        console.log('Eliminar TABLA');
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
}