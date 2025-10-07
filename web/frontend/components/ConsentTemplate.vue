<template>
  <!-- DFKai-sb 標楷體 -->
  <div :style="{ fontFamily: 'DFKai-sb' }" :class="backgroundColor" class="consent-template">
    <!-- <div :style="{ borderBottom: '1px solid #B1AEAE' }" class="pb-5 mb-3">
      <p>誠摯歡迎您參與臺灣人體生物資料庫，當您加入我們，每2至4年以上都將邀請您再次進行後續追蹤參與。同樣的步驟，每一次的經歷，都是健康的巡禮，期盼您享受和我們共度的每一時刻。</p>
      <h4 class="primary--text font-weight-bold text-16 mb-1">說明</h4>
      <p class="mb-0">
        1.後續追蹤參與無需再次報名，我們會主動與您聯繫。
        <br />
        2.不確定是否曾參與，歡迎致電0800-018810查詢。
        <br />
        3.若尚未接到與您聯繫的電話，敬請耐心等候，我們將依報名順序與您聯繫。
        <br />
        4.電話報名請撥0800-018810或各駐站電話。
      </p>
    </div> -->
    <!-- 一、 -->
    <div class="mb-3">
      <!-- <h5 class="mb-2 text-16 font-weight-bold">{{ consentData.validity.label }}</h5> -->
      <!-- <v-textarea
        v-if="consentDataCopy.validity.label"
        v-model="consentDataCopy.validity.label"
        :readonly="true"
        color="grey-darken1"
        no-resize
        auto-grow
        :rows="getRowsCount(consentDataCopy.validity.label)"
        :hide-details="true"
        :class="'primary--text'"
        class="validity-label"
      /> -->
      <div
        v-if="consentData.validity.label"
        v-dompurify-html="textareaToHtml(consentData.validity.label)"
        class="text-16 font-weight-bold"
      ></div>
      <div class="pt-3">
        <template v-for="(item, index) in consentData.validity.datas">
          <v-checkbox
            v-if="item.content"
            :key="index"
            v-model="item.approved"
            :value="true"
            :disabled="isDisabled"
            :hide-details="isDisabled"
            :rules="[rules.validityRequired]"
          >
            <template #label>
              <!-- <v-textarea
                v-model="item.content"
                :readonly="true"
                color="grey-darken1"
                no-resize
                auto-grow
                :rows="getRowsCount(item.content)"
                :hide-details="true"
                class="pt-0"
              /> -->
              <div class="d-flex">
                <!-- <span class="text-16">{{ index + 1 }}.</span> -->
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
              </div>
            </template>
          </v-checkbox>
        </template>
      </div>
    </div>
    <!-- 二、 -->
    <div class="question">
      <!-- <h5 class="mb-2 text-16 font-weight-bold">{{ consentData.questions.label }}</h5> -->
      <!-- <v-textarea
        v-if="consentDataCopy.questions.label"
        v-model="consentDataCopy.questions.label"
        :readonly="true"
        color="grey-darken1"
        no-resize
        auto-grow
        :rows="getRowsCount(consentData.questions.label)"
        :hide-details="true"
        class="text-16 font-weight-bold"
      /> -->
      <div
        v-if="consentDataCopy.questions.label"
        v-dompurify-html="textareaToHtml(consentData.questions.label)"
        class="text-16 font-weight-bold"
      ></div>
      <div
        v-for="(question, index) in consentData.questions.datas"
        :key="index"
        :style="{ borderBottom: '1px solid #B1AEAE' }"
        class="py-3"
      >
        <!-- 問題題目 -->
        <!-- <p :class="question.fontSize === 'big' ? 'text-16' : question.fontSize === 'normal' ? '' : 'text-10'">{{ question.index }}.{{ question.label }}</p> -->
        <!-- <v-textarea
          v-model="question.label"
          :readonly="true"
          color="grey-darken1"
          no-resize
          auto-grow
          :rows="getRowsCount(question.label)"
          :hide-details="true"
          :class="question.fontSize === 'big' ? 'big-text' : question.fontSize === 'normal' ? '' : 'small-text'"
          :label="`${index + 1}.`"
        /> -->
        <div class="d-flex">
          <!-- <span :class="question.fontSize === 'big' ? 'text-16' : question.fontSize === 'normal' ? '' : 'text-10'">{{ index + 1 }}.</span> -->
          <div
            v-dompurify-html="textareaToHtml(question.label)"
            :class="[
              question.fontSize === 'humongous'
                ? 'text-72 line-height-92'
                : question.fontSize === 'colossal'
                ? 'text-46 line-height-66'
                : question.fontSize === 'big'
                ? 'text-36 line-height-56'
                : question.fontSize === 'normal'
                ? 'text-24 line-height-36'
                : 'text-14 line-height-24',
              question.fontWeight === 'bold' ? 'font-weight-bold' : question.fontWeight === 'normal' ? '' : 'font-weight-light'
            ]"
          ></div>
        </div>
        <!-- 問題內的子問題 -->
        <template v-if="question.datas">
          <div
            v-for="(data, ind) in question.datas"
            :key="ind"
            :style="{ borderBottom: ind !== question.datas.length - 1 ? '1px solid #B1AEAE' : '' }"
            class="py-3"
          >
            <!-- 子題目 -->
            <!-- 【{{ data.index }}】 -->
            <p>{{ data.label }}</p>
            <!-- 子問題是非 -->
            <!-- :disabled="isDisabled || (!data.revise && !isFirstWrite) || (questionsCopy[index].datas[ind].selected === false && !isFirstWrite)" -->
            <div v-if="data.type === 'tf'" :class="data.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
              <v-radio-group v-model="data.selected" :disabled="isDisabled || (!data.revise && !isFirstWrite)" :rules="[rules.tfRequired]">
                <!-- data.required ? rules.radioRequired : null -->
                <template v-for="(option, i) in data.options">
                  <div
                    v-if="data.showDefault || (!data.showDefault && data.defaultSelected !== option.value)"
                    :key="i"
                    :class="i === 0 ? '' : data.optionArrangementMethod === 'row' ? 'ml-3' : ''"
                    class="d-flex align-center justify-space-between"
                  >
                    <v-radio :value="option.value" :class="data.optionArrangementMethod === 'column' ? 'mb-2' : ''" class="align-start">
                      <template #label>
                        <!-- <v-textarea
                          v-model="option.label"
                          :readonly="true"
                          color="grey-darken1"
                          no-resize
                          auto-grow
                          :rows="getRowsCount(option.label)"
                          :hide-details="true"
                          class="pt-1"
                        /> -->
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
                    <!-- <v-btn v-if="data.selected === option.value && !isDisabled" small outlined color="primary"
                      class="ml-3" @click="resetSubQSelected(question, data)">
                      清空選項
                    </v-btn> -->
                  </div>
                </template>
              </v-radio-group>
            </div>
            <!-- 子問題單選 -->
            <!-- :disabled="isDisabled || (!data.revise && !isFirstWrite) || (questionsCopy[index].datas[ind].selected === false && !isFirstWrite)" -->
            <div v-if="data.type === 'single'" :class="data.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
              <v-radio-group
                v-model="data.selected"
                :disabled="isDisabled || (!data.revise && !isFirstWrite)"
                :rules="[rules.singleRequired]"
              >
                <!-- data.required ? rules.radioRequired : null -->
                <template v-for="(option, i) in data.options">
                  <div
                    v-if="data.showDefault || (!data.showDefault && data.defaultSelected !== option.value)"
                    :key="i"
                    class="d-flex align-center justify-space-between"
                    :class="i === 0 ? '' : data.optionArrangementMethod === 'row' ? 'ml-3' : ''"
                  >
                    <v-radio :value="option.value" :class="data.optionArrangementMethod === 'column' ? 'mb-2' : ''" class="align-start">
                      <template #label>
                        <!-- <v-textarea
                          v-model="option.label"
                          :readonly="true"
                          color="grey-darken1"
                          no-resize
                          auto-grow
                          :rows="getRowsCount(option.label)"
                          :hide-details="true"
                          class="pt-1"
                        /> -->
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
                    <v-btn
                      v-if="data.selected === option.value && !isDisabled"
                      small
                      outlined
                      color="primary"
                      class="ml-3"
                      @click="resetSubQSelected(question, data)"
                      >清空選項
                    </v-btn>
                  </div>
                </template>
                <!-- <template #label>
                    <span class="black--text">{{option.label}}</span>
                  </template> -->
                <!-- 這層div 如果radio數量超過一行時 靠左排列 -->
                <!-- <div class="d-flex flex-wrap">
                  <v-radio v-for="(option,i) in data.options" :key="i" :value="option.value">
                    <template #label>
                      <span class="black--text">{{option.label}}</span>
                    </template>
                  </v-radio>
                </div> -->
              </v-radio-group>
            </div>
            <!-- 子問題多選 -->
            <!-- 最外層div justify-end讓checkbox靠右 -->
            <div v-if="data.type === 'mutiple'" :class="[data.optionArrangementMethod === 'row' ? 'd-flex' : '', data.tips ? 'mb-5' : '']">
              <template v-for="(option, i) in data.options">
                <!-- :hide-details="i !== data.options.length - 1" -->
                <!-- :disabled="isDisabled || (!data.revise && !isFirstWrite) || (questionsCopy[index].datas[ind].selected === false && !isFirstWrite)" -->
                <v-checkbox
                  v-if="data.showDefault || (!data.showDefault && !data.defaultSelected.includes(option.value))"
                  :key="i"
                  v-model="data.selected"
                  :disabled="isDisabled || (!data.revise && !isFirstWrite)"
                  :color="'primary'"
                  :value="option.value"
                  :rules="[rules.checkBoxRequired]"
                  :class="data.optionArrangementMethod === 'row' ? 'mr-3' : ''"
                  :hide-details="
                    (data.optionArrangementMethod === 'row' && ind !== 0) ||
                    (data.optionArrangementMethod === 'column' && ind !== data.options.length - 1)
                  "
                  @change="checkSubQCheckBoxSelected(question, data)"
                >
                  <template #label>
                    <!-- <v-textarea
                        v-model="option.label"
                        :readonly="true"
                        color="grey-darken1"
                        no-resize
                        auto-grow
                        :rows="getRowsCount(option.label)"
                        :hide-details="true"
                        class="pt-1"
                      /> -->
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
              </template>
              <!-- 第二層div 如果checkbox數量超過一行 讓第二行開始的多選框從左邊開始排列 -->
              <!-- <div class="d-flex flex-wrap">
                <v-checkbox v-for="option in data.options" :key="option.index" v-model="data.selected" :disabled="isDisabled" :color="'primary'" :value="option.value" :rules="[data.selected.length !== 0 || '至少勾選一個欄位']" :hide-details="option.index !== data.options.length" :label="option.label">
                </v-checkbox>
              </div> -->
            </div>
            <!-- 子問題填寫 -->
            <div v-if="data.type === 'fillIn'">
              <!-- :disabled="isDisabled || (!data.revise && !isFirstWrite) || (questionsCopy[index].datas[ind].selected === false && !isFirstWrite)" -->
              <v-textarea v-model="data.selected" no-resize outlined :disabled="isDisabled || (!data.revise && !isFirstWrite)"></v-textarea>
            </div>
            <!-- <p v-if="data.tips" class="mb-0">【註】{{ data.tips }}</p> -->
            <!-- <v-textarea
            v-if="data.tips"
            v-model="data.tips"
            :readonly="true"
            color="grey-darken1"
            no-resize
            auto-grow
            :rows="getRowsCount(data.tips)"
            :hide-details="true"
            class="pt-1"
          /> -->
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
        <!-- :disabled="isDisabled || (!question.revise && !isFirstWrite) || (questionsCopy[index].selected === false && !isFirstWrite)" -->
        <div v-if="question.type === 'tf'" :class="question.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
          <v-radio-group
            v-model="question.selected"
            :disabled="isDisabled || (!question.revise && !isFirstWrite)"
            :rules="[rules.tfRequired]"
          >
            <div
              v-for="(option, ind) in question.options"
              :key="ind"
              class="d-flex align-center justify-space-between"
              :class="ind === 0 ? '' : question.optionArrangementMethod === 'row' ? 'ml-3' : ''"
            >
              <v-radio :value="option.value" :class="question.optionArrangementMethod === 'column' ? 'mb-2' : ''" class="align-start">
                <template #label>
                  <!-- <v-textarea
                    v-model="option.label"
                    :readonly="true"
                    color="grey-darken1"
                    no-resize
                    auto-grow
                    :rows="getRowsCount(option.label)"
                    :hide-details="true"
                    class="pt-1"
                  /> -->
                  <div
                    v-dompurify-html="textareaToHtml(option.label)"
                    :class="[
                      question.fontSize === 'humongous'
                        ? 'text-72 line-height-92'
                        : question.fontSize === 'colossal'
                        ? 'text-46 line-height-66'
                        : question.fontSize === 'big'
                        ? 'text-36 line-height-56'
                        : question.fontSize === 'normal'
                        ? 'text-24 line-height-36'
                        : 'text-14 line-height-24',
                      question.fontWeight === 'bold' ? 'font-weight-bold' : question.fontWeight === 'normal' ? '' : 'font-weight-light'
                    ]"
                  ></div>
                </template>
              </v-radio>
              <!-- <v-btn v-if="question.selected === option.value && !isDisabled" small outlined color="primary" class="ml-3"
                @click="resetSelected(question)">清空選項
              </v-btn> -->
            </div>
          </v-radio-group>
        </div>
        <!-- 單選 -->
        <!-- disabled條件
             1.isDisabled: 區塊鏈證明 全部鎖
             2.(!question.revise && !isFirstWrite): revise 是否可修改 isFirstWrite 是否是第一次填寫
             (現在沒這需求)3.(questionsCopy[index].selected === false && !isFirstWrite): 如果selected選否就不能再修改 (要深拷貝一份questions出來當判斷基準)
        -->
        <!-- :disabled="isDisabled || (!question.revise && !isFirstWrite) || (questionsCopy[index].selected === false && !isFirstWrite)" -->
        <div v-if="question.type === 'single'" :class="question.optionArrangementMethod === 'row' ? 'v-radio-group-row' : ''">
          <v-radio-group
            v-model="question.selected"
            :disabled="isDisabled || (!question.revise && !isFirstWrite)"
            :rules="[rules.singleRequired]"
          >
            <!-- question.required ? rules.singleRequired : null -->
            <template v-for="(option, ind) in question.options">
              <div
                v-if="question.showDefault || (!question.showDefault && question.defaultSelected !== option.value)"
                :key="ind"
                class="d-flex align-center justify-space-between"
                :class="ind === 0 ? '' : question.optionArrangementMethod === 'row' ? 'ml-3' : ''"
              >
                <v-radio :value="option.value" :class="question.optionArrangementMethod === 'column' ? 'mb-2' : ''" class="align-start">
                  <template #label>
                    <!-- <v-textarea
                      v-model="option.label"
                      :readonly="true"
                      color="grey-darken1"
                      no-resize
                      auto-grow
                      :rows="getRowsCount(option.label)"
                      :hide-details="true"
                      class="pt-1"
                    /> -->
                    <div
                      v-dompurify-html="textareaToHtml(option.label)"
                      :class="[
                        question.fontSize === 'humongous'
                          ? 'text-72 line-height-92'
                          : question.fontSize === 'colossal'
                          ? 'text-46 line-height-66'
                          : question.fontSize === 'big'
                          ? 'text-36 line-height-56'
                          : question.fontSize === 'normal'
                          ? 'text-24 line-height-36'
                          : 'text-14 line-height-24',
                        question.fontWeight === 'bold' ? 'font-weight-bold' : question.fontWeight === 'normal' ? '' : 'font-weight-light'
                      ]"
                    ></div>
                  </template>
                </v-radio>
                <v-btn
                  v-if="question.selected === option.value && !isDisabled"
                  small
                  outlined
                  color="primary"
                  class="ml-3"
                  @click="resetSelected(question)"
                  >清空選項</v-btn
                >
              </div>
            </template>
            <!-- <template #label>
                          <span class="black--text">{{option.label}}</span>
                        </template> -->
            <!-- 這層div 如果radio數量超過一行時 靠左排列 -->
            <!-- <div class="d-flex flex-wrap">
              <v-radio v-for="(option,i) in question.options" :key="i" :value="option.value" class="mb-2">
                <template #label>
                  <span class="black--text">{{option.label}}</span>
                </template>
              </v-radio>
            </div> -->
          </v-radio-group>
        </div>
        <!-- 多選 -->
        <!-- 最外層div justify-end讓checkbox靠右 -->
        <div
          v-if="question.type === 'mutiple'"
          :class="[question.optionArrangementMethod === 'row' ? 'd-flex' : '', question.tips ? 'mb-5' : '']"
        >
          <template v-for="(option, ind) in question.options">
            <!-- :hide-details="ind !== question.options.length - 1" -->
            <!-- :disabled="isDisabled || (!question.revise && !isFirstWrite) || (questionsCopy[index].selected === false && !isFirstWrite)" -->
            <v-checkbox
              v-if="question.showDefault || (!question.showDefault && !question.defaultSelected.includes(option.value))"
              :key="ind"
              v-model="question.selected"
              :disabled="isDisabled || (!question.revise && !isFirstWrite)"
              :color="'primary'"
              :value="option.value"
              :class="question.optionArrangementMethod === 'row' ? 'mr-3' : ''"
              :hide-details="
                (question.optionArrangementMethod === 'row' && ind !== 0) ||
                (question.optionArrangementMethod === 'column' && ind !== question.options.length - 1)
              "
              :rules="[rules.checkBoxRequired]"
              @change="checkCheckBoxSelected(question)"
            >
              <template #label>
                <!-- <v-textarea
                    v-model="option.label"
                    :readonly="true"
                    color="grey-darken1"
                    no-resize
                    auto-grow
                    :rows="getRowsCount(option.label)"
                    :hide-details="true"
                    class="pt-1"
                  /> -->
                <div
                  v-dompurify-html="textareaToHtml(option.label)"
                  :class="[
                    question.fontSize === 'humongous'
                      ? 'text-72 line-height-92'
                      : question.fontSize === 'colossal'
                      ? 'text-46 line-height-66'
                      : question.fontSize === 'big'
                      ? 'text-36 line-height-56'
                      : question.fontSize === 'normal'
                      ? 'text-24 line-height-36'
                      : 'text-14 line-height-24',
                    question.fontWeight === 'bold' ? 'font-weight-bold' : question.fontWeight === 'normal' ? '' : 'font-weight-light'
                  ]"
                ></div>
              </template>
            </v-checkbox>
          </template>
        </div>
        <!-- 第二層div 如果checkbox數量超過一行 讓第二行開始的多選框從左邊開始排列 -->
        <!-- <div class="d-flex flex-wrap">
            <v-checkbox v-for="(option,i) in question.options" :key="i" v-model="question.selected" :disabled="isDisabled" :color="'primary'" :value="option.value" :class="'mr-4'" :rules="[question.selected.length !== 0 || '至少勾選一個欄位']" :hide-details="i !== question.options.length - 1">
              <template #label>
                <span class="black--text">{{option.label}}</span>
              </template>
            </v-checkbox>
          </div> -->
        <!-- 填寫 -->
        <div v-if="question.type === 'fillIn'">
          <!-- :disabled="isDisabled || (!question.revise && !isFirstWrite) || (questionsCopy[index].selected === false && !isFirstWrite)" -->
          <v-textarea
            v-model="question.selected"
            no-resize
            outlined
            :disabled="isDisabled || (!question.revise && !isFirstWrite)"
          ></v-textarea>
        </div>
        <!-- <p v-if="question.tips" class="mb-0">【註】{{ question.tips }}</p> -->
        <!-- <v-textarea
          v-if="question.tips"
          v-model="question.tips"
          :readonly="true"
          color="grey-darken1"
          no-resize
          auto-grow
          :rows="getRowsCount(question.tips)"
          :hide-details="true"
          class="pt-1"
        /> -->
        <div
          v-if="question.tips"
          v-dompurify-html="textareaToHtml(question.tips)"
          :class="[
            question.fontSize === 'humongous'
              ? 'text-72 line-height-92'
              : question.fontSize === 'colossal'
              ? 'text-46 line-height-66'
              : question.fontSize === 'big'
              ? 'text-36 line-height-56'
              : question.fontSize === 'normal'
              ? 'text-24 line-height-36'
              : 'text-14 line-height-24',
            question.fontWeight === 'bold' ? 'font-weight-bold' : question.fontWeight === 'normal' ? '' : 'font-weight-light'
          ]"
        ></div>
      </div>
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
      questionsCopy: JSON.parse(JSON.stringify(this.consentData.questions.datas)),
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
    // 獲取v-textarea的行數
    // getRowsCount (content) {
    //   const keyword = '\n'

    //   const regex = new RegExp(keyword, 'g')
    //   const matches = content.match(regex)
    //   const count = matches ? matches.length : 1

    //   console.log(`字串中共有 ${count} 個 ${keyword}`)

    //   return count

    // },
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
    }
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
