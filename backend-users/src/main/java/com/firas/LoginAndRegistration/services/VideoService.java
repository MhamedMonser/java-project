package com.firas.LoginAndRegistration.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.firas.LoginAndRegistration.models.Translator;
import com.firas.LoginAndRegistration.models.Video;
import com.firas.LoginAndRegistration.repositories.TranslatorRepository;
import com.firas.LoginAndRegistration.repositories.VideoRepository;

@Service
public class VideoService {

    private final VideoRepository videoRepository;

    @Autowired
    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }
	@Autowired
	private TranslatorRepository TranslatorRepo;
	
	// READ ALL
	public List<Video> allVideos(){
		return videoRepository.findAll();
	}
    public void saveVideo(String videoName, MultipartFile videoFile) throws IOException {
        Video video = new Video();
        video.setVideoName(videoName);
//        video.setVideoData(videoFile.getBytes());

        videoRepository.save(video);
    }
}
