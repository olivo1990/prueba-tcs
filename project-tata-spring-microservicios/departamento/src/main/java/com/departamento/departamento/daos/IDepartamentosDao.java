package com.departamento.departamento.daos;

import java.util.List;

import com.departamento.departamento.entities.Departamento;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IDepartamentosDao extends JpaRepository<Departamento, Long>{
    public List<Departamento> findAll();
}