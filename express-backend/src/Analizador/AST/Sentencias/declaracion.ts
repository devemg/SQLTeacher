import { Expresion } from "../Expresiones/expresion";
import { TipoDato } from "../Expresiones/tipos/tipo-dato";
import { Sentencia } from "./sentencia.base";

export class Declaracion extends Sentencia {
    tipoDato: TipoDato;
    listaIds: string[];
    expresion: Expresion;

    constructor(tipoDato: TipoDato, listaIds: string[], expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.tipoDato = tipoDato;
        this.listaIds = listaIds;
        this.expresion = expresion;
    }

    Ejecutar(): void {
        console.log('DECLARAR', this);
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }

}