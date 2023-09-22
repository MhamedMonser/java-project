package com.firas.LoginAndRegistration.repositories;


import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.firas.LoginAndRegistration.models.Address;

public interface AddressRepository extends CrudRepository<Address, Long> {
	List<Address> findAll();
}
