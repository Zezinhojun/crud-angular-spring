package com.jose.crudspring.controller;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.jose.crudspring.model.Course;
import com.jose.crudspring.repository.CourseRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@Configuration
@RequestMapping("/api/courses")

public class CourseController {

    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> list() {
        return courseRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course create(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    // @Bean
    // CommandLineRunner initDataBase(CourseRepository courseRepository) {
    // return args -> {
    // courseRepository.deleteAll();
    // Course c = new Course();
    // c.setName("Angular com Spring");
    // c.setCategory("Front-End");
    // courseRepository.save(c);
    // };
    // }

}
