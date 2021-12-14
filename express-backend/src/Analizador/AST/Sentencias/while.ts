import { LogicaRelacional } from "../Expresiones/logica-relacional";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "../base/sentencia.base";

export class SWhile extends Sentencia {
    condicion: LogicaRelacional;
    listaSentencias:  Array<Sentencia>;

    constructor(condicion: LogicaRelacional,listaSent: Array<Sentencia>, linea: number, columna: number) {
        super(linea,columna);
        // asignar 
        this.listaSentencias = listaSent;
        this.condicion = condicion;
    }

    Ejecutar(tsActual: TablaSimbolos): string | undefined {
        const tswhile = new TablaSimbolos(tsActual.getAmbito()+'_while', tsActual);
        let output = "";
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
                const salida = element.Ejecutar(tswhile);
                if (salida) output += salida;
            });
            contador++;
        }   
        return output;
    }

    getCodigoAST() {
        return { codigo: '', nombreNodo: ''};
    }
}