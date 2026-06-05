package com.mendingnabung.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "admins")
@DiscriminatorValue("ADMIN")
@PrimaryKeyJoinColumn(name = "user_id")
public class Admin extends User {

    public Admin(String username, String password) {
        super(username, password);
    }

    @Override
    public String getRole() {
        // TODO: To be implemented by team
        return null;
    }
}
