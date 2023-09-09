package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String printUsersList(Principal principal, Model model) {
        User admin = userService.findByUsername(principal.getName());
        model.addAttribute("admin", admin);
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("userRoles", roleService.getRoles());
        model.addAttribute("userNew", new User());
        model.addAttribute("rolesNew", roleService.getRoles());
        return "admin";
    }

    @PostMapping("")
    public String newUser(@ModelAttribute User user, Model model, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "redirect:/admin";
        }
        try {
            userService.updateUser(user);
        } catch (Exception e) {
            return "userNameError";
        }
        return "redirect:/admin";
    }

    @PatchMapping("/{id}")
    public String update(@ModelAttribute User updatedUser, @PathVariable Long id, Model model, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "redirect:/admin";
        }
        try {
        User existingUser = userService.showUser(id);
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setAge(updatedUser.getAge());
        existingUser.setRoles(updatedUser.getRoles());
        userService.updateUser(existingUser);
        } catch (Exception e) {
            return "userNameError";
        }
        return "redirect:/admin";
    }

    @GetMapping("/{id}/delete")
    public String delete(@PathVariable Long id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }
}

