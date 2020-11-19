package com.backend.backend.services;

import java.util.HashSet;
import java.util.Set;

import com.backend.backend.models._User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class _UserDetailsSI implements UserDetailsService {

    @Autowired
    private _UserS serviceUser;

    @Override
    public UserDetails loadUserByUsername(String arg0) throws UsernameNotFoundException {
        _User pivote = serviceUser.getUserByUserName(arg0).block();
        Set<GrantedAuthority> authorities = new HashSet<>();
        pivote.getAuthorities().forEach(authority -> {
            authorities.add(new SimpleGrantedAuthority(authority.getValue()));
        });
        return new User(pivote.getUserName(), pivote.getPassword(), authorities);
    }

}
