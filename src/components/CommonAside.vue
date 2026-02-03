<script setup>
import { computed, ref } from 'vue'
import { useAsideMenuStore } from '@/stores/AsideMenu'
import { useTagStore } from '@/stores/tag'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
// 页面左侧菜单数据
const list =ref([
      	{
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'house',
          url: 'Home'
      	},
        {
            path: '/goods',
            name: 'goods',
            label: '商品管理',
            icon: 'video-play',
            url: 'Goods'
        },
        {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'User'
        },
        {
            path: 'other',
            label: '其他',
            icon: 'location',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'Page1'
                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'Page2'
                }
            ]
        }
])

// 子导航  有孩子的，要设置二级菜单
const hasChildren = computed(()=> list.value.filter(item => item.children))
// 没有孩子的，就是一级菜单
const noChildren = computed(() => list.value.filter(item => !item.children))

// 点击菜单图标收起/打开侧边栏菜单
const asideMenuStore = useAsideMenuStore()
const { isCollapse } = storeToRefs(asideMenuStore)
// 侧边栏宽度
const width = computed(()=> isCollapse.value ? "100px" : "180px")

// 切换菜单
const tagStore = useTagStore()
const changeMenu = (item) => {
  // 路由跳转
  router.push(item.path)
  // 往tag中添加信息
  tagStore.checkMenu(item)
}
</script>

<template>
  <el-aside :width=width>
    <el-menu
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
        :default-active="route.path"
      >
      <h3 v-show="!isCollapse">通用后台管理系统</h3>
      <h3 v-show="isCollapse">后台</h3>
      <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path"
        @click="changeMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{item.label}}</span>
      </el-menu-item>
      <el-sub-menu v-for="item in hasChildren" :key="item.path" :index="item.path"
        @click="router.push(item.path)"
      >
        <template #title>
            <el-icon><location /></el-icon>
            <span>{{item.label}}</span>
          </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item >{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      </el-menu>
  </el-aside>
</template>

<style lang="less" scoped>
.el-aside {
  height: 100%;
  background-color: #545c64;
  transition: width 0.3s;
  overflow: hidden;
}
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.el-menu {
  border-right: none;
  height: 100%;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
