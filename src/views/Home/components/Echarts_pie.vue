<script setup>
  import {onUnmounted, watch, onMounted, ref } from 'vue'
  import { getEchartsDataApi } from '@/api/home'
  import * as echarts from 'echarts'

  const chartContainer = ref(null)
  let chartInstance = null

  // 饼状图数据
  const pieChartData = ref([])
  const getPieChartData = async () => {
    const res = await getEchartsDataApi()
    pieChartData.value = res.data.data.videoData
  }

  // 绘制饼状图
  const drawPieChart = () => {
    if(!chartContainer.value) {
      return // DOM元素未准备好  直接退出
    }
    if(!chartInstance) {
      chartInstance = echarts.init(chartContainer.value) // echart实例若未被创建，则创建实例
    }

    // echarts配置
    const series = [
      {
        type: 'pie',
        radius: '70%', // 饼图的半径
        center: ['50%', '40%'], // 饼图的中心（圆心）坐标
        data: pieChartData.value, // 直接使用获取到的数据
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {},
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: series
    }
    chartInstance.setOption(option)
  }

  onMounted(() => {
    getPieChartData()

    // 监听barChartData，发生改变时重新绘制柱状图
    watch(pieChartData, () => {
      drawPieChart()
    }, {deep: true, immediate: true})

    // 监听窗口大小变化，发生改变时柱状图随之改变
    window.addEventListener('resize', () => {
      chartInstance?.resize()
    })
  })

  // 组件卸载前销毁实例
  onUnmounted(() => {
    chartInstance?.dispose()
    window.removeEventListener('resize', () => {
      chartInstance?.resize()
    })
  })
</script>

<template>
  <div ref="chartContainer" style="height: 240px;"></div>
</template>
