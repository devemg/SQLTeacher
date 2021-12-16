import { ErrorSemantico } from "../Errores/error-semantico";
import { TablaDB } from "./tabla";

export class BaseDeDatos {
    nombre: string;
    tablas: Array<TablaDB>;

    constructor(nombre: string) {
        this.nombre = nombre; 
        this.tablas = [];
    }

    addTabla(tabla: TablaDB): void {
        this.tablas.push(tabla);
    }
}