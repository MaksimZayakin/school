package com.blz.school.student.controller;

import com.blz.school.student.StudentDTO;
import com.blz.school.student.domain.Student;
import com.blz.school.student.repo.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentsController {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentsController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable("id") Student student) {
        return student;
    }

    @PostMapping
    public Student createStudent(
            @RequestBody Student student
    ) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable("id") Student studentFromDb,
            @RequestBody Student student
    ) {
        BeanUtils.copyProperties(student, studentFromDb, "id");

        return studentRepository.save(studentFromDb);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(
            @PathVariable("id") Student student
    ) {
        studentRepository.delete(student);
    }
}
