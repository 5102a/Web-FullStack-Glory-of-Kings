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
      <el-aside :width="isColl ? '73px' : '150px'" style="background-color: rgb(238, 241, 246)">
        <el-menu router unique-opened :default-active="$router.path" :width="isColl ? '73px' : '150px'">
          <div class="changeColl" @click="changeColl"><i class="iconfont icon-shuangjiantouzuo"></i>=<i
              class="iconfont icon-shuangjiantouyou"></i></div>

          <el-submenu :index="menu1.name" v-for="menu1 in menus" :key="menu1.name">
            <template slot="title"><i :class="'iconfont '+menuIcon[menu1.name]"></i> {{ menu1.name }}</template>
            <el-menu-item-group v-for="menu2 in menu1.children" :key="menu2.name">
              <template slot="title">{{ menu2.name }}</template>
              <el-menu-item :index="menu3.index" v-for="menu3 in menu2.children" :key="menu3.name">{{ menu3.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu :index="menu1.name" v-for="menu1 in menus" :key="menu1.name">
            <template slot="title"><i :class="'iconfont '+menuIcon[menu1.name]"></i> {{ menu1.name }}</template>
            <el-menu-item-group v-for="menu2 in menu1.children" :key="menu2.name">
              <template slot="title">{{ menu2.name }}</template>
              <el-menu-item :index="menu3.index" v-for="menu3 in menu2.children" :key="menu3.name">{{ menu3.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <!-- 一级菜单 -->
          <!-- <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>内容管理</template
            >
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
            <template slot="title"
              ><i class="el-icon-message"></i>运营管理</template
            >
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ads/create">新建广告位</el-menu-item>
              <el-menu-item index="/ads/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-message"></i>系统设置</template
            >
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_users/create"
                >新建管理员</el-menu-item
              >
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">角色</template>
              <el-menu-item index="/roles/create">新建角色</el-menu-item>
              <el-menu-item index="/roles/list">角色列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>

      <!-- 内容 -->
      <el-container>
        <el-main>
          <router-view :key="$router.path"> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isColl: false,
      /*menus: [
        {
          name: '内容管理',
          parent: '',
          index: '/content',
          children: [
            {
              name: '物品',
              parent: '内容管理',
              index: '/items',
              children: [
                {
                  name: '新建物品',
                  parent: '物品',
                  index: '/items/create',
                  children: []
                },
                {
                  name: '物品列表',
                  parent: '物品',
                  index: '/items/list',
                  children: []
                }
              ]
            },
            {
              name: '英雄',
              parent: '内容管理',
              index: '/heroes',
              children: [
                {
                  name: '新建英雄',
                  parent: '英雄',
                  index: '/heroes/create',
                  children: []
                },
                {
                  name: '英雄列表',
                  parent: '英雄',
                  index: '/heroes/list',
                  children: []
                }
              ]
            },
            {
              name: '文章',
              parent: '内容管理',
              index: '/articles',
              children: [
                {
                  name: '新建文章',
                  parent: '文章',
                  index: '/articles/create',
                  children: []
                },
                {
                  name: '文章列表',
                  parent: '文章',
                  index: '/articles/list',
                  children: []
                }
              ]
            },
            {
              name: '视频',
              parent: '内容管理',
              index: '/videos',
              children: [
                {
                  name: '新建视频',
                  parent: '视频',
                  index: '/videos/create',
                  children: []
                },
                {
                  name: '视频列表',
                  parent: '视频',
                  index: '/videos/list',
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: '运营管理',
          parent: '',
          index: '/workmanage',
          children: [
            {
              name: '运营',
              parent: '运营管理',
              index: '/work',
              children: [
                {
                  name: '新建广告位',
                  parent: '运营',
                  index: '/ads/create',
                  children: []
                },
                {
                  name: '广告位列表',
                  parent: '运营',
                  index: '/ads/list',
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: '系统设置',
          parent: '',
          index: '/system',
          children: [
            {
              name: '分类',
              parent: '系统设置',
              index: '/category',
              children: [
                {
                  name: '新建分类',
                  parent: '分类',
                  index: '/categories/create',
                  children: []
                },
                {
                  name: '分类列表',
                  parent: '分类',
                  index: '/categories/list',
                  children: []
                }
              ]
            },
            {
              name: '管理员',
              parent: '系统设置',
              index: '/admin',
              children: [
                {
                  name: '新建管理员',
                  parent: '管理员',
                  index: '/admin_users/create',
                  children: []
                },
                {
                  name: '管理员列表',
                  parent: '管理员',
                  index: '/admin_users/list',
                  children: []
                }
              ]
            },
            {
              name: '角色',
              parent: '系统设置',
              index: '/role',
              children: [
                {
                  name: '新建角色',
                  parent: '角色',
                  index: '/roles/create',
                  children: []
                },
                {
                  name: '角色列表',
                  parent: '角色',
                  index: '/roles/list',
                  children: []
                }
              ]
            },
            {
              name: '菜单',
              parent: '系统设置',
              index: '/menu',
              children: [
                {
                  name: '新建菜单',
                  parent: '菜单',
                  index: '/menus/create',
                  children: []
                },
                {
                  name: '菜单列表',
                  parent: '菜单',
                  index: '/menus/list',
                  children: []
                }
              ]
            }
          ]
        }
      ]*/
      menus: [],
      menuIcon: {
        '数据管理': 'icon-neirongguanli',
        '系统管理': 'icon-shezhi1',
        '运营管理': 'icon-huabanfuben',
        '媒体管理': 'icon-meitibaodao'
      }

    }
  },
  methods: {
    signOut () {
      sessionStorage.clear()
      this.$router.push('/login')
      this.$message({
        type: 'success',
        message: '退出成功'
      })
    },
    changeColl () {
      this.isColl = !this.isColl
    },
    async fetch () {
      // const res = await this.$http.get('rest/menus')
      const res = await this.$http.post('rest/admin_users', { getMenu: 1 })
      // console.log(res.data)
      this.menus = res.data

      // if (!sessionStorage.menus) {
      //   const res = await this.$http.get('rest/menus')
      //   let menus = res.data.filter(i => {
      //     if (i.level == 1) return true
      //   })
      //   // console.log(JSON.parse(sessionStorage.manage));
      //   this.matchManage(menus, JSON.parse(sessionStorage.manage))
      //   sessionStorage.menus = JSON.stringify(this.menus)
      //   console.log(this.menus);
      // } else {
      //   this.menus = JSON.parse(sessionStorage.menus)
      // }
    },
    // matchManage (origin, match) {
    //   this.menus = origin.filter(first => { //一级对象
    //     first.children = first.children.filter(second => {//二级
    //       second.children = second.children.filter((last) => {//三级对象
    //         let res = match.some(i => {
    //           if (i.name != last.name) return false
    //           return true
    //         })
    //         if (!res) {
    //           return false
    //         }
    //         return true
    //       })
    //       if (!second.children.length) {
    //         return false
    //       } else {
    //         return true
    //       }
    //     })
    //     if (!first.children.length) {
    //       return false
    //     } else {
    //       return true
    //     }
    //   })
    // }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped>
.changeColl {
  color: rgb(104, 97, 97);
  font-size: 18px;
  letter-spacing: 2px;
  text-align: center;
  line-height: 22px;
  height: 24px;
  cursor: pointer;
  background-color: #aaa;
}
.el-menu {
  border: none;
  background-color: #bbb;
  transition-duration: 1000ms;
  overflow: hidden;
}

.el-submenu .el-menu-item {
  min-width: 150px;
}
.el-aside {
  transition-duration: 1000ms;
}
</style>
