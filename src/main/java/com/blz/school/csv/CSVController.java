package com.blz.school.csv;

import com.blz.school.event.domain.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/events")
public class CSVController {

    private final CSVService csvService;

    @Autowired
    public CSVController(CSVService csvService) {
        this.csvService = csvService;
    }

    @GetMapping("/{id}/{event_name}.csv")
    public void downloadCsv(@PathVariable("id") Event event, HttpServletResponse response) throws IOException {
        String filename = "event_"+event.getName()+".csv";
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file="+filename);
        csvService.downloadCsv(response.getWriter(), event.getStudents());
    }
}
