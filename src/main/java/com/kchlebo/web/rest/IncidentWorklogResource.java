package com.kchlebo.web.rest;

import com.kchlebo.domain.IncidentWorklog;
import com.kchlebo.repository.IncidentWorklogRepository;
import com.kchlebo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.kchlebo.domain.IncidentWorklog}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IncidentWorklogResource {

    private final Logger log = LoggerFactory.getLogger(IncidentWorklogResource.class);

    private static final String ENTITY_NAME = "incidentWorklog";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IncidentWorklogRepository incidentWorklogRepository;

    public IncidentWorklogResource(IncidentWorklogRepository incidentWorklogRepository) {
        this.incidentWorklogRepository = incidentWorklogRepository;
    }

    /**
     * {@code POST  /incident-worklogs} : Create a new incidentWorklog.
     *
     * @param incidentWorklog the incidentWorklog to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new incidentWorklog, or with status {@code 400 (Bad Request)} if the incidentWorklog has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/incident-worklogs")
    public ResponseEntity<IncidentWorklog> createIncidentWorklog(@Valid @RequestBody IncidentWorklog incidentWorklog) throws URISyntaxException {
        log.debug("REST request to save IncidentWorklog : {}", incidentWorklog);
        if (incidentWorklog.getId() != null) {
            throw new BadRequestAlertException("A new incidentWorklog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IncidentWorklog result = incidentWorklogRepository.save(incidentWorklog);
        return ResponseEntity.created(new URI("/api/incident-worklogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /incident-worklogs} : Updates an existing incidentWorklog.
     *
     * @param incidentWorklog the incidentWorklog to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated incidentWorklog,
     * or with status {@code 400 (Bad Request)} if the incidentWorklog is not valid,
     * or with status {@code 500 (Internal Server Error)} if the incidentWorklog couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/incident-worklogs")
    public ResponseEntity<IncidentWorklog> updateIncidentWorklog(@Valid @RequestBody IncidentWorklog incidentWorklog) throws URISyntaxException {
        log.debug("REST request to update IncidentWorklog : {}", incidentWorklog);
        if (incidentWorklog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IncidentWorklog result = incidentWorklogRepository.save(incidentWorklog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, incidentWorklog.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /incident-worklogs} : get all the incidentWorklogs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of incidentWorklogs in body.
     */
    @GetMapping("/incident-worklogs")
    public List<IncidentWorklog> getAllIncidentWorklogs() {
        log.debug("REST request to get all IncidentWorklogs");
        return incidentWorklogRepository.findAll();
    }

    /**
     * {@code GET  /incident-worklogs/:id} : get the "id" incidentWorklog.
     *
     * @param id the id of the incidentWorklog to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the incidentWorklog, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/incident-worklogs/{id}")
    public ResponseEntity<IncidentWorklog> getIncidentWorklog(@PathVariable Long id) {
        log.debug("REST request to get IncidentWorklog : {}", id);
        Optional<IncidentWorklog> incidentWorklog = incidentWorklogRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(incidentWorklog);
    }

    /**
     * {@code DELETE  /incident-worklogs/:id} : delete the "id" incidentWorklog.
     *
     * @param id the id of the incidentWorklog to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/incident-worklogs/{id}")
    public ResponseEntity<Void> deleteIncidentWorklog(@PathVariable Long id) {
        log.debug("REST request to delete IncidentWorklog : {}", id);
        incidentWorklogRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
