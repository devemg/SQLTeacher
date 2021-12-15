import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";

export class CrearUsuario extends Sentencia {

    usuario: string;
    password: string;
    constructor( usuario: string, password: string, linea: number, columna: number) {
        super(linea, columna);
        this.usuario = usuario;
        this.password = password;
    }
    Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | void | undefined {
        throw new Error("Method not implemented.");
    }
    getCodigoAST(): { codigo: string; nombreNodo: string; } {
        throw new Error("Method not implemented.");
    }
}