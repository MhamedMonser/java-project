package com.firas.LoginAndRegistration.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.firas.LoginAndRegistration.models.Address;
import com.firas.LoginAndRegistration.models.Translator;
import com.firas.LoginAndRegistration.repositories.AddressRepository;

@Service
public class AddressService {
	
	
		// === CRUD ===
		
		@Autowired
		private AddressRepository addressRepo;
		
		// READ ALL
		public List<Address> allAddress(){
			return addressRepo.findAll();
		}
		
		// CREATE
		public Address createAddress(Address a) {
			return addressRepo.save(a);
		}
		
		// READ ONE
		public Address findAddress(Long id) {
			
			Optional<Address> maybeAddress = addressRepo.findById(id);
			if(maybeAddress.isPresent()) {
				return maybeAddress.get();
			}else {
				return null;
			}
		}
		
		   public Address updateAddress(Address address) {
		        if (address == null) {
		            throw new IllegalArgumentException("Address cannot be null");
		        }

		        // Your update logic here, e.g., save the address
		        Address updatedAddress = addressRepo.save(address);

		        return updatedAddress;
		    }
		// DELETE
		public void deleteAddress(Long id) {
			addressRepo.deleteById(id);
		}
		
	}


