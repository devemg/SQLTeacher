import { LogicaRelacional } from "../Expresiones/logica-relacional";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Declaracion } from "./declaracion";
import { Incremento } from "./incremento";
import { Sentencia } from "./sentencia.base";

export class SWhile extends Sentencia {
    condicion: LogicaRelacional;
    listaSentencias:  Array<Sentencia>;

    constructor(condicion: LogicaRelacional,listaSent: Array<Sentencia>, linea: number, columna: number) {
        super(linea,columna);
        // asignar 
        this.listaSentencias = listaSent;
        this.condicion = condicion;
    }

    Ejecutar(tsActual: TablaSimbolos): void {
        const tswhile = new TablaSimbolos(tsActual.getAmbito()+'_while');
        // declaracion 
        let contador = 0;
        while (true) {
            // comprobacion de tipos
            if (!this.condicion.getValor(tswhile)) {
                break;
            }
            if (contador == 10000000000) break; // condicion para parar evitar ciclos infinitos
            
            // ejecución            
            this.listaSentencias.forEach(element => {
                element.Ejecutar(tswhile);
            });
            contador++;
        }   
    }

    getCodigoAST() {
        return { codigo: '', nombreNodo: ''};
    }
}