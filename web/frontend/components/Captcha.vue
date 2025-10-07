<template>
  <v-col cols="6" class="d-flex justify-center align-center">
    <canvas ref="captcha" :style="{ border: '1px solid black' }" width="150" height="40"></canvas>
    <v-btn icon data-cy="change-captcha" @click="createCaptcha">
      <v-icon> mdi-refresh </v-icon>
    </v-btn>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      captchaCode: []
    };
  },
  mounted() {
    this.createCaptcha();
  },
  methods: {
    // 圖形驗證碼
    createCaptcha() {
      const captcha = this.$refs.captcha;
      const ctx = captcha.getContext('2d');
      // 清空畫布
      ctx.clearRect(0, 0, 150, 40);
      //  清空原本的驗證碼
      this.captchaCode = [];
      // 驗證碼內容
      // const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const str = '0123456789';
      // cypress 測試用
      // const cypressStr = 'ABCDEF'
      let position = 0;
      // 驗證碼位置 (單個英文或數字)
      let x, y;
      let fontSize = 0;
      ctx.beginPath();
      // 驗證碼共6位數
      for (let i = 0; i < 6; i++) {
        // 每個英文或數字的位置
        x = 20 + i * 22;
        y = 20 + Math.ceil(Math.random() * 20);
        // 每個英文或數字的大小
        fontSize = 10 + Math.ceil(Math.random() * 20);
        // 字形
        ctx.font = 'bold ' + fontSize + 'px Arial';
        // 顏色
        ctx.fillStyle = this.rc(80, 150);
        // str.length 代表str裡面總共的數量
        position = Math.ceil(Math.random() * 1000) % str.length;
        ctx.fillText(str.substr(position, 1), x, y, 150);
        // 把驗證碼塞到captchaCode
        this.captchaCode.push(str.substr(position, 1));

        // cypress 測試用 (正式要打開上面2行程式碼)
        // ctx.fillText(cypressStr[i], x, y, 150)
        // cypress 測試用 (正式要打開上面2行程式碼)
        // this.captchaCode.push(cypressStr[i])
      }
      // 把驗證碼轉成字串
      this.captchaCode = this.captchaCode.join('');
      // 傳回父層
      this.$emit('getCaptchaCode', this.captchaCode);
      // 干擾小球
      for (let i = 0; i <= 40; i++) {
        ctx.beginPath();
        ctx.arc(this.rn(0, 150), this.rn(0, 40), 1, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.rc(150, 200);
        ctx.fill();
      }
    },
    // 生成隨機數
    rn(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成隨機色
    rc(min, max) {
      return `rgb(${this.rn(min, max)},${this.rn(min, max)},${this.rn(min, max)})`;
    }
  }
};
</script>
