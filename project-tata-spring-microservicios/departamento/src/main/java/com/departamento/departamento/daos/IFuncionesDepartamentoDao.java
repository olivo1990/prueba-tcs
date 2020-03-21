package com.departamento.departamento.daos;

import java.util.List;

import com.departamento.departamento.entities.Funciones;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IFuncionesDepartamentoDao extends JpaRepository<Funciones, Long>{
    public List<Funciones> findByIdDepartamento(long idDepartamento);
}