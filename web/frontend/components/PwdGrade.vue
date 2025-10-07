<template>
  <div class="d-flex align-center">
    <span>密碼強度</span>
    <div
      :style="{
        width: '50px',
        height: '10px',
        border: '1px solid gray',
        backgroundColor: pwdGradeText === '弱' ? 'red' : pwdGradeText === '中' ? 'orange' : pwdGradeText === '強' ? 'green' : ''
      }"
      class="ml-3"
    ></div>
    <div
      :style="{
        width: '50px',
        height: '10px',
        border: '1px solid gray',
        backgroundColor: pwdGradeText === '中' ? 'orange' : pwdGradeText === '強' ? 'green' : ''
      }"
    ></div>
    <div :style="{ width: '50px', height: '10px', border: '1px solid gray', backgroundColor: pwdGradeText === '強' ? 'green' : '' }"></div>
    <span class="d-flex align-center ml-2 text-12">{{ pwdGradeText }}</span>
  </div>
</template>

<script>
export default {
  name: 'PwdGrade',
  props: {
    pwd: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pwdGradeText: ''
    };
  },
  watch: {
    pwd() {
      this.pwdGradeCheck();
    }
  },
  mounted() {},
  methods: {
    // 密碼強度判斷
    pwdGradeCheck() {
      // 用套件zxcvbn來判斷 四捨五入guesses_log10
      const pwdGradeValue = Math.round(this.$zxcvbn(this.pwd).guesses_log10);
      // 0~4 5~8 9~
      if (pwdGradeValue <= 4) {
        this.pwdGradeText = '弱';
      }
      if (pwdGradeValue >= 5 && pwdGradeValue <= 8) {
        this.pwdGradeText = '中';
      }
      if (pwdGradeValue >= 9) {
        this.pwdGradeText = '強';
      }
    }
  }
};
</script>
