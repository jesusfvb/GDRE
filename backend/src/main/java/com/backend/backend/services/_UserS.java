package com.backend.backend.services;

import com.backend.backend.models._User;

import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public interface _UserS {
    // All options of User
    public Mono<_User> getUserByUserName(String userName);

    public Flux<_User> newUser(String name, String userName, String password);

    // All options of Authority
    public Mono<Void> newAuthority(Integer id, String value, String description);
}
