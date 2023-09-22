package com.firas.LoginAndRegistration.controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.firas.LoginAndRegistration.models.Translator;
import com.firas.LoginAndRegistration.models.TranslatorDTO;
import com.firas.LoginAndRegistration.models.User;
import com.firas.LoginAndRegistration.models.UserDTO;
import com.firas.LoginAndRegistration.models.Video;
import com.firas.LoginAndRegistration.models.videoDTO;
import com.firas.LoginAndRegistration.repositories.VideoRepository;
import com.firas.LoginAndRegistration.services.UserService;
import com.firas.LoginAndRegistration.services.VideoService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/videos")
public class VideoController {

	@Autowired
	private UserService userService;
	@Autowired
	private VideoRepository videoRepository;

	private final VideoService videoService;

	@Autowired
	public VideoController(VideoService videoService) {
		this.videoService = videoService;
	}

	@PostMapping("/upload")
	public ResponseEntity<String> uploadVideo(@RequestParam("title") String title,
			@RequestParam("description") String description, @RequestParam("videoName") String videoName,
			@RequestParam("translatorId") Translator translatorId,

			@RequestParam("isAccept") Boolean isAccept,

			@RequestParam("videoFile") MultipartFile videoFile, HttpSession session) {
		try {
			// 1. Grab the current user's ID from the session
			Long userId = (Long) session.getAttribute("user_id");
//            System.out.println(session.getAttribute("user_id"));

			if (userId == null) {
				return new ResponseEntity<>("User not found in session", HttpStatus.NOT_FOUND);
			}

			// 2. Fetch the user from the DB using the userId
			User currentUser = userService.findOne(userId);

			if (currentUser == null) {
				return new ResponseEntity<>("User not found in the database", HttpStatus.NOT_FOUND);
			}

			// Define the directory path for saving videos
			String uploadDirectory = "C:/Users/dell/Desktop/project-java/frontend/src/assets/video/";

			// Ensure the directory exists, if not, create it
			File directory = new File(uploadDirectory);
			if (!directory.exists()) {
				directory.mkdirs(); // Creates directories recursively
			}

			// Generate a unique file name (e.g., using UUID) to avoid overwriting
			String uniqueFileName = videoName;
			String filePath = uploadDirectory + uniqueFileName;

			// Transfer and save the video file
			videoFile.transferTo(new File(filePath));
			String url = "../assets/video/" + uniqueFileName;

			// Save video metadata (e.g., file path, title, description) to the database
			Video video = new Video();
			video.setVideoName(uniqueFileName); // Store the unique file name
			video.setVideoUrl(url); // Store the file path as the URL
			video.setTitle(title); // Set the video title
			video.setDescription(description); // Set the video description
			video.setUser(currentUser);
			video.setAccept(isAccept);
			video.setTranslator(translatorId);

			videoRepository.save(video);

			return new ResponseEntity<>("Video uploaded successfully!", HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error uploading video: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/list")
	public ResponseEntity<?> getAllVideos() {
		List<Video> videos = videoService.allVideos();
		List<videoDTO> translatorDTOList = new ArrayList<>();

		for (Video video : videos) {
			translatorDTOList.add(mapToDTO(video));
		}

		return ResponseEntity.ok(translatorDTOList);
	}

	

	@PutMapping("/update/{videoId}")
	public ResponseEntity<String> updateVideo(@PathVariable Long videoId, @Valid @RequestBody Video video,
			HttpSession session) {
		try {
			// 1. Grab the current user's ID from the session
			Long userId = (Long) session.getAttribute("user_id");

//            if (userId == null) {
//                return new ResponseEntity<>("User not found in session", HttpStatus.NOT_FOUND);
//            }

			// 2. Fetch the user from the DB using the userId
			User currentUser = userService.findOne(userId);

			if (currentUser == null) {
				return new ResponseEntity<>("User not found in the database", HttpStatus.NOT_FOUND);
			}

			// 3. Fetch the video by its ID from the database
			Optional<Video> videoToUpdateOptional = videoRepository.findById(videoId);

			if (!videoToUpdateOptional.isPresent()) {
				return new ResponseEntity<>("Video not found", HttpStatus.NOT_FOUND);
			}

			// Get the video object from Optional
			Video videoToUpdate = videoToUpdateOptional.get();

			// Check if the video belongs to the current user (you can implement your own
			// logic here)
			if (!videoToUpdate.getUser().equals(currentUser)) {
				return new ResponseEntity<>("Unauthorized to update this video", HttpStatus.UNAUTHORIZED);
			}

			// Update video metadata
			videoToUpdate.setTitle(video.getTitle());
			videoToUpdate.setDescription(video.getDescription());
			videoToUpdate.setAccept(video.isAccept());

			// Save the updated video
			videoRepository.save(videoToUpdate);

			return new ResponseEntity<>("Video updated successfully!", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error updating video: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public static videoDTO mapToDTO(Video video) {

		videoDTO videoDTO = new videoDTO();
		videoDTO.setId(video.getId());
		videoDTO.setAccept(video.isAccept());
		videoDTO.setDescription(video.getDescription());
		videoDTO.setTitle(video.getTitle());
		videoDTO.setVideoName(video.getVideoName());
		videoDTO.setVideoUrl(video.getVideoUrl());

		Translator translator = video.getTranslator();
		TranslatorDTO translatorDTO = new TranslatorDTO();
		translatorDTO.setId(translator.getId());
		translatorDTO.setAge(translator.getAge());
		translatorDTO.setGender(translator.getGender());
		translatorDTO.setPhone(translator.getPhone());
		translatorDTO.setCin(translator.getCin());
		translatorDTO.setImage(translator.getImage());
		translatorDTO.setDescription(translator.getDescription());
		translatorDTO.setPrice(translator.getPrice());
		videoDTO.setTranslator(translatorDTO);

		User user = video.getUser();
		UserDTO userDTO = new UserDTO();
		userDTO.setUserName(user.getUserName());
		userDTO.setEmail(user.getEmail());
		userDTO.setProfile(user.getProfile());
		userDTO.setPassword(user.getPassword());
		userDTO.setTranslators(user.getTranslators());
		videoDTO.setUser(userDTO);

		return videoDTO;
	}
}
