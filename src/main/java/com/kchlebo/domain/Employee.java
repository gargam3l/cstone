package com.kchlebo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.kchlebo.domain.enumeration.Role;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password_hash")
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @OneToOne
    @JoinColumn(unique = true)
    private Person personId;

    @OneToMany(mappedBy = "ownerId")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Incident> ownedIncidents = new HashSet<>();

    @OneToMany(mappedBy = "submittedById")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Incident> submittedIncidents = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "employee_group",
               joinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id"))
    private Set<Group> groups = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public Employee username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public Employee passwordHash(String passwordHash) {
        this.passwordHash = passwordHash;
        return this;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Role getRole() {
        return role;
    }

    public Employee role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Person getPersonId() {
        return personId;
    }

    public Employee personId(Person person) {
        this.personId = person;
        return this;
    }

    public void setPersonId(Person person) {
        this.personId = person;
    }

    public Set<Incident> getOwnedIncidents() {
        return ownedIncidents;
    }

    public Employee ownedIncidents(Set<Incident> incidents) {
        this.ownedIncidents = incidents;
        return this;
    }

    public Employee addOwnedIncidents(Incident incident) {
        this.ownedIncidents.add(incident);
        incident.setOwnerId(this);
        return this;
    }

    public Employee removeOwnedIncidents(Incident incident) {
        this.ownedIncidents.remove(incident);
        incident.setOwnerId(null);
        return this;
    }

    public void setOwnedIncidents(Set<Incident> incidents) {
        this.ownedIncidents = incidents;
    }

    public Set<Incident> getSubmittedIncidents() {
        return submittedIncidents;
    }

    public Employee submittedIncidents(Set<Incident> incidents) {
        this.submittedIncidents = incidents;
        return this;
    }

    public Employee addSubmittedIncidents(Incident incident) {
        this.submittedIncidents.add(incident);
        incident.setSubmittedById(this);
        return this;
    }

    public Employee removeSubmittedIncidents(Incident incident) {
        this.submittedIncidents.remove(incident);
        incident.setSubmittedById(null);
        return this;
    }

    public void setSubmittedIncidents(Set<Incident> incidents) {
        this.submittedIncidents = incidents;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public Employee groups(Set<Group> groups) {
        this.groups = groups;
        return this;
    }

    public Employee addGroup(Group group) {
        this.groups.add(group);
        group.getGroupPermissions().add(this);
        return this;
    }

    public Employee removeGroup(Group group) {
        this.groups.remove(group);
        group.getGroupPermissions().remove(this);
        return this;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", passwordHash='" + getPasswordHash() + "'" +
            ", role='" + getRole() + "'" +
            "}";
    }
}
