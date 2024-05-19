package com.jose.crudspring.enums.converters;

import com.jose.crudspring.enums.StatusAtvOrIna;
import java.util.stream.Stream;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<StatusAtvOrIna, String> {

    @Override
    public String convertToDatabaseColumn(StatusAtvOrIna category) {
        if (category == null) {
            return null;
        }
        return category.getValue();
    }

    @Override
    public StatusAtvOrIna convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }
        return Stream.of(StatusAtvOrIna.values())
                .filter(c -> c.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
