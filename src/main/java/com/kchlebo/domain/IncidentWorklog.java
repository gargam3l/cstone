package com.kchlebo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.kchlebo.domain.enumeration.WorklogSource;

/**
 * A IncidentWorklog.
 */
@Entity
@Table(name = "incident_worklog")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IncidentWorklog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "notes", nullable = false)
    private String notes;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private Long createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "source", nullable = false)
    private WorklogSource source;

    @ManyToOne
    @JsonIgnoreProperties("incidentWorklogs")
    private Incident incident;

    @ManyToOne
    @JsonIgnoreProperties("submittedWorklogs")
    private Person submittedBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNotes() {
        return notes;
    }

    public IncidentWorklog notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public IncidentWorklog createdAt(Long createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public WorklogSource getSource() {
        return source;
    }

    public IncidentWorklog source(WorklogSource source) {
        this.source = source;
        return this;
    }

    public void setSource(WorklogSource source) {
        this.source = source;
    }

    public Incident getIncident() {
        return incident;
    }

    public IncidentWorklog incident(Incident incident) {
        this.incident = incident;
        return this;
    }

    public void setIncident(Incident incident) {
        this.incident = incident;
    }

    public Person getSubmittedBy() {
        return submittedBy;
    }

    public IncidentWorklog submittedBy(Person person) {
        this.submittedBy = person;
        return this;
    }

    public void setSubmittedBy(Person person) {
        this.submittedBy = person;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IncidentWorklog)) {
            return false;
        }
        return id != null && id.equals(((IncidentWorklog) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "IncidentWorklog{" +
            "id=" + getId() +
            ", notes='" + getNotes() + "'" +
            ", createdAt=" + getCreatedAt() +
            ", source='" + getSource() + "'" +
            "}";
    }
}
