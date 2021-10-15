import { Expresion } from "../Expresiones/expresion";
import { Sentencia } from "./sentencia.base";

export class Asignacion extends Sentencia {
    variable: string;
    expresion: Expresion;

    constructor(variable: string, expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.variable = variable;
        this.expresion = expresion;
    }

    Ejecutar(): void {
       console.log('ASIGNAR', this); 
    }
}