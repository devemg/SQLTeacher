import { LogicaRelacional } from "../Expresiones/logica-relacional";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Declaracion } from "./declaracion";
import { Sentencia } from "./sentencia.base";

/*
export class For implements Sentencia {
    
    listaSentencias:  Array<Sentencia>;
    condicion: LogicaRelacional;

    constructor(declaracion: Declaracion, condicion: LogicaRelacional, incremento: Incremento, listaSent: Array<Sentencia>, linea: number, columna: number) {
        // asignar 
        this.listaSentencias = listaSent;
        this.condicion = condicion;
    }

    Ejecutar(tsActual: TablaSimbolos): void {
        const tsFor = new TablaSimbolos();
        // declaracion 
        while (true) {
            this.listaSentencias.forEach(element => {
                element.Ejecutar(tsFor);
            });

            // comprobacion de tipos
            if (!this.condicion.getValor()) {
                break;
            }
            incremento.Ejecutar(tsFor);
        }
    listTablas.push(tsFor);    
    }
}*/

/**
 * 
 * for (int @a = 0; @a < 10; @a++) {
 *  print('Hola');
 * }
 * 
 * 
 */