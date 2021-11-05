import { Expresion } from "../Expresiones/expresion";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "./sentencia.base";

export class Print extends Sentencia {

    valor: Expresion;

    constructor(valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): string | undefined {
        // \t ->  
        // \n -> salto de linea 
        // ......   
        return this.valor.getValor(tablaSimbolos);
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
    
}