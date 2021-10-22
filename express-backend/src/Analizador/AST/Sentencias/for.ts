import { LogicaRelacional } from "../Expresiones/logica-relacional";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Declaracion } from "./declaracion";
import { Incremento } from "./incremento";
import { Sentencia } from "./sentencia.base";

export class For extends Sentencia {
    declaracion: Declaracion;
    condicion: LogicaRelacional;
    listaSentencias:  Array<Sentencia>;
    incremento: Incremento;

    constructor(declaracion: Declaracion, condicion: LogicaRelacional, incremento: Incremento, 
        listaSent: Array<Sentencia>, linea: number, columna: number) {
        super(linea,columna);
        // asignar 
        this.declaracion = declaracion;
        this.listaSentencias = listaSent;
        this.condicion = condicion;
        this.incremento = incremento;
        this.condicion = condicion;
    }

    Ejecutar(tsActual: TablaSimbolos): void {
        console.log(this);
        return;
        const tsFor = new TablaSimbolos(tsActual.getAmbito()+'_for');
        // declaracion 
        this.declaracion.Ejecutar(tsFor);
        let contador = 0;
        while (true) {
            this.listaSentencias.forEach(element => {
                element.Ejecutar(tsFor);
            });

            // comprobacion de tipos
            if (!this.condicion.getValor()) {
                break;
            }
            if (contador == 10000000000) break; // condicion para parar evitar ciclos infinitos
            // ejecutar incremento
            this.incremento.Ejecutar(tsFor);
            contador++;
        }   
    }

    getCodigoAST() {
        return { codigo: '', nombreNodo: ''};
    }
}

/**
 * 
 * for (int @a = 0; @a < 10; @a++) {
 *  print('Hola');
 * }
 * 
 * 
 */