package com.blz.school;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/event/{id}")
    public String getEvent() {
        return "event";
    }
}
