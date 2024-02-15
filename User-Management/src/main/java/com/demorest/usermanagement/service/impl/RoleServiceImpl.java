package com.demorest.usermanagement.service.impl;


import com.demorest.usermanagement.entity.Role;
import com.demorest.usermanagement.repo.RoleRepository;
import com.demorest.usermanagement.service.RoleService;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role getRole() {

        return roleRepository.findByRoleName("USER");
    }
}
