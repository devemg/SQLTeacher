import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";

export class CrearDB extends Sentencia {

    name: string;
    ifExists: boolean;

    constructor(name: string, ifExists: boolean, linea: number, columna: number) {
        super(linea, columna);
        this.name = name;
        this.ifExists = ifExists;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): void {
        try {
            tablaSimbolos.crearDB(this.name, this.linea, this.columna);
        } catch(e: any) {
            if (!this.ifExists) {
                tablaSimbolos.addError(e);
            }
        } 
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
}