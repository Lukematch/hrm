<template>
  <span>
    @2024
    <a-button
    class="design" type="link"
    @click="()=>{
      open = true
    }"
    >Design</a-button>
    by
    <a href="https://github.com/Lukematch" target="_blank">Lukematch</a>
    <About/>
  </span>
</template>

<script setup lang='ts'>
import { useStore } from '@/store/openModal/index.ts';
import { storeToRefs } from 'pinia'
// import { onMounted } from 'vue'
import About from '@/components/About/index.vue'

const store = useStore()
const { open } = storeToRefs(store)

// onMounted(() => {
//   console.log(open.value);
// })
</script>
  
<style scoped>

a{
  text-decoration: none;
  outline: none;
  color: #000;
}
a:hover{
  color: orange;
}
.design{
  margin-left: -10px;
  margin-right: -15px;
  text-decoration: none;
  outline: none;
  color: #000;
  font-weight: 200;
}
</style>