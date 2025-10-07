<template>
  <div class="mb-60">
    <PageTitleContent :title="'我的同意書'" :content="`${consentData.title} - 查看同意書回答`" :content2="`${consentData.version}`" />
    <v-container>
      <v-row justify="center">
        <v-col cols="10" class="pa-2 py-5">
          <!-- 同意書類型 -->
          <v-chip v-if="consentData.type" class="mb-3">{{ consentData.type }}</v-chip>
          <!-- 同意書內容 -->
          <ConsentTemplate2 :consent-data="consentData" :is-disabled="true" />
          <div class="mb-2 py-3" :style="{ borderBottom: '1px solid #B1AEAE' }">
            <p class="mb-2">
              <span>簽署時間：</span>
              <span>{{ consentData.answerDateTimeCn }}</span>
            </p>
          </div>
          <!-- 現在時間 -->
          <div class="py-3">
            <p class="mb-2">
              <span>現在時間：</span>
              <span>{{ nowTime }}</span>
            </p>
          </div>
          <!-- 關閉btn -->
          <BtnLong :btn-name="'關閉'" nuxt to="/myConsent" class="mb-3" />
          <BtnLong :btn-name="'意願變更'" :color="'info'" class="mb-3" @click="goToChange" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PageTitleContent from '@/components/title/PageTitleContent';
import Btn from '@/components/base/Btn';
import BtnLong from '@/components/base/BtnLong';
import ConsentTemplate2 from '@/components/ConsentTemplate2';
import consentJson from '@/data/consent.json';

export default {
  name: 'ProveDetail',
  components: {
    PageTitleContent,
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
      consentData.answerDateTimeCn = $moment(consentData.crDatetime).format('YYYY年MM月DD日HH時mm分');

      // 將效力、問題、說明都匯集在一起 然後按照totalIndex排序 consentTemplate2顯示的是allData
      // 因為這個方式是傳址 所以兩者會同步修改
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

    console.log('consentData', consentData);

    return { consentData };
  },
  data() {
    return {
      nowTime: 0,
      count: 60,
      minutes: 0,
      sec: 0
    };
  },
  head() {
    return {
      // title: `${this.consentData.title}  ${this.consentData.subTitle} ${this.consentData.version} 查看同意書回答`,
      title: `${this.consentData.title} ${this.consentData.version} 查看同意書回答`,
      meta: []
    };
  },
  mounted() {
    // 改變現在時間
    this.nowTimeChange();
  },
  destroyed() {
    clearInterval(this.qrcodeInterval);
    clearInterval(this.nowTimeInterval);
  },
  methods: {
    // 現在時間
    nowTimeChange() {
      // 一進頁面先獲取一次
      this.nowTime = this.$moment(new Date()).format('YYYY年MM月DD日HH時mm分');
      // 每1秒重新獲取一次
      this.nowTimeInterval = setInterval(() => {
        this.nowTime = this.$moment(new Date()).format('YYYY年MM月DD日HH時mm分');
      }, 1000);
    },
    goToChange() {
      this.$router.push({ path: `/myConsent/change/${this.$route.params.id}` });
    }
  }
};
</script>
