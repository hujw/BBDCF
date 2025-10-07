<template>
  <div>
    <p>{{ questionnaireData.describe }}</p>
    <!-- group -->
    <div v-for="(group, groupIndex) in questionnaireData.groups" :key="groupIndex">
      <h2 class="mb-2 text-center font-weight-bold">
        {{ `${group.groupName}` }}
        <span v-if="group.groupName && group.label">.</span>
        {{ `${group.label}` }}
      </h2>
      <h4 class="mb-2 font-weight-bold">{{ group.explanation }}</h4>
      <!-- subGroup -->
      <div v-for="(subGroup, subGroupIndex) in group.subGroups" :key="subGroupIndex">
        <h4 class="mb-2 font-weight-bold">{{ `${subGroup.label}` }}</h4>
        <p class="font-weight-bold">{{ subGroup.explanation }}</p>
        <!-- question -->
        <template v-for="(question, questionIndex) in subGroup.datas">
          <v-expand-transition v-if="question.isShow" :key="questionIndex">
            <div>
              <p>
                {{ `${question.questionNumber} ${question.label}` }}
                <!-- {{`${group.groupName}-${subGroup.index}-${question.index} ${question.label}`}} -->
              </p>
              <!-- 填寫題 -->
              <div v-if="question.uiType === 'fillIn'">
                <!-- question.options[0] 是填寫題用來判斷跳題或passNextuestion的 -->
                <!-- handleAll的groupIndex 不能直接傳進來 要用currentPage - 1 ； 因為問卷是按照題組切割成分頁顯示 groupIndex永遠都是0 -->
                <v-text-field
                  v-model.trim="question.selected"
                  outlined
                  :disabled="true"
                  :rules="[question.isShow ? !!question.selected || '不得為空' : true]"
                  @input="handleAll(currentPage - 1, subGroupIndex, questionIndex, question, question.options[0])"
                ></v-text-field>
                <!-- 搭配單選題 -->
                <v-radio-group v-if="question.options.length > 1" v-model="question.selected">
                  <template v-for="(option, optionIndex) in question.options">
                    <v-radio
                      v-if="optionIndex !== 0"
                      :key="optionIndex"
                      :value="option.value"
                      :disabled="true"
                      @change="handleAll(currentPage - 1, subGroupIndex, questionIndex, question, question.options[optionIndex])"
                    >
                      <template #label>
                        <span>{{ `${option.index}.${option.label}` }}</span>
                      </template>
                    </v-radio>
                  </template>
                </v-radio-group>
              </div>
              <!-- 單選題 -->
              <template v-if="question.uiType === 'single'">
                <v-radio-group
                  v-model="question.selected"
                  :rules="[
                    // 先判斷題目是不是isShow 不是的話就不用rule 是的話再判斷selected
                    question.isShow ? !!question.selected || '必選' : true
                  ]"
                >
                  <template #default>
                    <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                      <v-radio
                        :value="option.value"
                        :disabled="true"
                        @change="handleAll(currentPage - 1, subGroupIndex, questionIndex, question, option)"
                      >
                        <template #label>
                          <span>{{ `${option.index}.${option.label}` }}</span>
                        </template>
                      </v-radio>
                      <!-- 如果option有addFillIn時顯示 -->
                      <!-- <v-text-field v-if="option.addFillIn" :key="optionIndex" v-model="option.desc" outlined
                      :disabled="(isDisabled || question.selected !== option.value || question.disabled)">
                    </v-text-field> -->
                    </div>
                  </template>
                </v-radio-group>
              </template>

              <!-- 多選 -->
              <template v-for="(option, optionIndex) in question.options">
                <v-checkbox
                  v-if="question.uiType === 'mutiple'"
                  :key="optionIndex + question.options.length"
                  v-model="question.selected"
                  :value="option.value"
                  :disabled="true"
                  :hide-details="optionIndex !== question.options.length - 1"
                  :rules="[question.isShow ? question.selected.length !== 0 || '至少勾選一個欄位' : true]"
                  @change="handleAll(currentPage - 1, subGroupIndex, questionIndex, question, option)"
                >
                  <template #label>
                    <span>{{ `${option.index}.${option.label}` }}</span>
                  </template>
                </v-checkbox>
                <!-- <v-text-field v-if="question.uiType === 'mutiple' && option.addFillIn" :key="optionIndex"
                v-model="option.desc" outlined
                :disabled="(isDisabled || !question.selected.includes(option.value) || question.disabled)">
              </v-text-field> -->
              </template>

              <!-- 選單 -->
              <template v-if="question.uiType === 'select'">
                <v-select
                  v-model="question.selected"
                  outlined
                  :disabled="true"
                  :items="question.options"
                  item-text="label"
                  return-object
                  :rules="[question.isShow ? !!question.selected || '必選' : true]"
                  @change="handleAll(currentPage - 1, subCurrentPage - 1, questionIndex, question, question.selected)"
                >
                </v-select>
              </template>

              <!-- 雙層選單 -->
              <template v-if="question.uiType === 'doubleSelect'">
                <v-select
                  v-model="question.firstSelectSelectd"
                  :disabled="true"
                  outlined
                  :items="question.firstSelectList"
                  :rules="[question.isShow ? !!question.firstSelectSelectd || '必選' : true]"
                  @change="handleSelect(currentPage - 1, subGroupIndex, questionIndex, question)"
                >
                </v-select>
                <v-select
                  v-model="question.selected"
                  :disabled="true"
                  outlined
                  :items="question.secondSelectList"
                  item-text="label"
                  return-object
                  :rules="[question.isShow ? !!question.selected || '必選' : true]"
                  @change="handleAll(currentPage - 1, subGroupIndex, questionIndex, question, question.selected)"
                >
                </v-select>
              </template>
              <p class="text-14 font-weight-bold">{{ question.note }}</p>
            </div>
          </v-expand-transition>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QuestionnaireProveTemplate',
  components: {},
  props: {
    questionnaireData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
