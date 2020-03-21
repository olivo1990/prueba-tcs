/* El modelo empleado el cual tiene como relación un departamento */
export class Empleado {
    id: number;
    nombre: string;
    apellidos: string;
    nroDocumento: number;
    correo: string;
    telefono:  number;
    activo: number;
    salario: number;
    idDepartamento: number;
}
