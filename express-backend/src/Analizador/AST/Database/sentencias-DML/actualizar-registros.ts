import { Expresion } from "../../base/expresion.base";
import { Sentencia } from "../../base/sentencia.base";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";
import { ClausulaCondicion } from "../clausulas/clausula-condicion";

export class ActualizarRegistros extends Sentencia {
    nombreTabla: string; 
    asignaciones: Array<AsignacionActualizar>;
    condicional: ClausulaCondicion | null; 

    constructor(nombreTabla: string, asignaciones: Array<AsignacionActualizar>, condicional: ClausulaCondicion | null, linea: number, columna: number){
        super(linea, columna);
        this.nombreTabla = nombreTabla;
        this.asignaciones = asignaciones;
        this.condicional = condicional;
    }

    Ejecutar(tsActual: TablaSimbolos, isBreak?: boolean, isContinue?: boolean): string | void | undefined {
        throw new Error("Method not implemented.");
    }
    getCodigoAST(): { codigo: string; nombreNodo: string; } {
        throw new Error("Method not implemented.");
    }
}

export class AsignacionActualizar {
    nombre: string; 
    expresion: Expresion;
    linea: number; 
    columna: number;

    constructor(nombre: string, expresion: Expresion, linea: number, columna: number) {
        this.nombre = nombre;
        this.expresion = expresion; 
        this.linea = linea; 
        this.columna = columna;
    }
}