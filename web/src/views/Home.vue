<template>
  <div>
    <swiper  :options="swiperOption">
      <swiper-slide>
        <img
          src="http://ossweb-img.qq.com/upload/adw/image/20200324/71ca15b117ea503f20141296b1861092.jpeg"
          class="w-100"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="http://ossweb-img.qq.com/upload/adw/image/20200328/4f3f61a6e97f408f80545421aebf393e.jpeg"
          class="w-100"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="http://ossweb-img.qq.com/upload/adw/image/20200324/9efb3d76ecf3205cfc0459ebaa9a1ba4.jpeg"
          class="w-100"
          alt=""
        />
      </swiper-slide>
      <div
        class="swiper-pagination px-3 pb-2 pagination-home text-right"
        slot="pagination"
      ></div>
    </swiper>

    <div class="nav-icons bg-white mt-3 pt-3 text-dark-1 text-center">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="(v, k) in nav" :key="k">
          <i :class="'sprite sprite-' + k"></i>
          <div class="py-2">{{ v }}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click="narrow" id="ban">
        <i class="sprite sprite-arrow mr-1 "></i>
        <span>收起</span>
      </div>
    </div>
    <!-- ------------- -->

    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-nm d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipse pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="-superhero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width:20%;"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img class="w-100" :src="hero.avatar" alt="" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-list-card icon="bofangshu" title="精彩视频" :categories="videoCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap " style="margin:0;">
          <router-link
            tag="div"
            :to="`/videos/${video._id}`"
            class="p-1 flex-wrap d-flex"
            style="width:50%;"
            v-for="(video, i) in category.videoList"
            :key="i"
          >
            <img class="w-100 mb-2" :src="video.img" alt="" />
            <div
              class="text-dark mb-2 "
              style="height:32px;overflow:hidden;line-height:18px"
            >
              {{ video.title }}
            </div>
            <i class="iconfont icon-bofangshu px-1" style="line-height:14px"></i>
            <span class=" text-dark flex-1">{{ video.watch }}</span>
            <span class="text-dark ">{{ video.createdAt | date }}</span>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <m-card icon="book" title="图文攻略"></m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        },
        autoplay:true,
        loop:true,
        speed:200
      },
      newsCats: [],
      heroCats: [],
      videoCats: [],
      nav: {
        blz: '爆料站',
        gsz: '故事站',
        zbsc: '周边商城',
        tyf: '体验服',
        xrzq: '新人专区',
        ryjc: '荣耀·传承',
        mnzzlk: '模拟战资料库',
        wzyd: '王者营地',
        gzh: '公众号'
      }
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
    this.fetchVideoCats()
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    },
    async fetchVideoCats() {
      const res = await this.$http.get('videos/list')
      this.videoCats = res.data
    },
    narrow() {
      let target = document.querySelector('#ban')
      target.previousElementSibling.children.forEach((item, index) => {
        if (index > 3) {
          if (!item.hidden) {
            target.children[0].style.transform = 'rotate(180deg)'
            target.children[1].innerHTML = '展开'
            item.hidden = true
          } else {
            target.children[0].style.transform = 'rotate(0deg)'
            target.children[1].innerHTML = '收起'
            item.hidden = false
          }
        }
      })
    }
  },
  mounted() {
    this.narrow()

  }
}
</script>

<style lang="scss">
@import '~assets/scss/variables';

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;

    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>
