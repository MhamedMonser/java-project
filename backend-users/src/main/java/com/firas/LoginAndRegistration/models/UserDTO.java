package com.firas.LoginAndRegistration.models;

public class UserDTO {
	private Long id;
	private String userName;
	private String email;
	private String password;
	private Integer profile;
	private Translator translators;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getProfile() {
		return profile;
	}
	public void setProfile(Integer profile) {
		this.profile = profile;
	}
	public Translator getTranslators() {
		return translators;
	}
	public void setTranslators(Translator translators) {
		this.translators = translators;
	}

	
}