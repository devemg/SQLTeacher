import { Expresion } from "../Expresiones/expresion";
import { Sentencia } from "./sentencia.base";

export class Print extends Sentencia {

    valor: Expresion;

    constructor(valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
    }

    Ejecutar() {
        // \t ->  
        // \n -> salto de linea 
        // ......   
        console.log(this.valor.getValor());
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
    
}