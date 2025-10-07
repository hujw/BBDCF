<template>
  <div>
    <v-data-table
      :headers="headerList"
      :items="bodyList"
      :loading="loading"
      loading-text="處理中... 請稍後"
      class="elevation-0 background"
      :footer-props="{
        'items-per-page-text': '每頁筆數'
      }"
      no-data-text="無資料顯示"
      no-results-text="無符合搜尋條件"
    >
      <template #[`item.title`]="{ item }">
        <p class="my-2">{{ item.title }}</p>
        <!-- 查看填寫結果 or 查看內容 -->
        <BtnLong
          :rounded="'rounded-xl'"
          class="white--text my-2"
          :color="btnColor"
          nuxt
          :to="'/myConsent/prove/original'"
          :btn-name="btnName"
        />
      </template>
    </v-data-table>
  </div>
</template>
<script>
import BtnLong from '@/components/base/BtnLong';
export default {
  name: 'ConsentTable',
  components: {
    BtnLong
  },
  props: {
    btnName: {
      type: String,
      default: '退出'
    },
    btnColor: {
      type: String,
      default: 'primary'
    },
    headerList: {
      type: Array,
      required: true,
      default: () => []
    },
    bodyList: {
      type: Array,
      required: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
