<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    
    <router-link to="/">
      <el-menu-item index="0">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>
    </router-link>
   
    <el-sub-menu index="1">
        <template #title>
          <el-icon><User /></el-icon>
            <span>工业异常检测</span>
        </template>
        <el-menu-item-group>
            <router-link to="/sewerClassify">
                <el-menu-item index="1-1">管道图像缺陷分类</el-menu-item>
            </router-link>
            <router-link to="/">
                <el-menu-item index="1-2">零样本异常检测</el-menu-item>
            </router-link>
            <router-link to="/">
                <el-menu-item index="1-3">子菜单栏3</el-menu-item>
            </router-link>
        </el-menu-item-group>
    </el-sub-menu>
    
    <el-sub-menu index="2">
        <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>图像视频示例分割</span>
        </template>
        <el-menu-item-group>
            <router-link to="/">
                <el-menu-item index="2-1">子菜单栏1</el-menu-item>
            </router-link>
            <router-link to="/">
                <el-menu-item index="2-2">子菜单栏2</el-menu-item>
            </router-link>
        </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
        <template #title>
          <el-icon><Clock /></el-icon>
            <span>菜单栏3</span>
        </template>
        <el-menu-item-group>
            <router-link to="/">
                <el-menu-item index="3-1">子菜单栏1</el-menu-item>
            </router-link>
        </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="4">
        <template #title>
            <el-icon><setting /></el-icon>
            <span>菜单栏4</span>
        </template>
        <el-menu-item-group>
            <router-link to="/">
                <el-menu-item index="4-1">子菜单栏1</el-menu-item>
            </router-link>
            <router-link to="/">
                <el-menu-item index="4-2">子菜单栏2</el-menu-item>
            </router-link>
        </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import {
  Menu as IconMenu,
  Setting,
  House,
  User,
  Clock,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style  scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 100%;
}
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
</style>
