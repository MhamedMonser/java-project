package com.firas.LoginAndRegistration.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.firas.LoginAndRegistration.models.ScheduleEventData;
import com.firas.LoginAndRegistration.repositories.ScheduleEventDataRepository;

@Service
public class ScheduleEventService {
    private final ScheduleEventDataRepository repository;

    @Autowired
    public ScheduleEventService(ScheduleEventDataRepository repository) {
        this.repository = repository;
    }

    //CREATE
    public ScheduleEventData insertAppointment(ScheduleEventData appointment) {

        return repository.save(appointment);
    }
    
    //READ ALL
    // returns all the schedule events
    public List<ScheduleEventData> allEvents() {
        return repository.findAll();
    }
    
	// DELETE
	public void deleteAppointment(Long id) {
		repository.deleteById(id);
	}
	
}