package com.firas.LoginAndRegistration.repositories;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.firas.LoginAndRegistration.models.Video;

public interface VideoRepository extends CrudRepository<Video, Long> {
	List<Video> findAll();
	}

