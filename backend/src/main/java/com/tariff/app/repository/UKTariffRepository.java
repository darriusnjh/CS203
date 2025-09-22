package com.tariff.app.repository;

import com.tariff.app.entity.UKTariff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UKTariffRepository extends JpaRepository<UKTariff, Long> {
    
    @Query("SELECT t FROM UKTariff t WHERE t.hts8 = :hts8")
    Optional<UKTariff> findByHts8(@Param("hts8") String hts8);
    
    @Query("SELECT t FROM UKTariff t " +
       "WHERE t.hts8 LIKE CONCAT(:searchTerm, '%') " +
       "OR t.briefDescription LIKE CONCAT(:searchTerm, '%')")
    List<UKTariff> findByHts8OrDescriptionContaining(@Param("searchTerm") String searchTerm);
}
