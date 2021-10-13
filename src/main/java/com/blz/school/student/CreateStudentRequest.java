package com.blz.school.student;

import java.util.Objects;

public class CreateStudentRequest {
    private final String name;
    private final String surname;
    private final String grade;
    private final String letter;

    public CreateStudentRequest(String name, String surname, String grade, String letter) {
        this.name = name;
        this.surname = surname;
        this.grade = grade;
        this.letter = letter;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CreateStudentRequest that = (CreateStudentRequest) o;
        return name.equals(that.name) && surname.equals(that.surname) && grade.equals(that.grade) && letter.equals(that.letter);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, surname, grade, letter);
    }

    @Override
    public String toString() {
        return "CreateStudentRequest{" +
                "name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", grade='" + grade + '\'' +
                ", letter='" + letter + '\'' +
                '}';
    }
}
