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
    }

    Ejecutar(tsActual: TablaSimbolos): string | undefined {
        const tsFor = new TablaSimbolos(tsActual.getAmbito()+'_for', tsActual);
        let output = "";
        // declaracion 
        this.declaracion.Ejecutar(tsFor);
        let contador = 0;
        while (true) {
            // comprobacion de tipos
            if (!this.condicion.getValor(tsFor)) {
                break;
            }
            if (contador == 10000000000) break; // condicion para parar evitar ciclos infinitos
            
            // ejecución            
            this.listaSentencias.forEach(element => {
                const salida = element.Ejecutar(tsFor);
                if (salida) output += salida;
            });

            // ejecutar incremento
            this.incremento.Ejecutar(tsFor);
            contador++;
        }
        return output;
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