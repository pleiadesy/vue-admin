<script setup>
import {ref} from 'vue'
import { loginApi } from "@/api/login";
import { useAsideMenuStore } from '@/stores/AsideMenu';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter()

const asideMenuStore = useAsideMenuStore()
const userStore = useUserStore()

const loginForm = ref({
  username: '',
  password: ''
})

// 登录逻辑
const handleLogin = async () => {
  const res = await loginApi(loginForm.value)
  // console.log(res)
  // 保存token
  userStore.setToken(res.data.data.token)
  // 调用方法更新侧边栏数据
  asideMenuStore.updateMenuList(res.data.data.menuList)
  ElMessage.success('登录成功')
  router.push('/home')
}

</script>

<template>
  <div class="login">
    <el-form class="login-container" :model="loginForm" label-width="70px">
      <h3>欢迎登录</h3>
      <el-form-item label="用户名:">
        <el-input type="input" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item class="login-button-container">
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/images/background.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
.login-container {
  border-radius: 16px;
  width: 380px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  padding: 24px 32px 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  margin: 0 24px;

  .el-form-item {
    margin-bottom: 20px;
  }

  h3 {
    text-align: center;
    margin-top: 0px;
    margin-bottom: 20px;
    color: #505450;
    font-size: 21px;
    font-weight: 500;
  }

  .login-button-container {
    margin-top: 10px;
    margin-bottom: 0;

    :deep(.el-form-item__content) {
      margin-left: 0 !important;
      display: flex;
      justify-content: center;
    }

    .el-button {
      width: 100px;
    }
  }

  .el-input {
    width: 100%;
  }
}
</style>
