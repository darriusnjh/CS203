package com.tariff.app.repository;

import com.tariff.app.entity.AustraliaTariff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AustraliaTariffRepository extends JpaRepository<AustraliaTariff, Long> {
    
    @Query("SELECT t FROM AustraliaTariff t WHERE t.hts8 = :hts8")
    Optional<AustraliaTariff> findByHts8(@Param("hts8") String hts8);
    
    @Query("SELECT t FROM AustraliaTariff t " +
       "WHERE t.hts8 LIKE CONCAT(:searchTerm, '%') " +
       "OR t.briefDescription LIKE CONCAT(:searchTerm, '%')")
    List<AustraliaTariff> findByHts8OrDescriptionContaining(@Param("searchTerm") String searchTerm);
}
