import { Expresion } from "../base/expresion.base";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "../base/sentencia.base";

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
        console.log(this.valor.getValor(tablaSimbolos));
        return this.valor.getValor(tablaSimbolos) + "\n";
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
    
}