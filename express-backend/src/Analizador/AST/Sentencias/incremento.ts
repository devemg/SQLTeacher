import { ExpIncremento } from "../Expresiones/incremento";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "../base/sentencia.base";

export class Incremento extends Sentencia {
    incremento: ExpIncremento;

    constructor(variable: string, linea: number, columna: number) {
        super(linea,columna);
        this.incremento = new ExpIncremento(variable, linea, columna);
    }
    
    Ejecutar(tActual: TablaSimbolos): string | undefined {
        // al obtener el valor, se retorna el valor de la variable y luego aumenta en 1 el valor
        // en este caso no nos interesa el valor que se retorna
        // nos interesa la acción de sumar un elemento
        this.incremento.getValor(tActual);
        return;
    }

    getCodigoAST() {
        return { codigo: '', nombreNodo: ''};
    }
}