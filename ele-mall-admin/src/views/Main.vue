<template>
  <el-container>
    <el-container>
      <el-aside width="200px">
        <el-menu mode="vertical" style="heigth:100vh;" :default-active="$route.path" router>
          <el-submenu v-for="(submenus, index) in menu.items" :index="`menu-item-${index}`" :key="`menu-item-${index}}`">
            <template slot="title">{{submenus.title}}</template>
            <el-menu-item v-for="(item, subIndex) in submenus.items" :index="item.path" :key="`menu-item-${index}-${subIndex}`">
              {{item.title}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <h3>Small Mall - 后台管理界面</h3>
        </el-header>
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
        <el-footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "课程管理", path: "/courses/list" },
          { title: "课时管理", path: "/episodes/list" },
        ],
      },
      {
        title: "运营管理",
        items: [{ title: "用户管理", path: "/users/list" }],
      },
    ],
  };
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>