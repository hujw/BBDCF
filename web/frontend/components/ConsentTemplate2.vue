<template>
  <!-- DFKai-sb 標楷體 -->
  <div :style="{ fontFamily: 'DFKai-sb' }" :class="backgroundColor" class="consent-template">
    <div v-for="(item, index) in consentData.allData" :key="index" class="py-1">
      <template v-if="item.group === 'validity'">
        <div>
          <v-checkbox v-model="item.approved" :disabled="isDisabled" :hide-details="isDisabled" :rules="[rules.validityRequired]">
            <template #label>
              <div
                v-dompurify-html="textareaToHtml(item.content)"
                :class="[
                  item.fontSize === 'humongous'
                    ? 'text-72 line-height-92'
                    : item.fontSize === 'colossal'
                    ? 'text-46 line-height-66'
                    : item.fontSize === 'big'
                    ? 'text-36 line-height-56'
                    : item.fontSize === 'normal'
                    ? 'text-24 line-height-36'
                    : 'text-14 line-height-24',
                  item.fontWeight === 'bold' ? 'font-weight-bold' : item.fontWeight === 'normal' ? '' : 'font-weight-light'
                ]"
              ></div>
            </template>
          </v-checkbox>
        </div>
      </template>

      <template v-if="item.group === 'description'">
        <div
          v-dompurify-html="textareaToHtml(item.content)"
          :class="[
            item.fontSize === 'humongous'
              ? 'text-72 line-height-92'
              : item.fontSize === 'colossal'
              ? 'text-46 line-height-66'
              : item.fontSize === 'big'
              ? 'text-36 line-height-56'
              : item.fontSize === 'normal'
              ? 'text-24 line-height-36'
              : 'text-14 line-height-24',
            item.fontWeight === 'bold' ? 'font-weight-bold' : item.fontWeight === 'normal' ? '' : 'font-weight-light'
          ]"
        />
      </template>

      <template v-if="item.group === 'question'">
        <!-- 問題題目 -->
        <div
          v-dompurify-html="textareaToHtml(item.label)"
          :class="[
            item.fontSize === 'humongous'
              ? 'text-72 line-height-92'
              : item.fontSize === 'colossal'
              ? 'text-46 line-height-66'
              : item.fontSize === 'big'
              ? 'text-36 line-height-56'
              : item.fontSize === 'normal'
              ? 'text-24 line-height-36'
              : 'text-14 line-height-24',
            item.fontWeight === 'bold' ? 'font-weight-bold' : item.fontWeight === 'normal' ? '' : 'font-weight-light'
          ]"
        ></div>
        <!-- 問題內的子問題 -->
        <!-- :style="{borderBottom:ind !== item.datas.length - 1 ? '1px solid #B1AEAE' : ''}" -->
        <template v-if="item.datas">
          <div v-for="(data, ind) in item.datas" :key="ind" class="py-1">
            <!-- 子題目 -->
            <div
              class="d-flex justify-space-between align-start"
              :class="[
                data.fontSize === 'humongous'
                  ? 'text-72 line-height-92'
                  : data.fontSize === 'colossal'
                  ? 'text-46 line-height-66'
                  : data.fontSize === 'big'
                  ? 'text-36 line-height-56'
                  : data.fontSize === 'normal'
                  ? 'text-24 line-height-36'
                  : 'text-14 line-height-24',
                data.fontWeight === 'bold' ? 'font-weight-bold' : data.fontWeight === 'normal' ? '' : 'font-weight-light'
              ]"
            >
              <p :class="'mb-0'">{{ data.label }}</p>
            </div>
            <!-- 子問題是非 -->
            <div v-if="data.type === 'tf'" :class="data.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
              <v-radio-group v-model="data.selected" @change="setSubQDefaultSelected(item, data)">
                <!-- :class控制row的選項間距 -->
                <div
                  v-for="(option, i) in data.options"
                  :key="i"
                  class="d-flex align-center justify-space-between"
                  :class="i === 0 ? '' : data.optionArrangementMethod === 'row' ? 'ml-3' : ''"
                >
                  <!-- :class控制column的選項間距 -->
                  <v-radio
                    :value="option.value"
                    :disabled="isDisabled"
                    :class="data.optionArrangementMethod === 'column' ? 'mb-2' : ''"
                    class="align-start"
                  >
                    <template #label>
                      <div
                        v-dompurify-html="textareaToHtml(option.label)"
                        :class="[
                          data.fontSize === 'humongous'
                            ? 'text-72 line-height-92'
                            : data.fontSize === 'colossal'
                            ? 'text-46 line-height-66'
                            : data.fontSize === 'big'
                            ? 'text-36 line-height-56'
                            : data.fontSize === 'normal'
                            ? 'text-24 line-height-36'
                            : 'text-14 line-height-24',
                          data.fontWeight === 'bold' ? 'font-weight-bold' : data.fontWeight === 'normal' ? '' : 'font-weight-light'
                        ]"
                      ></div>
                    </template>
                  </v-radio>
                  <!-- <v-btn
                      v-if="data.selected === option.value && !isDisabled"
                      small
                      outlined
                      color="primary"
                      class="ml-3"
                      @click="clearSubQSelected(item, data)"
                    >清空選項
                    </v-btn> -->
                </div>
              </v-radio-group>
            </div>
            <!-- 子問題單選 -->
            <div v-if="data.type === 'single'" :class="data.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
              <v-radio-group v-model="data.selected" @change="setSubQDefaultSelected(item, data)">
                <div
                  v-for="(option, i) in data.options"
                  :key="i"
                  class="d-flex align-center justify-space-between"
                  :class="i === 0 ? '' : data.optionArrangementMethod === 'row' ? 'ml-3' : ''"
                >
                  <v-radio
                    :value="option.value"
                    :disabled="isDisabled"
                    :class="data.optionArrangementMethod === 'column' ? 'mb-2' : ''"
                    class="align-start"
                  >
                    <template #label>
                      <div
                        v-dompurify-html="textareaToHtml(option.label)"
                        :class="[
                          data.fontSize === 'humongous'
                            ? 'text-72 line-height-92'
                            : data.fontSize === 'colossal'
                            ? 'text-46 line-height-66'
                            : data.fontSize === 'big'
                            ? 'text-36 line-height-56'
                            : data.fontSize === 'normal'
                            ? 'text-24 line-height-36'
                            : 'text-14 line-height-24',
                          data.fontWeight === 'bold' ? 'font-weight-bold' : data.fontWeight === 'normal' ? '' : 'font-weight-light'
                        ]"
                      ></div>
                    </template>
                  </v-radio>
                  <div v-if="data.selected === option.value">
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" @click="handleSubQShowDefault(item, data, option)">
                          {{ data.showDefault ? 'mdi-eye' : 'mdi-eye-off' }}
                        </v-icon>
                      </template>
                      <span>
                        {{ data.showDefault ? '隱藏' : '顯示' }}
                      </span>
                    </v-tooltip>
                    <v-btn v-if="!isDisabled" small outlined color="primary" class="ml-3" @click="clearSubQSelected(item, data)"
                      >清空選項</v-btn
                    >
                  </div>
                </div>
              </v-radio-group>
            </div>
            <!-- 子問題多選 -->
            <div v-if="data.type === 'mutiple'" :class="data.optionArrangementMethod === 'row' ? 'd-flex' : ''">
              <div
                v-for="(option, i) in data.options"
                :key="i"
                class="d-flex justify-space-between"
                :class="i === 0 ? '' : data.optionArrangementMethod === 'row' ? 'ml-3' : ''"
              >
                <v-checkbox
                  v-model="data.selected"
                  :disabled="isDisabled"
                  :color="'primary'"
                  :value="option.value"
                  :class="data.optionArrangementMethod === 'column' ? 'mb-2' : ''"
                  :hide-details="
                    (data.optionArrangementMethod === 'row' && i !== 0) ||
                    (data.optionArrangementMethod === 'column' && i !== data.options.length - 1)
                  "
                  @change="setSubQDefaultSelected(item, data)"
                >
                  <template #label>
                    <div
                      v-dompurify-html="textareaToHtml(option.label)"
                      :class="[
                        data.fontSize === 'humongous'
                          ? 'text-72 line-height-92'
                          : data.fontSize === 'colossal'
                          ? 'text-46 line-height-66'
                          : data.fontSize === 'big'
                          ? 'text-36 line-height-56'
                          : data.fontSize === 'normal'
                          ? 'text-24 line-height-36'
                          : 'text-14 line-height-24',
                        data.fontWeight === 'bold' ? 'font-weight-bold' : data.fontWeight === 'normal' ? '' : 'font-weight-light'
                      ]"
                    ></div>
                  </template>
                </v-checkbox>
                <v-tooltip v-if="data.selected.includes(option.value)" bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon v-bind="attrs" :disabled="isDisabled" v-on="on" @click="handleSubQShowDefault(item, data, option)">
                      {{ data.showDefault ? 'mdi-eye' : 'mdi-eye-off' }}
                    </v-icon>
                  </template>
                  <span>
                    {{ data.showDefault ? '隱藏' : '顯示' }}
                  </span>
                </v-tooltip>
              </div>
            </div>
            <!-- 子問題填寫 -->
            <div v-if="item.type === 'fillIn'">
              <v-textarea v-model.trim="item.selected" no-resize outlined :disabled="isDisabled" />
              <!-- :rules="[rules.required]" -->
            </div>
            <div
              v-if="data.tips"
              v-dompurify-html="textareaToHtml(data.tips)"
              :class="[
                data.fontSize === 'humongous'
                  ? 'text-72 line-height-92'
                  : data.fontSize === 'colossal'
                  ? 'text-46 line-height-66'
                  : data.fontSize === 'big'
                  ? 'text-36 line-height-56'
                  : data.fontSize === 'normal'
                  ? 'text-24 line-height-36'
                  : 'text-14 line-height-24',
                data.fontWeight === 'bold' ? 'font-weight-bold' : data.fontWeight === 'normal' ? '' : 'font-weight-light'
              ]"
            ></div>
          </div>
        </template>
        <!-- 是非 -->
        <div v-if="item.type === 'tf'" :class="item.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
          <v-radio-group v-model="item.selected" :disabled="isDisabled || (!item.revise && !isFirstWrite)" :rules="[rules.tfRequired]">
            <!-- :rules="[item.required ? rules.radioRequired : null]" -->
            <div
              v-for="(option, ind) in item.options"
              :key="ind"
              class="d-flex align-center justify-space-between"
              :class="ind === 0 ? '' : item.optionArrangementMethod === 'row' ? 'ml-3' : ''"
            >
              <v-radio
                :value="option.value"
                :disabled="isDisabled"
                :class="item.optionArrangementMethod === 'column' ? 'mb-2' : ''"
                class="align-start"
              >
                <template #label>
                  <div
                    v-dompurify-html="textareaToHtml(option.label)"
                    :class="[
                      item.fontSize === 'humongous'
                        ? 'text-72 line-height-92'
                        : item.fontSize === 'colossal'
                        ? 'text-46 line-height-66'
                        : item.fontSize === 'big'
                        ? 'text-36 line-height-56'
                        : item.fontSize === 'normal'
                        ? 'text-24 line-height-36'
                        : 'text-14 line-height-24',
                      item.fontWeight === 'bold' ? 'font-weight-bold' : item.fontWeight === 'normal' ? '' : 'font-weight-light'
                    ]"
                  ></div>
                </template>
              </v-radio>
            </div>
            <!-- <template #label>
                  <span class="black--text">{{option.label}}</span>
                </template> -->
          </v-radio-group>
        </div>
        <!-- 單選 -->
        <div v-if="item.type === 'single'" :class="item.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
          <v-radio-group v-model="item.selected" :disabled="isDisabled || (!item.revise && !isFirstWrite)" :rules="[rules.singleRequired]">
            <template v-for="(option, ind) in item.options">
              <div
                v-if="item.showDefault || (!item.showDefault && item.defaultSelected !== option.value)"
                :key="ind"
                class="d-flex align-center justify-space-between"
                :class="ind === 0 ? '' : item.optionArrangementMethod === 'row' ? 'ml-3' : ''"
              >
                <v-radio
                  :value="option.value"
                  :disabled="isDisabled"
                  :class="item.optionArrangementMethod === 'column' ? 'mb-2' : ''"
                  class="align-start"
                >
                  <template #label>
                    <div
                      v-dompurify-html="textareaToHtml(option.label)"
                      :class="[
                        item.fontSize === 'humongous'
                          ? 'text-72 line-height-92'
                          : item.fontSize === 'colossal'
                          ? 'text-46 line-height-66'
                          : item.fontSize === 'big'
                          ? 'text-36 line-height-56'
                          : item.fontSize === 'normal'
                          ? 'text-24 line-height-36'
                          : 'text-14 line-height-24',
                        item.fontWeight === 'bold' ? 'font-weight-bold' : item.fontWeight === 'normal' ? '' : 'font-weight-light'
                      ]"
                    ></div>
                  </template>
                </v-radio>
                <v-btn
                  v-if="item.selected === option.value && !isDisabled"
                  small
                  outlined
                  color="primary"
                  class="ml-3"
                  @click="resetSelected(item)"
                >
                  清空選項
                </v-btn>
              </div>
            </template>
          </v-radio-group>
        </div>
        <!-- 多選 -->
        <div v-if="item.type === 'mutiple'" :class="item.optionArrangementMethod === 'row' ? 'd-flex' : ''">
          <template v-for="(option, ind) in item.options">
            <!-- ind !== item.options.length - 1 -->
            <v-checkbox
              v-if="item.showDefault || (!item.showDefault && !item.defaultSelected.includes(option.value))"
              :key="ind"
              v-model="item.selected"
              :disabled="isDisabled || (!item.revise && !isFirstWrite)"
              :color="'primary'"
              :value="option.value"
              :class="item.optionArrangementMethod === 'column' ? 'mb-2' : ''"
              :hide-details="
                (item.optionArrangementMethod === 'row' && ind !== 0) ||
                (item.optionArrangementMethod === 'column' && ind !== item.options.length - 1)
              "
              :rules="[rules.checkBoxRequired]"
              @change="checkCheckBoxSelected(item)"
            >
              <template #label>
                <div
                  v-dompurify-html="textareaToHtml(option.label)"
                  :class="[
                    item.fontSize === 'humongous'
                      ? 'text-72 line-height-92'
                      : item.fontSize === 'colossal'
                      ? 'text-46 line-height-66'
                      : item.fontSize === 'big'
                      ? 'text-36 line-height-56'
                      : item.fontSize === 'normal'
                      ? 'text-24 line-height-36'
                      : 'text-14 line-height-24',
                    item.fontWeight === 'bold' ? 'font-weight-bold' : item.fontWeight === 'normal' ? '' : 'font-weight-light'
                  ]"
                ></div>
              </template>
              <!-- :rules="[item.selected.length !== 0 || '至少勾選一個欄位']" -->
              <!-- <template #label>
                  <span class="black--text">{{option.label}}</span>
                </template> -->
            </v-checkbox>
          </template>
        </div>
        <!-- 填寫 -->
        <div v-if="item.type === 'fillIn'">
          <v-textarea v-model.trim="item.selected" no-resize outlined :disabled="isDisabled || (!item.revise && !isFirstWrite)" />
        </div>

        <div
          v-if="item.tips"
          v-dompurify-html="textareaToHtml(item.tips)"
          :class="[
            item.fontSize === 'humongous'
              ? 'text-72 line-height-92'
              : item.fontSize === 'colossal'
              ? 'text-46 line-height-66'
              : item.fontSize === 'big'
              ? 'text-36 line-height-56'
              : item.fontSize === 'normal'
              ? 'text-24 line-height-36'
              : 'text-14 line-height-24',
            item.fontWeight === 'bold' ? 'font-weight-bold' : item.fontWeight === 'normal' ? '' : 'font-weight-light'
          ]"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    consentData: {
      type: Object,
      required: true,
      default: () => {}
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'background'
    }
  },
  data() {
    return {
      rules: {
        validityRequired: (v) => (v && Boolean(v)) || '必選',
        tfRequired: (v) => v !== null || '必選',
        singleRequired: (v) => !!v || '必選',
        checkBoxRequired: (v) => v.length !== 0 || '至少勾選一個欄位'
      },
      // 深拷貝 (不能在computed用 會沒效果)
      // questionsCopy: JSON.parse(JSON.stringify(this.consentData.questions.datas)),
      consentDataCopy: JSON.parse(JSON.stringify(this.consentData))
    };
  },
  computed: {
    isFirstWrite() {
      // 第一個判斷追加 第二個判斷原始
      return this.consentData.status === 'BLANK' || !this.$store.state.user.isWrited;
    }
  },
  methods: {
    // 將v-textarea的字串轉為html
    textareaToHtml(content) {
      // 將換行\n轉為<br>
      const newContent = content.replace(/\n/g, '<br>');

      return newContent;
    },
    // 復原selected (是非或單選)
    resetSelected(question) {
      this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
        if (datasQuestion.index === question.index) {
          if (!datasQuestion.showDefault) {
            datasQuestion.selected = datasQuestion.defaultSelected;
          }
          if (datasQuestion.showDefault) {
            // if (datasQuestion.type === 'tf') {
            //   datasQuestion.selected = null
            // }
            if (datasQuestion.type === 'single') {
              datasQuestion.selected = '';
            }
          }
        }

        return datasQuestion;
      });
    },
    // 檢查多選的selected
    // 判斷是否需要把defaultSelected放進去(未填): showDefault=false && selected.length === 0
    // 判斷是否要把defaultSelected的值從selected中移除: showDefault=false && selected數量大於1
    checkCheckBoxSelected(question) {
      this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
        if (datasQuestion.index === question.index) {
          if (!datasQuestion.showDefault && datasQuestion.selected.length === 0) {
            datasQuestion.selected = datasQuestion.defaultSelected;
          }
          if (!datasQuestion.showDefault && datasQuestion.selected.length > datasQuestion.defaultSelected.length) {
            datasQuestion.selected = datasQuestion.selected.filter((s) => {
              // console.log('s', s);
              let isNotDefaultOption;
              if (!datasQuestion.defaultSelected.includes(s)) {
                isNotDefaultOption = s;
              }
              // console.log('isNotDefaultOption', isNotDefaultOption);
              return isNotDefaultOption;
            });
          }
        }

        return datasQuestion;
      });
    },
    // 子問題 復原selected (是非或單選)
    resetSubQSelected(question, subQuestion) {
      this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
        if (datasQuestion.index === question.index) {
          datasQuestion.datas = datasQuestion.datas.map((datasSubQ, subQIndex) => {
            if (datasSubQ.index === subQuestion.index) {
              if (!datasSubQ.showDefault) {
                datasSubQ.selected = datasSubQ.defaultSelected;
              }
              if (datasSubQ.showDefault) {
                if (datasSubQ.type === 'tf') {
                  datasSubQ.selected = null;
                }
                if (datasSubQ.type === 'single') {
                  datasSubQ.selected = '';
                }
              }
            }

            return datasSubQ;
          });
        }

        return datasQuestion;
      });
    },
    // 子問題 檢查多選的selected
    // 判斷是否需要把defaultSelected放進去(未填): showDefault=false && selected.length === 0
    // 判斷是否要把defaultSelected的值從selected中移除: showDefault=false && selected數量大於1
    checkSubQCheckBoxSelected(question, subQuestion) {
      this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
        if (datasQuestion.index === question.index) {
          datasQuestion.datas = datasQuestion.datas.map((datasSubQ, subQIndex) => {
            if (datasSubQ.index === subQuestion.index) {
              if (!datasSubQ.showDefault && datasSubQ.selected.length === 0) {
                datasSubQ.selected = datasSubQ.defaultSelected;
              }
              if (!datasSubQ.showDefault && datasSubQ.selected.length > 1) {
                datasSubQ.selected = datasSubQ.selected.filter((s) => {
                  let isNotDefaultOption;
                  datasSubQ.defaultSelected.forEach((defaultS) => {
                    if (s !== defaultS) {
                      isNotDefaultOption = s;
                    }
                  });
                  return isNotDefaultOption;
                });
              }
            }

            return datasSubQ;
          });
        }

        return datasQuestion;
      });
    },
    setSubQDefaultSelected() {}
  }
};
</script>

<style lang="scss" scoped>
/* 隱藏v-textarea的框線 */

/* ::v-deep .theme--light.v-text-field > .v-input__control > .v-input__slot:before{
  border: none
}
::v-deep .v-text-field > .v-input__control > .v-input__slot:after{
  border: none
} */

/* 處理v-radio排列 */
.v-radio-group-row {
  ::v-deep .v-input--radio-group--column .v-input--radio-group__input {
    flex-direction: row !important;
  }
}
::v-deep .v-input--selection-controls {
  margin-top: 2px !important;
  padding-top: 2px !important;
}

::v-deep .v-input__slot {
  margin-bottom: 2px !important;
}

/* 讓checkbox對齊效力或選項文字的第一行 */
::v-deep .v-input--checkbox .v-input__slot {
  align-items: start;
}

/* ::v-deep .v-input--radio-group--column .v-radio:not(:last-child):not(:only-child) {
  margin-bottom: 0px !important;
} */

/* 調整效力說明 */

/* ::v-deep .validity-label.v-textarea textarea{
  font-size: 16px;
  font-weight:700;
  margin-bottom: 8px;
} */

/* 問題題目文字大小 */

/* ::v-deep .big-text.v-textarea textarea{
  font-size: 16px;
} */

/* ::v-deep .small-text.v-textarea textarea{
  font-size: 10px;
} */

/* radio靠右 */

/* .question .v-input--radio-group--row .v-input--radio-group__input {
  justify-content: end;
} */

/* radio和checkbox的error message */

/* .question .v-input--radio-group .v-messages__message {
  text-align: right !important;
  margin-right: 16px;
} */

/* radio和checkbox的error message */

/* .question .v-input--checkbox .v-messages__message {
  text-align: right !important;
} */
</style>
