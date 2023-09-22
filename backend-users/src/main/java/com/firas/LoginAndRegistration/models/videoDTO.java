package com.firas.LoginAndRegistration.models;

public class videoDTO {
    private Long id;
    private String videoName;
    private String videoUrl;
    private String description;
    private String title;
    private boolean isAccept;
	private UserDTO user;
	private TranslatorDTO translator;


	public Long getId() {
		return id;
	}
	public UserDTO getUser() {
		return user;
	}
	public void setUser(UserDTO user) {
		this.user = user;
	}
	public TranslatorDTO getTranslator() {
		return translator;
	}
	public void setTranslator(TranslatorDTO translator) {
		this.translator = translator;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getVideoName() {
		return videoName;
	}
	public void setVideoName(String videoName) {
		this.videoName = videoName;
	}
	public String getVideoUrl() {
		return videoUrl;
	}
	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public boolean isAccept() {
		return isAccept;
	}
	public void setAccept(boolean isAccept) {
		this.isAccept = isAccept;
	}
    
    
}
