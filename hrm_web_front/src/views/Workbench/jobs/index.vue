<template>
  <a-row class="container">
    <Jobs />
  </a-row>
  <a-row class="table">
    <a-card
    title="工作项考核" class="card">
      <a-table/>
    </a-card>
  </a-row>
</template>
  
<script setup lang='ts'>
import Jobs from '@/components/Jobs/index.vue';
</script>
  
<style scoped>
  
.container {
  /* width: 100%; */
  padding: 20px;
  display: flex;
  justify-content: center;
}
.table {
  padding: 20px;
  display: flex;
  justify-content: center;
  .card {
    height: 350px;
    width: 90%;
  }
}
</style>