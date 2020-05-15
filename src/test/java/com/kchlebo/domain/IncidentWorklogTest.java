package com.kchlebo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.kchlebo.web.rest.TestUtil;

public class IncidentWorklogTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IncidentWorklog.class);
        IncidentWorklog incidentWorklog1 = new IncidentWorklog();
        incidentWorklog1.setId(1L);
        IncidentWorklog incidentWorklog2 = new IncidentWorklog();
        incidentWorklog2.setId(incidentWorklog1.getId());
        assertThat(incidentWorklog1).isEqualTo(incidentWorklog2);
        incidentWorklog2.setId(2L);
        assertThat(incidentWorklog1).isNotEqualTo(incidentWorklog2);
        incidentWorklog1.setId(null);
        assertThat(incidentWorklog1).isNotEqualTo(incidentWorklog2);
    }
}
