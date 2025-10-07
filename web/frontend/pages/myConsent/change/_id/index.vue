<template>
  <div ref="wrap" class="mb-60">
    <PageTitle :title="'變更同意事項'" />
    <v-container>
      <v-row>
        <v-col>
          <h3 class="text-22 primary--text">您選擇了變更以下的同意書</h3>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" class="text-center pa-2 text-16">
          {{ consentData.title }}
          <!-- {{ consentData.subTitle }} -->
          {{ consentData.version }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3 class="text-22 primary--text">請選擇你要變更的內容</h3>
        </v-col>
      </v-row>
      <v-row justify="center" class="my-4">
        <v-col cols="10" class="pa-2">
          <!-- 同意書類型 -->
          <v-chip v-if="consentData.type" class="my-3">{{ consentData.type }}</v-chip>
          <v-form ref="form">
            <ConsentTemplate2 :consent-data="consentData" />
          </v-form>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="11">
          <p class="text-center mb-1">現在時間：</p>
          <p class="text-center">{{ nowTime }}</p>
          <BtnLong :btn-name="'確認送出'" :loading="loading" class="mb-3" @click="submit" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PageTitle from '@/components/title/PageTitle';
import BtnLong from '@/components/base/BtnLong';
import ConsentTemplate2 from '@/components/ConsentTemplate2';
import consentJson from '@/data/consent.json';

export default {
  name: 'ChangeDetail',
  components: {
    PageTitle,
    BtnLong,
    ConsentTemplate2
  },
  // 獲取同意書
  asyncData({ $axios, $toast, params, $moment }) {
    let consentDataArray = [];
    let consentData = {};
    // 原始同意書

    try {
      consentDataArray = [consentJson];
      consentData = consentDataArray[0];
      consentData.crDatetimeCn = $moment(consentData.crDatetime).format('YYYY年MM月DD日HH時mm分');

      const validityDatas = consentData.validity.datas.map((item) => {
        item.group = 'validity';
        return item;
      });
      const questionsDatas = consentData.questions.datas.map((item) => {
        item.group = 'question';
        return item;
      });
      consentData.allData = [...validityDatas, ...questionsDatas];
      // 說明是新的規格 舊的同意書沒有 要先判斷
      if (consentData.descriptions) {
        const descriptionsDatas = consentData.descriptions.datas.map((item) => {
          item.group = 'description';
          return item;
        });
        consentData.allData.push(...descriptionsDatas);
      }
      consentData.allData = consentData.allData.sort((a, b) => a.totalIndex - b.totalIndex);
    } catch (err) {
      console.log(err);
    }

    return { consentData };
  },
  data() {
    return {
      loading: false,
      loadingDialog: false,
      nowTime: 0,
      // otp ------------------------------
      otpDialog: false,
      tab: 0,
      mobileOtpCode: '',
      emailOtpCode: '',
      countDownNumMobile: 0,
      countDownNumEmail: 0,
      setMobileLoading: false,
      setEmailLoading: false,
      otpSubmitLoading: false,
      quitDialog: false,
      quitLoading: false,
      quitDialogTitle: ''
    };
  },
  head() {
    return {
      // title: `${this.consentData.title}  ${this.consentData.subTitle} ${this.consentData.version} 變更同意事項`,
      title: `${this.consentData.title} ${this.consentData.version} 變更同意事項`,
      meta: []
    };
  },
  mounted() {
    // 改變現在時間
    this.nowTimeChange();
  },
  methods: {
    submit() {
      this.$toast.success('變更完成');
      this.$router.push('/myConsent');
    },

    closeOtpDialog() {
      this.mobileOtpCode = '';
      this.emailOtpCode = '';
      this.setMobileLoading = false;
      this.countDownNumMobile = 0;
      this.setEmailLoading = false;
      this.countDownNumEmail = 0;
      this.otpDialog = false;
    },

    // 現在時間
    nowTimeChange() {
      // 一進頁面先獲取一次
      this.nowTime = this.$moment(new Date()).format('YYYY年MM月DD日HH時mm分');
      // 每1秒重新獲取一次
      this.nowTimeInterval = setInterval(() => {
        this.nowTime = this.$moment(new Date()).format('YYYY年MM月DD日HH時mm分');
      }, 1000);
    }
  }
};
</script>
