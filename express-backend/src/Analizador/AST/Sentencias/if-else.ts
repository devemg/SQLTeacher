import { LogicaRelacional } from "../Expresiones/logica-relacional";
import { TablaSimbolos } from "../TablaSimbolos/tabla-simbolos";
import { Sentencia } from "./sentencia.base";

export class IfElse extends Sentencia {
    condicion: LogicaRelacional;
    listaSentenciasTrue:  Array<Sentencia>;
    listaSentenciasFalse:  Array<Sentencia> | undefined;

    constructor(condicion: LogicaRelacional, listaSentenciasTrue:Array<Sentencia>, linea: number, columna: number,
        listaSentenciasFalse?:Array<Sentencia>) {
        super(linea,columna);
        this.condicion = condicion;
        this.listaSentenciasTrue = listaSentenciasTrue;
        this.listaSentenciasFalse = listaSentenciasFalse;
    }

    Ejecutar(tsActual: TablaSimbolos): void {
        const tsIf = new TablaSimbolos(tsActual.getAmbito()+'_if', tsActual);
        if (this.condicion.getValor(tsIf)) {
            //ejecutar
            this.listaSentenciasTrue.forEach(element => {
                element.Ejecutar(tsIf);
            });
        } else {
            // si existe else
            if (this.listaSentenciasFalse) {
                //ejecutar
                this.listaSentenciasFalse.forEach(element => {
                    element.Ejecutar(tsIf);
                });
            }
        }
    }

    getCodigoAST() {
        return { codigo: '', nombreNodo: ''};
    }
}