package com.tariff.app.repository;

import com.tariff.app.entity.IndiaTariff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IndiaTariffRepository extends JpaRepository<IndiaTariff, Long> {
    
    @Query("SELECT t FROM IndiaTariff t WHERE t.hts8 = :hts8")
    Optional<IndiaTariff> findByHts8(@Param("hts8") String hts8);
    
    @Query("SELECT t FROM IndiaTariff t " +
       "WHERE t.hts8 LIKE CONCAT(:searchTerm, '%') " +
       "OR t.briefDescription LIKE CONCAT(:searchTerm, '%')")
    List<IndiaTariff> findByHts8OrDescriptionContaining(@Param("searchTerm") String searchTerm);
}
