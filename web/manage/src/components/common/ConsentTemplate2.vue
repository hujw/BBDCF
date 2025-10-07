<template>
  <div class="consent-template">
    <!-- :style="{borderBottom:'1px solid #B1AEAE'}" -->
    <!-- class="py-3" -->
    <div v-for="(item, index) in consentData.allData" :key="index" class="py-1">
      <!-- 效力 -->
      <template v-if="item.group === 'validity'">
        <div>
          <v-checkbox v-model="item.approved" :disabled="isDisabled" :hide-details="true">
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
              />
            </template>
          </v-checkbox>
        </div>
      </template>
      <!-- 說明 -->
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

      <!-- 問題 -->
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
        />
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
            <div v-if="data.uiType === 'tf'" :class="data.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
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
                      />
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
            <div v-if="data.uiType === 'single'" :class="data.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
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
                      />
                    </template>
                  </v-radio>
                  <div v-if="data.selected === option.value">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" @click="handleSubQShowDefault(item, data, option)">
                          {{ data.showDefault ? 'mdi-eye' : 'mdi-eye-off' }}
                        </v-icon>
                      </template>
                      <span>
                        {{ data.showDefault ? '隱藏' : '顯示' }}
                      </span>
                    </v-tooltip>
                    <v-btn v-if="!isDisabled" small outlined color="primary" class="ml-3" @click="clearSubQSelected(item, data)">
                      清空選項
                    </v-btn>
                  </div>
                </div>
              </v-radio-group>
            </div>
            <!-- 子問題多選 -->
            <div v-if="data.uiType === 'mutiple'" :class="data.optionArrangementMethod === 'row' ? 'd-flex' : ''">
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
                    />
                  </template>
                </v-checkbox>
                <v-tooltip v-if="data.selected.includes(option.value)" bottom>
                  <template v-slot:activator="{ on, attrs }">
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
            <div v-if="data.uiType === 'fillIn'">
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
            />
            <p v-if="data.revise" class="mb-0 text-right">可變更回答</p>
            <p v-if="data.revise === false" class="mb-0 text-right">不可變更回答</p>
          </div>
        </template>
        <!-- 是非 -->
        <div v-if="item.uiType === 'tf'" :class="item.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
          <v-radio-group v-model="item.selected" @change="setDefaultSelected(item, index)">
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
                  />
                </template>
              </v-radio>
              <!-- <v-btn
                v-if="item.selected === option.value &&!isDisabled"
                small
                outlined
                color="primary"
                class="ml-3"
                @click="clearSelected(item,index)"
              >清空選項
              </v-btn> -->
            </div>
            <!-- <template #label>
                  <span class="black--text">{{option.label}}</span>
                </template> -->
          </v-radio-group>
        </div>
        <!-- 單選 -->
        <div v-if="item.uiType === 'single'" :class="item.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
          <v-radio-group v-model="item.selected" @change="setDefaultSelected(item, index)">
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
                  />
                </template>
              </v-radio>

              <div v-if="item.selected === option.value">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <!--  @click="handleShowDefault(item,index ,option,ind)" -->
                    <v-icon v-bind="attrs" v-on="on" @click="handleShowDefault(item, index)">
                      {{ item.showDefault ? 'mdi-eye' : 'mdi-eye-off' }}
                    </v-icon>
                  </template>
                  <span>
                    {{ item.showDefault ? '隱藏' : '顯示' }}
                  </span>
                </v-tooltip>
                <v-btn v-if="!isDisabled" small outlined color="primary" class="ml-3" @click="clearSelected(item, index)"> 清空選項 </v-btn>
              </div>
            </div>
          </v-radio-group>
        </div>
        <!-- 多選 -->
        <div v-if="item.uiType === 'mutiple'" :class="item.optionArrangementMethod === 'row' ? 'd-flex' : ''">
          <div
            v-for="(option, ind) in item.options"
            :key="ind"
            :class="ind === 0 ? '' : item.optionArrangementMethod === 'row' ? 'ml-3' : ''"
            class="d-flex justify-space-between"
          >
            <!-- ind !== item.options.length - 1 -->
            <v-checkbox
              v-model="item.selected"
              :disabled="isDisabled"
              :color="'primary'"
              :value="option.value"
              :class="item.optionArrangementMethod === 'column' ? 'mb-2' : ''"
              :hide-details="
                (item.optionArrangementMethod === 'row' && ind !== 0) ||
                (item.optionArrangementMethod === 'column' && ind !== item.options.length - 1)
              "
              @change="setDefaultSelected(item, index)"
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
                />
              </template>
              <!-- :rules="[item.selected.length !== 0 || '至少勾選一個欄位']" -->
              <!-- <template #label>
                  <span class="black--text">{{option.label}}</span>
                </template> -->
            </v-checkbox>
            <v-tooltip v-if="item.selected.includes(option.value)" bottom>
              <template v-slot:activator="{ on, attrs }">
                <!-- @click="handleShowDefault(item,index, option,ind)" -->
                <v-icon v-bind="attrs" :disabled="isDisabled" v-on="on" @click="handleShowDefault(item, index)">
                  {{ item.showDefault ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
              <span>
                {{ item.showDefault ? '隱藏' : '顯示' }}
              </span>
            </v-tooltip>
          </div>
        </div>
        <!-- 填寫 -->
        <div v-if="item.uiType === 'fillIn'">
          <v-textarea v-model.trim="item.selected" no-resize outlined :disabled="isDisabled" />
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
        />
        <p v-if="item.revise" class="mb-0 text-right">可變更回答</p>
        <p v-if="item.revise === false" class="mb-0 text-right">不可變更回答</p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    consentData: {
      type: Object,
      required: true,
      default: () => {}
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 規則 ------------------------------
      rules: {
        // 必填+禁止只有空格
        required: (v) => (!!v && /^(?!(\s+$))/.test(v)) || '必填',
        radioRequired: (v) => v !== null || '必選'
      }
    };
  },
  methods: {
    // 將v-textarea的字串轉為html
    textareaToHtml(content) {
      // 將換行\n轉為<br>
      const newContent = content.replace(/\n/g, '<br>');

      return newContent;
    },

    // 清空selected和defaultSelected (是非或單選)
    clearSelected(question, questionIndex) {
      if (this.consentData.allData[questionIndex].uiType === 'tf') {
        this.consentData.allData[questionIndex].selected = null;
        this.consentData.allData[questionIndex].defaultSelected = null;
      }
      if (this.consentData.allData[questionIndex].uiType === 'single') {
        this.consentData.allData[questionIndex].selected = '';
        this.consentData.allData[questionIndex].defaultSelected = '';
      }

      // this.consentData.questions.datas = this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
      //   if (datasQuestion.index === question.index) {
      //     if (datasQuestion.type === 'tf') {
      //       datasQuestion.selected = null
      //       datasQuestion.defaultSelected = null
      //     }
      //     if (datasQuestion.type === 'single') {
      //       datasQuestion.selected = ''
      //       datasQuestion.defaultSelected = ''
      //     }
      //   }

      //   return datasQuestion
      // })
    },
    // 把selected塞入defaultSelected
    setDefaultSelected(question, questionIndex) {
      this.consentData.allData[questionIndex].defaultSelected = question.selected;
      // this.consentData.questions.datas = this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
      //   if (datasQuestion.index === question.index) {
      //     datasQuestion.defaultSelected = question.selected
      //   }

      //   return datasQuestion
      // })
    },
    // 隱藏或顯示defaultSelected
    handleShowDefault(question, questionIndex) {
      this.consentData.allData[questionIndex].showDefault = !this.consentData.allData[questionIndex].showDefault;

      // this.consentData.questions.datas = this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
      //   if (datasQuestion.index === question.index) {
      //     datasQuestion.options.forEach((datasQuestionO, datasQuestionI) => {
      //       if (datasQuestionO.index === option.index) {
      //         datasQuestion.showDefault ? datasQuestion.showDefault = false : datasQuestion.showDefault = true
      //       }
      //     })
      //   }

      //   return datasQuestion
      // })
    },
    // 子問題 清空selected和defaultSelected (是非或單選)
    clearSubQSelected(question, subQuestion) {
      this.consentData.questions.datas = this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
        if (datasQuestion.index === question.index) {
          datasQuestion.datas = datasQuestion.datas.map((datasSubQ, subQIndex) => {
            if (datasSubQ.index === subQuestion.index) {
              if (datasSubQ.uiType === 'tf') {
                datasSubQ.selected = null;
                datasSubQ.defaultSelected = null;
              }
              if (datasSubQ.uiType === 'single') {
                datasSubQ.selected = '';
                datasSubQ.defaultSelected = '';
              }
            }

            return datasSubQ;
          });
        }

        return datasQuestion;
      });
    },
    // 子問題 把selected塞入defaultSelected
    setSubQDefaultSelected(question, subQuestion) {
      this.consentData.questions.datas = this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
        if (datasQuestion.index === question.index) {
          datasQuestion.datas = datasQuestion.datas.map((datasSubQ, subQIndex) => {
            if (datasSubQ.index === subQuestion.index) {
              datasSubQ.defaultSelected = subQuestion.selected;
            }

            return datasSubQ;
          });
        }

        return datasQuestion;
      });
    },
    // 子問題 隱藏或顯示defaultSelected
    handleSubQShowDefault(question, subQuestion, subQOption) {
      this.consentData.questions.datas = this.consentData.questions.datas.map((datasQuestion, datasIndex) => {
        if (datasQuestion.index === question.index) {
          datasQuestion.datas = datasQuestion.datas.map((datasSubQ, subQIndex) => {
            if (datasSubQ.index === subQuestion.index) {
              datasSubQ.options.forEach((datasSubQO, datasSubQI) => {
                if (datasSubQO.index === subQOption.index) {
                  datasSubQ.showDefault ? (datasSubQ.showDefault = false) : (datasSubQ.showDefault = true);
                }
              });
            }

            return datasSubQ;
          });
        }

        return datasQuestion;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/* 讓checkbox對齊效力或選項文字的第一行 */
::v-deep .v-input--checkbox .v-input__slot {
  align-items: start;
}
</style>
