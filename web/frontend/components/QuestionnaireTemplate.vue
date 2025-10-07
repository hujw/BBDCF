<template>
  <div>
    <p>{{ questionnaireData.describe }}</p>
    <!-- group -->
    <div v-for="(group, groupIndex) in questionnaireListActive" :key="groupIndex" :style="{ borderBottom: '1px solid black' }">
      <h2 class="mb-2 text-center font-weight-bold">
        {{ `${group.groupName}` }}
        <span v-if="group.groupName && group.label">.</span>
        {{ `${group.label}` }}
      </h2>
      <h4 class="mb-2 font-weight-bold">{{ group.explanation }}</h4>
      <!-- subGroup -->
      <div v-for="(subGroup, subGroupIndex) in subQuestionnaireListActive" :key="subGroupIndex">
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
                <!-- 
                  填寫專用 四種rules判斷
                  一、填數字 && 不填小數
                  二、填數字 && 要填小數
                  三、最大值
                  四、最小值
                  因為用戶可能會選拒答(R)或不知道(N) 所以也要放進去
                 -->
                <!-- question.isShow ? !!question.selected || '不得為空' : true, -->
                <v-text-field
                  v-model.trim="question.selected"
                  outlined
                  :disabled="isDisabled"
                  :rules="[
                    question.rules.isNumber && !question.rules.isDecimal
                      ? /^[0-9]*$/.test(question.selected) || question.selected === 'R' || question.selected === 'N' || '請輸入整數'
                      : true,
                    question.rules.isNumber && question.rules.isDecimal
                      ? /^[0-9]+\.[0-9]{2}$/.test(question.selected) ||
                        question.selected === 'R' ||
                        question.selected === 'N' ||
                        '請輸入數字 (需有兩位小數)'
                      : true,
                    question.rules.max
                      ? parseFloat(question.selected) <= parseFloat(question.rules.max) ||
                        question.selected === 'R' ||
                        question.selected === 'N' ||
                        `不可大於${question.rules.max}`
                      : true,
                    question.rules.min
                      ? parseFloat(question.selected) >= parseFloat(question.rules.min) ||
                        question.selected === 'R' ||
                        question.selected === 'N' ||
                        `不可小於${question.rules.min}`
                      : true
                  ]"
                  @input="handleAll(currentPage - 1, subCurrentPage - 1, questionIndex, question, question.options[0])"
                ></v-text-field>
                <!-- 搭配單選題 -->
                <v-radio-group v-if="question.options.length > 1" v-model="question.selected">
                  <template v-for="(option, optionIndex) in question.options">
                    <v-radio
                      v-if="optionIndex !== 0"
                      :key="optionIndex"
                      :value="option.value"
                      :disabled="isDisabled"
                      @change="handleAll(currentPage - 1, subCurrentPage - 1, questionIndex, question, question.options[optionIndex])"
                    >
                      <template #label>
                        <span>{{ `${option.index}. ${option.label}` }}</span>
                      </template>
                    </v-radio>
                  </template>
                </v-radio-group>
              </div>
              <!-- 單選題 -->
              <!-- :rules="[
                // 先判斷題目是不是isShow 不是的話就不用rule 是的話再判斷selected
                question.isShow ? !!question.selected || '必選' : true
              ]" -->
              <template v-if="question.uiType === 'single'">
                <v-radio-group v-model="question.selected">
                  <template #default>
                    <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                      <v-radio
                        :value="option.value"
                        :disabled="isDisabled"
                        @change="handleAll(currentPage - 1, subCurrentPage - 1, questionIndex, question, option)"
                      >
                        <template #label>
                          <span>{{ `${option.index}. ${option.label}` }}</span>
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
                <!-- :rules="[
                  question.isShow ? question.selected.length !== 0 || '至少勾選一個欄位' : true
                ]" -->
                <v-checkbox
                  v-if="question.uiType === 'mutiple'"
                  :key="optionIndex + question.options.length"
                  v-model="question.selected"
                  :value="option.value"
                  :disabled="isDisabled"
                  :hide-details="optionIndex !== question.options.length - 1"
                  @change="handleAll(currentPage - 1, subCurrentPage - 1, questionIndex, question, option)"
                >
                  <template #label>
                    <span>{{ `${option.index}. ${option.label}` }}</span>
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
                  :disabled="isDisabled"
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
                <!-- :rules="[question.isShow ? !!question.firstSelectSelectd || '必選' : true]" -->
                <v-select
                  v-model="question.firstSelectSelectd"
                  outlined
                  :items="question.firstSelectList"
                  @change="handleSelect(currentPage - 1, subCurrentPage - 1, questionIndex, question)"
                >
                </v-select>
                <!-- :rules="[question.isShow ?  !!question.selected || '必選' : true]" -->
                <v-select
                  v-model="question.selected"
                  outlined
                  :items="question.secondSelectList"
                  item-text="label"
                  return-object
                  @change="handleAll(currentPage - 1, subCurrentPage - 1, questionIndex, question, question.selected)"
                >
                </v-select>
              </template>
              <p class="text-14 font-weight-bold">{{ question.note }}</p>
            </div>
          </v-expand-transition>
        </template>
      </div>
      <Pagination
        :current-page="subCurrentPage"
        :total-page="subTotalPage"
        :total-visible="7"
        :color="'subGroupBtn'"
        @changePage="showSubPage"
      >
      </Pagination>
    </div>
    <Pagination :current-page="currentPage" :total-page="totalPage" :total-visible="7" @changePage="showPage"> </Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/base/Pagination';
export default {
  name: 'QuestionnaireTemplate',
  components: {
    Pagination
  },
  props: {
    questionnaireData: {
      type: Object,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      subCurrentPage: 1
    };
  },
  computed: {
    // 總頁數
    totalPage() {
      return this.questionnaireData.groups.length;
    },
    // 現在要顯示的區域
    questionnaireListActive() {
      const firstNum = this.currentPage - 1;
      const lastNum = this.currentPage;

      return this.questionnaireData.groups.slice(firstNum, lastNum);
    },
    // 子群組總頁數
    subTotalPage() {
      return this.questionnaireData.groups[this.currentPage - 1].subGroups.length;
    },
    // 現在要顯示的子群組區域
    subQuestionnaireListActive() {
      const firstNum = this.subCurrentPage - 1;
      const lastNum = this.subCurrentPage;

      return this.questionnaireData.groups[this.currentPage - 1].subGroups.slice(firstNum, lastNum);
    }
  },
  mounted() {},
  // process.client
  methods: {
    // 跳題和多選互斥 option desc
    // groupIndex 是 currentPage - 1  因為問卷是按照題組切割成分頁顯示 直接用groupIndex傳進來永遠都是0
    async handleAll(groupIndex, subGroupIndex, questionIndex, activeQuestion, activeOption) {
      if (activeQuestion.uiType === 'mutiple' && activeQuestion.optionRepels) {
        await this.handleRepels(groupIndex, subGroupIndex, questionIndex, activeQuestion, activeOption);
      }
      // 處理跳題
      await this.handleJump(groupIndex, subGroupIndex, questionIndex, activeQuestion, activeOption);
      // 控制option desc
      // await this.handleDesc(activeQuestion, activeOption)
      await this.$emit('upDateGroups', this.questionnaireData.groups);
    },
    // 多選互斥
    handleRepels(groupIndex, subGroupIndex, questionIndex, activeQuestion, activeOption) {
      // 迴圈selected
      activeQuestion.selected.forEach((value) => {
        activeOption.repelsArray.forEach((repel) => {
          // 如果有包含互斥的
          if (value === repel) {
            // 找出這一筆問題 因為this.questionnaireData是prop來的 不能直接修改 所以賦值
            // object會傳址 所以也會一起改變this.questionnaireData
            // selected移除activeOption.value
            const upDateQuestion = this.questionnaireData.groups[groupIndex].subGroups[subGroupIndex].datas[questionIndex];
            upDateQuestion.selected = upDateQuestion.selected.filter((val) => {
              return val !== activeOption.value;
            });
            this.$toast.error('選項互斥');
          }
        });
      });

      // this.questionnaireData.groups.forEach(
      //   (group) => {
      //     group.subGroups.forEach((subGroup) => {
      //       subGroup.datas.forEach((question) => {
      //         // 找出這一筆題目
      //         if (activeQuestion.calculateNumber === question.calculateNumber) {
      //           // 迴圈selected和repelsArray
      //   activeQuestion.selected.forEach((value) => {
      //     activeOption.repelsArray.forEach((repel) => {
      //       // 如果有包含互斥的
      //       if (value === repel) {
      //         // selected移除activeOption.value
      //         question.selected = question.selected.filter((val) => {
      //           return val !== activeOption.value
      //         })
      //         this.$toast.error('選項互斥')
      //       }
      //     })
      //   })
      // }
      //       })
      //     })
      //   }
      // )
    },
    // 處理跳題
    handleJump(groupIndex, subGroupIndex, questionIndex, activeQuestion, activeOption) {
      // 要寫在this.$nextTick裡 否則fillIn搭配single會有bug
      this.$nextTick(() => {
        console.log('activeQuestion', activeQuestion);
        console.log('activeOption', activeOption);
        // console.log('activeQuestion.selected', activeQuestion.selected)

        // 單選、選單、填寫、雙層選單 跳題
        // 填寫 selected不為空 才調用
        if (
          (activeQuestion.uiType === 'single' && activeOption.showQuestionNumbersArray.length) ||
          (activeQuestion.uiType === 'select' && activeOption.showQuestionNumbersArray.length) ||
          (activeQuestion.uiType === 'doubleSelect' && activeOption.showQuestionNumbersArray.length) ||
          (activeQuestion.uiType === 'fillIn' && activeOption.showQuestionNumbersArray.length && activeQuestion.selected)
        ) {
          this.questionnaireData.groups.forEach((group) => {
            // console.log('in');
            // 整組跳題
            // showQuestionNumbersArray[0] 字串長度只有1
            if (activeOption.showQuestionNumbersArray[0].length === 1) {
              // 復原上一個選項造成的跳題
              group.subGroups.forEach((subGroup) => {
                subGroup.datas.forEach((question) => {
                  // 上一個跳題是整組跳
                  if (activeQuestion.prevShowQuestionNumbers.length && activeQuestion.prevShowQuestionNumbers[0].length === 1) {
                    activeQuestion.prevShowQuestionNumbers.forEach((number) => {
                      // 找出questionNumber第一個字和它相同的
                      if (question.questionNumber.slice(0, 1) === number) {
                        question.isShow = false;
                      }
                    });
                  }
                  // 上一個跳題是題目跳
                  if (activeQuestion.prevShowQuestionNumbers.length && activeQuestion.prevShowQuestionNumbers[0].length !== 1) {
                    activeQuestion.prevShowQuestionNumbers.forEach((number) => {
                      if (question.questionNumber === number) {
                        question.isShow = false;
                      }
                    });
                  }
                });
              });
              // 處理跳題
              group.subGroups.forEach((subGroup) => {
                subGroup.datas.forEach((question) => {
                  activeOption.showQuestionNumbersArray.forEach((number) => {
                    // 找出questionNumber第一個字和它相同的
                    if (question.questionNumber.slice(0, 1) === number) {
                      question.isShow = true;

                      // 根據type給selected
                      question.selected =
                        question.uiType === 'fillIn'
                          ? ''
                          : question.uiType === 'single'
                          ? ''
                          : question.uiType === 'select'
                          ? ''
                          : question.uiType === 'mutiple'
                          ? []
                          : null;
                    }
                  });
                });
              });
            }
            // 題目跳題
            if (activeOption.showQuestionNumbersArray[0].length !== 1) {
              // 復原上一個選項造成的跳題
              group.subGroups.forEach((subGroup) => {
                subGroup.datas.forEach((question) => {
                  // 上一個跳題是整組跳
                  if (activeQuestion.prevShowQuestionNumbers.length && activeQuestion.prevShowQuestionNumbers[0].length === 1) {
                    activeQuestion.prevShowQuestionNumbers.forEach((number) => {
                      // 找出questionNumber第一個字和它相同的
                      if (question.questionNumber.slice(0, 1) === number) {
                        question.isShow = false;
                      }
                    });
                  }
                  // 上一個跳題是題目跳
                  if (activeQuestion.prevShowQuestionNumbers.length && activeQuestion.prevShowQuestionNumbers[0].length !== 1) {
                    activeQuestion.prevShowQuestionNumbers.forEach((number) => {
                      if (question.questionNumber === number) {
                        question.isShow = false;
                      }
                    });
                  }
                });
              });
              // 處理跳題
              group.subGroups.forEach((subGroup) => {
                subGroup.datas.forEach((question) => {
                  activeOption.showQuestionNumbersArray.forEach((number) => {
                    if (question.questionNumber === number) {
                      question.isShow = true;
                      // 根據type給selected
                      question.selected =
                        question.uiType === 'fillIn'
                          ? ''
                          : question.uiType === 'single'
                          ? ''
                          : question.uiType === 'select'
                          ? ''
                          : question.uiType === 'mutiple'
                          ? []
                          : null;
                    }
                  });
                });
              });
            }
          });
        }
        // 單選、選單、填寫、雙層選單 復原跳題 (選了不需要跳題的選項)
        // 填寫 selected為空 也復原
        if (
          (activeQuestion.uiType === 'single' && !activeOption.showQuestionNumbersArray.length) ||
          (activeQuestion.uiType === 'select' && !activeOption.showQuestionNumbersArray.length) ||
          (activeQuestion.uiType === 'doubleSelect' && !activeOption.showQuestionNumbersArray.length) ||
          (activeQuestion.uiType === 'fillIn' && !activeOption.showQuestionNumbersArray.length) ||
          (activeQuestion.uiType === 'fillIn' && !activeQuestion.selected)
        ) {
          // console.log('in2');
          this.questionnaireData.groups.forEach((group) => {
            group.subGroups.forEach((subGroup) => {
              subGroup.datas.forEach((question) => {
                // 上一個跳題是整組跳
                if (activeQuestion.prevShowQuestionNumbers.length && activeQuestion.prevShowQuestionNumbers[0].length === 1) {
                  activeQuestion.prevShowQuestionNumbers.forEach((number) => {
                    if (question.questionNumber.slice(0, 1) === number) {
                      question.isShow = false;
                    }
                  });
                }
                // 上一個跳題是題目跳
                if (activeQuestion.prevShowQuestionNumbers.length && activeQuestion.prevShowQuestionNumbers[0].length !== 1) {
                  activeQuestion.prevShowQuestionNumbers.forEach((number) => {
                    if (question.questionNumber === number) {
                      question.isShow = false;
                    }
                  });
                }
              });
            });
          });
        }
        // 多選 跳題
        if (activeQuestion.uiType === 'mutiple') {
          this.questionnaireData.groups.forEach((group) => {
            group.subGroups.forEach((subGroup) => {
              subGroup.datas.forEach((question) => {
                // 先復原所有的跳題
                // 迴圈所有選項
                activeQuestion.options.forEach((option) => {
                  // 迴圈showQuestionNumbersArray
                  option.showQuestionNumbersArray.forEach((number) => {
                    // 跳題組
                    if (number.length && number.length === 1) {
                      if (question.questionNumber.slice(0, 1) === number) {
                        question.isShow = false;
                      }
                    }
                    // 跳題目
                    if (number.length && number.length !== 1) {
                      if (question.questionNumber === number) {
                        question.isShow = false;
                      }
                    }
                  });
                });

                // 處理跳題
                // 迴圈selected和options 找出selected裡包含哪些option
                // 將有包含的option showQuestionNumbersArray的題組或題目都處理
                activeQuestion.selected.forEach((value) => {
                  activeQuestion.options.forEach((option) => {
                    // 找出包含的option
                    if (value === option.value) {
                      option.showQuestionNumbersArray.forEach((number) => {
                        // 跳題組
                        if (number.length && number.length === 1) {
                          if (question.questionNumber.slice(0, 1) === number) {
                            question.isShow = true;
                            // 根據type給selected
                            question.selected =
                              question.uiType === 'fillIn'
                                ? ''
                                : question.uiType === 'single'
                                ? ''
                                : question.uiType === 'select'
                                ? ''
                                : question.uiType === 'mutiple'
                                ? []
                                : null;
                          }
                        }
                        // 跳題目
                        if (number.length && number.length !== 1) {
                          if (question.questionNumber === number) {
                            question.isShow = true;
                            // 根據type給selected
                            question.selected =
                              question.uiType === 'fillIn'
                                ? ''
                                : question.uiType === 'single'
                                ? ''
                                : question.uiType === 'select'
                                ? ''
                                : question.uiType === 'mutiple'
                                ? []
                                : null;
                          }
                        }

                        // if (question.questionNumber === number) {
                        //   question.isShow = true
                        //   // 根據type給selected
                        //   question.selected = question.uiType === 'fillIn' ? '' : question.uiType === 'single' ? '' : question.uiType === 'mutiple' ? [] : null
                        // }
                      });
                    }
                  });
                });
              });
            });
          });
        }

        // 將activeOption.showQuestionNumbersArray塞進question的prevShowQuestionNumbers
        // 找出這一筆問題 因為this.questionnaireData是prop來的 不能直接修改 所以賦值
        // object會傳址 所以也會一起改變this.questionnaireData
        const upDateQuestion = this.questionnaireData.groups[groupIndex].subGroups[subGroupIndex].datas[questionIndex];
        upDateQuestion.prevShowQuestionNumbers = activeOption.showQuestionNumbersArray;

        // 上面的程式只會處理【這一題】的跳題
        // 假設因為這一題而開啟的題目B 如果B又開啟了題目C 之後改這一題只會關閉題目B 不會關閉到題目C
        // 因此 判斷這一題的所有選項 是否有任一個showQuestionNumbersArray不為空
        let hasShowQuestionNumber = false;
        activeQuestion.options.forEach((option) => {
          // 有就變true
          if (option.showQuestionNumbersArray.length) {
            hasShowQuestionNumber = true;
          }
        });
        // 如果hasShowQuestionNumber是true 就調用closeNoShowQuestion
        // 傳的參數是調用closeNoShowQuestion的次數
        // 邏輯 上面的跳題程式 -> B被關閉 -> 這裡調用一次 -> C被關閉 -> 調用第二次 (以此類推)
        // 數字是寫死的 可以改動 但目前無法做到動態判斷次數
        if (hasShowQuestionNumber) {
          this.closeNoShowQuestion(3);
        }
      });
    },
    // 關閉isShow false的option showQuestionNumbersArray裡的題目
    closeNoShowQuestion(frequency) {
      const noShow = {
        groups: [],
        questions: []
      };
      // 找出所有isShow false的question 並把所有option showQuestionNumbersArray不為空的內容push
      this.questionnaireData.groups.forEach((group) => {
        group.subGroups.forEach((subGroup) => {
          subGroup.datas.forEach((question) => {
            // 找出isShow false
            if (!question.isShow) {
              question.options.forEach((option) => {
                // 找出選項有showQuestionNumbersArray的
                if (option.showQuestionNumbersArray.length) {
                  option.showQuestionNumbersArray.forEach((showQ) => {
                    // 群組
                    if (showQ.length === 1) {
                      // 如果已在noShow裡就不重複push
                      if (!noShow.groups.includes(showQ)) {
                        noShow.groups.push(showQ);
                      }
                    }
                    // 題目
                    if (showQ.length !== 1) {
                      // 如果已在noShow裡就不重複push
                      if (!noShow.questions.includes(showQ)) {
                        noShow.questions.push(showQ);
                      }
                    }
                  });
                }
              });
            }
          });
        });
      });
      // 關閉群組
      if (noShow.groups.length) {
        this.questionnaireData.groups.forEach((group) => {
          group.subGroups.forEach((subGroup) => {
            subGroup.datas.forEach((question) => {
              noShow.groups.forEach((number) => {
                // 找出questionNumber第一個字和它相同的
                if (question.questionNumber.slice(0, 1) === number) {
                  question.isShow = false;
                }
              });
            });
          });
        });
      }
      // 關閉題目
      if (noShow.questions.length) {
        this.questionnaireData.groups.forEach((group) => {
          group.subGroups.forEach((subGroup) => {
            subGroup.datas.forEach((question) => {
              noShow.questions.forEach((number) => {
                // 找出questionNumber和它相同的
                if (question.questionNumber === number) {
                  question.isShow = false;
                }
              });
            });
          });
        });
      }

      // 重複
      frequency -= 1;
      console.log('frequency', frequency);
      if (frequency > 0) {
        this.closeNoShowQuestion(frequency);
      }
    },
    // 處理雙層選單
    handleSelect(groupIndex, subGroupIndex, questionIndex, activeQuestion) {
      console.log('activeQuestion', activeQuestion);

      // 找出這一筆問題 因為this.questionnaireData是prop來的 不能直接修改 所以賦值
      // object會傳址 所以也會一起改變this.questionnaireData
      const upDateQuestion = this.questionnaireData.groups[groupIndex].subGroups[subGroupIndex].datas[questionIndex];
      // 清空原本的答案
      upDateQuestion.selected = '';

      // 篩選出符合的選項並裝入
      upDateQuestion.secondSelectList = activeQuestion.options.filter((option) => {
        return option.firstSelectLabel === activeQuestion.firstSelectSelectd;
      });
    },

    // handleJump(activeQuestion, activeOption) {
    //   console.log('activeQuestion', activeQuestion)
    //   console.log('activeOption', activeOption)

    //   // 單選和填寫 passNextQuestion
    //   // 填寫 selected不為空 才調用
    //   if (activeQuestion.uiType === 'single' && activeOption.showQuestionCalculateNumber.end || activeQuestion.uiType === 'fillIn' && activeOption.showQuestionCalculateNumber.end && activeQuestion.selected) {
    //     this.questionnaireData.groups.map(
    //       (group, index) => {
    //         const subGroups = group.subGroups.map((subGroup, ind) => {
    //           let datas = subGroup.datas.map((question, ind) => {
    //             // 先解開之前有被鎖起來的題目 (可能是選了其他選項而鎖起來)
    //             // 介於 現在題目+prevPassNextQuestionQuantity.start 到 現在題目+prevPassNextQuestionQuantity.end(含)之間的題目
    //             if (
    //               question.calculateNumber >= activeQuestion.prevShowQuestionCalculateNumber.start && question.calculateNumber <= activeQuestion.prevShowQuestionCalculateNumber.end
    //             ) {
    //               // 解鎖
    //               question.isShow = true
    //               // question.disabled = false
    //             }

    //             return question
    //           })

    //           // 更新question prevPassNextQuestionQuantity
    //           datas = subGroup.datas.map((question, ind) => {
    //             // 找出同一筆
    //             if (question.calculateNumber === activeQuestion.calculateNumber) {
    //               question.prevShowQuestionCalculateNumber.start = activeOption.showQuestionCalculateNumber.start
    //               question.prevShowQuestionCalculateNumber.end = activeOption.showQuestionCalculateNumber.end
    //             }

    //             return question
    //           })

    //           datas = subGroup.datas.map((question, ind) => {
    //             // 將題目鎖起來
    //             // 介於 現在題目+passNextQuestionQuantity.start 到 現在題目+passNextQuestionQuantity.end之間的題目
    //             if (
    //               question.calculateNumber >= activeOption.showQuestionCalculateNumber.start && question.calculateNumber <= activeOption.showQuestionCalculateNumber.end
    //             ) {
    //               // 被鎖的題目的option desc全部清空
    //               // const options = question.options.map((option) => {
    //               //   option.desc = ''

    //               //   return option
    //               // })

    //               // 裝入
    //               // clearQuestionArray.push(question)
    //               question.isShow = true
    //               // 根據type給selected
    //               question.selected = question.uiType === 'fillIn' ? '' : question.uiType === 'single' ? '' : question.uiType === 'mutiple' ? [] : null
    //               // 塞入新的options
    //               // question.options = options

    //             }

    //             return question
    //           })

    //           return { ...subGroup, datas }
    //         })

    //         return { ...group, subGroups }
    //       }
    //     )
    //   }
    //   // 判斷 passNextQuestionQuantity.end 來解鎖
    //   // 填寫如果selected為空 也解鎖
    //   if (activeQuestion.uiType === 'single' && !activeOption.showQuestionCalculateNumber.end || activeQuestion.uiType === 'fillIn' && !activeOption.showQuestionCalculateNumber.end || activeQuestion.uiType === 'fillIn' && !activeQuestion.selected) {
    //     this.questionnaireData.groups.map(
    //       (group, index) => {
    //         const subGroups = group.subGroups.map((subGroup, ind) => {
    //           const datas = subGroup.datas.map((question, ind) => {
    //             // 解開被鎖起來的題目 (可能是選了其他選項而鎖起來)
    //             // 介於 現在題目+prevPassNextQuestionQuantity.start 到 現在題目+prevPassNextQuestionQuantity.end(含)之間的題目
    //             if (
    //               question.calculateNumber >= activeQuestion.prevShowQuestionCalculateNumber.start &&
    //               question.calculateNumber <= activeQuestion.prevShowQuestionCalculateNumber.end
    //             ) {
    //               // question.prevPassNextQuestionQuantity.start = activeOption.passNextQuestionQuantity.start
    //               // question.prevPassNextQuestionQuantity.end = activeOption.passNextQuestionQuantity.end
    //               // 解鎖
    //               question.isShow = false
    //             }

    //             return question
    //           })

    //           return { ...subGroup, datas }
    //         })

    //         return { ...group, subGroups }
    //       }
    //     )
    //   }
    //   // 多選 passNextQuestion
    //   if (activeQuestion.uiType === 'mutiple') {
    //     this.questionnaireData.groups.map(
    //       (group, index) => {
    //         const subGroups = group.subGroups.map((subGroup, ind) => {
    //           let datas = subGroup.datas.map((question, ind) => {
    //             // 先解開所有option passNextQuestionQuantity的題目
    //             // 迴圈解開
    //             activeQuestion.options.forEach((option, optionIndex) => {
    //               if (
    //                 question.calculateNumber >= option.showQuestionCalculateNumber.start &&
    //                 question.calculateNumber <= option.showQuestionCalculateNumber.end
    //               ) {
    //                 // 解鎖
    //                 question.isShow = false
    //               }
    //             })

    //             return question
    //           })

    //           datas = subGroup.datas.map((question, ind) => {
    //             // 將題目鎖起來
    //             // 迴圈selected和options 找出selected裡包含哪些option
    //             // 將有包含的option passNextQuestionQuantity題目都鎖起來
    //             activeQuestion.selected.forEach((value, valueIndex) => {
    //               activeQuestion.options.forEach((option, optionIndex) => {
    //                 if (value === option.value) {
    //                   if (
    //                     question.calculateNumber >= option.showQuestionCalculateNumber.start &&
    //                     question.calculateNumber <= option.showQuestionCalculateNumber.end
    //                   ) {
    //                     // 被鎖的題目的option desc全部清空
    //                     // const options = question.options.map((option) => {
    //                     //   option.desc = ''

    //                     //   return option
    //                     // })

    //                     // 裝入
    //                     // clearQuestionArray.push(question)
    //                     question.isShow = true
    //                     // 根據type給selected
    //                     question.selected = question.uiType === 'fillIn' ? '' : question.uiType === 'single' ? '' : question.uiType === 'mutiple' ? [] : null
    //                     // 塞入新的options
    //                     // question.options = options

    //                   }
    //                 }
    //               })
    //             })

    //             return question
    //           })

    //           return { ...subGroup, datas }
    //         })

    //         return { ...group, subGroups }
    //       }
    //     )
    //   }

    //   // call clearDisabled
    //   // this.clearDisabled(clearQuestionArray)
    // },
    // 控制desc
    // handleDesc(activeQuestion, activeOption) {
    //   // 多選
    //   if (activeQuestion.uiType === 'mutiple') {
    //     this.questionnaireData.groups.map(
    //       (group, index) => {
    //         const subGroups = group.subGroups.map((subGroup, ind) => {
    //           const datas = subGroup.datas.map((question, ind) => {
    //             // 找出這一筆題目
    //             if (activeQuestion.calculateNumber === question.calculateNumber) {
    //               // 如果沒辦勾選 就清除input
    //               const options = question.options.map((option, i) => {
    //                 // 找出value並判斷是否有包含在selected裡面
    //                 // activeOption.value === option.value 一定要寫 否則會改變到這題全部的input
    //                 if (
    //                   activeOption.value === option.value &&
    //                   !activeQuestion.selected.includes(activeOption.value)
    //                 ) {
    //                   option.desc = ''

    //                   // return { ...option, desc: '' }
    //                 }

    //                 return option
    //               })

    //               question.options = options

    //               // return { ...question, options }
    //             }

    //             return question
    //           })

    //           subGroup.datas = datas

    //           return subGroup
    //           // return { ...subGroup, datas }
    //         })

    //         group.subGroups = subGroups

    //         return group
    //         // return { ...group, subGroups }
    //       }
    //     )
    //   }
    //   // 單選
    //   if (activeQuestion.uiType === 'single') {
    //     this.questionnaireData.groups.map(
    //       (group, index) => {
    //         const subGroups = group.subGroups.map((subGroup, ind) => {
    //           const datas = subGroup.datas.map((question, ind) => {
    //             // 找出這一筆題目
    //             if (activeQuestion.calculateNumber === question.calculateNumber) {
    //               const options = question.options.map((option, i) => {
    //                 // 找出value不同的
    //                 if (activeOption.value !== option.value) {
    //                   option.desc = ''
    //                 }

    //                 return option
    //               })

    //               // activeQuestion.selected 會是'' 這邊要自己加上去
    //               // 不加的話 selected不改變 disabled也不會解開
    //               question.selected = activeOption.value
    //               question.options = options
    //             }

    //             return question
    //           })

    //           subGroup.datas = datas

    //           return subGroup
    //           // return { ...subGroup, datas }
    //         })

    //         group.subGroups = subGroups

    //         return group
    //         // return { ...group, subGroups }
    //       }
    //     )
    //   }
    //   // console.log(activeQuestion, activeOption)
    // },
    // 鎖題目時 把底下被鎖的題目的跳題題目和passNextQuestion之間的題目都解鎖 (目前未用到)
    // clearDisabled(clearQuestionArray) {
    //   // 迴圈array
    //   clearQuestionArray.forEach((activeQuestion) => {
    //     // 解鎖jump
    //     if (activeQuestion.jump.jumpGroup) {
    //       let jumpQuestion = this.questionnaireData.groups.filter(
    //         (item, index) => {
    //           return activeQuestion.jump.jumpGroup === item.groupName
    //         }
    //       )

    //       jumpQuestion = jumpQuestion[0].subGroups.filter((item, index) => {
    //         return activeQuestion.jump.jumpSubGroup === item.index
    //       })
    //       jumpQuestion = jumpQuestion[0].datas.filter((item, index) => {
    //         return activeQuestion.jump.jumpQuestionIndex === item.index
    //       })

    //       // 單選
    //       if (activeQuestion.uiType === 'single') {
    //         this.questionnaireData.groups.map(
    //           (group, index) => {
    //             const subGroups = group.subGroups.map((subGroup, ind) => {
    //               const datas = subGroup.datas.map((question, ind) => {
    //                 // 將disabled: false 解鎖
    //                 if (
    //                   question.calculateNumber > activeQuestion.calculateNumber &&
    //                   question.calculateNumber < jumpQuestion[0].calculateNumber
    //                 ) {
    //                   return { ...question, disabled: false }
    //                 } else {
    //                   return question
    //                 }
    //               })

    //               return { ...subGroup, datas }
    //             })

    //             return { ...group, subGroups }
    //           }
    //         )
    //       }

    //       // 多選
    //       if (activeQuestion.uiType === 'mutiple') {
    //         this.questionnaireData.groups.map(
    //           (group, index) => {
    //             const subGroups = group.subGroups.map((subGroup, ind) => {
    //               const datas = subGroup.datas.map((question, ind) => {
    //                 // 將disabled: false 解鎖
    //                 if (
    //                   question.calculateNumber > activeQuestion.calculateNumber &&
    //                   question.calculateNumber < jumpQuestion[0].calculateNumber
    //                 ) {
    //                   const options = question.options.map((option) => {
    //                     return { ...option, desc: '' }
    //                   })

    //                   return {
    //                     ...question,
    //                     disabled: false,
    //                     selected:
    //                       question.uiType === 'fillIn'
    //                         ? ''
    //                         : question.uiType === 'single'
    //                           ? null
    //                           : question.uiType === 'mutiple'
    //                             ? []
    //                             : null,
    //                     options
    //                   }
    //                 } else {
    //                   return question
    //                 }
    //               })

    //               return { ...subGroup, datas }
    //             })

    //             return { ...group, subGroups }
    //           }
    //         )

    //         return
    //       }

    //       // 填寫
    //       if (activeQuestion.uiType === 'fillIn') {
    //         this.questionnaireData.groups.map(
    //           (group, index) => {
    //             const subGroups = group.subGroups.map((subGroup, ind) => {
    //               const datas = subGroup.datas.map((question, ind) => {
    //                 // 將disabled: false 解鎖
    //                 if (
    //                   question.calculateNumber > activeQuestion.calculateNumber &&
    //                   question.calculateNumber < jumpQuestion[0].calculateNumber
    //                 ) {
    //                   return { ...question, disabled: false }
    //                 } else {
    //                   return question
    //                 }
    //               })

    //               return { ...subGroup, datas }
    //             })

    //             return { ...group, subGroups }
    //           }
    //         )
    //       }
    //     }
    //     // 解鎖passNextQuestion
    //     this.questionnaireData.groups.map(
    //       (group, index) => {
    //         const subGroups = group.subGroups.map((subGroup, ind) => {
    //           const datas = subGroup.datas.map((question, ind) => {
    //             // 解開被鎖起來的題目
    //             // 介於 現在題目+prevPassNextQuestionQuantity.start 到 現在題目+prevPassNextQuestionQuantity.end之間的題目
    //             if (
    //               question.calculateNumber >
    //               activeQuestion.calculateNumber +
    //               question.prevPassNextQuestionQuantity.start &&
    //               question.calculateNumber <=
    //               activeQuestion.calculateNumber +
    //               question.prevPassNextQuestionQuantity.end
    //             ) {
    //               return {
    //                 ...question,
    //                 disabled: false,
    //                 selected:
    //                   question.uiType === 'fillIn'
    //                     ? ''
    //                     : question.uiType === 'single'
    //                       ? null
    //                       : question.uiType === 'mutiple'
    //                         ? []
    //                         : null
    //               }
    //             } else {
    //               return question
    //             }
    //           })

    //           return { ...subGroup, datas }
    //         })

    //         return { ...group, subGroups }
    //       }
    //     )
    //   })
    // },
    showPage(page) {
      this.currentPage = page;
      this.subCurrentPage = 1;
      this.backTop();
    },
    showSubPage(page) {
      this.subCurrentPage = page;
      this.backTop();
    },
    backTop() {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;

        if (pos > 0) {
          window.scrollTo(0, pos - 200); // 每一次滾動多遠
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 2);
    }
  }
};
</script>
