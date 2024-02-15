package com.demorest.usermanagement.controller;


import com.demorest.usermanagement.entity.User;
import com.demorest.usermanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        List<User> user= userService.getAllUsers();
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{userName}")
    public User getUser(@PathVariable("userName") String userName){
        return userService.getUser(userName);
    }

    @PutMapping("/updateUser")
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser/{userName}")
    public void deleteUser(@PathVariable("userName") String userName){
        userService.deleteUser(userName);
    }
}