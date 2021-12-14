import { Clausula } from "../base/clausula.base";
import { LogicaRelacional } from "../Expresiones/logica-relacional";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";

export class ClausulaCondicion extends Clausula {
    condicion: LogicaRelacional;

    constructor(condicion: LogicaRelacional, linea: number, columna: number) {
        super(linea, columna);
        this.condicion = condicion;
    }   
}