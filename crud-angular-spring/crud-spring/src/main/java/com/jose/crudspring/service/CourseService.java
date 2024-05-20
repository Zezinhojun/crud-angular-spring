package com.jose.crudspring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.jose.crudspring.dto.CourseDTO;
import com.jose.crudspring.dto.CoursePageDTO;
import com.jose.crudspring.dto.mapper.CourseMapper;
import com.jose.crudspring.exception.RecordNotFoundException;
import com.jose.crudspring.model.Course;
import com.jose.crudspring.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    public CoursePageDTO list(int page, @Positive @Max(100) int pageSize) {
        Page<Course> pageCourse = courseRepository.findAll(PageRequest.of(page, pageSize));
        List<CourseDTO> courses = pageCourse.get().map(courseMapper::toDto).collect(Collectors.toList());
        return new CoursePageDTO(courses, pageCourse.getTotalElements(), pageCourse.getTotalPages());
    }

    public CourseDTO findById(@NotNull @Positive Long id) {
        return courseRepository.findById(id).map(courseMapper::toDto)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO create(@Valid @NotNull CourseDTO course) {
        return courseMapper.toDto(courseRepository.save(courseMapper.toEntity(course)));
    }

    public CourseDTO update(@NotNull @Positive Long id,
            @Valid @NotNull CourseDTO courseDTO) {
        return courseRepository.findById(id)
                .map(recordFound -> {
                    Course course = courseMapper.toEntity(courseDTO);
                    recordFound.setName(courseDTO.name());
                    recordFound.setCategory(this.courseMapper.converterCategoyValue(courseDTO.category()));
                    recordFound.getLessons().clear();
                    course.getLessons().forEach(recordFound.getLessons()::add);
                    return courseMapper.toDto(courseRepository.save(recordFound));
                }).orElseThrow(() -> new RecordNotFoundException(id));

    }

    public void delete(@NotNull @Positive Long id) {
        courseRepository.delete(courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));

    }

}
