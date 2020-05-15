package com.kchlebo.web.rest;

import com.kchlebo.CstoneApp;
import com.kchlebo.domain.IncidentWorklog;
import com.kchlebo.repository.IncidentWorklogRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kchlebo.domain.enumeration.WorklogSource;
/**
 * Integration tests for the {@link IncidentWorklogResource} REST controller.
 */
@SpringBootTest(classes = CstoneApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class IncidentWorklogResourceIT {

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final Long DEFAULT_CREATED_AT = 1L;
    private static final Long UPDATED_CREATED_AT = 2L;

    private static final WorklogSource DEFAULT_SOURCE = WorklogSource.SYSTEM;
    private static final WorklogSource UPDATED_SOURCE = WorklogSource.USER;

    @Autowired
    private IncidentWorklogRepository incidentWorklogRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIncidentWorklogMockMvc;

    private IncidentWorklog incidentWorklog;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IncidentWorklog createEntity(EntityManager em) {
        IncidentWorklog incidentWorklog = new IncidentWorklog()
            .notes(DEFAULT_NOTES)
            .createdAt(DEFAULT_CREATED_AT)
            .source(DEFAULT_SOURCE);
        return incidentWorklog;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IncidentWorklog createUpdatedEntity(EntityManager em) {
        IncidentWorklog incidentWorklog = new IncidentWorklog()
            .notes(UPDATED_NOTES)
            .createdAt(UPDATED_CREATED_AT)
            .source(UPDATED_SOURCE);
        return incidentWorklog;
    }

    @BeforeEach
    public void initTest() {
        incidentWorklog = createEntity(em);
    }

    @Test
    @Transactional
    public void createIncidentWorklog() throws Exception {
        int databaseSizeBeforeCreate = incidentWorklogRepository.findAll().size();

        // Create the IncidentWorklog
        restIncidentWorklogMockMvc.perform(post("/api/incident-worklogs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(incidentWorklog)))
            .andExpect(status().isCreated());

        // Validate the IncidentWorklog in the database
        List<IncidentWorklog> incidentWorklogList = incidentWorklogRepository.findAll();
        assertThat(incidentWorklogList).hasSize(databaseSizeBeforeCreate + 1);
        IncidentWorklog testIncidentWorklog = incidentWorklogList.get(incidentWorklogList.size() - 1);
        assertThat(testIncidentWorklog.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testIncidentWorklog.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testIncidentWorklog.getSource()).isEqualTo(DEFAULT_SOURCE);
    }

    @Test
    @Transactional
    public void createIncidentWorklogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = incidentWorklogRepository.findAll().size();

        // Create the IncidentWorklog with an existing ID
        incidentWorklog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIncidentWorklogMockMvc.perform(post("/api/incident-worklogs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(incidentWorklog)))
            .andExpect(status().isBadRequest());

        // Validate the IncidentWorklog in the database
        List<IncidentWorklog> incidentWorklogList = incidentWorklogRepository.findAll();
        assertThat(incidentWorklogList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNotesIsRequired() throws Exception {
        int databaseSizeBeforeTest = incidentWorklogRepository.findAll().size();
        // set the field null
        incidentWorklog.setNotes(null);

        // Create the IncidentWorklog, which fails.

        restIncidentWorklogMockMvc.perform(post("/api/incident-worklogs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(incidentWorklog)))
            .andExpect(status().isBadRequest());

        List<IncidentWorklog> incidentWorklogList = incidentWorklogRepository.findAll();
        assertThat(incidentWorklogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = incidentWorklogRepository.findAll().size();
        // set the field null
        incidentWorklog.setCreatedAt(null);

        // Create the IncidentWorklog, which fails.

        restIncidentWorklogMockMvc.perform(post("/api/incident-worklogs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(incidentWorklog)))
            .andExpect(status().isBadRequest());

        List<IncidentWorklog> incidentWorklogList = incidentWorklogRepository.findAll();
        assertThat(incidentWorklogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSourceIsRequired() throws Exception {
        int databaseSizeBeforeTest = incidentWorklogRepository.findAll().size();
        // set the field null
        incidentWorklog.setSource(null);

        // Create the IncidentWorklog, which fails.

        restIncidentWorklogMockMvc.perform(post("/api/incident-worklogs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(incidentWorklog)))
            .andExpect(status().isBadRequest());

        List<IncidentWorklog> incidentWorklogList = incidentWorklogRepository.findAll();
        assertThat(incidentWorklogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIncidentWorklogs() throws Exception {
        // Initialize the database
        incidentWorklogRepository.saveAndFlush(incidentWorklog);

        // Get all the incidentWorklogList
        restIncidentWorklogMockMvc.perform(get("/api/incident-worklogs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(incidentWorklog.getId().intValue())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.intValue())))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE.toString())));
    }
    
    @Test
    @Transactional
    public void getIncidentWorklog() throws Exception {
        // Initialize the database
        incidentWorklogRepository.saveAndFlush(incidentWorklog);

        // Get the incidentWorklog
        restIncidentWorklogMockMvc.perform(get("/api/incident-worklogs/{id}", incidentWorklog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(incidentWorklog.getId().intValue()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.intValue()))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIncidentWorklog() throws Exception {
        // Get the incidentWorklog
        restIncidentWorklogMockMvc.perform(get("/api/incident-worklogs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIncidentWorklog() throws Exception {
        // Initialize the database
        incidentWorklogRepository.saveAndFlush(incidentWorklog);

        int databaseSizeBeforeUpdate = incidentWorklogRepository.findAll().size();

        // Update the incidentWorklog
        IncidentWorklog updatedIncidentWorklog = incidentWorklogRepository.findById(incidentWorklog.getId()).get();
        // Disconnect from session so that the updates on updatedIncidentWorklog are not directly saved in db
        em.detach(updatedIncidentWorklog);
        updatedIncidentWorklog
            .notes(UPDATED_NOTES)
            .createdAt(UPDATED_CREATED_AT)
            .source(UPDATED_SOURCE);

        restIncidentWorklogMockMvc.perform(put("/api/incident-worklogs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedIncidentWorklog)))
            .andExpect(status().isOk());

        // Validate the IncidentWorklog in the database
        List<IncidentWorklog> incidentWorklogList = incidentWorklogRepository.findAll();
        assertThat(incidentWorklogList).hasSize(databaseSizeBeforeUpdate);
        IncidentWorklog testIncidentWorklog = incidentWorklogList.get(incidentWorklogList.size() - 1);
        assertThat(testIncidentWorklog.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testIncidentWorklog.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testIncidentWorklog.getSource()).isEqualTo(UPDATED_SOURCE);
    }

    @Test
    @Transactional
    public void updateNonExistingIncidentWorklog() throws Exception {
        int databaseSizeBeforeUpdate = incidentWorklogRepository.findAll().size();

        // Create the IncidentWorklog

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIncidentWorklogMockMvc.perform(put("/api/incident-worklogs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(incidentWorklog)))
            .andExpect(status().isBadRequest());

        // Validate the IncidentWorklog in the database
        List<IncidentWorklog> incidentWorklogList = incidentWorklogRepository.findAll();
        assertThat(incidentWorklogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIncidentWorklog() throws Exception {
        // Initialize the database
        incidentWorklogRepository.saveAndFlush(incidentWorklog);

        int databaseSizeBeforeDelete = incidentWorklogRepository.findAll().size();

        // Delete the incidentWorklog
        restIncidentWorklogMockMvc.perform(delete("/api/incident-worklogs/{id}", incidentWorklog.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<IncidentWorklog> incidentWorklogList = incidentWorklogRepository.findAll();
        assertThat(incidentWorklogList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
