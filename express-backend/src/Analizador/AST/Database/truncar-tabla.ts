import { Sentencia } from "../base/sentencia.base";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";

export class TruncarTabla extends Sentencia {

    name: string;
    constructor(name: string, linea: number, columna: number) {
        super(linea, columna);
        this.name = name;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): void {
        console.log('TRUNCAR TABLA');
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
}