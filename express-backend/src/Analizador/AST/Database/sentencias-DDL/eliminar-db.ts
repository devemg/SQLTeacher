import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";

export class EliminarDB extends Sentencia {

    name: string;

    constructor(name: string, linea: number, columna: number) {
        super(linea, columna);
        this.name = name;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): void {
        tablaSimbolos.eliminarDB(this.name, this.linea, this.columna);
        console.log(tablaSimbolos.mostrarDBEnConsola());
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
}