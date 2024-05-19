package com.jose.crudspring.enums;

public enum StatusAtvOrIna {
    ACTIVE("Ativo"), INACTIVE("Inativo");

    private String value;

    private StatusAtvOrIna(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}
