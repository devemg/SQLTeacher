import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";

export class OtorgarPermisos extends Sentencia {

    usuario: string;
    baseDatos: string;
    constructor( usuario: string, baseDatos: string, linea: number, columna: number) {
        super(linea, columna);
        this.usuario = usuario;
        this.baseDatos = baseDatos;
    }
    Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | void | undefined {
        throw new Error("Method not implemented.");
    }
    getCodigoAST(): { codigo: string; nombreNodo: string; } {
        throw new Error("Method not implemented.");
    }
}