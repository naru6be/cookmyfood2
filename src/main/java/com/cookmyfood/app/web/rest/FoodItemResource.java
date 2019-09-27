package com.cookmyfood.app.web.rest;

import com.cookmyfood.app.domain.FoodItem;
import com.cookmyfood.app.repository.FoodItemRepository;
import com.cookmyfood.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cookmyfood.app.domain.FoodItem}.
 */
@RestController
@RequestMapping("/api")
public class FoodItemResource {

    private final Logger log = LoggerFactory.getLogger(FoodItemResource.class);

    private static final String ENTITY_NAME = "foodItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FoodItemRepository foodItemRepository;

    public FoodItemResource(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

    /**
     * {@code POST  /food-items} : Create a new foodItem.
     *
     * @param foodItem the foodItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new foodItem, or with status {@code 400 (Bad Request)} if the foodItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/food-items")
    public ResponseEntity<FoodItem> createFoodItem(@Valid @RequestBody FoodItem foodItem) throws URISyntaxException {
        log.debug("REST request to save FoodItem : {}", foodItem);
        if (foodItem.getId() != null) {
            throw new BadRequestAlertException("A new foodItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FoodItem result = foodItemRepository.save(foodItem);
        return ResponseEntity.created(new URI("/api/food-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /food-items} : Updates an existing foodItem.
     *
     * @param foodItem the foodItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated foodItem,
     * or with status {@code 400 (Bad Request)} if the foodItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the foodItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/food-items")
    public ResponseEntity<FoodItem> updateFoodItem(@Valid @RequestBody FoodItem foodItem) throws URISyntaxException {
        log.debug("REST request to update FoodItem : {}", foodItem);
        if (foodItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FoodItem result = foodItemRepository.save(foodItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, foodItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /food-items} : get all the foodItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of foodItems in body.
     */
    @GetMapping("/food-items")
    public List<FoodItem> getAllFoodItems() {
        log.debug("REST request to get all FoodItems");
        return foodItemRepository.findAll();
    }

    /**
     * {@code GET  /food-items/:id} : get the "id" foodItem.
     *
     * @param id the id of the foodItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the foodItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/food-items/{id}")
    public ResponseEntity<FoodItem> getFoodItem(@PathVariable Long id) {
        log.debug("REST request to get FoodItem : {}", id);
        Optional<FoodItem> foodItem = foodItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(foodItem);
    }

    /**
     * {@code DELETE  /food-items/:id} : delete the "id" foodItem.
     *
     * @param id the id of the foodItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/food-items/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Long id) {
        log.debug("REST request to delete FoodItem : {}", id);
        foodItemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
