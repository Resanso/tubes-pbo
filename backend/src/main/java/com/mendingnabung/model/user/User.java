package com.mendingnabung.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Abstract base class for all system users.
 * Uses JOINED inheritance strategy so each subclass gets its own table,
 * sharing the primary key from this table.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @NotBlank
    @Column(nullable = false)
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    /** Returns the role label used for authorization checks. */
    public abstract String getRole();

    public boolean login(String username, String password) {
        if (this.username.equals(username) && this.password.equals(password)) {
            System.out.println("user " + username + " berhasil login.");
            return true;
        }
        System.out.println("Login gagal: username atau password salah.");
        return false;
    }
    public void logout() {
        System.out.println("user " + this.username + " berhasil logout.");
    }
}
