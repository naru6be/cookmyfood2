package com.cookmyfood.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A FoodItem.
 */
@Entity
@Table(name = "food_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FoodItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "foodname", nullable = false)
    private String foodname;

    @NotNull
    @Column(name = "cost", nullable = false)
    private Long cost;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @NotNull
    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @OneToMany(mappedBy = "fooditem")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Menu> menus = new HashSet<>();

    @OneToMany(mappedBy = "fooditem")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Order> orders = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("foodItems")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoodname() {
        return foodname;
    }

    public FoodItem foodname(String foodname) {
        this.foodname = foodname;
        return this;
    }

    public void setFoodname(String foodname) {
        this.foodname = foodname;
    }

    public Long getCost() {
        return cost;
    }

    public FoodItem cost(Long cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }

    public byte[] getImage() {
        return image;
    }

    public FoodItem image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public FoodItem imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public FoodItem capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Set<Menu> getMenus() {
        return menus;
    }

    public FoodItem menus(Set<Menu> menus) {
        this.menus = menus;
        return this;
    }

    public FoodItem addMenu(Menu menu) {
        this.menus.add(menu);
        menu.setFooditem(this);
        return this;
    }

    public FoodItem removeMenu(Menu menu) {
        this.menus.remove(menu);
        menu.setFooditem(null);
        return this;
    }

    public void setMenus(Set<Menu> menus) {
        this.menus = menus;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public FoodItem orders(Set<Order> orders) {
        this.orders = orders;
        return this;
    }

    public FoodItem addOrder(Order order) {
        this.orders.add(order);
        order.setFooditem(this);
        return this;
    }

    public FoodItem removeOrder(Order order) {
        this.orders.remove(order);
        order.setFooditem(null);
        return this;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public User getUser() {
        return user;
    }

    public FoodItem user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FoodItem)) {
            return false;
        }
        return id != null && id.equals(((FoodItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FoodItem{" +
            "id=" + getId() +
            ", foodname='" + getFoodname() + "'" +
            ", cost=" + getCost() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", capacity=" + getCapacity() +
            "}";
    }
}
