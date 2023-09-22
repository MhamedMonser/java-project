package com.firas.LoginAndRegistration.models;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Translators")
public class Translator {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Age is required")
	@Min(value = 10, message = "Age must be at least 10")
	@Max(value = 100, message = "Age must not exceed 100")
	private Integer age;

	@NotBlank(message = "Gender is required")
	private String gender;

	@NotNull(message = "Phone number is required")
	@Min(value = 10000000, message = "Phone number must be exactly 8 digits")
	@Max(value = 99999999, message = "Phone number must be exactly 8 digits")
	private Integer phone;

	@NotNull(message = "CIN is required")
	@Min(value = 10000000, message = "CIN must be exactly 8 digits")
	@Max(value = 99999999, message = "CIN must be exactly 8 digits")
	private Integer cin;


	private String image;

	@NotBlank(message = "Description is required")
	@Size(min = 15, max = 300, message = "Description must be between 15 and 300 characters")
	private String description;

	@NotNull(message = "Price is required")
	@Min(value = 1, message = "Price must be at least 1")
	@Max(value = 9999, message = "Price must not exceed 9999")
	private Integer price;

	// 1:1
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_id")
	@JsonInclude(JsonInclude.Include.NON_NULL) 
	@JsonManagedReference
	@JsonIgnore
	private User translator;
	
	@OneToMany(mappedBy="translator", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Video> Translatorvideos;

	// 1:M
	@OneToMany(mappedBy="translator", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	   @JsonInclude(JsonInclude.Include.NON_NULL) 
	   @JsonManagedReference
	   @JsonIgnore
	private List<ScheduleEventData> scheduleAppointment;
	


	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="address_id")
	   @JsonInclude(JsonInclude.Include.NON_NULL) 
	   @JsonManagedReference
	   @JsonIgnore
	   private Address address;


	// This will not allow the createdAt column to be updated after creation
	@Column(updatable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdAt;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updatedAt;

	// EMPTY CONSTRUCTOR
	public Translator() {
	}

	// methods
	// other getters and setters removed for brevity
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

	// GETTERS & SETTERS
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Integer getPhone() {
		return phone;
	}

	public void setPhone(Integer phone) {
		this.phone = phone;
	}

	public Integer getCin() {
		return cin;
	}

	public void setCin(Integer cin) {
		this.cin = cin;
	}


	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public User getTranslator() {
		return translator;
	}

	public void setTranslator(User translator) {
		this.translator = translator;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	public List<Video> getTranslatorvideos() {
		return Translatorvideos;
	}

	public void setTranslatorvideos(List<Video> translatorvideos) {
		Translatorvideos = translatorvideos;
	}

	public List<ScheduleEventData> getScheduleAppointment() {
		return scheduleAppointment;
	}

	public void setScheduleAppointment(List<ScheduleEventData> scheduleAppointment) {
		this.scheduleAppointment = scheduleAppointment;
	}

}
