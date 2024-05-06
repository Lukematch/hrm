<template>
  <div
  class="container">
  <a-dropdown class="dropdown">
    <template #overlay>
      <a-menu @click="handleMenuClick($event)">
        <a-menu-item key="1">
          修改密码
        </a-menu-item>
        <a-menu-item key="2">
          退出系统
        </a-menu-item>
      </a-menu>
    </template>
    <a-button>
      管理员 {{ superUser.name }}
      <DownOutlined />
    </a-button>
  </a-dropdown>
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
      <!-- <a-form-item label="管理员描述">
        <a-textarea />
      </a-form-item> -->
    </a-form>
  </a-modal>
</template>

<script setup lang='ts'>
import { message } from 'ant-design-vue';
import { ref } from 'vue';
// import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const open = ref(false);


const superUserJson:any = localStorage.getItem("superUser")
const superUser = JSON.parse(superUserJson)
// onMounted(() => {
//   console.log(superUser.value.name);
// })

const handleMenuClick = (e: any) => {
  console.log(e);
  switch(e.key){
    case '1':
      open.value = true
      break
    case '2':
      message.success('退出成功')
      router.push('/login')
      break
    default:
      message.error('未知错误')
      break
  }
}


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