package com.firas.LoginAndRegistration.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firas.LoginAndRegistration.models.Address;
import com.firas.LoginAndRegistration.models.AddressDTO;
import com.firas.LoginAndRegistration.models.ScheduleEventData;
import com.firas.LoginAndRegistration.models.Translator;
import com.firas.LoginAndRegistration.models.TranslatorDTO;
import com.firas.LoginAndRegistration.models.User;
import com.firas.LoginAndRegistration.models.UserDTO;
import com.firas.LoginAndRegistration.services.AddressService;
import com.firas.LoginAndRegistration.services.TranslatorService;
import com.firas.LoginAndRegistration.services.UserService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/translators")
@CrossOrigin(origins = "http://localhost:4200")
public class TranslatorControler {

    @Autowired
    private TranslatorService translatorService;

    @Autowired
    private UserService userService;

    @Autowired
    private AddressService addressService;

    @GetMapping
    public ResponseEntity<List<TranslatorDTO>> getAllTranslators() {
        List<Translator> allTranslators = translatorService.allTranslators();
        
        
        List<TranslatorDTO> translatorDTOList = new ArrayList<>();
        
 		for (Translator translator : allTranslators) {
 			translatorDTOList.add(mapToDTO(translator));
 		}
 		
 		return ResponseEntity.ok(translatorDTOList);
 	}
    

    @PostMapping("/create")
    public ResponseEntity<Object> createTranslator(
            @Valid @RequestBody TranslatorDTO translatorDto,
            BindingResult result,
            HttpSession session) {

        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        } else {
            // 1. Grab the current user's ID from the session
            Long userId = (Long) session.getAttribute("user_id");

            if (userId == null) {
                return new ResponseEntity<>("User not found in session", HttpStatus.NOT_FOUND);
            }

            // 2. Fetch the user from the DB using the userId
            User currentUser = userService.findOne(userId);

            if (currentUser == null) {
                return new ResponseEntity<>("User not found in the database", HttpStatus.NOT_FOUND);
            }

            // 3. Create a new Translator entity
            Translator newTranslator = new Translator();
            newTranslator.setAge(translatorDto.getAge());
            newTranslator.setGender(translatorDto.getGender());
            newTranslator.setPhone(translatorDto.getPhone());
            newTranslator.setCin(translatorDto.getCin());
            newTranslator.setImage(translatorDto.getImage());
            newTranslator.setDescription(translatorDto.getDescription());
            newTranslator.setPrice(translatorDto.getPrice());
            newTranslator.setTranslator(currentUser);

            // 4. Create a new Address entity
            Address newAddress = new Address();
            newAddress.setStreet(translatorDto.getAddress().getStreet());
            newAddress.setCity(translatorDto.getAddress().getCity());
            newAddress.setState(translatorDto.getAddress().getState());
            newAddress.setPostalCode(translatorDto.getAddress().getPostalCode());
            addressService.createAddress(newAddress);

            // 5. Set the created Address for the Translator
            newTranslator.setAddress(newAddress);

            // 6. Create the Translator
            Translator createdTranslator = translatorService.createTranslator(newTranslator);

            return new ResponseEntity<>(createdTranslator, HttpStatus.CREATED);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateTranslator(@Valid @RequestBody TranslatorDTO translatorDTO, @PathVariable Long id,
                                                   BindingResult result) {

        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        } else {
            try {
                Translator existingTranslator = translatorService.findTranslator(id);

                if (existingTranslator == null) {
                    return new ResponseEntity<>("Translator not found", HttpStatus.NOT_FOUND);
                }

                Address existingAddress = existingTranslator.getAddress();
                AddressDTO updatedAddress = translatorDTO.getAddress();

                existingAddress.setStreet(updatedAddress.getStreet());
                existingAddress.setCity(updatedAddress.getCity());
                existingAddress.setState(updatedAddress.getState());
                existingAddress.setPostalCode(updatedAddress.getPostalCode());

                existingTranslator.setId(id);

                existingTranslator.setAge(translatorDTO.getAge());
                existingTranslator.setGender(translatorDTO.getGender());
                existingTranslator.setPhone(translatorDTO.getPhone());
                existingTranslator.setCin(translatorDTO.getCin());
                existingTranslator.setImage(translatorDTO.getImage());
                existingTranslator.setDescription(translatorDTO.getDescription());
                existingTranslator.setPrice(translatorDTO.getPrice());

                Translator updatedTranslator = translatorService.updateTranslator(existingTranslator);

                return new ResponseEntity<>(updatedTranslator, HttpStatus.OK);
            } catch (EntityNotFoundException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            } catch (Exception e) {
                return new ResponseEntity<>("An error occurred while updating the Translator", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTranslator(@PathVariable Long id) {
        try {
            translatorService.deleteTranslator(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the Translator");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TranslatorDTO> getTranslatorById(@PathVariable Long id) {
        Translator translator = translatorService.findTranslator(id);

        if (translator != null) {
            return ResponseEntity.ok(mapToDTO(translator));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
 // find by schedule Availability 
 	@PostMapping("/available")
 	public ResponseEntity<?> ageOrPriceBetween(@RequestBody ScheduleEventData req) {
 		List<Translator> notAvailableTranslator = translatorService.getByAvailability(req.getStartTime(), req.getEndTime());

 		if (notAvailableTranslator.isEmpty()) {
 			return getAllTranslators();
 		}
 		List<Long> myList = new ArrayList<>();
 		for (Translator translator : notAvailableTranslator) {
 			myList.add(translator.getId());
 		}
 		List<Translator> availableTranslators =translatorService.getByIdNotinMyList(myList);
 		
 		List<TranslatorDTO> translatorDTOList = new ArrayList<>();
 		for (Translator translator : availableTranslators) {
 			translatorDTOList.add(mapToDTO(translator));
 		}
 		
 		return ResponseEntity.ok(translatorDTOList);
 	}
 	
    
 // mapToDTO
 	public static TranslatorDTO mapToDTO(Translator translator) {
 		
 		TranslatorDTO translatorDTO = new TranslatorDTO();
         translatorDTO.setId(translator.getId());
         translatorDTO.setAge(translator.getAge());
         translatorDTO.setGender(translator.getGender());
         translatorDTO.setPhone(translator.getPhone());
         translatorDTO.setCin(translator.getCin());
         translatorDTO.setImage(translator.getImage());
         translatorDTO.setDescription(translator.getDescription());
         translatorDTO.setPrice(translator.getPrice());

         Address address = translator.getAddress();
         AddressDTO addressDTO = new AddressDTO();
         addressDTO.setStreet(address.getStreet());
         addressDTO.setCity(address.getCity());
         addressDTO.setState(address.getState());
         addressDTO.setPostalCode(address.getPostalCode());
         translatorDTO.setAddress(addressDTO);
         
         User user = translator.getTranslator();
         UserDTO userDTO = new UserDTO();
         userDTO.setUserName(user.getUserName());
         userDTO.setEmail(user.getEmail());
         userDTO.setProfile(user.getProfile());
         userDTO.setPassword(user.getPassword());
         userDTO.setTranslators(user.getTranslators());
         
         translatorDTO.setTranslator(userDTO);
         
 		
 		return translatorDTO;
 	}
   
    
}
