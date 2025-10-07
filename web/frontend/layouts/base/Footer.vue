<template>
  <v-footer dark color="secondary">
    <v-container>
      <v-row>
        <v-col cols="12" xl="4" lg="4" md="4" sm="6">
          <nuxt-link to="/" aria-label="go to Home">
            <v-img
              class="me-2 mb-5"
              width="220"
              height="auto"
              :src="require('~/assets/images/biobank/logos/new-logo.svg')"
              alt=""
              contain
            />
          </nuxt-link>
          <p class="footer-text mb-3">Copyright © 2021 Taiwan Biobank Association. All Rights Reserved.</p>
          <p class="footer-text mb-3">隱私權與保護政策 | 著作權聲明</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  name: 'Footer',
  data: () => ({})
};
</script>
<style lang="scss">
a.footer-link-hover {
  color: #bdbdbd !important;
  &:hover {
    color: #fff !important;
  }
}
.v-footer {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
</style>
