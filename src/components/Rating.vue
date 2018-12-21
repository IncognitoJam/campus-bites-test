<template>
  <div class="caption">
    <v-icon small :color="colour">{{ icon }}</v-icon>
    <span :style="{ color: colour }"> {{ percentage }}</span>
    <span class="black--text"> ({{ reviewCount }})</span>
    · 
    <span v-if="restaurant.priceRange" :style="{ color: priceColour }">
      {{ restaurant.priceRange }}
    </span>
  </div>
</template>

<script>
import colors from "vuetify/es5/util/colors";

export default {
  name: "Rating",
  data() {
    return {
      reviewCount: 0,
      percentage: 0,
      icon: "",
      colour: "",
      priceColour: ""
    };
  },
  props: { restaurant: Object },
  created() {
    const rating = this.restaurant.aggregateRating;
    this.reviewCount = rating.reviewCount;

    const pct = (rating.ratingValue / 0.05).toFixed(0);
    this.percentage = pct + "%";

    if (pct >= 85) {
      this.icon = "sentiment_very_satisfied";
      this.colour = colors.green.accent4;
    } else if (pct >= 70) {
      this.icon = "sentiment_satisfied_alt";
      this.colour = colors.lightGreen.accent4;
    } else if (pct >= 55) {
      this.icon = "sentiment_satisfied";
      this.colour = colors.lime.accent3;
    } else if (pct >= 40) {
      this.icon = "sentiment_dissatisfied";
      this.colour = colors.orange.accent3;
    } else {
      this.icon = "sentiment_very_dissatisfied";
      this.colour = colors.red.accent3;
    }

    const priceLength = this.restaurant.priceRange.length;
    if (priceLength >= 3) {
      this.priceColour = colors.orange.accent3;
    } else if (priceLength == 2) {
      this.priceColour = colors.lime.accent3;
    } else {
      this.priceColour = colors.green.accent4;
    }
  }
};
</script>
