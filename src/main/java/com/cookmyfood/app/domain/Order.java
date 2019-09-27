package com.cookmyfood.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import com.cookmyfood.app.domain.enumeration.Status;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "employeeid", nullable = false)
    private String employeeid;

    @Column(name = "phone")
    private String phone;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @Column(name = "cost")
    private Long cost;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private Vendor vendor;

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private FoodItem fooditem;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeid() {
        return employeeid;
    }

    public Order employeeid(String employeeid) {
        this.employeeid = employeeid;
        return this;
    }

    public void setEmployeeid(String employeeid) {
        this.employeeid = employeeid;
    }

    public String getPhone() {
        return phone;
    }

    public Order phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Instant getDate() {
        return date;
    }

    public Order date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getCost() {
        return cost;
    }

    public Order cost(Long cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }

    public Status getStatus() {
        return status;
    }

    public Order status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public Order user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public Order vendor(Vendor vendor) {
        this.vendor = vendor;
        return this;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public FoodItem getFooditem() {
        return fooditem;
    }

    public Order fooditem(FoodItem foodItem) {
        this.fooditem = foodItem;
        return this;
    }

    public void setFooditem(FoodItem foodItem) {
        this.fooditem = foodItem;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", employeeid='" + getEmployeeid() + "'" +
            ", phone='" + getPhone() + "'" +
            ", date='" + getDate() + "'" +
            ", cost=" + getCost() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
