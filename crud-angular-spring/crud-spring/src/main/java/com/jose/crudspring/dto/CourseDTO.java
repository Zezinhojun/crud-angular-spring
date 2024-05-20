package com.jose.crudspring.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jose.crudspring.enums.Category;
import com.jose.crudspring.enums.converters.validation.ValueOfEnum;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CourseDTO(@JsonProperty("_id") Long id, @NotBlank @NotNull @Length(min = 5, max = 100) String name,
                @NotBlank @NotNull @Length(max = 10) @ValueOfEnum(enumClass = Category.class) String category,
                @NotNull @NotEmpty @Valid List<LessonDTO> lessons) {
}
