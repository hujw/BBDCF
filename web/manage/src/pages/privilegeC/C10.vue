<template>
  <v-container ref="consentWrap" fluid class="pa-0">
    <!-- 查詢 -->
    <v-card class="mb-1" elevation="0">
      <v-card-title primary-title>
        <div class="primary--text">同意書管理</div>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model.trim="searchCondition.title" label="同意書名稱" name="title" dense />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model.trim="searchCondition.subTitle" label="參與者" name="subTitle" dense />
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-text-field v-model.trim="searchCondition.version" label="版本" name="version" dense />
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-text-field v-model="searchCondition.crDatetimeStart" label="建立日期(開始)" type="date" name="crDatetimeSatrt" dense />
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-text-field v-model="searchCondition.crDatetimeEnd" label="建立日期(結束)" type="date" name="crDatetimeEnd" dense />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" rounded outlined :disabled="searchConsentLoading" @click="searchReset"> 取消 </v-btn>
        <v-btn color="primary" rounded :loading="searchConsentLoading" @click="searchConsentList"> 查詢 </v-btn>
      </v-card-actions>
    </v-card>
    <!-- 同意書列表 -->
    <v-card>
      <v-card-title primary-title class="d-flex justify-space-between align-center">
        <div class="primary--text">同意書列表</div>
      </v-card-title>
      <v-data-table
        :headers="originalConsentHeaders"
        :items="originalConsentList"
        :search="search"
        :loading="consentLoading"
        loading-text="處理中... 請稍後"
        class="elevation-0"
        :footer-props="{
          'items-per-page-text': '每頁筆數'
        }"
        no-data-text="無資料顯示"
        no-results-text="無符合搜尋條件"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field v-model.trim="search" append-icon="mdi-magnify" label="搜尋..." single-line hide-details />
            <v-spacer />
          </v-toolbar>
        </template>
        <template v-slot:[`item.isCurrent`]="{ item }">
          <v-icon class="ml-2" :color="statusSwitch.consentCurrentSwitchStyle(item.isCurrent).color">
            {{ statusSwitch.consentCurrentSwitchStyle(item.isCurrent).icon }}
          </v-icon>
        </template>
        <template v-slot:[`item.crDatetime`]="{ item }">
          <span>{{ item.crDatetime | dateFilter }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon name="edit" v-bind="attrs" v-on="on" @click="openEditDialog(item)">
                mdi-pencil
                <!-- mdi-text-box-search-outline -->
              </v-icon>
            </template>
            <span>編輯</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- 預覽dialog -->
    <PreviewConsentDialog
      :dialog-visible="previewDialog"
      :title="'預覽'"
      :loading="previewSubmitLoading"
      @dialogClose="previewDialog = false"
      @dialogConfirm="previewSubmit"
    >
      <div ref="previewWrap">
        <template v-if="editConsentDialog">
          <h3 class="mb-3 font-weight-bold">{{ `${activeConsent.title}` }}</h3>
          <h3 class="mb-3 font-weight-bold">{{ `${activeConsent.subTitle} ${activeConsent.version}` }}</h3>
          <ConsentTemplate2 :consent-data="activeConsent" :is-disabled="false" :show-default-icon="true" />
        </template>
      </div>
    </PreviewConsentDialog>
    <!-- 編輯dialog -->
    <EditConsentDialog
      :dialog-visible="editConsentDialog"
      :title="'編輯同意書'"
      :confirm-btn-name="'預覽'"
      @dialogClose="closeDialog"
      @dialogConfirm="openPreviewDialog"
    >
      <div class="py-3">
        <!-- 同意書基本資料 -->
        <div :style="{ borderBottom: '2px solid grey' }" class="mb-5 pb-5">
          <v-text-field v-model.trim="activeConsent.title" outlined :label="'同意書名稱'" :rules="[rules.required]" />
          <v-text-field v-model.trim="activeConsent.subTitle" outlined :label="'參與者'" :rules="[rules.required]" />
          <v-text-field v-model.trim="activeConsent.version" outlined :label="'版本'" :rules="[rules.required]" />
        </div>
        <!-- 同意書效力 -->
        <div :style="{ borderBottom: '2px solid grey' }" class="mb-5 pb-5">
          <!-- 效力內容 -->
          <div
            v-for="(data, index) in activeConsent.validity.datas"
            :key="index"
            class="mb-5 pb-5"
            :style="{ borderBottom: '1px solid grey' }"
          >
            <!-- :rules="[rules.required]" -->
            <!-- :label="`效力內容${index + 1}`" -->

            <div class="d-flex align-start">
              <v-text-field v-model="data.totalIndex" outlined dense :label="`總排序`" :rules="[rules.required, rules.nNumber]" />
              <div>
                <!-- 刪除validity -->
                <!-- v-if="index > 0" -->
                <v-btn width="25" height="25" icon class="ml-2" @click="deleteValidity(index)">
                  <v-icon size="25">mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
            <v-textarea v-model="data.content" outlined no-resize :label="`效力內容`" :rules="[rules.required]" />
            <div class="d-flex align-start">
              <div>
                <p>文字大小</p>
                <v-radio-group v-model="data.fontSize" mandatory>
                  <v-radio v-for="(item, itemIndex) in fontSizeItems" :key="itemIndex" :label="item.label" :value="item.value" />
                </v-radio-group>
              </div>
              <div class="ml-15">
                <p>文字粗細</p>
                <v-radio-group v-model="data.fontWeight" mandatory>
                  <v-radio v-for="(item, itemIndex) in fontWeightItems" :key="itemIndex" :label="item.label" :value="item.value" />
                </v-radio-group>
              </div>
            </div>
          </div>
          <!-- 新增效力內容 -->
          <div class="d-flex justify-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" size="30" v-on="on" @click="addValidityDatas"> mdi-plus </v-icon>
              </template>
              <span>新增效力</span>
            </v-tooltip>
            <!-- <v-btn
                icon
                @click="addValidityDatas"
              >
                <v-icon size="30">mdi-plus</v-icon>
              </v-btn> -->
          </div>
        </div>
        <!-- 同意書問題 -->
        <div :style="{ borderBottom: '2px solid grey' }" class="mb-5 pb-5">
          <!-- 問題說明 -->
          <!-- <v-text-field
              v-model.trim="activeConsent.questions.label"
              outlined
              :label="'問題說明'"
              :rules="[rules.required]"
            /> -->
          <!-- <v-textarea
              v-model.trim="activeConsent.questions.label"
              outlined
              no-resize
              :label="'問題說明'"
            /> -->
          <!-- 問題 -->
          <div
            v-for="(question, index) in activeConsent.questions.datas"
            :key="index"
            class="mb-5 pb-5"
            :style="{ borderBottom: '1px solid grey' }"
          >
            <div class="d-flex align-start">
              <div :style="{ width: '100%' }">
                <!-- 題目 -->
                <!-- :label="`題目${index + 1}`" -->
                <v-text-field v-model="question.totalIndex" outlined dense :label="`總排序`" :rules="[rules.required, rules.nNumber]" />
                <v-textarea v-model="question.label" outlined no-resize :label="`題目`" :rules="[rules.required]" />
                <!-- 題型 -->
                <!-- @input 如果選到多選 並且裡面只有1個選項 就自動新增1個 (因為多選至少要有兩個選項) -->
                <v-select
                  v-model="question.type"
                  outlined
                  :items="optionsTypeList"
                  item-text="name"
                  item-value="value"
                  label="題型"
                  :rules="[rules.required]"
                  @input="
                    (question.type === 'single' && (activeConsent.questions.datas[index].options?.length || 0) <= 1) ||
                    (question.type === 'mutiple' && (activeConsent.questions.datas[index].options?.length || 0) <= 1)
                      ? addOption(index)
                      : ''
                  "
                />
                <!-- 選項 -->
                <template v-for="(option, ind) in question.options">
                  <!-- 單選和多選 -->
                  <div v-if="question.type === 'single' || question.type === 'mutiple'" :key="ind" class="d-flex align-start">
                    <!-- <v-text-field
                        v-model.trim="option.label"
                        outlined
                        dense
                        :label="`選項${ind + 1}`"
                        :rules="[rules.required]"
                      /> -->
                    <v-textarea v-model.trim="option.label" outlined dense no-resize :label="`選項${ind + 1}`" :rules="[rules.required]" />
                    <!-- 刪除選項 (前2個除外) -->
                    <!-- index是question的 ind是option的 -->
                    <v-btn v-if="ind > 1" icon @click="deleteOption(index, ind)">
                      <v-icon size="25">mdi-close-circle-outline</v-icon>
                    </v-btn>
                  </div>
                </template>
              </div>
              <!-- 刪除question (第一個除外) -->
              <!--  v-if="index > 0" -->
              <div>
                <v-btn icon @click="deleteQuestion(index)">
                  <v-icon size="25">mdi-close</v-icon>
                </v-btn>
                <!-- 幫第一個question占空間 -->
                <!-- <div
                    v-if="index === 0"
                    :style="{width:'36px'}"
                  ></div> -->
              </div>
            </div>
            <!-- 新增選項 (單選和多選) -->
            <div v-if="question.type === 'single' || question.type === 'mutiple'" class="d-flex justify-center mb-3">
              <v-btn icon @click="addOption(index)">
                <v-icon size="25">mdi-plus-circle-outline</v-icon>
              </v-btn>
            </div>
            <div>
              <!-- <v-text-field
                  v-model="question.tips"
                  outlined
                  :label="'備註'"
                /> -->
              <v-textarea v-model.trim="question.tips" outlined no-resize :label="'備註'" />
            </div>
            <!-- 是否允許變更回答、選項排列方式、題目文字大小、題目文字粗細  -->
            <div class="d-flex">
              <div>
                <p>是否允許變更回答</p>
                <v-radio-group v-model="question.revise" mandatory>
                  <v-radio v-for="(revise, reviseIndex) in reviseItems" :key="reviseIndex" :label="revise.label" :value="revise.value" />
                </v-radio-group>
              </div>
              <div class="ml-15">
                <p>選項排列方式</p>
                <v-radio-group v-model="question.optionArrangementMethod" mandatory>
                  <v-radio
                    v-for="(item, itemIndex) in optionArrangementMethodItems"
                    :key="itemIndex"
                    :label="item.label"
                    :value="item.value"
                  />
                </v-radio-group>
              </div>
              <div class="ml-15">
                <p>題目文字大小</p>
                <v-radio-group v-model="question.fontSize" mandatory>
                  <v-radio v-for="(item, itemIndex) in fontSizeItems" :key="itemIndex" :label="item.label" :value="item.value" />
                </v-radio-group>
              </div>
              <div class="ml-15">
                <p>題目文字粗細</p>
                <v-radio-group v-model="question.fontWeight" mandatory>
                  <v-radio v-for="(item, itemIndex) in fontWeightItems" :key="itemIndex" :label="item.label" :value="item.value" />
                </v-radio-group>
              </div>
            </div>
          </div>
          <!-- 新增問題 -->
          <div class="d-flex justify-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" size="30" v-on="on" @click="addQuestion"> mdi-plus </v-icon>
              </template>
              <span>新增問題</span>
            </v-tooltip>
            <!-- <v-btn
                icon
                @click="addQuestion"
              >
                <v-icon size="30">mdi-plus</v-icon>
              </v-btn> -->
          </div>
        </div>
        <!-- 同意書說明 -->
        <div class="mb-5 pb-5">
          <div
            v-for="(description, index) in activeConsent.descriptions"
            :key="index"
            class="mb-5 pb-5"
            :style="{ borderBottom: '1px solid grey' }"
          >
            <div class="d-flex align-start">
              <v-text-field v-model="description.totalIndex" outlined dense :label="`總排序`" :rules="[rules.required, rules.nNumber]" />
              <div>
                <!-- v-if="index > 0" -->
                <v-btn width="25" height="25" icon class="ml-2" @click="deleteDescription(index)">
                  <v-icon size="25">mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
            <v-textarea v-model="description.content" outlined no-resize :label="`說明內容`" :rules="[rules.required]" />
            <div class="d-flex align-start">
              <div>
                <p>文字大小</p>
                <v-radio-group v-model="description.fontSize" mandatory>
                  <v-radio v-for="(item, itemIndex) in fontSizeItems" :key="itemIndex" :label="item.label" :value="item.value" />
                </v-radio-group>
              </div>
              <div class="ml-15">
                <p>文字粗細</p>
                <v-radio-group v-model="description.fontWeight" mandatory>
                  <v-radio v-for="(item, itemIndex) in fontWeightItems" :key="itemIndex" :label="item.label" :value="item.value" />
                </v-radio-group>
              </div>
            </div>
          </div>
          <!-- 新增說明 -->
          <div class="d-flex justify-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" size="30" v-on="on" @click="addDescription"> mdi-plus </v-icon>
              </template>
              <span>新增說明</span>
            </v-tooltip>
            <!-- <v-btn
                icon
                @click="addDescription"
              >
                <v-icon size="30">mdi-plus</v-icon>
              </v-btn> -->
          </div>
        </div>
      </div>
    </EditConsentDialog>
    <LoadingDialog :dialog-visible="loadingDialog" :content="'上傳中...'" />
  </v-container>
</template>

<script>
import html2canvas from 'html2canvas';
import ConsentTemplate2 from '@/components/common/ConsentTemplate2';
import EditConsentDialog from '@/components/common/Dialog';
import PreviewConsentDialog from '@/components/common/Dialog';
import LoadingDialog from '@/components/common/LoadingDialog';
import { statusSwitch } from '@/util/statusSwitch';
import consentJson from '@/consent/consent.json';

export default {
  name: 'C10',
  components: {
    ConsentTemplate2,
    EditConsentDialog,
    PreviewConsentDialog,
    LoadingDialog
  },
  data: () => ({
    editConsentDialog: false,
    previewDialog: false,
    checkSpecifyConsentDialog: false,
    inviteUserDialog: false,
    loadingDialog: false,
    // 查詢條件 ------------------------------
    searchCondition: {
      title: '',
      subTitle: '',
      version: '',
      crDatetimeStart: '',
      crDatetimeEnd: ''
    },
    // v-data-table ------------------------------
    originalConsentHeaders: [
      { text: '同意書名稱', value: 'title' },
      { text: '參與者', value: 'subTitle' },
      { text: '版本', value: 'version' },
      { text: '當前版本', value: 'isCurrent' },
      { text: '建立日期', value: 'crDatetime' },
      { text: '功能', value: 'actions' }
    ],
    originalConsentList: [
      {
        title: '臺灣人體生物資料庫參與同意書',
        subTitle: '一般參與者',
        version: 'v1.9.3',
        isCurrent: '1',
        crDatetime: '2023-08-04T01:04:55.081+0000'
      }
    ],
    search: '',
    // 是否顯示新增和編輯icon ------------------------------
    // isEdit: false,
    // loading ------------------------------
    consentLoading: false,
    searchConsentLoading: false,
    previewSubmitLoading: false,
    // editSubmitLoading: false,
    // addConsentSubmitLoading: false,
    inviteUserSubmitLoading: false,
    // deleteSubmitLoading: false,
    specifySubmitLoading: false,
    activeConsent: {
      title: '',
      subTitle: '',
      version: '',
      createDatetime: '',
      validity: {
        label: '',
        datas: [
          {
            index: 1,
            totalIndex: '',
            group: 'validity',
            content: '',
            fontSize: 'normal',
            fontWeight: 'normal',
            // strong: false,
            approved: false
          }
        ]
      },
      questions: {
        label: '',
        datas: [
          {
            index: 1,
            totalIndex: '',
            group: 'question',
            label: '',
            tips: null,
            type: '',
            selected: null,
            required: true,
            revise: true,
            optionArrangementMethod: 'column',
            fontSize: 'normal',
            fontWeight: 'normal',
            defaultSelected: null,
            showDefault: true,
            options: [
              {
                index: 1,
                label: '',
                value: true
              }
            ]
          }
        ]
      },
      descriptions: [
        {
          totalIndex: '',
          group: 'description',
          content: '',
          fontSize: 'normal',
          fontWeight: 'normal'
        }
      ]
    },
    activeConsentId: '',
    optionsTypeList: [
      { name: '是非', value: 'tf' },
      { name: '單選', value: 'single' },
      { name: '多選', value: 'mutiple' }
      // { name: '填寫', value: 'fillIn' }
    ],
    reviseItems: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    optionArrangementMethodItems: [
      { label: '垂直', value: 'column' },
      { label: '水平', value: 'row' }
    ],
    fontSizeItems: [
      { label: '大', value: 'big' },
      { label: '普通', value: 'normal' },
      { label: '小', value: 'small' }
    ],
    fontWeightItems: [
      { label: '粗', value: 'bold' },
      { label: '普通', value: 'normal' },
      { label: '細', value: 'lighter' }
    ],
    // 要刪除的同意書 ------------------------------
    // deleteConsent: {
    //   consentData: {
    //     title: ''
    //   }
    // },
    // 要指定為當前版本的同意書 ------------------------------
    specifyConsent: {
      consentData: {
        title: ''
      }
    },
    // 規則 ------------------------------
    rules: {
      // 必填+禁止只有空格
      required: (v) => (!!v && /^(?!(\s+$))/.test(v)) || '必填',
      nNumber: (v) => /^[1-9]\d*$/.test(v) || '請輸入正整數'
    },
    statusSwitch: statusSwitch
    // 同意書資料
    // originalConsentData: {},
    // originalConsentId: '',
  }),
  computed: {},
  async created() {},
  methods: {
    // 查詢同意書 ------------------------------
    // 查詢
    async searchConsentList() {
      this.searchConsentLoading = true;
      let query = [];

      // 有輸入的搜索欄放進array
      if (this.searchCondition.title) {
        query.push(`title=${this.searchCondition.title}`);
      }
      if (this.searchCondition.subTitle) {
        query.push(`subTitle=${this.searchCondition.subTitle}`);
      }
      if (this.searchCondition.version) {
        query.push(`version=${this.searchCondition.version}`);
      }
      if (this.searchCondition.crDatetimeStart) {
        query.push(`crDatetimeStart=${new Date(this.searchCondition.crDatetimeStart).toISOString()}`);
      }
      if (this.searchCondition.crDatetimeEnd) {
        query.push(`crDatetimeEnd=${new Date(this.searchCondition.crDatetimeEnd).toISOString()}`);
      }
      // 將array轉為string 並用&分隔
      // 都沒選的話會變空string 會查全部
      query = query.join('&');

      console.log('query', query);

      this.searchConsentLoading = false;
    },
    // 清除查詢條件
    searchReset() {
      const defaultSearchCondition = {
        title: '',
        subTitle: '',
        version: '',
        crDatetimeStart: '',
        crDatetimeEnd: ''
      };

      this.searchCondition = Object.assign({}, defaultSearchCondition);
    },
    // 新增validity
    addValidityDatas() {
      const defaultValidity = {
        index: 1,
        totalIndex: '',
        group: 'validity',
        content: '',
        fontSize: 'normal',
        fontWeight: 'normal',
        // strong: false,
        approved: false
      };

      if (this.editConsentDialog) {
        this.activeConsent.validity.datas.push(defaultValidity);
      }
    },
    // 新增question
    addQuestion() {
      const defaultQuestion = {
        index: 1,
        totalIndex: '',
        group: 'question',
        label: '',
        tips: null,
        type: '',
        selected: null,
        required: true,
        revise: true,
        optionArrangementMethod: 'column',
        fontSize: 'normal',
        fontWeight: 'normal',
        defaultSelected: null,
        showDefault: true,
        options: [
          {
            index: 1,
            label: '',
            value: true
          }
        ]
      };

      if (this.editConsentDialog) {
        this.activeConsent.questions.datas.push(defaultQuestion);
      }
    },
    // 新增問題選項 (單選或多選使用)
    addOption(index) {
      const defaultOptions = {
        index: 1,
        label: '',
        value: '0' // value統一用string
      };

      if (this.editConsentDialog) {
        this.activeConsent.questions.datas[index].options.push(defaultOptions);
      }
    },
    // 新增子問題選項 (單選或多選使用)
    addSubQOption(index, subQIndex) {
      const defaultOptions = {
        index: 1,
        label: '',
        value: '0' // value統一用string
      };

      // push defaultOptions
      // 讓原本1個選項變成2個

      if (this.editConsentDialog) {
        this.activeConsent.questions.datas[index].datas[subQIndex].options.push(defaultOptions);
      }
    },
    // 新增description
    addDescription() {
      const defaultDescription = {
        totalIndex: '',
        group: 'description',
        content: '',
        fontSize: 'normal',
        fontWeight: 'normal'
      };

      if (this.editConsentDialog) {
        this.activeConsent.descriptions.push(defaultDescription);
      }
    },
    // 刪除validity
    deleteValidity(index) {
      if (this.editConsentDialog) {
        this.activeConsent.validity.datas = this.activeConsent.validity.datas.filter((item, itemIndex) => {
          return index !== itemIndex;
        });
      }
    },
    // 刪除question
    deleteQuestion(index) {
      if (this.editConsentDialog) {
        this.activeConsent.questions.datas = this.activeConsent.questions.datas.filter((question, qIndex) => {
          return index !== qIndex;
        });
      }
    },
    // 刪除description
    deleteDescription(index) {
      if (this.editConsentDialog) {
        this.activeConsent.descriptions = this.activeConsent.descriptions.filter((item, itemIndex) => {
          return index !== itemIndex;
        });
      }
    },
    // 刪除問題選項 (單選或多選使用)
    deleteOption(index, ind) {
      if (this.editConsentDialog) {
        this.activeConsent.questions.datas.forEach((question, qIndex) => {
          // 找出問題
          if (qIndex === index) {
            // 返回ind不同的其他選項
            question.options = question.options.filter((option, i) => {
              return ind !== i;
            });
          }
        });
      }
    },
    // 刪除subQuestion
    deleteSubQuestion(index, subQIndex) {
      if (this.editConsentDialog) {
        this.activeConsent.questions.datas = this.activeConsent.questions.datas.map((question, qIndex) => {
          if (index === qIndex) {
            question.datas = question.datas.filter((subQuestion, subQInd) => {
              return subQIndex !== subQInd;
            });
          }

          return question;
        });
      }
    },
    // 刪除子問題選項 (單選或多選使用)
    deleteSubOption(index, subQIndex, subQOptionInd) {
      if (this.editConsentDialog) {
        this.activeConsent.questions.datas[index].datas[subQIndex].options = this.activeConsent.questions.datas[index].datas[
          subQIndex
        ].options.filter((option, optionIndex) => {
          return optionIndex !== subQOptionInd;
        });
      }
    },
    // 開啟預覽dialog
    openPreviewDialog() {
      // 編輯用
      if (this.editConsentDialog) {
        // 修改validity的index，如果沒有totalIndex則使用index作為totalIndex
        this.activeConsent.validity.datas = this.activeConsent.validity.datas.map((item, index) => {
          return {
            ...item,
            index: item.index || index + 1,
            totalIndex: item.totalIndex || item.index || index + 1
          };
        });

        // 修改問題的options、selected、revise格式
        this.activeConsent.questions.datas = this.activeConsent.questions.datas.map((question, index) => {
          question.index = question.index || index + 1;
          question.totalIndex = question.totalIndex || question.index || index + 1;
          // 是非
          if (question.type === 'tf') {
            question.uiType = 'tf'; // ConsentTemplate2 使用 uiType
            question.options = [
              {
                index: 1,
                label: '是',
                value: true
              },
              {
                index: 2,
                label: '否',
                value: false
              }
            ];
            // 是非 defaultSelected給null
            question.defaultSelected = null;

            return question;
          }
          // 單選
          if (question.type === 'single') {
            question.uiType = 'single'; // ConsentTemplate2 使用 uiType
            if (question.options && Array.isArray(question.options)) {
              question.options = question.options.map((option, index) => {
                return {
                  index: index + 1,
                  label: option.label,
                  value: index.toString() // value轉string
                };
              });
            } else {
              question.options = [];
            }

            // 單選 defaultSelected和selected給空字串
            question.defaultSelected ? question.defaultSelected : (question.defaultSelected = '');
            question.selected ? question.selected : (question.selected = '');

            return question;
          }
          // 多選
          if (question.type === 'mutiple') {
            question.uiType = 'mutiple'; // ConsentTemplate2 使用 uiType
            if (question.options && Array.isArray(question.options)) {
              question.options = question.options.map((option, index) => {
                return {
                  index: index + 1,
                  label: option.label,
                  value: index.toString() // value轉string
                };
              });
            } else {
              question.options = [];
            }

            // 多選 defaultSelected和selected給空陣列
            question.defaultSelected ? question.defaultSelected : (question.defaultSelected = []);
            question.selected ? question.selected : (question.selected = []);

            return question;
          }
          // 填寫
          if (question.type === 'fillIn') {
            question.uiType = 'fillIn'; // ConsentTemplate2 使用 uiType
            question.options = [];
            question.selected = '';

            return question;
          }
          // 有子問題 (revise不顯示 修改子問題option)
          if (!question.type) {
            question.revise = null;

            question.datas = question.datas.map((subQuestion, subQIndex) => {
              subQuestion.index = subQIndex + 1;
              // subQuestion.showDefault = true
              // 是否
              if (subQuestion.type === 'tf') {
                subQuestion.uiType = 'tf'; // ConsentTemplate2 使用 uiType
                subQuestion.options = [
                  {
                    index: 1,
                    label: '是',
                    value: true
                  },
                  {
                    index: 2,
                    label: '否',
                    value: false
                  }
                ];

                // 是非 defaultSelected給null
                subQuestion.defaultSelected = null;

                return subQuestion;
              }
              // 單選
              if (subQuestion.type === 'single') {
                subQuestion.uiType = 'single'; // ConsentTemplate2 使用 uiType
                console.log('subQuestion', subQuestion);
                if (subQuestion.options && Array.isArray(subQuestion.options)) {
                  subQuestion.options = subQuestion.options.map((subQOption, subQOptionIndex) => {
                    return {
                      index: subQOptionIndex + 1,
                      label: subQOption.label,
                      value: subQOptionIndex.toString() // value轉string
                    };
                  });
                } else {
                  subQuestion.options = [];
                }

                // 單選 defaultSelected和selected給空字串
                subQuestion.defaultSelected ? subQuestion.defaultSelected : (subQuestion.defaultSelected = '');
                subQuestion.selected ? subQuestion.selected : (subQuestion.selected = '');

                return subQuestion;
              }
              // 多選
              if (subQuestion.type === 'mutiple') {
                subQuestion.uiType = 'mutiple'; // ConsentTemplate2 使用 uiType
                console.log('subQuestion', subQuestion);
                if (subQuestion.options && Array.isArray(subQuestion.options)) {
                  subQuestion.options = subQuestion.options.map((subQOption, subQOptionIndex) => {
                    return {
                      index: subQOptionIndex + 1,
                      label: subQOption.label,
                      value: subQOptionIndex.toString() // value轉string
                    };
                  });
                } else {
                  subQuestion.options = [];
                }

                // 多選 defaultSelected和selected給空陣列
                subQuestion.defaultSelected ? subQuestion.defaultSelected : (subQuestion.defaultSelected = []);
                subQuestion.selected ? subQuestion.selected : (subQuestion.selected = []);

                return subQuestion;
              }
              // 填寫
              if (subQuestion.type === 'fillIn') {
                subQuestion.uiType = 'fillIn'; // ConsentTemplate2 使用 uiType
                subQuestion.options = [];
                subQuestion.selected = '';

                return subQuestion;
              }

              return subQuestion;
            });
          }

          return question;
        });

        // 將效力、問題、說明都匯集在一起 然後按照totalIndex排序 consentTemplate2顯示的是allData
        // 因為這個方式是傳址 所以consentTemplate2在做defaultSelect或是清空單選、是非時 兩者會同步修改
        this.activeConsent.allData = [
          ...this.activeConsent.validity.datas.map((item) => ({ ...item, group: 'validity' })),
          ...this.activeConsent.questions.datas.map((item) => ({ ...item, group: 'question' })),
          ...this.activeConsent.descriptions.map((item) => ({ ...item, group: 'description' }))
        ];
        this.activeConsent.allData = this.activeConsent.allData.sort((a, b) => a.totalIndex - b.totalIndex);
      }

      this.previewDialog = true;
    },
    async previewSubmit() {
      this.previewSubmitLoading = true;
      // 編輯用
      if (this.editConsentDialog) {
        await this.editSubmit();
      }

      this.closeDialog();
      this.previewSubmitLoading = false;
    },
    // 編輯同意書 ------------------------------
    // 開啟 編輯dialog
    openEditDialog(item) {
      // 深層複製並確保資料結構完整
      this.activeConsent = JSON.parse(JSON.stringify(consentJson));

      // 確保 validity.datas 有 totalIndex (用於編輯和排序)
      if (this.activeConsent.validity?.datas) {
        this.activeConsent.validity.datas = this.activeConsent.validity.datas.map((item, index) => ({
          ...item,
          totalIndex: item.totalIndex || item.index || index + 1
        }));
      }

      // 確保所有問題都有 options 陣列和 totalIndex
      if (this.activeConsent.questions?.datas) {
        this.activeConsent.questions.datas = this.activeConsent.questions.datas.map((q, index) => ({
          ...q,
          options: q.options || [],
          totalIndex: q.totalIndex || q.index || index + 10 // 問題從 10 開始，避免與效力衝突
        }));
      }

      // 確保 descriptions 陣列存在
      if (!this.activeConsent.descriptions) {
        this.activeConsent.descriptions = [];
      }

      // 用戶編輯後又取消 用這個來復原
      // this.activeConsentReset = JSON.parse(JSON.stringify(item.currentConsent))
      this.activeConsentId = item.id;
      this.editConsentDialog = true;
    },
    // 送出編輯
    async editSubmit() {
      try {
        this.$snackbar.showMessage({ content: '編輯成功', color: 'success' });
      } catch (err) {
        if (err.data.errorCode === 'E99998') {
          this.$snackbar.showMessage({ content: err.data.msgs[1], color: 'error' });
        }
        if (err.data.errorCode !== 'E99998') {
          this.$snackbar.showMessage({ content: '編輯失敗', color: 'error' });
        }
      }
    },
    // 關閉全部dialog ------------------------------
    closeDialog() {
      this.editConsentDialog = false;
      this.importConsentCsvDialog = false;
      this.previewDialog = false;
      this.isTitleChange = false;
      this.titleEditDialog = false;
      this.checkHaveChangeDialog = false;
      this.inviteUserDialog = false;
      this.checkSpecifyConsentDialog = false;
      this.checkDeleteConsentDialog = false;
      this.validityDirty = [];
      this.questionDirty = [];
      this.subQuestionDirty = [];

      this.isEdit = false;
      this.quoteRadio = {};
      this.csvConsentFile = {};
    }
  }
};
</script>

<style scoped></style>
