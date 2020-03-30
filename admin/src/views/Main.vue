<template>
  <el-container style="height: 100vh;">
    <!-- 头部 -->
    <el-header>
      <el-col :span="6" :offset="9"> 王者荣耀后台管理系统</el-col>
      <el-col :span="3" :offset="6">
        <el-button type="primary" round size="small" @click="signOut">退出</el-button>
      </el-col>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧栏 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router unique-opened :default-active="$router.path">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>内容管理</template>
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/items/create">新建物品</el-menu-item>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">视频</template>
              <el-menu-item index="/videos/create">新建视频</el-menu-item>
              <el-menu-item index="/videos/list">视频列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>运营管理</template>
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ads/create">新建广告位</el-menu-item>
              <el-menu-item index="/ads/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i>系统设置</template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 内容 -->
      <el-container>
        <el-main>
          <router-view :key="$router.path">
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    signOut () {
      localStorage.token = ''
      this.$router.push('/login')
      this.$message({
        type: 'success',
        message: '退出成功'
      })
    }
  },
  mouted(){
    this.$router.replace('/')
  }
}
</script>
