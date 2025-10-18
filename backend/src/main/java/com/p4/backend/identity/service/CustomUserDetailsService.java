package com.p4.backend.identity.service;

import com.p4.backend.identity.model.User;
import com.p4.backend.identity.model.Role;
import com.p4.backend.identity.model.Permission;
import com.p4.backend.identity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (!user.getIsActive()) {
            throw new UsernameNotFoundException("User is not active: " + email);
        }

        // Build authorities from user's roles and permissions
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        
        // Add roles
        if (user.getRoles() != null) {
            for (Role role : user.getRoles()) {
                if (role.getIsActive()) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName().toUpperCase()));
                    
                    // Add permissions from active roles
                    for (Permission permission : role.getPermissions()) {
                        if (permission.getIsActive()) {
                            authorities.add(new SimpleGrantedAuthority(permission.getPermissionName()));
                        }
                    }
                }
            }
        }

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                authorities
        );
    }
}