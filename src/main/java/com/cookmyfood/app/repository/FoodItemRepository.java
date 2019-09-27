package com.cookmyfood.app.repository;

import com.cookmyfood.app.domain.FoodItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the FoodItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

    @Query("select foodItem from FoodItem foodItem where foodItem.user.login = ?#{principal.username}")
    List<FoodItem> findByUserIsCurrentUser();

}
