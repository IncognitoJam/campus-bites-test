<template>
  <div id="restaurants">
    <v-card class="card--flex-toolbar">
      <v-toolbar card prominent>
        <v-text-field
          hide-details
          prepend-icon="search"
          single-line style="padding-top: 0"
          placeholder="Search for your favourite restaurant"
          v-model="filter.searchTerm"
        />
      </v-toolbar>

      <v-expansion-panel style="box-shadow: none">
        <v-expansion-panel-content class="white--text secondary">
          <div slot="header">
            <v-icon color="white" style="margin: 0 4px -2px 0">tune</v-icon>
            Restaurant Filters
          </div>
          <v-card style="padding: 16px">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 md6>
                <v-switch
                  label="Show closed restaurants"
                  v-model="filter.showClosed"
                  color="secondary"
                ></v-switch>
              </v-flex>

              <v-flex xs12 md6 d-flex>
                <v-select
                  label="Sort method"
                  :items="filter.sortMethods"
                  v-model="filter.sortMethod"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-divider></v-divider>

      <v-layout row wrap>
        <v-flex xs12 sm6 lg4 xl3 grow v-for="r of restaurantGrid" :key="r.name" @click="$router.push('restaurants/' + r.id);">
          <v-card flat ripple class="restaurant-item" outline>
            <v-img height="200px" :src="r.photo ? r.photo : r.logo">
              <div style="position: absolute; bottom: 0; right: 0;">
                <eta-chip :restaurant="r"/>
                <hours-chip :restaurant="r"/>
              </div>
            </v-img>
            <v-card-title>
              <v-avatar v-if="r.logo" style="margin: 0 12px 0 -2px">
                <img style="display: block; object-fit: cover" :src="r.logo">
              </v-avatar>
              <div>
                <span class="headline">{{ truncate(r.name, 25) }}</span>
                <rating :restaurant="r"/>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

import Rating from "@/components/Rating";
import ETAChip from "@/components/ETAChip";
import HoursChip, { getStatus } from "@/components/HoursChip";

export default {
  name: "Restaurants",
  components: {
    rating: Rating,
    "eta-chip": ETAChip,
    "hours-chip": HoursChip
  },
  data: () => ({
    restaurants: [],
    filter: {
      searchTerm: "",
      showClosed: true,
      sortMethod: "Rating, descending",
      sortMethods: [
        "Rating, descending",
        "Rating, ascending",
        "Alphabetical, A-z",
        "Alphabetical, Z-a"
      ]
    }
  }),
  computed: {
    restaurantGrid: function () {
      return [...this.restaurants]
        .sort((r1, r2) => sort(r1, r2, this.filter.sortMethod))
        .filter(r => this.filter.showClosed ? true : (r.status.unknown ? true : r.status.isOpen))
        .filter(r => this.filter.searchTerm.length == 0 || r.name.toLowerCase().includes(this.filter.searchTerm.toLowerCase()));
    }
  },
  created() {
    firebase
      .firestore()
      .collection("restaurants")
      .get()
      .then(snapshot => {
        const restaurants = [];
        snapshot.forEach(child => {
          const restaurant = child.data();
          restaurant.id = child.id;
          restaurant.status = getStatus(restaurant);
          restaurants.push(restaurant);
        });

        this.restaurants = restaurants;
      })
      .catch(err => {
        alert("Error getting documents", err);
      });
  },
  methods: {
    truncate: (s, length) => {
      if (s.length > length) return s.substring(0, length - 3) + "...";
      else return s;
    }
  }
};

const sort = (r1, r2, sortMethod) => {
  if (sortMethod == "Rating, ascending" || sortMethod == "Rating, descending") {
    const p1 = r1.aggregateRating.ratingValue;
    const p2 = r2.aggregateRating.ratingValue;

    const orderMul = sortMethod == "Rating, ascending" ? 1 : -1;

    if (p1 > p2) return 1 * orderMul;
    else if (p2 > p1) return -1 * orderMul;
    return 0;
  } else if (sortMethod == "Alphabetical, A-z" || sortMethod == "Alphabetical, Z-a") {
    const p1 = r1.name;
    const p2 = r2.name;

    const orderMul = sortMethod == "Alphabetical, A-z" ? 1 : -1;
    return p1.localeCompare(p2) * orderMul;
  } else {
    return 0;
  }
};
</script>

<style>
.restaurant-item {
  margin: 24px;
  border-radius: 4px;
}
</style>
