import { Expresion } from "../Expresiones/expresion";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "./sentencia.base";
import { v4 as uuidv4 } from 'uuid';

export class Asignacion extends Sentencia {
    variable: string;
    expresion: Expresion;

    constructor(variable: string, expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.variable = variable;
        this.expresion = expresion;
    }

    Ejecutar(tsActual: TablaSimbolos): void {
       console.log('ASIGNAR', this); 
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        const codExp: { codigo: string, nombreNodo: string } = this.expresion.getCodigoAST();
        const x = Math.random() * 10;
        let nombreNodoPrincipal = (x < 0 ? Math.ceil(x) : Math.floor(x));
        const codigo =  `${nombreNodoPrincipal}[label="Asignacion"];
        nodo1_valor${nombreNodoPrincipal}[label="variable"]; 
        nodo1_valor_${nombreNodoPrincipal}[label="${this.variable}"];
        ${codExp.codigo}
        nodo1_valor${nombreNodoPrincipal} -> nodo1_valor_${nombreNodoPrincipal};
        ${nombreNodoPrincipal} -> nodo1_valor${nombreNodoPrincipal};
        ${nombreNodoPrincipal} -> ${codExp.nombreNodo};
        `;
        return { codigo, nombreNodo: nombreNodoPrincipal.toString() };
    }
}