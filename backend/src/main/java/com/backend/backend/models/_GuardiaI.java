package com.backend.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface _GuardiaI extends JpaRepository<_Guardia,Integer> {
    
}
