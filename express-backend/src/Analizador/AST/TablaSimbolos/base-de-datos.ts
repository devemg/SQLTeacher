import { TablaDB } from "./tabla";

export class BaseDeDatos {
    nombre: string;
    tablas: Array<TablaDB>;

    constructor(nombre: string) {
        this.nombre = nombre; 
        this.tablas = [];
    }

    addTabla(nombre: string): void {
        
    }
}