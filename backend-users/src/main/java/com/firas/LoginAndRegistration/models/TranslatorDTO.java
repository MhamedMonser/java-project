package com.firas.LoginAndRegistration.models;

public class TranslatorDTO {
    private Long id;
    private Integer age;
    private String gender;
    private Integer phone;
    private Integer cin;
    private String image;
    private String description;
    private Integer price;
    private AddressDTO address;
    private UserDTO Translator;

    public UserDTO getTranslator() {
		return Translator;
	}

	public void setTranslator(UserDTO translator) {
		Translator = translator;
	}

	public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }
    // Add getters and setters for all fields



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

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

}
