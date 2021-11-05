import { Expresion } from "../Expresiones/expresion";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "./sentencia.base";
import { ErrorSemantico } from "../Errores/error-semantico";
import { TipoDato } from "../Expresiones/tipos/tipo-dato";

export class Asignacion extends Sentencia {
    variable: string;
    expresion: Expresion;

    constructor(variable: string, expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.variable = variable;
        this.expresion = expresion;
    }

    Ejecutar(tsActual: TablaSimbolos): string | undefined {
        let sim = tsActual.getSimbolo(this.variable);
       if (sim) {
        // comprobación de tipos 
        //revisar casteos implicitos
        if (this.canCast(sim.tipoDato, tsActual)) {
            sim.valor = this.expresion.getValor(tsActual); // asignando valor
        } else {
            throw new ErrorSemantico(`El tipo de dato no se puede asignar a ${this.variable}. `,this.linea, this.columna);            
        }

    } else {
        throw new ErrorSemantico(`La variable "${this.variable}" no existe. `,this.linea, this.columna);
       }
       return;
    }

    /**
     * Revisa si se puede o no asignar un valor por los tipos
     * @param tipo tipo de dato de simbolo
     * @returns si se puede asignar el valor
     */
    canCast(tipo: TipoDato, tabla: TablaSimbolos): boolean {
        let exptipo = this.expresion.getTipo(tabla);
        if (exptipo === tipo) return true;
        if (tipo == TipoDato.ENTERO || tipo == TipoDato.DECIMAL) {
            return exptipo === TipoDato.ENTERO || exptipo === TipoDato.DECIMAL;
        }
        return false;
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