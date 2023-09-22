package com.firas.LoginAndRegistration.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.firas.LoginAndRegistration.models.Translator;

public interface TranslatorRepository extends CrudRepository<Translator, Long> {
	List<Translator> findAll();
	 @Query("SELECT t FROM Translator t JOIN FETCH t.address WHERE t.id = :id")
	Translator findTranslatorWithAddressById(@Param("id") Long id);
	@Query("SELECT t FROM Translator t  JOIN FETCH t.address")
	List<Translator> findAllTranslatorsWithAddress();
	
	
	List<Translator> findByScheduleAppointmentStartTimeBetweenOrScheduleAppointmentEndTimeBetweenOrScheduleAppointmentStartTimeLessThanAndScheduleAppointmentEndTimeGreaterThan(Date startTime, Date endtTime, Date StartTime, Date EndTime, Date Starttime, Date Endtime);
	
	@Query("SELECT t FROM Translator t WHERE t.id NOT IN :idList")
    List<Translator> findTranslatorByIdNotIn(List<Long> idList);
	
	

	List<Translator> findByAgeLessThanAndPriceLessThanOrAgeGreaterThanAndPriceGreaterThan(int minAge, double minPrice, int maxAge, double maxPrice);
}
