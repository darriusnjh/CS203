package com.tariff.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tariff.app.entity.Tariff;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Tariff, Long> {

    @Query("SELECT * FROM users WHERE username= :username AND password =:password  ")
    Optional<Tariff> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

}
