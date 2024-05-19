package com.jose.crudspring.dto.mapper;

import org.springframework.stereotype.Component;

import com.jose.crudspring.dto.CourseDTO;
import com.jose.crudspring.enums.Category;
import com.jose.crudspring.model.Course;

@Component
public class CourseMapper {
    public CourseDTO toDto(Course course) {
        if (course == null) {
            return null;
        }

        return new CourseDTO(course.getId(), course.getName(), course.getCategory().getValue());
    }

    public Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }
        Course course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(converterCategoyValue(courseDTO.category()));
        return course;
    }

    public Category converterCategoyValue(String value) {
        if (value == null) {
            return null;
        }
        return switch (value) {
            case "Front-end" -> Category.FRONT_END;
            case "Back-end" -> Category.BACK_END;
            default -> throw new IllegalArgumentException("Categoria inválida: " + value);
        };
    }
}
