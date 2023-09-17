package ru.kata.spring.boot_security.demo.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.HashSet;

@Component
public class Init {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public Init(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    public void postConstruct() {
        Role admin = new Role("ROLE_ADMIN");
        Role user = new Role("ROLE_USER");
        roleService.addRole(admin);
        roleService.addRole(user);

        User user1 = new User("admin", "admin", 35, "admin@mail.ru", "admin", new HashSet<>(Collections.singleton(admin)));
        userService.saveUser(user1);
        User user2 = new User("user", "user", 30, "user@mail.ru", "user", new HashSet<>(Collections.singleton(user)));
        userService.saveUser(user2);

    }
}
