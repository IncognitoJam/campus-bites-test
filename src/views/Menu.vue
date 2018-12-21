<template>
  <div id="menu">
    <v-card class="card--flex-toolbar">
      <v-toolbar card prominent>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-toolbar-title class="body-2 grey--text">
          <router-link to="/restaurants">Restaurants</router-link> > {{ restaurant.name }}
        </v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-flex xs12 class="red">
        <v-img height="200px" :src="restaurant.photo ? restaurant.photo : restaurant.logo">
          <div style="position: absolute; bottom: 0; right: 0;">
            <eta-chip :restaurant="restaurant"/>
            <hours-chip :restaurant="restaurant"/>
          </div>
        </v-img>
      </v-flex>

      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center>
            <v-avatar v-if="restaurant.logo" style="margin-right: 8px" size="96">
              <img style="display: block; object-fit: cover" :src="restaurant.logo">
            </v-avatar>
            <div style="margin: 8px">
              <span class="display-1">{{ restaurant.name }}</span>
              <rating :restaurant="restaurant"/>
            </div>
          </v-flex>

          <v-flex xs12>
            <div>
              <h3 class="headline mb-0">Menu</h3>
              <span class="caption">Select a category from {{ restaurant.name }}'s menu</span>

              <v-layout row wrap>
                <v-flex xs12 sm6 lg4 xl3 grow v-for="foodType of foodTypes" :key="foodType.name">
                  <v-card flat ripple class="food-type" outline>
                    <v-img height="200px" :src="foodType.image"/>
                    <v-card-title>
                      <div>
                        <div class="headline">{{ foodType.name }}</div>
                        {{ foodType.description }}
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>

                <v-template v-if="filter.category.length > 0">
                  <v-flex xs12>
                    <span class="caption">Pick an item from {{ restaurant.name }}'s menu</span>
                  </v-flex>

                  <v-flex xs12 sm6 lg4 xl3 grow v-for="foodItem of foodItems" :key="foodItem.name">
                    <v-card flat ripple class="food-item" outline>
                      <v-img height="200px" :src="foodItem.image || ''"/>
                      <v-card-title>
                        <div>
                          <div class="headline">{{ foodItem.name }}</div>
                          {{ foodItem.price }}
                        </div>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </v-template>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

import RouteBreadcrumbs from "@/components/RouteBreadcrumbs.vue";
import Rating from "@/components/Rating";
import ETAChip from "@/components/ETAChip";
import HoursChip, { getStatus } from "@/components/HoursChip";

const foodTypes = [
  {
    name: "Wraps",
    image: "https://image.shutterstock.com/z/stock-photo-classic-tortilla-wrap-with-grilled-chicken-480182575.jpg",
    description: "Tortilla and pitta wraps"
  },
  {
    name: "Burgers",
    image: "https://image.shutterstock.com/z/stock-photo-two-homemade-beef-burgers-with-mushrooms-micro-greens-red-onion-fried-eggs-and-beet-sauce-on-1009968298.jpg",
    description: "Beef, donner, chicken and veggie burgers"
  }
];

const foodItems = [
  {
    name: "Donner Wrap",
    category: "Wraps",
    price: "£4.90",
  },
  {
    name: "Chicken Wrap",
    category: "Wraps",
    price: "£5.90"
  },
  {
    name: "Grilled Vegetables Wrap",
    category: "Wraps",
    price: "£5.40",
    vegetarian: true
  },
  {
    name: "Veg Burger",
    category: "Burgers",
    price: "£2.80",
    vegetarian: true
  },
  {
    name: "Cheese Burger",
    category: "Burgers",
    price: "£2.80"
  }
];

export default {
  name: "Menu",
  components: {
    "route-breadcrumbs": RouteBreadcrumbs,
    rating: Rating,
    "eta-chip": ETAChip,
    "hours-chip": HoursChip
  },
  data: () => ({
    restaurant: undefined,
    foodTypes: foodTypes,
    filter: {
      category: ""
    }
  }),
  computed: {
    foodItems: function() {
      return [...foodItems]
        .filter(f => f.category == this.filter.category);
    }
  },
  beforeCreate() {
    firebase
      .firestore()
      .collection("restaurants")
      .doc(this.$route.params.id)
      .get()
      .then(snapshot => {
        this.restaurant = snapshot.data();
        this.restaurant.status = getStatus(this.restaurant);
      });
  }
}
</script>

<style>
.food-type {
  margin: 24px;
  border-radius: 4px;
}
</style>
