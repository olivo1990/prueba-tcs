package com.empleado.empleado.interfaces;

import java.util.List;
import com.empleado.empleado.entities.Empleado;

public interface IEmpleadoService{
    public Empleado guardarEmpleado(Empleado empleado);

    public List<Empleado> listar();

    public Empleado buscarPorIdEmpleado(long idEmpleado);
}