<template>
  <div class="app-bar">
    <v-app-bar height="72" app class="" color="white py-1">
      <v-container class="px-0">
        <v-toolbar-title class="d-flex justify-space-between align-center">
          <v-img
            class="me-2 logo"
            :max-width="isXs ? '180' : '220'"
            :src="require('~/assets/images/biobank/logos/new-logo.svg')"
            alt=""
            contain
          ></v-img>
        </v-toolbar-title>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary left width="100%" class="z-999">
      <div class="secondary-siebar-content">
        <v-container class="pa-0 secondary">
          <v-list-item class="px-3">
            <v-list-item-content class="py-5">
              <nuxt-link to="/" aria-label="go to Home">
                <v-img
                  class="me-2 logo"
                  max-width="220"
                  :src="require('~/assets/images/biobank/logos/new-logo.svg')"
                  alt=""
                  contain
                ></v-img>
              </nuxt-link>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon color="blueDarken" @click="drawer = false">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-container>

        <!-- <v-container class="pt-0 secondary">
          <h3 v-if="isLoggedIn" class="font-weight-medium black--text">Biobank之友 您好！</h3>
        </v-container> -->

        <v-container class="blueDarken" :style="{ height: '110vh' }">
          <!-- :style="{height:isLoggedIn ? 'calc(100vh - 129px)' : 'calc(100vh - 99px)'}" -->
          <v-list>
            <template v-for="(item, index) in navItems">
              <!-- v-if="index !== 6" -->
              <!-- v-if="index !== 4" -->
              <v-list-item :key="index" class="white--text" :style="{ borderBottom: '1px solid #fff' }" @click="goToPage(item)">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon color="white">mdi-arrow-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <!-- 駐站預約 -->
              <!-- v-if="index === 4" -->
              <!-- <v-list-group :key="index" :style="{ borderBottom: '1px solid #fff' }">
                <v-icon slot="appendIcon" :style="{ fontSize: '28px' }" color="white">mdi-chevron-down</v-icon>

                <template #activator>
                  <v-list-item-content class="white--text">
                    <v-list-item-title>
                      {{ navItems[4].title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item v-for="(subItem, i) in navItems[4].items" :key="i" @click="goToPage(subItem)">
                  <v-list-item-content>
                    <v-list-item-title class="white--text">
                      {{ subItem.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group> -->
            </template>
          </v-list>
        </v-container>
      </div>
    </v-navigation-drawer>
    <DialogLogout :dialog-visible="dialogLogout" :title="''" @dialogConfirm="logout" @dialogClose="closeDialog">
      <div class="d-flex justify-center align-center py-5">
        <span class="text-h4 text-center">確定要登出？</span>
      </div>
    </DialogLogout>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import { directive as onClickaway } from 'vue-clickaway';
// import { medicalReport as apiMedicalReport } from '@/api/medicalReport'
import DialogLogout from '@/components/Dialog';
import Btn from '@/components/base/Btn';
// import HeaderNavbar from '@/pages/home/header-navbar'
// import Navbar from '@/pages/home/navbar'

export default {
  name: 'BaseAppBar',
  directives: {
    onClickaway
  },
  components: {
    DialogLogout
  },

  data() {
    return {
      dialogLogout: false,
      drawer: false,
      navItems: [
        { title: '最新公告', path: '/bullectin', type: 'in' },
        { title: '我的消息', path: '/message', type: 'in' },
        { title: '我的同意書', path: '/myConsent', type: 'in' },
        { title: '我的問卷', path: '/myQuestionnaire', type: 'in' },
        { title: '篩檢報告', path: '/medicalReport', type: 'in' },
        { title: '我的資料', path: '/member/settings', type: 'in' },
        { title: 'TWID驗證', path: '', type: 'in' }
        // { title: '成果回饋', path: '/achievement', type: 'in' },
        // { title: 'Q&A', path: '/faq', type: 'in' },
        // {
        //   title: '駐站預約',
        //   items: [
        //     { title: '各地駐站', path: '/reservation', type: 'in' },
        //     { title: '我的預約', path: '/reservation/myReservation', type: 'in' }
        //   ]
        // },
        // { title: '意願變更', path: 'https://www.twbiobank.org.tw/attendance_change.php', type: 'out' },
        // { title: '退出參與', path: 'https://www.twbiobank.org.tw/attendance_fd.php', type: 'out' }
        // { title: '篩檢報告', path: 'https://www.twbiobank.org.tw/attendance_fd.php', type:'pdf' }
      ]
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
    showArrowAndMenuBtn() {
      return this.$route.name !== 'index';
    },
    isXs() {
      return ['xs'].includes(this.$vuetify.breakpoint.name);
    }
  },
  mounted() {},
  methods: {
    goToPage(item) {
      if (item.type === 'in') {
        this.$router.push({ path: item.path });
      }
      if (item.type === 'out') {
        window.open(item.path, '_blank');
      }
      // if(item.type === 'pdf'){
      //   this.downloadPdf()
      // }
    },
    // async downloadPdf(){
    //   if (!this.isLoggedIn) {
    //     this.$toast.info('請先登入')
    //     this.$router.push({ name: 'auth-signIn' })

    //     return
    //   }
    //   try {
    //     // 取回blob
    //     const blobData = await apiMedicalReport.downloadOwnMedicalReport(
    //       this.$axios
    //     )

    //     // 將blob轉為url 開啟
    //     window.open(window.URL.createObjectURL(blobData))
    //   } catch (err) { }
    // },
    backToPrevPage() {
      this.$router.go(-1);
    },
    async logout() {
      await this.$store.dispatch('user/logout');

      this.loading = false;
      this.dialogLogout = false;
    },
    closeDialog(val) {
      this.dialogLogout = val;
    }
  }
};
</script>
<style lang="scss">
.app-bar .v-toolbar__content {
  padding: 4px 12px;

  /* border-bottom: 5px solid rgb(30, 54, 83); */
  padding-bottom: 5px;
  background:
  
  /* gradient can be an image */ linear-gradient(to right, #c09079, #bce2d0) left bottom no-repeat;
  background-size: 100% 5px;

  /* if linear-gradient, we need to resize it */
}
</style>
<style lang="scss" scoped>
$z-index-sub-topbar: 2;
$md: 959px;
$z-99: 99;

.z-999 {
  z-index: 999;
}

.v-list-item {
  min-height: 34px;
}

.top-bar {
  height: 40px;
  display: flex;
  align-items: center;
}

.sub-topbar {
  position: relative;
  box-shadow: none !important;
  width: 100%;
  height: 80px !important;
  z-index: $z-99;

  .dropdown-ecommerce {
    display: none;
  }

  &.v-app-bar--fixed {
    position: unset;
  }

  // z-index: $z-index-sub-topbar;

  &.v-app-bar--is-scrolled {
    position: fixed;
    top: 0;
    box-shadow: none !important;

    .dropdown-ecommerce {
      display: block;
    }
  }
}

.navbar {
  height: 60px;
  width: 100%;
  z-index: 2;
  box-shadow: rgb(43 52 69 / 10%) 0 16px 16px -16px !important;

  &.v-app-bar--is-scrolled {
    position: relative;
    top: 64px;
    margin-bottom: 64px;
    box-shadow: rgb(43 52 69 / 10%) 0 16px 16px -16px !important;
    // box-shadow: none !important;
  }

  @media (max-width: 992px) {
    display: none;
  }
}

.sale-page-one {
  .sub-topbar {
    &.v-app-bar--is-scrolled {
      position: relative;

      .dropdown-ecommerce {
        display: none;
      }
    }
  }

  .navbar {
    &.v-app-bar--is-scrolled {
      top: 0;
      margin-bottom: 0;
    }
  }
}

.sale-page-two {
  .sub-topbar {
    &.v-app-bar--is-scrolled {
      position: relative;

      .dropdown-ecommerce {
        display: none;
      }
    }
  }

  .navbar {
    &.v-app-bar--is-scrolled {
      top: 0;
      margin-bottom: 0;
    }
  }
}

.search-bar {
  ::v-deep .v-input__slot {
    border: 1px solid rgb(218, 225, 231);
    background-color: #fff !important;
  }

  .search-bar-dropdown {
    height: 39px;
    position: absolute;
    top: 20px;
    transform: translateY(-50%);
    right: 2px;
    border-radius: 22px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 1px solid rgb(218, 225, 231) !important;
    box-shadow: none !important;

    @media (max-width: $md) {
      display: none;
    }
  }

  ::v-deep .v-text-field__details {
    display: none;
  }
}

// toggleNavbarButton
.navbar-toggle-dropdown {
  z-index: 98;
  display: none;

  &.open {
    display: block;
    top: 64px;
  }
}

.v-hidden {
  visibility: hidden;
}

.empty-cart-sidebar {
  height: 80vh;
}
</style>
