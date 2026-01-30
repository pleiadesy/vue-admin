<script setup>
  import {watch, onMounted, onUnmounted, ref} from 'vue'
  import * as echarts from 'echarts'
  import { getEchartsDataApi } from '@/api/home'

  const chartContainer = ref(null)
  let chartInstance = null

  // 折线图数据
  const lineChartData = ref({
    date: [],
    data: []
  })
  const getEchartsData = async () => {
    const res = await getEchartsDataApi()
    lineChartData.value = res.data.data.orderData
  }

  // 绘制折线图
  const drawLineChart = () => {
    if(!chartContainer.value) {
      return // DOM元素未准备好时直接返回
    }
    if(!chartInstance) {
      chartInstance = echarts.init(chartContainer.value)
    }

    // echarts配置项
    const seriesData = lineChartData.value.data

    if (!seriesData || seriesData.length === 0) {
      // 如果没有数据，清空图表或显示无数据提示
      chartInstance.setOption({ series: [], legend: { data: [] } });
      return
    }

    // 获取所有产品名称
    const productNames = Object.keys(seriesData[0]);

    // 根据产品名称生成 series 数组
    const series = productNames.map(productName => {
      return {
        name: productName,
        type: 'line',
        data: seriesData.map(item => item[productName]), // 提取每个产品在不同时间点的数据
      };
    });

    // 更新 legend.data
    const legendData = productNames;

    const option = {
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {
        data: legendData, // 使用生成的产品名称作为图例
        top: 'bottom'
      },
      grid: {
        left: "8%",
        right: "8%", // 增加右边距，防止图例遮挡
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: lineChartData.value.date, // X轴数据
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
      series: series // 使用生成的 series 数组
    }
    // 使用配置项显示图表
    chartInstance.setOption(option)
  }

  onMounted(() => {
    // 挂载时获取折线图数据
    getEchartsData()

    // 监听lineChartData
    watch(lineChartData, () => {
      // lineChartData发生变化时重新绘制折线图
      drawLineChart()
    }, {deep: true, immediate: true})
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      chartInstance?.resize()
    })
  })

  // 组件卸载前销毁echarts实例
  onUnmounted(() => {
    chartInstance?.dispose()
    window.removeEventListener('resize', () => {
      chartInstance?.resize()
    })
  })
</script>

<template>
  <div ref="chartContainer" style="height: 290px; width: 100%;"></div>
</template>
