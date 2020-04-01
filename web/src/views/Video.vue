<template>
  <div class="page-video" v-if="model">
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></video-player>

    <div class="d-flex" style="border:1px solid #d4d9de;margin:12px 4px">
      <img
        src="http://game.gtimg.cn/images/yxzj/web201605/main/default_head.jpg"
        style="width:20vw;"
        class="p-2 "
        alt=""
      />
      <p class="d-flex flex-wrap">
        {{ model.title }}
        <span style="width:280px;color:rgb(150,150,150)"
          >投稿：135 粉丝：5</span
        >
        <span style="color:rgb(150,150,150)">个性签名：开心就好</span>
      </p>
    </div>
    <div class="" style="margin:12px 4px">
      <i class="iconfont icon-aixin px-1"></i>
      <span>猜你喜欢</span>
    </div>
    <div class="d-flex flex-wrap " style="margin:0;">
      <router-link
        tag="div"
        :to="`/videos/${video._id}`"
        class="p-1 flex-wrap d-flex"
        style="width:50%;"
        v-for="(video, i) in category"
        :key="i"
      >
        <img class="w-100 mb-2" :src="video.img" alt="" />
        <div
          class="text-dark mb-2 "
          style="height:32px;overflow:hidden;line-height:18px"
        >
          {{ video.title }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      category: {},
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type:'video/mp4',
            src: '' //url地址
          }
        ],
        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    }
  },
  props: {
    id: { required: true }
  },
  watch: {
    id: 'fetch'
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`videos/${this.id}`)
      // console.log(res.data)
      this.playerOptions.poster = res.data.img
      this.playerOptions.sources[0].src = res.data.src
      this.model = res.data
    },
    async fetchVideoCats() {
      const res = await this.$http.get('videos/list')
      console.log(res.data[0].videoList)

      this.category = res.data[0].videoList
    }
  },
  created() {
    this.fetchVideoCats()
    this.fetch()
  }
}
</script>

<style lang="scss">
.page-video {
  .body {
    img {
      width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
