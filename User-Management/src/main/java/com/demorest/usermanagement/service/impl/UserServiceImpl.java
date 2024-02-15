package com.demorest.usermanagement.service.impl;

import com.demorest.usermanagement.entity.User;
import com.demorest.usermanagement.entity.UserRole;
import com.demorest.usermanagement.repo.RoleRepository;
import com.demorest.usermanagement.repo.UserRepository;
import com.demorest.usermanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
        User local=userRepository.findByUsername(user.getUsername());

        if(local !=null){
            System.out.println("user is already there");
            throw new DataIntegrityViolationException("User already present in DB");
        }else{
            for(UserRole userRole:userRoles){
                roleRepository.save(userRole.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            if (user.getGender().equalsIgnoreCase("male")) {
                user.setImage("default.png");
            }
            if (user.getGender().equalsIgnoreCase("female")){
                user.setImage("women.png");
            }
            user.setEnabled(true);
            user.setDeleted(false);
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            local = userRepository.save(user);
        }

        return local;
    }

    @Override
    public User getUser(String username) {
        User user=userRepository.findByUsername(username);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAllByUserRolesRoleRoleNameAndDeletedFalse("USER");
    }

    @Override
    public User getUser(long id) {
        return userRepository.getUserById(id);
    }

    @Override
    public void deleteUser(String userName) {
        User user=userRepository.findByUsername(userName);
        user.setDeleted(true);
        userRepository.save(user);
    }

    @Override
    public void updateImage(User user, String fileName) {
        User user1=userRepository.findByUsername(user.getUsername());
        user1.setImage(fileName);
        userRepository.save(user1);
    }

    @Override
    public User updateUser(User user) {
        User newUser=userRepository.findByUsername(user.getUsername());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        newUser.setGender(user.getGender());
        newUser.setPhoneNumber(user.getPhoneNumber());
        newUser.setEmail(user.getEmail());
        userRepository.save(newUser);
        return newUser;

    }
}