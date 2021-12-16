import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";

export class UsarDB extends Sentencia {

    name: string;

    constructor(name: string, linea: number, columna: number) {
        super(linea, columna);
        this.name = name;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): void {
        try {
            tablaSimbolos.usarDB(this.name, this.linea, this.columna);
        } catch(e) {
            tablaSimbolos.addError(e);
        }
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
}