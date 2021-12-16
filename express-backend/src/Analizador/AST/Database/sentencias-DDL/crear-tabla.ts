import { Sentencia } from "../../base/sentencia.base";
import { ErrorSemantico } from "../../Errores/error-semantico";
import { TipoDato } from "../../Expresiones/tipos/tipo-dato";
import { ColumnaDB, TablaDB } from "../../TablaSimbolos/tabla";
import { TablaSimbolos } from "../../TablaSimbolos/tabla-simbolos";

export class CrearTabla extends Sentencia {

    name: string;
    ifExists: boolean;
    columnas: Array<ColumnaCrearTabla>;

    constructor(name: string, ifExists: boolean, columnas: Array<ColumnaCrearTabla>, linea: number, columna: number) {
        super(linea, columna);
        this.name = name;
        this.ifExists = ifExists;
        this.columnas = columnas;
    }

    Ejecutar(tablaSimbolos: TablaSimbolos): void {
        if (tablaSimbolos.currentDatabase) {
            if (tablaSimbolos.currentDatabase.tablas.findIndex(t => t.nombre === this.name) > -1) {
                tablaSimbolos.addError(new ErrorSemantico(`La tabla '${this.name}' ya existe`, this.linea, this.columna));
                return;
            }    
            // creando columnas
            const columnas: ColumnaDB[] = [];
            let havePrimaryKey = false;
            let isValid = true;
            let primaryKeyNames = this.columnas.filter((col) => col.primaryNames !== null);
            let columnNames = null;
            if (primaryKeyNames.length > 1) {
                tablaSimbolos.addError(new ErrorSemantico('No se pueden declarar dos llaves primarias compuestas', this.linea, this.columna));
                return;
            } else {
                if (primaryKeyNames.length > 0) {
                    havePrimaryKey = true;
                    columnNames = primaryKeyNames[0].primaryNames;
                }
            }
            this.columnas.forEach((col) => {
                isValid = true;
                const columna = new ColumnaDB(col.nombre, col.tipo, col.isPrimaryKey);
                if (columna.tipo === TipoDato.COUNTER) {
                    if (!columna.isPrimaryKey) {
                        isValid = false;
                        tablaSimbolos.addError(new ErrorSemantico('Las columnas de tipo counter deben ser llaves primarias', col.linea, col.columna));
                    }
                }
                if (col.isPrimaryKey) {
                    if (col.primaryNames !== null || !havePrimaryKey) {
                        havePrimaryKey = true;
                    } else {
                        tablaSimbolos.addError(new ErrorSemantico('No pueden ser declaradas dos llaves primarias', col.linea, col.columna));
                        isValid = false;
                    }
                }

                if (isValid) {
                    if (columnas.findIndex(cl => cl.nombre === columna.nombre) > -1) {
                        tablaSimbolos.addError(new ErrorSemantico(`La columna '${columna.nombre}' no se puede repetir`, col.linea, col.columna));
                    } else {
                        if (!(col.isPrimaryKey && col.primaryNames !== null)) {
                            columnas.push(columna);
                        }
                    }
                } else {
                    return;
                }
            });
            if (!havePrimaryKey) {
                tablaSimbolos.addError(new ErrorSemantico(`La tabla '${this.name}' no tiene llave primaria`, this.linea, this.columna));
                return;
            }
            if (columnas.length > 0) {
                const tabla = new TablaDB(this.name, columnas);
                if (columnNames) {
                    tabla.composePrimaryKey = true;
                    columnNames.forEach((n: any) => {
                        const index = columnas.findIndex(cl => cl.nombre === n);
                        if(index === -1) {
                            tablaSimbolos.addError(new ErrorSemantico(`La llave primaria '${n}' no existe`, this.linea, this.columna));
                            return;
                        } else {
                            columnas[index].isPrimaryKey = true;
                        }
                    });
                }
                tablaSimbolos.currentDatabase.addTabla(tabla);
            }
        } else {
            tablaSimbolos.addError(new ErrorSemantico('No hay una base de datos seleccionada',this.linea, this.columna));
        }
    }

    getCodigoAST(): { codigo: string, nombreNodo: string } {
        return { codigo: '', nombreNodo: '' };
    }
}

export class ColumnaCrearTabla {

    nombre: string;
    tipo: TipoDato;
    isPrimaryKey: boolean;
    primaryNames: Array<string> | null;
    linea: number; 
    columna: number; 

    constructor(nombre: string, tipo: TipoDato, isPrimary: boolean,  names: Array<string> | null, linea: number, columna: number) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.isPrimaryKey = isPrimary;
        this.primaryNames = names;
        this.linea = linea;
        this.columna = columna;
    }
}