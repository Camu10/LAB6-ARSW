package edu.eci.arsw.blueprints.test.services;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprintsapi.BlueprintsAPIApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlueprintsAPIApplication.class)
@WebAppConfiguration
public class ApplicationServicesTests {

    protected MockMvc mvc;

    @Autowired
    WebApplicationContext webApplicationContext;

    protected String mapToJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void getBlueprintsTest() throws Exception {
        String uri = "/blueprints";
        MvcResult res = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int HttpStatus = res.getResponse().getStatus();
        assertEquals(202, HttpStatus);
    }

    @Test
    public void createBlueprintTest() throws Exception {
        String uri = "/blueprints";
        Blueprint product = new Blueprint("carlos test","test",new Point[]{new Point(1,2)});

        String inputJson = mapToJson(product);
        MvcResult res = mvc.perform(MockMvcRequestBuilders.post(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int HttpStatus = res.getResponse().getStatus();
        assertEquals(201, HttpStatus);
    }

    @Test
    public void updateProduct() throws Exception {
        String uri = "/blueprints/author1/Blueprint_a";
        Blueprint blueprint = new Blueprint();
        String inputJson = mapToJson(blueprint);
        MvcResult res = mvc.perform(MockMvcRequestBuilders.put(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int HttpStatus = res.getResponse().getStatus();
        assertEquals(201, HttpStatus);
    }

    @Test
    public void deleteBlueprintTest() throws Exception {
        String uri = "/blueprints/author1/Blueprint_a";
        MvcResult res = mvc.perform(MockMvcRequestBuilders.delete(uri)).andReturn();
        int HttpStatus = res.getResponse().getStatus();
        assertEquals(202, HttpStatus);
    }
}