package com.p4.backend.common.feature;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FeatureFlagController.class)
public class FeatureFlagControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FeatureFlagRepository featureFlagRepository;

    @Test
    public void testGetAllFlags() throws Exception {
        // Arrange
        FeatureFlag flag1 = new FeatureFlag("catalog.publicBrowse", true);
        FeatureFlag flag2 = new FeatureFlag("search.enabled", false);
        List<FeatureFlag> flags = Arrays.asList(flag1, flag2);
        
        when(featureFlagRepository.findAll()).thenReturn(flags);

        // Act & Assert
        mockMvc.perform(get("/flags"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].key").value("catalog.publicBrowse"))
                .andExpect(jsonPath("$[0].value").value(true))
                .andExpect(jsonPath("$[1].key").value("search.enabled"))
                .andExpect(jsonPath("$[1].value").value(false));
    }
}