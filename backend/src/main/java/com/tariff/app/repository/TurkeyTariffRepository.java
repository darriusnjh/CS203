package com.tariff.app.repository;

import com.tariff.app.entity.TurkeyTariff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TurkeyTariffRepository extends JpaRepository<TurkeyTariff, Long> {
    
    @Query("SELECT t FROM TurkeyTariff t WHERE t.hts8 = :hts8")
    Optional<TurkeyTariff> findByHts8(@Param("hts8") String hts8);
    
    @Query("SELECT t FROM TurkeyTariff t " +
       "WHERE t.hts8 LIKE CONCAT(:searchTerm, '%') " +
       "OR t.briefDescription LIKE CONCAT(:searchTerm, '%')")
    List<TurkeyTariff> findByHts8OrDescriptionContaining(@Param("searchTerm") String searchTerm);
}
