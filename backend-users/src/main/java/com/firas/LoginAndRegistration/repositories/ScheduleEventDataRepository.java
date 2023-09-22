package com.firas.LoginAndRegistration.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firas.LoginAndRegistration.models.ScheduleEventData;

public interface ScheduleEventDataRepository extends JpaRepository<ScheduleEventData, Long> {
	List<ScheduleEventData> findAll();
	List<ScheduleEventData> findByStartTimeLessThanAndEndTimeLessThanOrStartTimeGreaterThanAndEndTimeGreaterThan(Date startTime, Date StartTime, Date endTime, Date EndTime);

}
