package com.blz.school.event.controller;

import com.blz.school.event.domain.Event;
import com.blz.school.event.repo.EventRepository;
import com.blz.school.student.domain.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/events")
public class EventsController {
    private final EventRepository eventRepository;
    @Autowired
    public EventsController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable("id") Event event) {
        return event;
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(
            @PathVariable("id") Event event
    ) {
        event.getStudents().forEach(
                it -> it.getEvents().remove(event)
        );
        eventRepository.delete(event);
    }

    @PostMapping("/{id}/students")
    public void addStudent(
            @PathVariable("id") Event event,
            @RequestBody Student student) {
        event.getStudents().add(student);
        student.getEvents().add(event);
        eventRepository.save(event);
    }

    @DeleteMapping("/{id}/students/{student_id}")
    public void deleteStudent(
            @PathVariable("id") Event event,
            @PathVariable("student_id") Student student) {
        event.getStudents().remove(student);
        student.getEvents().remove(event);
        eventRepository.save(event);
    }

    @GetMapping("/{id}/students")
    public Set<Student> getStudents(
            @PathVariable("id") Event event) {
        return event.getStudents();
    }
}
