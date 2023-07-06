<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import GlobalFooter from '../components/GlobalFooter.vue'
import { worksListSimple } from '@/common/store'

const router = useRouter()
const route = useRoute()

/** 封面图的存放目录 */
const coverDir = '/images/work-covers/large/'
/** 项目详情图存放目录 */
const detailImagesDir = '/images/work-detail/' + route.params.id + '/'

interface WorkSimple {id: string, name: string}

/** 查找当前项目的上一个/下一个
 *  @param id 当前项目的 id
 */
const findPreviousAndNext = (id: string | string[]): { previous: WorkSimple, next: WorkSimple } | undefined => {
  const workslist = worksListSimple.value
  const index = workslist.findIndex(item => item.id === id);
  if (index !== -1) {
    const previousIndex = (index - 1 + workslist.length) % workslist.length;
    const nextIndex = (index + 1) % workslist.length;
    return {
      previous: workslist[previousIndex],
      next: workslist[nextIndex],
    };
  }
  return undefined;
}

interface OtherWorks {previous: WorkSimple, next: WorkSimple}
/** 当前项目的上一个/下一个 */
const otherWorks = ref<OtherWorks>()
otherWorks.value = findPreviousAndNext(route.params.id)

interface Year {
  start: number
  end: number
}
interface People {
  name: string
}
interface Credits {
  title: string
  people: People[]
}
interface Description {
  chapter_title: string
  content: string[]
}
interface Image {
  type: string
  url: string[]
}
interface WorkDetail {
  id: string
  cn_name: string
  en_name: string
  year: Year
  platform: string
  category: string[]
  credits: Credits[]
  description: Description[]
  images: Image[]
}

/** 当前项目的详情内容 */
const work = ref<WorkDetail>()
fetch('/data/works/' + route.params.id + '.json')
  .then((response) => response.json())
  .then((json) => {
    work.value = json
  })
  .catch(error => {
    console.error('Error:', error)
    router.push('/not-found')
  })

/** 强制设置顶部封面的高度，不然会被下面的内容遮住 */
const setCoverHeight = (coverDom:HTMLElement) => {
  if(window.innerWidth > 600) {
    coverDom.style.height = (window.innerWidth / 2).toString() + 'px'
  }
  else {
    // 小屏幕下，封面不会被 header 遮盖，所以需要加上 header 的 48px
    coverDom.style.height = (window.innerWidth / 2 + 48).toString() + 'px'
  }
}


/** 封面的滚动速度，
 * 1 - 跟原始滚动速度一样，
 * 0 - 不滚动，
 * 造成视差滚动效果 */
const scrollSpeed = .4
/** 右侧文本区域的高度，根据视窗高度动态决定 */
const textContentHeight = ref()


onMounted(() => {
  const hero = document.querySelector('.hero') as HTMLElement
  setCoverHeight(hero)

  let ticking =false
  const handelScroll = () => {
    if(!ticking) {
      window.requestAnimationFrame(() => {
        let nowScroll = window.scrollY / document.documentElement.scrollHeight
        if(nowScroll > -0.02 && nowScroll < 0.1) {
          hero.style.transform = `translateY(${window.scrollY * (1-scrollSpeed)}px)`
        }
        ticking = false
      })
      ticking = true
    }
  }
  
  window.addEventListener('scroll', handelScroll)

  textContentHeight.value = window.innerHeight - 96
  window.onresize = () => {
    // 浏览器窗口发生变化时，封面图高度 和 文本区域高度 都需要重新计算
    setCoverHeight(hero)
    textContentHeight.value = window.innerHeight - 96
  }
})
</script>

<template>
  <div>
    <div class="hero">
      <Transition name="hero-zoom-in">
        <picture style="display: block;" v-if="work">
          <source :srcset="coverDir + work?.id + '.webp'" type="image/webp">
          <img class="hero-img" :src="coverDir + work?.id + '.png'" :alt="work?.id" >
        </picture>
      </Transition>
      <div class="work-title-wrap desktop global-padding">
        <div class="work-title">
          <h2 class="title-cn serif" style="position: relative;">
              <span v-for="(c,i) in work?.cn_name" :key="i"
                class="title-span animate__animated animate__fadeInUp"
                :style="'animation-delay: ' + (i + 1) * .02 + 's'">
                {{ c == ' ' ? '&nbsp;' : c }}
              </span>
          </h2>
          <h2 class="title-en">
            <span v-for="(c,i) in work?.en_name" :key="i"
              class="title-span animate__animated animate__fadeInUp"
              :style="'animation-delay: ' + (i + 1) * .02 + 's'">
              {{ c == ' ' ? '&nbsp;' : c }}
            </span>
          </h2>
        </div>
        <div class="work-duration animate__animated animate__fadeInUp">
          {{ work?.year.start }} <span v-if="work?.year.end">-</span>  {{ work?.year.end }}
        </div>
      </div>
    </div>
    <div class="wrap"> 
      <div class="work-title-wrap mobile global-padding">
        <div class="work-title">
          <h2 class="title-cn serif">{{ work?.cn_name }}</h2>
          <h2 class="title-en">{{ work?.en_name }}</h2>
        </div>
        <div class="work-duration">
          {{ work?.year.start }} <span v-if="work?.year.end">-</span>  {{ work?.year.end }}
        </div>
      </div>
      <div class="content serif global-padding">
        <ul class="images-content">
          <li class="work-image-row" v-for="row in work?.images">
            <!-- 图片 -->
            <div v-if="row.type == 'image'" class="image-row-wrap flex">
              <div class="work-image" v-for="img in row.url">
                <picture>
                  <source :srcset="detailImagesDir + img + '.webp'" type="image/webp">
                  <img :src="detailImagesDir + img + '.png'" :alt="work?.id + '-detail'">
                </picture>
              </div>
            </div>
            <!-- 视频 -->
            <div v-else>
              <video v-for="v in row.url" style="width: 100%;"
                :src="detailImagesDir + v + '.mp4'" 
                :poster="detailImagesDir + v + '.png'"
                autoplay loop muted playsinline x5-playsinline></video>
            </div>
          </li>
        </ul>
        <div class="text-content flex flex-col" :style="{ height: textContentHeight +'px' }">
          <!-- 平台、分类 信息 -->
          <div class="info-list flex gap-4">
            <div class="info-item-name-col">
              <div class="info-item-name">Platform</div>
              <div class="info-item-name">Category</div>
            </div>
            <div class="info-item-value-col">
              <div class="info-item-value">
                <span class="after-comma" v-for="p in work?.platform">{{ p }}</span>
              </div>
              <div class="info-item-value">
                <span class="after-comma" v-for="c in work?.category">{{ c }}</span>
              </div>
            </div>
          </div>
          <!-- 正文 -->
          <div class="description">
            <div class="chapter" v-for="chapter in work?.description">
              <h3 class="chapter-title">{{ chapter.chapter_title }}</h3>
              <p class="chapter-text" v-for="p in chapter.content">
                {{ p }}
              </p>
            </div>
          </div>
          <!-- 参与者 -->
          <div>
            <h4 style="margin-bottom: 10px;">Credits</h4>
            <div class="info-list flex gap-4">
              <div class="info-item-name-col">
                <div class="info-item-name" v-for="position in work?.credits">{{ position.title }}</div>
              </div>
              <div class="info-item-value-col">
                <div class="info-item-value" v-for="position in work?.credits">
                  <span class="after-comma" v-for="p in position.people">{{ p.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="other-work-section global-padding">
        <div class="other-work-title">
          <h2 class="other-title-cn serif">其它项目</h2>
          <h2 class="other-title-en">other work</h2>
        </div>
        <div class="other-work-list">
          <div class="other-work" v-for="(ohter, key) in otherWorks">
            <router-link :to="{ name: 'work.detail', params: {id: ohter.id} }">
              <div class="other-work-cover">
                <div class="high-light"></div>
                <picture>
                  <source :srcset="coverDir + ohter.id + '.webp'" type="image/webp">
                  <img class="other-work-image" :src="coverDir + ohter.id + '.png'" :alt="ohter.id">
                </picture>
              </div>
              <div class="key flex items-center justify-end" 
                  :style="{ 'flex-direction': key === 'next' ? 'row' : 'row-reverse' }">
                {{ key }}
                <div class="btn-scroll" :style="{ 'transform': key === 'next' ? 'rotate(0)' : 'rotate(180deg)' , opacity: 1 }">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h5 class="serif" :style="{ 'text-align': key === 'next' ? 'right' : 'left' }">{{ ohter.name }}</h5>
            </router-link>
          </div>
        </div>
      </div>
      <global-footer />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero-zoom-in-enter-active,
.hero-zoom-in-leave-active {
  opacity: 1;
  transition: all 1s cubic-bezier(.1, 0, .4, 1);
  transform: scale3d(1, 1, 1);
}
.hero-zoom-in-enter-from,
.hero-zoom-in-leave-to {
  opacity: 0;
  transform: scale3d(1.04, 1.04, 1);
}

.hero {
  position: relative;
  overflow: hidden;
  z-index: -1;
  @media (max-width: 600px) {
    padding-top: 48px;
  }
  .hero-img {
    width: 100%;
  }
}

$transitionStyle: all .3s ease;
.work-title-wrap {
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  transition: $transitionStyle;
  .title-cn {
    font-size: 40px;
    font-weight: 700;
    line-height: 100%;
    margin-bottom: 12px;
    @media (max-width: 1000px) {
      font-size: 32px;
      margin-bottom: 8px;
    }
    @media (max-width: 600px) {
      font-size: 20px;
      margin-bottom: 6px;
    }
  }
  .title-en {
    font-size: 24px;
    font-weight: 600;
    line-height: 100%;
    @media (max-width: 1000px) {
      font-size: 19px;
    }
    @media (max-width: 600px) {
      font-size: 12px;
    }
  }
  .title-span {
    display: inline-block;
  }
  .work-duration {
    line-height: 100%;
    font-weight: 600;
    opacity: .6;
    @media (max-width: 600px) {
      font-size: 10px;
    }
  }
}
.work-title-wrap.desktop {
  display: flex;
  position: absolute;
  bottom: 64px;
  text-shadow: 0px 2px 10px rgba($color: #000000, $alpha: 0.25);
  @media (max-width: 1000px) {
    bottom: 32px;
  }
  @media (max-width: 600px) {
    display: none;
  }
}
.work-title-wrap.mobile {
  display: none;
  @media (max-width: 600px) {
    display: flex;
    margin-bottom: 16px;
  }
}
.wrap {
  padding-top: 120px;
  background-color: #1E1F21;
  z-index: 2;
  transition: $transitionStyle;
  animation: my_fade_in_up_mobile;
  animation-duration: 1.05s;
  transform-style: preserve-3d;
  @media (max-width: 1440px) {
    padding-top: 80px;
  }
  @media (max-width: 960px) {
    padding-top: 48px;
  }
  @media (max-width: 600px) {
    padding-top: 24px;
    overflow: hidden;
  }
}
@keyframes my_fade_in_up_mobile {
  from {
    -webkit-transform: translateY(30px);
    transform: translateY(30px);
  }

  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
.content {
  display: flex;
  margin: 0 auto;
  max-width: 1920px;
  gap: 24px;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
}
.images-content {
  flex: 3;
  $imageGridSpace: 8px;
  @media (max-width: 800px) {
    width: 100%;
  }
  .work-image-row:not(:last-child) {
    margin-bottom: $imageGridSpace;
  }
  .image-row-wrap {
    gap: $imageGridSpace;
  }
}
.text-content {
  flex: 1;
  min-width: 270px;
  gap: 32px;
  @media (max-width: 800px) {
    width: 100%;
    height: fit-content !important;
    gap: 16px;
  }
  @media (min-width: 801px) {
    position: sticky;
    top: 72px;
    overflow-y: scroll;
  }
  .info-list {
    font-size: 14px;
    @media (max-width: 600px) {
      font-size: 12px;
    }
  }
  .info-item-name {
    opacity: .5;
  }
  $itemMargin: 8px;
  .info-item-name:not(:last-child) {
    margin-bottom: $itemMargin;
    @media (max-width: 800px) {
      margin-bottom: $itemMargin * .5;
    }
  }
  .info-item-value:not(:last-child) {
    margin-bottom: $itemMargin;
    @media (max-width: 800px) {
      margin-bottom: $itemMargin * .5;
    }
  }
  .description {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 32px 0px;
    $borderStyle: 1px solid #3F3F3F;
    border-top: $borderStyle;
    border-bottom: $borderStyle;
    @media (max-width: 800px) {
      padding: 16px 0px;
    }
  }
  .chapter-title {
    line-height: 180%;
    margin-bottom: 4px;
    font-size: 20px;
    font-weight: 700;
    @media (max-width: 600px) {
      font-size: 18px;
    }
  }
  .chapter-text {
    line-height: 180%;
    text-align: justify;
    font-size: 14px;
    font-weight: 400;
    color: #E6E6E6;
    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
}

.other-work-section {
  margin: 96px 0 72px 0;
  font-size: 24px;
  font-weight: 600;
  @media (max-width: 1000px) {
    margin: 72px 0 56px 0;
    font-size: 22px;
  }
  @media (max-width: 800px) {
    margin: 56px 0 48px 0;
    font-size: 20px;
  }
}
.other-work-title {
  margin-bottom: 16px;
}
.other-title-en {
  margin: -20px 0 0 26px;
  opacity: 0.5;
  filter: blur(2px);
}
.other-work-list {
  display: flex;
  gap: 8px;
}
.other-work {
  font-size: 20px;
  @media (max-width: 600px) {
    font-size: 14px;
    .btn-scroll {
      // display: none;
      width: 16px;
      height: 16px;
      span {
        left: 8px;
        width: 8px;
        &:nth-child(1) {
          top: 5px;
          transform: rotate(45deg);
        }

        &:nth-child(2) {
          top: 10px;
          transform: rotate(-45deg);
        }
      }
    }
  } 
  .other-work-image {
    transition: all .7s cubic-bezier(.3, 0, .2, 1);
  }
  .other-work-cover {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin-bottom: 16px;
  }
  .key {
    margin-bottom: 12px;
    font-weight: 400;
    opacity: .5;
    @media (max-width: 600px) {
      margin-bottom: 6px;
    }
  }
  &:hover {
    .high-light {
      opacity: 1;
      transform: translate(0, 0);
    }
    .other-work-image {
      transform: scale3d(1.05, 1.05, 1);
      transform-style: preserve-3d;
    }
  }
}
</style>