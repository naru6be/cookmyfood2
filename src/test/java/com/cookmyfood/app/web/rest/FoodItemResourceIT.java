package com.cookmyfood.app.web.rest;

import com.cookmyfood.app.CookmyfoodApp;
import com.cookmyfood.app.domain.FoodItem;
import com.cookmyfood.app.repository.FoodItemRepository;
import com.cookmyfood.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.cookmyfood.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link FoodItemResource} REST controller.
 */
@SpringBootTest(classes = CookmyfoodApp.class)
public class FoodItemResourceIT {

    private static final String DEFAULT_FOODNAME = "AAAAAAAAAA";
    private static final String UPDATED_FOODNAME = "BBBBBBBBBB";

    private static final Long DEFAULT_COST = 1L;
    private static final Long UPDATED_COST = 2L;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Integer DEFAULT_CAPACITY = 1;
    private static final Integer UPDATED_CAPACITY = 2;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFoodItemMockMvc;

    private FoodItem foodItem;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FoodItemResource foodItemResource = new FoodItemResource(foodItemRepository);
        this.restFoodItemMockMvc = MockMvcBuilders.standaloneSetup(foodItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FoodItem createEntity(EntityManager em) {
        FoodItem foodItem = new FoodItem()
            .foodname(DEFAULT_FOODNAME)
            .cost(DEFAULT_COST)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .capacity(DEFAULT_CAPACITY);
        return foodItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FoodItem createUpdatedEntity(EntityManager em) {
        FoodItem foodItem = new FoodItem()
            .foodname(UPDATED_FOODNAME)
            .cost(UPDATED_COST)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .capacity(UPDATED_CAPACITY);
        return foodItem;
    }

    @BeforeEach
    public void initTest() {
        foodItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createFoodItem() throws Exception {
        int databaseSizeBeforeCreate = foodItemRepository.findAll().size();

        // Create the FoodItem
        restFoodItemMockMvc.perform(post("/api/food-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foodItem)))
            .andExpect(status().isCreated());

        // Validate the FoodItem in the database
        List<FoodItem> foodItemList = foodItemRepository.findAll();
        assertThat(foodItemList).hasSize(databaseSizeBeforeCreate + 1);
        FoodItem testFoodItem = foodItemList.get(foodItemList.size() - 1);
        assertThat(testFoodItem.getFoodname()).isEqualTo(DEFAULT_FOODNAME);
        assertThat(testFoodItem.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testFoodItem.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testFoodItem.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testFoodItem.getCapacity()).isEqualTo(DEFAULT_CAPACITY);
    }

    @Test
    @Transactional
    public void createFoodItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = foodItemRepository.findAll().size();

        // Create the FoodItem with an existing ID
        foodItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFoodItemMockMvc.perform(post("/api/food-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foodItem)))
            .andExpect(status().isBadRequest());

        // Validate the FoodItem in the database
        List<FoodItem> foodItemList = foodItemRepository.findAll();
        assertThat(foodItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFoodnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = foodItemRepository.findAll().size();
        // set the field null
        foodItem.setFoodname(null);

        // Create the FoodItem, which fails.

        restFoodItemMockMvc.perform(post("/api/food-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foodItem)))
            .andExpect(status().isBadRequest());

        List<FoodItem> foodItemList = foodItemRepository.findAll();
        assertThat(foodItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCostIsRequired() throws Exception {
        int databaseSizeBeforeTest = foodItemRepository.findAll().size();
        // set the field null
        foodItem.setCost(null);

        // Create the FoodItem, which fails.

        restFoodItemMockMvc.perform(post("/api/food-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foodItem)))
            .andExpect(status().isBadRequest());

        List<FoodItem> foodItemList = foodItemRepository.findAll();
        assertThat(foodItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCapacityIsRequired() throws Exception {
        int databaseSizeBeforeTest = foodItemRepository.findAll().size();
        // set the field null
        foodItem.setCapacity(null);

        // Create the FoodItem, which fails.

        restFoodItemMockMvc.perform(post("/api/food-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foodItem)))
            .andExpect(status().isBadRequest());

        List<FoodItem> foodItemList = foodItemRepository.findAll();
        assertThat(foodItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFoodItems() throws Exception {
        // Initialize the database
        foodItemRepository.saveAndFlush(foodItem);

        // Get all the foodItemList
        restFoodItemMockMvc.perform(get("/api/food-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(foodItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].foodname").value(hasItem(DEFAULT_FOODNAME.toString())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.intValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY)));
    }
    
    @Test
    @Transactional
    public void getFoodItem() throws Exception {
        // Initialize the database
        foodItemRepository.saveAndFlush(foodItem);

        // Get the foodItem
        restFoodItemMockMvc.perform(get("/api/food-items/{id}", foodItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(foodItem.getId().intValue()))
            .andExpect(jsonPath("$.foodname").value(DEFAULT_FOODNAME.toString()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.intValue()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY));
    }

    @Test
    @Transactional
    public void getNonExistingFoodItem() throws Exception {
        // Get the foodItem
        restFoodItemMockMvc.perform(get("/api/food-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFoodItem() throws Exception {
        // Initialize the database
        foodItemRepository.saveAndFlush(foodItem);

        int databaseSizeBeforeUpdate = foodItemRepository.findAll().size();

        // Update the foodItem
        FoodItem updatedFoodItem = foodItemRepository.findById(foodItem.getId()).get();
        // Disconnect from session so that the updates on updatedFoodItem are not directly saved in db
        em.detach(updatedFoodItem);
        updatedFoodItem
            .foodname(UPDATED_FOODNAME)
            .cost(UPDATED_COST)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .capacity(UPDATED_CAPACITY);

        restFoodItemMockMvc.perform(put("/api/food-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFoodItem)))
            .andExpect(status().isOk());

        // Validate the FoodItem in the database
        List<FoodItem> foodItemList = foodItemRepository.findAll();
        assertThat(foodItemList).hasSize(databaseSizeBeforeUpdate);
        FoodItem testFoodItem = foodItemList.get(foodItemList.size() - 1);
        assertThat(testFoodItem.getFoodname()).isEqualTo(UPDATED_FOODNAME);
        assertThat(testFoodItem.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testFoodItem.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testFoodItem.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testFoodItem.getCapacity()).isEqualTo(UPDATED_CAPACITY);
    }

    @Test
    @Transactional
    public void updateNonExistingFoodItem() throws Exception {
        int databaseSizeBeforeUpdate = foodItemRepository.findAll().size();

        // Create the FoodItem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFoodItemMockMvc.perform(put("/api/food-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foodItem)))
            .andExpect(status().isBadRequest());

        // Validate the FoodItem in the database
        List<FoodItem> foodItemList = foodItemRepository.findAll();
        assertThat(foodItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFoodItem() throws Exception {
        // Initialize the database
        foodItemRepository.saveAndFlush(foodItem);

        int databaseSizeBeforeDelete = foodItemRepository.findAll().size();

        // Delete the foodItem
        restFoodItemMockMvc.perform(delete("/api/food-items/{id}", foodItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FoodItem> foodItemList = foodItemRepository.findAll();
        assertThat(foodItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FoodItem.class);
        FoodItem foodItem1 = new FoodItem();
        foodItem1.setId(1L);
        FoodItem foodItem2 = new FoodItem();
        foodItem2.setId(foodItem1.getId());
        assertThat(foodItem1).isEqualTo(foodItem2);
        foodItem2.setId(2L);
        assertThat(foodItem1).isNotEqualTo(foodItem2);
        foodItem1.setId(null);
        assertThat(foodItem1).isNotEqualTo(foodItem2);
    }
}
