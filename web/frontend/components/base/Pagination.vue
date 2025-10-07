<template>
  <div class="text-center my-5">
    <v-pagination v-model="_currentPage" :length="totalPage" :total-visible="totalVisible" :color="color" @input="showPage"></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 0
    },
    totalVisible: {
      type: Number,
      default: 7
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    _currentPage: {
      get() {
        return this.currentPage;
      },
      set() {
        return this.currentPage;
      }
    }
  },
  methods: {
    showPage(page) {
      this.$emit('changePage', page);
    }
  }
};
</script>
