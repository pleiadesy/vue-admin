<script setup>
import {ref} from 'vue'

import { getTableDataApi } from '@/api/home'

//  动态获取图片地址
const getAvatorUrl = (name) => {
  return new URL(`../../assets/images/${name}.png`, import.meta.url).href
}

// 表单数据
const tableData = ref([])
const getTableData = async () => {
  const res = await getTableDataApi()
  // console.log(res)
  tableData.value = res.data.data.tableData
}
getTableData()

// 表单标签
const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})
</script>

<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" margin-top="20px">
      <!-- 左上方用户信息 -->
      <el-card shadow="hover">
        <div class="user">
          <img class="user-avator" :src="getAvatorUrl('user')" alt="">
          <div class="user-info">
            <p style="font-size: 30px;">Admin</p>
            <p style="color: #999;">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p><span>上次登录时间:</span><span>2025/12/31</span></p>
          <p><span>登录地址:</span><span>云南曲靖</span></p>
        </div>
      </el-card>
      <el-card class="table" shadow="hover">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" :label="tableLabel.name" />
          <el-table-column prop="todayBuy" :label="tableLabel.todayBuy" />
          <el-table-column prop="monthBuy" :label="tableLabel.monthBuy" />
          <el-table-column prop="totalBuy" :label="tableLabel.totalBuy" />
        </el-table>
      </el-card>
    </el-col>
  </el-row>

</template>

<style lang="less" scoped>
.home {
  height: 100%;
  overflow: hidden;
  .user {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info {
      p {
        line-height: 15px;
      }
    }
  }
  .login-info {
    border-top: 1px solid #ccc;
    p {
      line-height: 30px;
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      span {
        color: black;
        &:first-child {
          color: #999;
          width: 120px; /* 给前面的文字设置固定宽度，确保对齐 */
        }
      }
    }
  }

  .table {
    margin-top: 20px;
  }
}
</style>
