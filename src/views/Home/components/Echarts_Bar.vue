<script setup>
  import {watch, onMounted, onUnmounted, ref } from 'vue'
  import { getEchartsDataApi } from '@/api/home';
  import * as echarts from 'echarts'

  const chartContainer = ref(null)
  let chartInstance = null

  // 柱状图数据
  const barChartData = ref([])
  const getBarChartData = async () => {
    const res = await getEchartsDataApi()
    barChartData.value = res.data.data.userData
  }

  // 绘制柱状图
  const drawBarChart = () => {
    if(!chartContainer.value) {
      return  // DOM元素未准备好时直接返回
    }
    if(!chartInstance) {
      chartInstance = echarts.init(chartContainer.value)
    }

    // echarts配置项
    const xAxisData = barChartData.value.map(item => item.date)
    const series = [
      {
        name: '新增用户',
        data: barChartData.value.map(item => item.new),
        type: 'bar'
      },
      {
        name: '活跃用户',
        data: barChartData.value.map(item => item.active),
        type: 'bar'
      }
    ]
    const option = {
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {
        data: ['新增用户', '活跃用户']
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: series
    }
    // 使用配置显示柱状图
    chartInstance.setOption(option)
  }

  onMounted(() => {
    // 挂载时获取柱状图数据
    getBarChartData()

    // 监听barChartData，发生改变时重新绘制柱状图
    watch(barChartData, () => {
      drawBarChart()
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
