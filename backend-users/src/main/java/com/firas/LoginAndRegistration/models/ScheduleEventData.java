package com.firas.LoginAndRegistration.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "schedules")
public class ScheduleEventData {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;

	private Date startTime;
	private Date endTime;
	private String subject;
	private boolean isAllDay;
	private boolean isIsBlock = false;

	
	// M:1
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="translator_id")
	private Translator translator;
	

	// constructor
	public ScheduleEventData() {
	}

	public ScheduleEventData(Date startTime, Date endTime, String subject, boolean isAllDay,Boolean isIsBlock) {

		this.startTime = startTime;
		this.endTime = endTime;
		this.subject = subject;
		this.isAllDay = isAllDay;
		this.isIsBlock = isIsBlock;
	}

	
	// Getters and setters
	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public boolean isAllDay() {
		return isAllDay;
	}

	public void setAllDay(boolean isAllDay) {
		this.isAllDay = isAllDay;
	}

	public boolean isIsBlock() {
		return isIsBlock;
	}

	public void setIsBlock(boolean isIsBlock) {
		this.isIsBlock = isIsBlock;
	}

	public Translator getTranslator() {
		return translator;
	}

	public void setTranslator(Translator translator) {
		this.translator = translator;
	}


}