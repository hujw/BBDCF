<template>
  <div class="mb-60">
    <PageTitle :title="'我的同意書'" />
    <v-container>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="(item, index) in tabItems" :key="index">
          <h4 class="font-weight-bold">{{ item }}</h4>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- 已簽署 -->
        <v-tab-item>
          <v-card color="basil" flat>
            <v-card-text class="pa-0">
              <ConsentTable
                :header-list="signedHeaderList"
                :body-list="signedList"
                :btn-name="signedBtn"
                :btn-color="'primary'"
                :loading="loading"
              />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import PageTitle from '@/components/title/PageTitle';
import ConsentTable from '@/components/ConsentTable';
import consentJson from '@/data/consent.json';
export default {
  name: 'MyConsent',
  components: {
    PageTitle,
    ConsentTable
    // Btn,
  },
  data() {
    return {
      isShowApplyBtn: false,
      tab: 0,
      tabItems: ['已簽署的同意書'],
      // 已簽署
      signedHeaderList: [
        { text: '簽署時間', value: 'answerDateTime', align: 'center', width: 120, sortable: false },
        { text: '版本', value: 'version', align: 'center', width: 120, sortable: false },
        { text: '同意書名稱', value: 'title', align: 'center', width: 120, sortable: false }
      ],
      signedList: [],
      signedBtn: '查看同意書回答',
      rules: {
        require: (v) => !!v || '必填'
      },
      loading: false,
      userInfo: {}
    };
  },
  head() {
    return {
      title: '我的同意書',
      meta: []
    };
  },
  computed: {},
  mounted() {
    this.getOriginalConsent();
  },
  methods: {
    // 獲取原始同意書
    getOriginalConsent() {
      try {
        const original = [consentJson];
        if (original.length) {
          // 修改格式
          // 原始同意書crDatetime就是建立和簽署時間 (後端來的資料沒有answerDatetime這個欄位)
          original[0].crDatetime = this.$moment(original[0].crDatetime).format('YYYY/MM/DD');
          original[0].answerDateTime = this.$moment(original[0].crDatetime).format('YYYY/MM/DD');

          this.signedList.push(original[0]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.applyBtnWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 50px;
  border-radius: 50px;
  background: linear-gradient(to right, #c09079, #bce2d0);
}
</style>
