<script setup>
import {ref} from 'vue'
import { getTableDataApi, getCountDataApi } from '@/api/home'
import LineChart from './components/Echarts_Line.vue'
import BarChart from './components/Echarts_Bar.vue'
import PieChart from './components/Echarts_pie.vue'

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
    name: "品牌",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})

// 卡片内容数据
const countData = ref([])
const getCountData = async () => {
  const res = await getCountDataApi()
  // console.log(res)
  countData.value = res.data.data
}
getCountData()

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
      <!-- 左下方表格数据 -->
      <el-card class="table" shadow="hover">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" :label="tableLabel.name" />
          <el-table-column prop="todayBuy" :label="tableLabel.todayBuy" />
          <el-table-column prop="monthBuy" :label="tableLabel.monthBuy" />
          <el-table-column prop="totalBuy" :label="tableLabel.totalBuy" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" margin-top="20px">
      <!-- 右上方数量卡片 -->
       <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name">
          <component class="icons" :is="item.icon" :style="{background: item.color }"></component>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
       </div>
       <!-- 右下方Echarts图表 -->
        <el-card class="lineChart">
          <LineChart></LineChart>
        </el-card>
        <!-- 柱状图与饼状图 -->
         <div class="graph">
          <el-card>
            <BarChart></BarChart>
          </el-card>
          <el-card>
            <PieChart></PieChart>
          </el-card>
         </div>
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

  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
      background-color: #f7f7f7;
      border: none;
      :deep(.el-card__body) {
        display: flex;
        align-items: center;
        padding: 16px 20px;
      }
    }
    .icons {
      width: 70px;
      height: 70px;
      font-size: 30px;
      text-align: center;
      line-height: 70px;
      color: #fff;
      border-radius: 50%;
      margin-right: 20px;
    }
    .detail {
        text-align: left;
        .num {
          font-size: 26px;
          margin-bottom: 5px;
        }
        .text {
          font-size: 13px;
        }
      }
  }

  .graph {
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
      height: 260px;
    }
  }
}
</style>
