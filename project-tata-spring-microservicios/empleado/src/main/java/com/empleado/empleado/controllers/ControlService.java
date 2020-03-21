package com.empleado.empleado.controllers;

import java.util.List;
import java.util.Map;

import com.empleado.empleado.entities.Empleado;
import com.empleado.empleado.interfaces.IEmpleadoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class ControlService{

    @Autowired
    private IEmpleadoService empleadoService;

    /**
     * 
     * @return
     * lista los empleados
     */
    @GetMapping("/listarEmpleados")
    public List<Empleado> listarEmpleados(){
        return this.empleadoService.listar();
    }

    /**
     * 
     * @param datos
     * @return
     * Guarda los empleados y se reciben los datos por medio de un map que contiene el objeto empleado y el id del empleado que se va actualizar
     */
    @PostMapping("/guardarEmpleado")
    public Empleado guardarEmpleado(@RequestBody Map<String, Object> datos){

        ObjectMapper mapper = new ObjectMapper();

        Empleado empleado = mapper.convertValue(
            datos.get("empleado"), 
            new TypeReference<Empleado>(){}
        );
        long idEmpleado = Long.parseLong(datos.get("idEmpleado").toString());
        Empleado empleadoRegistrar;

        if(idEmpleado > 0){
			empleadoRegistrar = this.empleadoService.buscarPorIdEmpleado(idEmpleado);
			empleadoRegistrar.setNombre(empleado.getNombre());
			empleadoRegistrar.setApellidos(empleado.getApellidos());
			empleadoRegistrar.setCorreo(empleado.getCorreo());
			empleadoRegistrar.setNroDocumento(empleado.getNroDocumento());
			empleadoRegistrar.setSalario(empleado.getSalario());
            empleadoRegistrar.setTelefono(empleado.getTelefono());
            empleadoRegistrar.setIdDepartamento(empleado.getIdDepartamento());
            empleadoRegistrar.setActivo(empleado.getActivo());
		}else{
			empleadoRegistrar = empleado;
		}

        return this.empleadoService.guardarEmpleado(empleadoRegistrar);

    }

}