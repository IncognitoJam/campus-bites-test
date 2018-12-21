<template>
  <v-chip v-if="text.length > 0" :color="colour" text-color="white" small>
    <v-icon style="margin-right: 2px; margin-left: -4px">access_time</v-icon>
    {{ text }}
  </v-chip>
</template>

<script>
import moment from "moment";
import OpeningTimes from "moment-opening-times";

export default {
  name: 'hours-chip',
  props: { restaurant: Object },
  data() {
    return {
      text: '',
      colour: '#ffffff'
    }
  },
  created() {
    const status = this.restaurant.status;

    if (!status.unknown) {
      this.text = status.isOpen ? 'Open now' : 'Closed';
      this.colour = status.isOpen ? 'green' : 'red';
    } else {
      this.text = 'Unknown';
      this.colour = 'orange';
    }
  }
}

export function getStatus(restaurant) {
  if (Object.keys(restaurant.openingHours || {}).length == 7) {
    const openingTimesMoment = new OpeningTimes(restaurant.openingHours, "Europe/London");
    return openingTimesMoment.getStatus(moment());
  }
  return { unknown: true };
}
</script>
