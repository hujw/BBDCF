<template>
  <!-- 依照螢幕尺寸給mt -->
  <div :style="{ marginTop: isXsOrSm ? '66px' : '55px' }" class="mb-60">
    <!-- section-1  -->
    <div class="mb-5">
      <v-container class="py-0">
        <v-row justify="center" align="center">
          <v-col cols="12" lg="12" class="pa-0">
            <!-- 輪播圖或大圖片一定要預先給寬高 不然會提高cls -->
            <!-- 依照不同螢幕尺寸給height -->
            <v-carousel
              cycle
              :height="isXsOrSm ? '100%' : isMd ? '404' : isLg ? '523' : '778'"
              class="vuetify-carousel"
              hide-delimiter-background
              delimiter-icon="mdi-minus"
            >
              <v-carousel-item v-for="(item, index) in homeSlider" :key="index" eager @click="goToCarouselUrl(item.url)">
                <v-img eager :height="'100%'" :width="'100%'" :src="item.googleUrl" contain />
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- section-2  -->
    <div class="container mb-5 taiwan-biobank">
      <v-row>
        <!-- <v-col cols="12">
          <h2 class="linearText font-weight-medium text-center">
            TAIWAN BIOBANK
          </h2>
        </v-col> -->
        <v-col v-for="(item, index) in navItems" :key="index" cols="6">
          <div
            :style="{ cursor: 'pointer' }"
            class="d-flex flex-column justify-center align-center pa-5 rounded-lg"
            :class="item.backgroundColor"
            :data-cy="item.dataCy"
            @click="goToPage(item)"
          >
            <v-img :src="item.icon" width="50px" height="50px"></v-img>
            <p class="white--text mb-0">{{ item.title }}</p>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- 忘記密碼 後臺重設後 提醒要修改密碼 (只顯示一次) -->
    <ResetPasswordDialog
      :dialog-visible="resetPasswordDialog"
      :title="'提醒'"
      :show-close-btn="false"
      :loading="resetPasswordDialogLoaidng"
      @dialogConfirm="closeDialog"
    >
      <div class="d-flex justify-center align-center">
        <v-icon color="warning" left> mdi-alert-decagram </v-icon>
        <span class="text-h6 text-center">請到【我的資料】>【重設密碼】 設定新的密碼</span>
      </div>
    </ResetPasswordDialog>
  </div>
</template>

<script>
import ResetPasswordDialog from '@/components/Dialog';

export default {
  name: 'Home',
  components: {
    ResetPasswordDialog
  },

  data() {
    return {
      resetPasswordDialog: false,
      resetPasswordDialogLoaidng: false,
      navItems: [
        {
          title: '最新公告',
          icon: require('@/assets/images/biobank/icons/sound.svg'),
          path: '/bullectin',
          backgroundColor: 'primary',
          dataCy: 'bullectin-btn'
        },
        {
          title: '個人消息',
          icon: require('@/assets/images/biobank/icons/messageIcon.svg'),
          path: '/message',
          backgroundColor: 'greenLighten',
          dataCy: 'message-btn'
        },
        {
          title: '我的同意書',
          icon: require('@/assets/images/biobank/icons/agreement.svg'),
          path: '/myConsent',
          backgroundColor: 'greenLighten',
          dataCy: 'my-consent-btn'
        },
        {
          title: '我的問卷',
          icon: require('@/assets/images/biobank/icons/question.svg'),
          path: '/myQuestionnaire',
          backgroundColor: 'primary',
          dataCy: ''
        },
        {
          title: '篩檢報告',
          icon: require('@/assets/images/biobank/icons/fileDockSearchIcon-lightGreen.svg'),
          path: '/medicalReport',
          backgroundColor: 'primary',
          dataCy: ''
        },
        {
          title: '我的資料',
          icon: require('@/assets/images/biobank/icons/user-primary.svg'),
          path: '/member/settings',
          backgroundColor: 'greenLighten',
          dataCy: ''
        }

        // {
        //   title: '成果回饋',
        //   icon: require('@/assets/images/biobank/icons/fileDockSearchIcon.svg'),
        //   path: '/achievement',
        //   backgroundColor: 'greenLighten',
        //   // backgroundColor: 'primary',
        //   dataCy: 'achievement-btn'
        // }
        // {
        //   title: '駐站預約',
        //   icon: require('@/assets/images/biobank/icons/Pin_alt_duotone.svg'),
        //   path: '/reservation',
        //   dataCy: 'reservation-btn',
        // },
        //  {
        //   title: 'Q&A',
        //   icon: require('@/assets/images/biobank/icons/question.svg'),
        //   path: '/faq',
        //   backgroundColor: 'primary',
        //   dataCy: 'qa-btn',
        // }
      ]
      // homeSlider: [{}],
    };
  },
  head() {
    return {
      title: '首頁',
      link: this.headPreload.length ? this.headPreload : [],
      meta: []
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
    passwordReminder() {
      return this.$store.state.user.userInfo.passwordReminder;
    },
    isXsOrSm() {
      // < 960px
      return ['xs', 'sm'].includes(this.$vuetify.breakpoint.name);
    },
    isMd() {
      // 960px >< 1264px
      return ['md'].includes(this.$vuetify.breakpoint.name);
    },
    isLg() {
      // 1264px >< 1904
      return ['lg'].includes(this.$vuetify.breakpoint.name);
    }
  },
  created() {
    this.$router.push('/myConsent');
  },
  mounted() {
    // this.getHomeCarosul()
    // true代表需要修改
    if (this.passwordReminder) {
      this.resetPasswordDialog = true;
    }
  },
  methods: {
    // async getHomeCarosul() {
    //   this.loading = true
    //   try {
    //     this.homeSlider = await apiHomeCarousel.findHomeCarousel(this.$axios)
    //   } catch (err) {}
    //   this.loading = false
    // },
    goToPage(item) {
      // if (item.title === '篩檢報告') {
      //   this.openMedicalReport()
      // }
      // if (item.title !== '篩檢報告') {
      //   this.$router.push({ path: item.path })
      // }
      this.$router.push({ path: item.path });
    }
    // // 篩檢報告
    // async openMedicalReport() {
    //   if (!this.isLoggedIn) {
    //     this.$toast.info('請先登入')
    //     this.$router.push({ name: 'auth-signIn' })

    //     return
    //   }
    //   // if (!this.hasMedicalReport) {
    //   //   this.$toast.info('尚未有可下載的篩檢報告')

    //   //   return
    //   // }

    //   this.loadingDialog = true
    //   try {
    //     // 取回blob
    //     const blobData = await apiMedicalReport.downloadOwnMedicalReport(
    //       this.$axios
    //     )

    //     // 將blob轉為url 開啟
    //     window.open(window.URL.createObjectURL(blobData))
    //   } catch (err) {
    //     // 因為responseType是blob 錯誤訊息也會是blob
    //     // 要轉成json顯示
    //     const errJson = JSON.parse(await err.data.text())
    //     if (errJson.errorCode === 'E99998') {
    //       this.$toast.error(errJson.msgs[1])
    //     }
    //     if (errJson.errorCode !== 'E99998') {
    //       this.$toast.error('開啟失敗')
    //     }
    //   }
    //   this.loadingDialog = false
    // },
  }
};
</script>
<style lang="scss" scoped>
.linearText {
  background-image: linear-gradient(to right, #c09079, #bce2d0);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* .taiwan-biobank {
  background-image: url('~/assets/images/biobank/background/earth 1.png');
  background-position: right;
} */
</style>

<style lang="scss">
.vuetify-carousel .v-icon.notranslate.mdi.mdi-minus.theme--dark {
  font-size: 35px !important;
}
</style>
