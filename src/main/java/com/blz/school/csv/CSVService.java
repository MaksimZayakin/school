package com.blz.school.csv;

import com.blz.school.student.domain.Student;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.PrintWriter;
import java.util.Set;

@Service
public class CSVService {

    public ByteArrayInputStream load(Set<Student> students) {
        return CSVHelper.tutorialsToCSV(students);
    }

    public void downloadCsv(PrintWriter writer, Set<Student> students) {
        writer.write("Student ID, Surname, Name, Grade, Letter \n");
        for (Student student : students) {
            writer.write(student.getId() + "," +
                    student.getSurname()+ "," +
                    student.getName() + "," +
                    student.getGrade()+ "," +
                    student.getLetter() + "\n"
            );
        }


    }
}
