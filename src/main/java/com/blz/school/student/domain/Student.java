package com.blz.school.student.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    private Integer grade;
    private String letter;

    public Student() {
    }

    public Student(Long id, String name, String surname, Integer grade, String letter) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.grade = grade;
        this.letter = letter;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return id == student.id && name.equals(student.name) && surname.equals(student.surname) && grade.equals(student.grade) && letter.equals(student.letter);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, surname, grade, letter);
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", grade=" + grade +
                ", letter='" + letter + '\'' +
                '}';
    }
}
