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
          :to="`${linkPath}/${item.questionnaireId}/${item.questionnaireResultId}`"
          :btn-name="btnName"
        />
      </template>
    </v-data-table>
    <!-- <v-simple-table v-if="!loading" class="background">
      <template #default>
        <thead>
          <tr>
            <th v-for="(title,index) in headerList" :key="index" class="text-center">
              <span class="text-14 font-weight-bold black--text">{{title}}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in bodyList" :key="index">
            <td class="text-center">{{ item.crDatetime }}</td>
            <td class="text-center">{{ item.answerDatetime }}</td>
            <td class="text-center">{{ item.expDatetime }}</td>
            <td>
              <p class="my-2 text-center">{{ item.title }}</p>
              查看填寫結果 or 查看內容
              <div>
                <BtnLong :rounded="'rounded-xl'" class="white--text" :color="btnColor" nuxt :to="`${linkPath}/${item.questionnaireId}/${item.questionnaireResultId}`" :btn-name="btnName" />
              </div>

            </td>
            <td>
              <p class="my-2 text-center">{{ item.version }}</p>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table> -->
  </div>
</template>
<script>
import BtnLong from '@/components/base/BtnLong';
export default {
  name: 'QuestionnaireTable',
  components: {
    BtnLong
  },
  props: {
    btnName: {
      type: String,
      required: true,
      default: '退出'
    },
    btnName2: {
      type: String,
      default: ''
    },
    btnColor: {
      type: String,
      default: 'primary'
    },
    btnColor2: {
      type: String,
      default: 'blueDarken'
    },
    linkPath: {
      type: String,
      required: true,
      default: ''
    },
    linkPath2: {
      type: String,
      default: ''
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
    },
    hasCaseNumber: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
