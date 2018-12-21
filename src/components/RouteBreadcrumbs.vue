<template>
  <v-breadcrumbs :items="items">
    <v-icon slot="divider">chevron_right</v-icon>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "RouteBreadcrumbs",
  data: () => ({
    items: []
  }),
  created() {
    for (const match of this.$route.matched) {
      this.items.push({
        text: match.name,
        disabled: true,
        href: match.path
      });
    }
  }
};
</script>

<style scoped>
.disabled {
  color: grey;
  pointer-events: none;
}
</style>
