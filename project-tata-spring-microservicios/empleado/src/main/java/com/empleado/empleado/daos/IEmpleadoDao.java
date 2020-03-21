package com.empleado.empleado.daos;

import com.empleado.empleado.entities.Empleado;

import org.springframework.data.jpa.repository.JpaRepository;
/**
 * Se crea la interface que se encarga de almacenar, listar y actualizar al empleado
 */
public interface IEmpleadoDao extends JpaRepository<Empleado, Long>{
    public Empleado findById(long idEmpleado);
}