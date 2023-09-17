package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Component
public interface UserService extends UserDetailsService {
    User findByUsername(String username);

    void saveUser(User user);

    User showUser(Long id);

    User removeUserById(Long id);

    List<User> getAllUsers();

    void updateUser(User user);
}
