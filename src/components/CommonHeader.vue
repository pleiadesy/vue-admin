<script setup>
  // import { ref } from 'vue'
  // 动态获取头像图片
  const getAvatorURl = (name) => {
    return new URL(`../assets/images/${name}.png`, import.meta.url).href
  }
</script>

<template>
  <div class="header">
    <div class="l-content">
      <el-button size="small">
        <component class="icons" :is="'Menu'"></component>
      </el-button>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getAvatorURl('user')" class="avator">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #333;
    padding: 0 10px;
  }
  .icons {
    width: 20px;
    height: 20px;
  }
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .r-content {
    margin-right: 20px;
    .avator {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  :deep(.breadcrumb span) {
    color: #fff !important;
    cursor: pointer !important;
  }
</style>
