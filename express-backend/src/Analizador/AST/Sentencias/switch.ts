import { Expresion } from "../Expresiones/expresion";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "./sentencia.base";

export class Switch extends Sentencia {
    valor: Expresion;
    cases: Case[];
    default: Array<Sentencia>;
    constructor(valor: Expresion, cases: Case[], def: Array<Sentencia>,linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
        this.cases = cases;
        this.default = def;
    }

    Ejecutar(tsActual: TablaSimbolos): string | undefined {
        let isBreak = false;
        this.cases.forEach((sentenciaCase: Case) => {
            sentenciaCase.Ejecutar(tsActual, isBreak);
            if (isBreak) return;
        });
        if (!isBreak) {
            if (this.default) {
                this.default.forEach((element: Sentencia) => {
                    element.Ejecutar(tsActual);
                });
            }
        }
        return;
    }

    getCodigoAST(): any {
        return {};
    }
}


export class Case extends Sentencia {
    valor: Expresion; 
    sentencias: Array<Sentencia>;

    constructor(valor: Expresion, sentencias: Array<Sentencia>, linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
        this.sentencias = sentencias;
    }

    Ejecutar(tsActual: TablaSimbolos, isBreak: boolean): string | undefined {
        console.log("case ");
        return;
    }

    getCodigoAST(): any {
        return {};
    }
}