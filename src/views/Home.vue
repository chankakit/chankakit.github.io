<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DragTitle from '@/components/DragTitle.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import WorkItem from '@/components/WorkItem.vue'
import MiscItem from '@/components/MiscItem.vue'
import AboutInfo from '@/components/About-Info.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import isMobile from '@/common/is-mobile'
import { worksList, miscList, trOn } from '@/common/store'
import mainImage from '../assets/main-image@2x.png'

onMounted(() => {
  window.addEventListener('scroll', miscRowScroll)
  window.addEventListener('resize', () => {
    windowSize.value.width = window.innerWidth
    windowSize.value.height = window.innerHeight
  })

  windowSize.value.width = window.innerWidth
  windowSize.value.height = window.innerHeight

  // wl：worklist
  wlWarpper.value = document.getElementById('wl-wrap')
  
  // 打开 overlay 过渡效果开关
  trOn.value = true
})

// 用于项目列表下方的 < > 滚动按钮
const wlWarpper = ref()
/**
 * 项目列表滚动函数
 * @param isRight 是否向右滚动
 */
const workListScroll = (isRight:boolean) => {
  let dx = .5 * window.innerWidth
  if(!isRight) {
    // 不是向右的话，取反
    dx = -dx
  }
  wlWarpper.value.scroll({
    left: wlWarpper.value.scrollLeft + dx,
    behavior: 'smooth',
  })
}

// 杂misc 的行跟随页面滚动而横向移动的效果
let ticking = false;
/** miscRowOffset 是每行偏移数值的基准值，
 * 每行的偏移数值会乘以一个系数，
 * 来达到每行移动的速度不一样 */
const miscRowOffset = ref(0)
/** 杂misc 计算每行偏移基准值的回调函数，
 *  无入参，读取当前页面滚动位置（百分比），在符合范围的时候执行计算偏移值
 */
const miscRowScroll = () => {
  if(!ticking) {
    window.requestAnimationFrame(() => {
      let nowScroll = window.scrollY / document.documentElement.scrollHeight
      // 只在misc准备露出时才执行计算
      if(nowScroll > 0.33 && nowScroll < 0.70) {
        // 输入上下限其实可以跟上面的限制范围一样，上面限制范围大一点，可以在准备进入画面时就已经移动
        miscRowOffset.value = linearMapping(nowScroll, 0.345, 0.6590, 0, -35)
      }
      ticking = false
    })
    ticking = true
  }
}
/**
 * 线性映射函数
 * @param x 待映射数值
 * @param x1 点 1 的 x 值｜输入下限
 * @param x2 点 2 的 x 值｜输入上限
 * @param y1 点 1 的 y 值｜输出上限
 * @param y2 点 2 的 y 值｜输出上限
 */
const linearMapping = (x:number, x1:number, x2:number, y1:number, y2:number):number => {
  // 计算斜率和截距
  const slope = (y2 - y1) / (x2 - x1);
  const intercept = y1 - slope * x1;

  return slope * x + intercept;
}

const windowSize = ref({
  width: window.innerWidth,
  height: window.innerHeight
})
</script>

<template>
  <div>
    <!-- 首屏 -->
    <section class="flex flex-col justify-center items-center" style="user-select: none;">
      <div class="title-content-wrap flex flex-col items-center justify-center">
        <div class="img-wrap">
          <img :src=mainImage width="140">
        </div>
        <div class="flex flex-col items-center main-title">
          <div class="flex flex-col items-center font-semibold main-title-en animate__animated" style="line-height: 24px;">
            <span style="font-size: 32px;letter-spacing: 2px;">KAKIT'S</span>
            <span class="mt-6" style="font-size: 64px;letter-spacing: 2px;">
              PORTFOLIO
            </span>
          </div>
          <h2 class="serif font-bold main-title-cn animate__animated">Hi, I'm kit.<br/>I design things on screen</h2>
        </div>
      </div>
      <DragTitle msg="and make them come to life"></DragTitle>
      <div class="flex flex-col items-center sd-tips animate__animated">
        <div class="flex justify-center mouse-ic">
          <div class="mouse-ani"></div>
        </div>
        <p>scroll down</p>
      </div>
    </section>
    <!-- 项目 -->
    <section class="flex flex-col justify-between">
      <section-title cn="作" en="work" />
      <div>
        <div id="wl-wrap" class="works-list-wrap">
          <ol id="wl" class="flex works-list global-padding">
            <li class="work-year" v-for="worksThisYear in worksList">
              <ol class="flex work-this-year-list">
                <work-item class="work-item" v-for="work in worksThisYear.works" :key="work.id" :item="work"></work-item>
              </ol>
              <div class="flex time-line">
                <div class="year-num">{{ worksThisYear.year }}</div>
                <div class="line"></div>
              </div>
            </li>
          </ol>
        </div>
        <div v-if="!isMobile" class="global-padding flex justify-between" style="margin-top: 8px;">
          <button class="btn-scroll" @click="workListScroll(false)" style="transform: rotate(180deg);">
            <span></span>
            <span></span>
          </button>
          <button class="btn-scroll" @click="workListScroll(true)">
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      <div class="flex justify-between items-center global-padding" style="height: 60px;padding-bottom: 40px;">
        <div class="tips-text" style="line-height: 10px;">sorted by project date</div>
        <div style="width: 32px; height: 1px; background-color: #fff; opacity: .5;"></div>
      </div>
    </section>
    <!-- 其他杂项 -->
    <section class="flex flex-col justify-between" style="height: auto;">
      <section-title cn="杂" en="misc" />
      <!-- 大于 600px 宽度显示两行 -->
      <div v-if="windowSize.width > 600" class="misc-grid">
        <div class="misc-row flex gap-2" :style="{marginBottom: '0.5rem', transform: `translate(${miscRowOffset}vw, 0)`}">
          <misc-item v-for="item in miscList?.slice(0, 5)" :item="item" />
          <misc-item v-for="item in miscList?.slice(0, 5)" :item="item" />
        </div>
        <div class="misc-row flex gap-2" :style="{float: 'right', transform: `translate(${-miscRowOffset}vw, 0)`}">
          <misc-item v-for="item in miscList?.slice(5, 10)" :item="item" />
          <misc-item v-for="item in miscList?.slice(5, 10)" :item="item" />
        </div>
      </div>
      <!-- 小于 600px 宽度显示三行 -->
      <div v-else class="misc-grid">
        <div class="misc-row flex gap-1" :style="{transform: `translate(${miscRowOffset*1.33}vw, 0)`}">
          <misc-item v-for="item in miscList?.slice(0, 3)" :item="item" />
        </div>
        <div class="misc-row flex gap-1" :style="{float: 'right', transform: `translate(${miscRowOffset*-1.3}vw, 0)`}">
          <misc-item v-for="item in miscList?.slice(3, 6)" :item="item" />
        </div>
        <div class="misc-row flex gap-1" :style="{transform: `translate(${miscRowOffset*1.6}vw, 0)`}">
          <misc-item v-for="item in miscList?.slice(6, 10)" :item="item" />
        </div>
      </div>
      <div style="height: 2px;"></div>
    </section>
    <!-- 个人信息 -->
    <section class="flex flex-col justify-between serif">
      <section-title cn="历" en="about" />
      <about-info />
      <global-footer />
    </section>
  </div>
</template>

<style scoped lang="scss">
section {
  padding-top: 80px;
  height: 100vh;
  min-height: 540px;

  .main-title {
    margin-top: -24px;
  }

  .main-title-en {
    margin-right: -12px;
    text-align: center;
    filter: blur(4px);
    opacity: .1;
    will-change: transform;
    animation-delay: .6s;
    animation-name: title_fade_in_up;
    animation-duration: 1.4s;
    animation-timing-function: cubic-bezier(0.5, 0, 0.4, 1);
  }

  .main-title-cn {
    line-height: 36px;
    font-size: 36px;
    // letter-spacing: 10px;
    margin-right: -10px;
    text-align: center;
    animation-delay: .7s;
    animation-name: title_fade_in_up;
    animation-duration: 1.4s;
    animation-timing-function: cubic-bezier(0.5, 0, 0.4, 1);
  }

  // 标题淡入动画
  @keyframes title_fade_in_up {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 80%, 0);
      transform: translate3d(0, 100%, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  .title-content-wrap {
    margin-top: -13vh;
  }
  @media (max-width: 600px) {
    .title-content-wrap {
      margin-top: -20vh;
    }
    .main-title {
      transform: scale(.75);
    }
  }
}

section:not(:last-child) {
  margin-bottom: 10vw;
}

.sd-tips {
  position: absolute;
  bottom: 48px;
  font-size: 14px;
  opacity: .3;
  animation-delay: 2.1s;
  animation-name: fade_in;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  @media (max-width: 600px) {
    bottom: 12px;
    transform: scale(.75);
  }
}

// 淡入动画
@keyframes fade_in {
  from {
    opacity: 0;
  }

  to {}
}

// 向下滚动提示
.mouse-ic {
  margin-bottom: 6px;
  width: 16px;
  height: 26px;
  border: 1.2px solid #fff;
  border-radius: 9px;

  .mouse-ani {
    margin-top: 6px;
    width: 1.5px;
    // height: 8px;
    background-color: #fff;
    border-radius: 1px;
    animation-duration: 2.5s;
    animation-name: sd-loop;
    animation-iteration-count: infinite;
  }
}

// 向下滚动提示动画
@keyframes sd-loop {
  from {
    transform: translate(0px, 0px);
    height: 0px;
  }

  43% {
    transform: translate(0px, 0px);
    height: 9px;
  }

  55% {
    transform: translate(0px, 0px);
    height: 9px;
  }

  85% {
    opacity: 1;
  }

  90% {
    transform: translate(0px, 8px);
    height: 0px;
    opacity: 0;
  }

  to {
    transform: translate(0px, 8px);
    height: 0px;
    opacity: 0;
  }
}

.works-list-wrap {
  overflow-x: scroll;
}
.works-list {
  width: fit-content;
}

.work-item {
  &:not(:last-child) {
    margin-right: 1rem;
    @media (max-width: 740px) {
      margin-right: .75rem;
    }
    @media (max-width: 490px) {
      margin-right: .5rem;
    }
  }
}
.work-year {
  &:not(:last-child) {
    margin-right: 1rem;
    @media (max-width: 740px) {
      margin-right: .75rem;
    }
    @media (max-width: 490px) {
      margin-right: .5rem;
    }
  }
  .time-line {
    margin-top: 32px;
    font-size: 20px;
    font-weight: 700;

    .line {
      margin: 8px 0 0 8px;
      height: 1px;
      flex: 1;
      background-color: #fff;
      opacity: .3;
    }
  }
}

.misc-grid {
  margin-top: 10vh;
  margin-bottom: 20vh;
  overflow: hidden;
}
.misc-row {
  width: fit-content;
  will-change: transform;
  @media (max-width: 600px) {
    margin-bottom: 0.25rem;
  }
}
</style>
