<template>
  <v-chip text-color="black" small>
    <v-icon style="margin-left: -4px">timer</v-icon>
    <span class="eta-text">{{ minimum }}-{{ maximum }} mins</span>
  </v-chip>
</template>

<script>
export default {
  name: "eta-chip",
  props: { restaurant: Object },
  data() {
    return {
      minimum: 0,
      maximum: 0
    }
  },
  created() {
    if (this.restaurant && this.restaurant.waitingTime) {
      this.minimum = this.restaurant.waitingTime.minimum;
      this.maximum = this.minimum + this.restaurant.waitingTime.range;
    }
  }
};
</script>

<style>
.eta-text {
  margin-left: 4px;
}
</style>
