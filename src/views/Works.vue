<!-- 作 work 列表页 -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'
import GlobalFooter from '../components/GlobalFooter.vue'
import { worksListSimple } from '@/common/store'

const coverDir = '/images/work-covers/large/'

interface Work {
  id: string
  name: string
  platform: string[]
  category: string[]
}

const worksOdd = ref<Work[]>([])
const worksEven = ref<Work[]>([])

worksListSimple.value.forEach((work,i) => {
  if(i%2 === 0) {
    worksEven.value.push(work)
  }
  else {
    worksOdd.value.push(work)
  }
})

onMounted(() => {
  const workItem = document.querySelectorAll('.work-item')
  const cb = function (entries: any) {
    entries.forEach( (entry:any) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview')
      }
    })
  }
  /** 观察器，用于观察元素是否进入显示区域
   * {threshold: 0.8} - 表示 进入 80% 时触发回调函数
   */
  const observer = new IntersectionObserver(cb, { threshold: .7 })
  // 把所有标题加入观察器中
  workItem.forEach(item => {
    observer.observe(item)
  })
})
</script>

<template>
  <div style="padding-top: 48px;">
    <div class="content-wrap">
      <section-title class="title" cn="作" en="work"></section-title>
      <ol class="work-list global-padding">
        <li  v-for="work in worksListSimple" :key="work.id">
          <router-link :to="{ name: 'work.detail', params: {id: work.id} }">
            <div class="work-item flex">
              <div class="work-cover">
                <div class="high-light"></div>
                <picture>
                  <source :srcset="coverDir + work?.id + '.webp'" type="image/webp">
                  <img class="work-img" :src="coverDir + work?.id + '.png'" :alt="work?.id">
                </picture>
              </div>
              <div class="work-text">
                <div class="work-title">
                  <h2 class="title-cn serif" style="position: relative;">
                    {{ work?.name }}
                  </h2>
                </div>
                <div class="work-desc">
                  <span class="work-platform-wrap">
                    <span class="work-platform after-comma" v-for="p in work.platform">{{ p }}</span>
                  </span>
                  <span class="work-tag after-comma" v-for="c in work.category">{{ c }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ol>
    </div>
    <global-footer />
  </div>
</template>

<style scoped lang="scss">
.content-wrap {
  margin: 0 auto;
  max-width: 1440px;
}
.title {
  margin-top: 96px;
  @media (max-width: 600px) {
    margin-top: 48px;
  }
}
.work-list {
  margin: 96px 0;
  @media (max-width: 600px) {
    margin: 56px 0;
  }
}
.work-item {
  align-items: center;
  gap: 36px;
  transition: transform .7s ease-out, opacity .7s ease-out;
  transform: translateY(25px);
  opacity: 0;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  @media (max-width: 600px) {
    gap: 8px;
  }
  &:hover {
    .high-light {
      opacity: 1;
      transform: translate(0, 0);
    }
    .work-img {
      transform: scale3d(1.05, 1.05, 1);
      transform-style: preserve-3d;
    }
  }
}
.work-item.inview {
  opacity: 1;
  transform: none;
}
.work-list li:not(:last-child) {
  margin-bottom: 96px;
  @media (max-width: 1000px) {
    margin-bottom: 72px;
  }
  @media (max-width: 600px) {
    margin-bottom: 56px;
  }
}
.work-cover {
  position: relative;
  flex: 2;
  overflow: hidden;
}
.work-img {
  transition: all .7s cubic-bezier(.3, 0, .2, 1);
}
.work-text {
  flex: 1;
}
.work-title {
  font-size: 28px;
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 20px;
  }
}
.work-desc {
  margin-top: 8px;
  font-size: 16px;
  opacity: .5;
  @media (max-width: 600px) {
    margin-top: 0px;
    font-size: 12px;
  }
}
.work-platform-wrap::after {
  content: '|';
  opacity: 0.5;
  margin: 0 4px;
}

</style>