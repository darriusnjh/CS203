package com.tariff.app.repository;

import com.tariff.app.entity.BrazilTariff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrazilTariffRepository extends JpaRepository<BrazilTariff, Long> {
    
    @Query("SELECT t FROM BrazilTariff t WHERE t.hts8 = :hts8")
    Optional<BrazilTariff> findByHts8(@Param("hts8") String hts8);
    
    @Query("SELECT t FROM BrazilTariff t " +
       "WHERE t.hts8 LIKE CONCAT(:searchTerm, '%') " +
       "OR t.briefDescription LIKE CONCAT(:searchTerm, '%')")
    List<BrazilTariff> findByHts8OrDescriptionContaining(@Param("searchTerm") String searchTerm);
}
