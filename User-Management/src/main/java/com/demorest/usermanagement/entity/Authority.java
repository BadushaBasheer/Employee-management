package com.demorest.usermanagement.entity;

import org.springframework.security.core.GrantedAuthority;

//public record Authority(String authority) implements GrantedAuthority {
//    @Override
//    public String getAuthority() {
//        return authority;
//    }
//}


public class Authority implements GrantedAuthority {


    private final String authority;

    public Authority(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }
}

