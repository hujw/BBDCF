<template>
  <div v-shortkey="['ctrl', '/']" class="d-flex flex-grow-1" @shortkey="onKeyup">
    <v-main>
      <v-container class="fill-height">
        <!-- Navigation -->
        <v-navigation-drawer
          v-model="drawer"
          app
          floating
          class="elevation-1"
          :right="$vuetify.rtl"
          :light="menuTheme === 'light'"
          :dark="menuTheme === 'dark'"
        >
          <!-- Navigation menu info -->
          <template v-slot:prepend>
            <div class="pa-2">
              <!-- <svg width="100%" height="60px">
            <use xlink:href="#mojoy"/>
          </svg> -->
              <v-img width="90%" height="60px" :src="require('@/assets/images/logo/baasid-darkb-logo.png')" contain class="mx-auto" />
            </div>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="require('@/assets/images/avatars/avatar1.svg')" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-wrap">
                  <span>管理者</span>
                  <span class="ml-1">(管理者)</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-slot:append> </template>
        </v-navigation-drawer>

        <!-- Toolbar -->
        <v-app-bar
          app
          class="chainss-header"
          :color="isToolbarDetached ? 'surface' : undefined"
          :flat="isToolbarDetached"
          :light="toolbarTheme === 'light'"
          :dark="toolbarTheme === 'dark'"
        >
          <v-card
            class="chainss-header flex-grow-1 d-flex"
            :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']"
            :flat="!isToolbarDetached"
          >
            <div class="d-flex flex-grow-1 align-center">
              <!-- search input mobile -->
              <v-text-field
                v-if="showSearch"
                append-icon="mdi-close"
                placeholder="Search"
                prepend-inner-icon="mdi-magnify"
                hide-details
                solo
                flat
                autofocus
                @click:append="showSearch = false"
              />

              <div v-else class="d-flex flex-grow-1 align-center">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

                <v-spacer class="d-none d-lg-block" />

                <!-- search input desktop -->
                <!--            <v-text-field-->
                <!--              ref="search"-->
                <!--              class="mx-1 hidden-xs-only"-->
                <!--              :placeholder="$t('menu.search')"-->
                <!--              prepend-inner-icon="mdi-magnify"-->
                <!--              hide-details-->
                <!--              filled-->
                <!--              rounded-->
                <!--              dense-->
                <!--            ></v-text-field>-->

                <v-spacer class="d-block d-sm-none" />

                <!--            <v-btn class="d-block d-sm-none" icon @click="showSearch = true">-->
                <!--              <v-icon>mdi-magnify</v-icon>-->
                <!--            </v-btn>-->

                <!--            <toolbar-language />-->

                <!--            <toolbar-kyc-level />-->

                <!--            <div class="hidden-xs-only mx-1">-->
                <!--              <toolbar-currency />-->
                <!--            </div>-->

                <!--            <toolbar-apps />-->

                <!--            <div :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']">-->
                <!--              <toolbar-notifications />-->
                <!--            </div>-->

                <toolbar-user />
              </div>
            </div>
          </v-card>
        </v-app-bar>

        <v-layout>
          <slot />
        </v-layout>
      </v-container>

      <v-footer inset class="chainss-footer" app>
        <div class="overline">© 2022 {{ product.name }}</div>
        , Inc.
      </v-footer>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import config from '../configs';
import store from '@/store';

export default {
  components: {},
  data() {
    return {
      drawer: null,
      showSearch: false,

      navigation: config.navigation
    };
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached']),

    userInfo() {
      return store.getters['user/userInfo'];
    }
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus();
    }
  }
};
</script>

<style scoped>
.buy-button {
  box-shadow: 1px 1px 18px #ee44aa;
}
</style>
