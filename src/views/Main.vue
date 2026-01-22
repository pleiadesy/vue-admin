<script setup>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
</script>

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 自定义左侧组件 -->
       <common-aside></common-aside>
      <!-- 右侧部分 -->
       <el-container>
        <el-header class="el-header">
          <common-header></common-header>
        </el-header>
        <el-main class="right-main">
          main
        </el-main>
       </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
  .common-layout {
    height: 100%;
    & > .lay-container {
      height: 100%;
      & > .el-container {
        height: 100%;
      }
    }
  }
  .el-header {
    background-color: #333;
    padding: 0;
  }
</style>
