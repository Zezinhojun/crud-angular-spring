package com.jose.crudspring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.jose.crudspring.enums.Category;
import com.jose.crudspring.model.Course;
import com.jose.crudspring.model.Lesson;
import com.jose.crudspring.repository.CourseRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	@Profile("dev")
	CommandLineRunner initDatabase(CourseRepository courseRepository) {
		return args -> {
			courseRepository.deleteAll();

			Course c = new Course();
			c.setName("Angular com Spring");
			c.setCategory(Category.FRONT_END);
			Lesson l = new Lesson();
			l.setName("Introdução");
			l.setYoutubeUrl("https://www");
			l.setCourse(c);
			c.getLessons().add(l);
			courseRepository.save(c);
		};
	}

}
