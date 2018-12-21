<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon @click="drawer = false">arrow_back</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        
        <v-divider style="margin-top: 8px"></v-divider>

        <template v-for="item in sidenavItems">
          <v-subheader v-if="item.header" :key="item.header">
            {{ item.header }}
          </v-subheader>

          <v-list-tile v-else :key="item.title" avatar @click="navigate(item.href)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon @click="drawer = true"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-icon>fastfood</v-icon>
      <v-toolbar-title class="headline">Campus Bites</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <v-flex hidden-sm-and-down style="height: 32px"></v-flex>
      <v-layout row>
        <v-flex xs12 sm10 offset-sm1>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-content>

    <v-footer app color="primary darken-1">
      <v-spacer/>
      <div style="margin-right: 16px">
        &copy;2018 — <strong>Campus Bites</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    sidenavItems: [
      { header: "General" },
      // { title: "Log in", icon: "account_box" },
      { title: "Contact us", icon: "help", href: "https://www.facebook.com/campusbitesUK/" },
      // { header: "Admin" },
      // { title: "Dashboard", icon: "dashboard" }
    ]
  }),
  methods: {
    navigate: (href) => {
      if (href) {
        window.location = href;
      }
    }
  }
};
</script>

<style>
#login-icon {
  margin: 0 4px 0 -4px;
}
</style>
