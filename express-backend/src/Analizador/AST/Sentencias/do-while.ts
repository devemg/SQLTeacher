import { LogicaRelacional } from "../Expresiones/logica-relacional";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "./sentencia.base";

export class SDoWhile extends Sentencia {
    condicion: LogicaRelacional;
    listaSentencias:  Array<Sentencia>;

    constructor(condicion: LogicaRelacional,listaSent: Array<Sentencia>, linea: number, columna: number) {
        super(linea,columna);
        // asignar 
        this.listaSentencias = listaSent;
        this.condicion = condicion;
    }

    Ejecutar(tsActual: TablaSimbolos): void {
        const tswhile = new TablaSimbolos(tsActual.getAmbito()+'_do_while', tsActual);
        // declaracion 
        let contador = 0;
        while (true) {            
            // ejecución            
            this.listaSentencias.forEach(element => {
                element.Ejecutar(tswhile);
            });

            // comprobacion de tipos
            if (!this.condicion.getValor(tswhile)) {
                break;
            }
            if (contador == 10000000000) break; // condicion para parar evitar ciclos infinitos
            contador++;
        }   
    }

    getCodigoAST() {
        return { codigo: '', nombreNodo: ''};
    }
}