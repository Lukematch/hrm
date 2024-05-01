<template>
<div class="login-box">
    <a-card bordered  class="box-card">
      <h2>HRM前台</h2>
      <a-form
      label-width="5px"
      class="a-form"
      :model="formState"
      :rules="rules"
      @finish="onFinish"
      >
        <a-form-item
        name="user"
        >
          <a-input
          v-model:value="formState.user"
          placeholder="请输入工号"
          style="height: 40px;"
          >
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
        name="password"
        >
          <a-input-password
          v-model:value="formState.password"
          placeholder="请输入密码"
          style="height: 40px;"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item
        name="verifyCode"
        >
          <a-input
          v-model:value="formState.verifyCode"
          placeholder="请输入验证码"
          class="verifyCodeInput"
          style="height: 40px;margin-right: 5px"
          >
            <template #prefix>
              <KeyOutlined style="color: rgba(0, 0, 0, 0.25)"/>
            </template>
          </a-input>
          <img
          class="verifyCodeImgUrl"
          :src="verifyCodeList.verifyCodeImgUrl"
          @click="resetImg()"
          />
        </a-form-item>
        <a-button
        type="primary"
        style="width: 100%;height: 40px;opacity:0.9;"
        html-type="submit"
        >
        登录
      </a-button>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { UserOutlined, LockOutlined , KeyOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import type { FormState , VerifyCodeList , VerifyCodeState } from './type';

import axios from 'axios';
import { emLogin } from '@/utils/api.ts';
import { employeeStore } from '@/store/employee/index.ts';

const router = useRouter();
const formState = ref<FormState>({
  user: '',
  password: '',
  verifyCode: ''
});
const verifyCodeList = ref<VerifyCodeList>({
  verifyCodeImgUrl: '',
  verifyCode: '',
  verifyCodeBase64: null,
  whRatio: ''
});

// 获取验证码 数据
const getverifyCode = async() => {
  await axios({
    url:'https://www.mxnzp.com/api/verifycode/code',
      params:{
        len:4,
        type:0,
        app_id:'xvqopyqkqb1vnusl',
        app_secret:'mlACdkAAIYaezcdM2gJGOvErsbmKL0u1'
      }
  }).then(res => {
    const { data } = <VerifyCodeState>res.data;
    // console.log( res.data );
    verifyCodeList.value = data
  }).catch(err => {
    console.log(err);
  });
}
// 点击验证码图片 重新请求新的验证码
const resetImg = async() => {
  setTimeout(()=>{
    getverifyCode()
  },100)
}
getverifyCode()

// 验证码校验
const validaVerifyCode = async (_rule: any, value: string) => {
  // console.log(value);
  if (value.toLowerCase() !== verifyCodeList.value.verifyCode.toLowerCase()) {
    return Promise.reject('验证码输入错误');
  }else {
    // console.log('true');
    return Promise.resolve();
  }
};
// 表单规则自定义校验
const rules:any = {
  user: [
    { required: true, message: '请输入工号!', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码!',trigger: 'change' }
  ],
  verifyCode: [
    { required: true, message: '请输入验证码!',trigger: 'change' },
    { validator: validaVerifyCode, trigger: 'blur' }
  ]
}
// 登录 JWT校验 跳转页面
const onFinish  = async (value:FormState)=>{
  const { user, password } = value
  const data = await emLogin(Number(user), password)
  if(data.data.code === 600){
    message.error(data.data.msg)
  }
  else if(data.data.code === 200){
    if(data.data.data.token && value.verifyCode.toLowerCase() === verifyCodeList.value.verifyCode.toLowerCase()){
      let store = employeeStore()
      if(!localStorage.getItem('token')){
        localStorage.setItem('token', data.data.data.token)
        store.getUserList(Number(value.user)).then((user)=>{
          // console.log(user);
          localStorage.setItem('user', JSON.stringify(user))
        })
        const expire = 3600000;
        setTimeout(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          message.warning('登录已过期，请重新登录！')
          router.push('/login')
        }, expire)
        message.success('欢迎登录！')
        router.push('/home')
      } else if(localStorage.getItem('token') && user === JSON.parse(localStorage.getItem('user')!).e_id){
        message.warning('您已登录，请勿重复登录！')
        router.push('/home')
      } else {
        message.warning('token错误，请重新登录！')
        localStorage.clear()
        // router.push('/login')
      }
    }
  }
}

</script>

<style scoped>
.login-box {
    height: 100vh;
    background-color: rgb(220, 239, 245);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}
.box-card {
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 350px;
  opacity: 0.9;
}
.a-form {
  margin-left: 30px;
  margin-right: 40px;
  margin-top: 30px;
}
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .a-button{
    width: 285px;
    margin-top: 5px;
    margin-left: 5px;
  }
  .verifyCodeInput {
    width: 126px;
    right: 76px;
  }
  .verifyCodeImgUrl {
    cursor:pointer;
    width: 150px;
    height: 40px;
    right: 1px;
    margin-left:5px;
    position: absolute;
  }

</style>