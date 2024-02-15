package com.demorest.usermanagement.repo;

import com.demorest.usermanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    User getUserById(long id);

    List<User> findAllByUserRolesRoleRoleNameAndDeletedFalse(String roleName);

}