package com.empleado.empleado.services;

import java.util.List;

import com.empleado.empleado.daos.IEmpleadoDao;
import com.empleado.empleado.entities.Empleado;
import com.empleado.empleado.interfaces.IEmpleadoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmpleadoService implements IEmpleadoService {

    @Autowired
    private IEmpleadoDao empleadoDao;

    /** 
     * Metodo que lista los empleados
     */
    @Override
    @Transactional(readOnly = true)
    public List<Empleado> listar() {
        
        return this.empleadoDao.findAll();
    }

    /**
     * Metodo que guarda y actualiza al empleado
     */
    @Override
    @Transactional
    public Empleado guardarEmpleado(Empleado empleado) {
        return this.empleadoDao.save(empleado);
    }

    /**
     * Metodo que guarda y actualiza al empleado
     */
    @Override
    @Transactional(readOnly = true)
    public Empleado buscarPorIdEmpleado(long idEmpleado) {
        return this.empleadoDao.findById(idEmpleado);
    }

}