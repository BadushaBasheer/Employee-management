package com.demorest.usermanagement.service;

import com.demorest.usermanagement.entity.User;
import com.demorest.usermanagement.entity.UserRole;

import java.util.List;
import java.util.Set;

public interface UserService {

    User createUser(User user, Set<UserRole> userRoles) throws Exception;

    User getUser(String username);
    List<User> getAllUsers();
    User getUser(long id);
    void deleteUser(String userName);

    void updateImage(User user, String fileName);

    User updateUser(User user);

}
