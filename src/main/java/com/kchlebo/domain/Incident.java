package com.kchlebo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.kchlebo.domain.enumeration.Status;

import com.kchlebo.domain.enumeration.Priority;

/**
 * A Incident.
 */
@Entity
@Table(name = "incident")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Incident implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private Priority priority;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private Long createdAt;

    @NotNull
    @Column(name = "updated_at", nullable = false)
    private Long updatedAt;

    @Column(name = "closed_at")
    private Long closedAt;

    @OneToMany(mappedBy = "incident")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IncidentWorklog> incidentWorklogs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("incidents")
    private Group group;

    @ManyToOne
    @JsonIgnoreProperties("ownedIncidents")
    private Employee ownerId;

    @ManyToOne
    @JsonIgnoreProperties("submittedIncidents")
    private Employee submittedById;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public Incident status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public Incident priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public String getDescription() {
        return description;
    }

    public Incident description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public Incident createdAt(Long createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUpdatedAt() {
        return updatedAt;
    }

    public Incident updatedAt(Long updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Long updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getClosedAt() {
        return closedAt;
    }

    public Incident closedAt(Long closedAt) {
        this.closedAt = closedAt;
        return this;
    }

    public void setClosedAt(Long closedAt) {
        this.closedAt = closedAt;
    }

    public Set<IncidentWorklog> getIncidentWorklogs() {
        return incidentWorklogs;
    }

    public Incident incidentWorklogs(Set<IncidentWorklog> incidentWorklogs) {
        this.incidentWorklogs = incidentWorklogs;
        return this;
    }

    public Incident addIncidentWorklog(IncidentWorklog incidentWorklog) {
        this.incidentWorklogs.add(incidentWorklog);
        incidentWorklog.setIncident(this);
        return this;
    }

    public Incident removeIncidentWorklog(IncidentWorklog incidentWorklog) {
        this.incidentWorklogs.remove(incidentWorklog);
        incidentWorklog.setIncident(null);
        return this;
    }

    public void setIncidentWorklogs(Set<IncidentWorklog> incidentWorklogs) {
        this.incidentWorklogs = incidentWorklogs;
    }

    public Group getGroup() {
        return group;
    }

    public Incident group(Group group) {
        this.group = group;
        return this;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Employee getOwnerId() {
        return ownerId;
    }

    public Incident ownerId(Employee employee) {
        this.ownerId = employee;
        return this;
    }

    public void setOwnerId(Employee employee) {
        this.ownerId = employee;
    }

    public Employee getSubmittedById() {
        return submittedById;
    }

    public Incident submittedById(Employee employee) {
        this.submittedById = employee;
        return this;
    }

    public void setSubmittedById(Employee employee) {
        this.submittedById = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Incident)) {
            return false;
        }
        return id != null && id.equals(((Incident) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Incident{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", priority='" + getPriority() + "'" +
            ", description='" + getDescription() + "'" +
            ", createdAt=" + getCreatedAt() +
            ", updatedAt=" + getUpdatedAt() +
            ", closedAt=" + getClosedAt() +
            "}";
    }
}
