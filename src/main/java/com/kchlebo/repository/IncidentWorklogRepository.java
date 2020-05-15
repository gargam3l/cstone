package com.kchlebo.repository;

import com.kchlebo.domain.IncidentWorklog;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the IncidentWorklog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncidentWorklogRepository extends JpaRepository<IncidentWorklog, Long> {
}
