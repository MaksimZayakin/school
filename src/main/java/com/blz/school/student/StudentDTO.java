package com.blz.school.student;

public class StudentDTO {
    private final Long id;
    private String name;
    private String surname;
    private String grade;
    private String letter;

    public StudentDTO(Long id, String name, String surname, String grade, String letter) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.grade = grade;
        this.letter = letter;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getGrade() {
        return grade;
    }

    public String getLetter() {
        return letter;
    }
}
