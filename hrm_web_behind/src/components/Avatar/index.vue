<template>
  <div
  @click="open = true"
  class="container">
    <span>管理员：{{ superUser.name }}</span>&nbsp;
    <a-avatar
    shape="square"
    class="avatar"
    fit="fill"
    :size="45"
    src="/hrm.png"
    ></a-avatar>
  </div>
  <a-modal
  :open="open"
  @ok=""
  @cancel="open = false"
  okText="提交修改"
  style=" "
  width="600px"
  >
    <a-form
    class="form"
    style="margin-top: 40px;"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 16 }">
      <a-form-item label="管理员名称">
        <a-input />
      </a-form-item>
      <a-form-item label="管理员密码">
        <a-input />
      </a-form-item>
      <a-form-item label="管理员头像">
        <a-input />
      </a-form-item>
      <a-form-item label="管理员描述">
        <a-textarea />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
// import { onMounted } from 'vue'

const open = ref(false);

const superUserJson:any = localStorage.getItem("superUser")
const superUser = JSON.parse(superUserJson)
// onMounted(() => {
//   console.log(superUser.value.name);
// })



</script>

<style scoped>
.container{
  cursor: pointer;
  span{
    font-size: 15px;
    font-weight: 300;
    margin-right: 10px;
    border-bottom: 1px rgb(104, 167, 204) solid;
  }
  span:hover{
    color: #16c8c8;
  }
  .avatar{
    margin-right: 0;
  }
}
</style>