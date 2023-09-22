package com.firas.LoginAndRegistration.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.firas.LoginAndRegistration.models.ScheduleEventData;
import com.firas.LoginAndRegistration.models.ScheduleEventDataDTO;
import com.firas.LoginAndRegistration.services.ScheduleEventService;

@RestController
public class ScheduleEventController {
	private final ScheduleEventService service;

	@Autowired
	public ScheduleEventController(ScheduleEventService service) {
		this.service = service;
	}

	// READ ALL
	@GetMapping("/api/schedule")
	public ResponseEntity<List<ScheduleEventDataDTO>> home() {
		List<ScheduleEventData> allEvents = service.allEvents();
		List<ScheduleEventDataDTO> newList = new ArrayList<>();
		for (ScheduleEventData scheduleEventData : allEvents) {
			newList.add(mapToDTO(scheduleEventData));
		}

//		System.out.println(newList);
		return ResponseEntity.ok().body(newList);
	}

	// ACTION ROUTE Create event
	@PostMapping("/api/schedule/insert-appointment")
	public ResponseEntity<Object> insertAppointment(@RequestBody ScheduleEventData request) {
		ScheduleEventData newScheduleEvent = service.insertAppointment(request);

		if (newScheduleEvent.equals(null)) {
			return new ResponseEntity<>("Failed to add schedule event", HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(newScheduleEvent, HttpStatus.CREATED);
		}
	}

	// DELETE
	@DeleteMapping("/api/schedule/{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
		service.deleteAppointment(id);
		return new ResponseEntity<>("{\"res\": \"appointment deleted successfully\"}", HttpStatus.OK);
	}

	public static ScheduleEventDataDTO mapToDTO(ScheduleEventData schedule) {
		ScheduleEventDataDTO scheduleDTO = new ScheduleEventDataDTO();
		scheduleDTO.setId(schedule.getId());
		scheduleDTO.setAllDay(schedule.isAllDay());
		scheduleDTO.setStartTime(schedule.getStartTime());
		scheduleDTO.setEndTime(schedule.getEndTime());
		scheduleDTO.setIsBlock(schedule.isIsBlock());
		scheduleDTO.setSubject(schedule.getSubject());
		return scheduleDTO;
	}


}