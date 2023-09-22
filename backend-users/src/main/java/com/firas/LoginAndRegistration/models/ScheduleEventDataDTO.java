package com.firas.LoginAndRegistration.models;

import java.util.Date;

public class ScheduleEventDataDTO {
	private Long Id;
	private Date startTime;
	private Date endTime;
	private String subject;
	private boolean isAllDay;
	private boolean isIsBlock = false;
	
	
	// Add getters and setters for all fields
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
	
}