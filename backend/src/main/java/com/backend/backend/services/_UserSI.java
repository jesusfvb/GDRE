package com.backend.backend.services;

import com.backend.backend.models._Authority;
import com.backend.backend.models._AuthorityI;
import com.backend.backend.models._User;
import com.backend.backend.models._UserI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class _UserSI implements _UserS {

    @Autowired
    private PasswordEncoder passwordEncoder;

    // All method of Authority
    @Autowired
    private _AuthorityI repositoryAuthority;

    @Override
    public Mono<Void> newAuthority(Integer id, String value, String description) {
        repositoryAuthority.save(new _Authority(id, value, description));
        return Mono.empty();
    }

    // All method of Users
    @Autowired
    private _UserI repositoryUser;

    @Override
    public Mono<_User> getUserByUserName(String userName) {
        return Mono.just(repositoryUser.getUserByUserName(userName));
    }

    @Override
    public Flux<_User> newUser(String name, String userName, String password) {
        Mono.just(repositoryAuthority.findById(0).get()).doOnNext(authority -> {
            _User user = new _User(name, userName, passwordEncoder.encode(password));
            user.getAuthorities().add(authority);
            repositoryUser.save(user);
        }).subscribe();
        return Flux.fromIterable(repositoryUser.getAllUsersOrderByName());
    }

}
