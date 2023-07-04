<script setup lang="ts">
import { ref, onMounted } from 'vue'

const navItems = [
  {
    cn: "作",
    en: "work",
    link: "/works"
  },
  // {
  //   cn: "杂",
  //   en: "misc",
  //   link: "/misc"
  // },
  {
    cn: "历",
    en: "about",
    link: "/about"
  },
]

const isMenuOn = ref(false)
const toggleMenu = () => {
  isMenuOn.value = !isMenuOn.value
  if (isMenuOn.value) {
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling')
  } else {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling')
  }
}
const closeMenu = () => {
  isMenuOn.value = false
  document.getElementsByTagName('body')[0].classList.remove('stop-scrolling')
}

onMounted(() => {
  window.addEventListener('resize', () => {
    if ((window.innerWidth > 600) && isMenuOn.value) {
      closeMenu()
    }
  })
})
</script>

<template>
  <header class="flex flex-col" :class="{ 'menu-open': isMenuOn }">
    <div class="flex justify-between items-center global-padding" style="height: 48px;">
      <router-link to="/" @click="closeMenu">
        <div class="animate__animated animate__fadeInDown" style="font-weight: 600;font-size: 18px;">kit.</div>
      </router-link>
      <nav class="gap-12">
        <router-link v-for="(navItem, index) in navItems"
          class="flex items-end nav-item animate__animated animate__fadeInDown"
          :style="'animation-delay: ' + (index + 1) * .2 + 's'" :to="navItem.link">
          <span class="text-cn serif">{{ navItem.cn }}</span>
          <span class="text-en">{{ navItem.en }}</span>
        </router-link>
      </nav>
      <button class="btn-menu animate__animated animate__fadeInDown" :class="{ active: isMenuOn }" @click="toggleMenu">
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="nav-menu flex flex-col justify-center gap-y-6" v-if="isMenuOn">
      <router-link v-for="(navItem, index) in navItems"
        class="nav-menu-item align-baseline animate__animated animate__fadeIn"
        :style="'animation-delay: ' + ((index + 1) * .1 + .2) + 's'" :to="navItem.link" @click="closeMenu">
        <span class="text-cn serif">{{ navItem.cn }}</span>
        <span class="text-en">{{ navItem.en }}</span>
      </router-link>
    </div>
  </header>
</template>

<style lang="scss">
header {
  position: fixed;
  width: 100%;
  height: 48px;
  background-color: rgba(30, 31, 33, .7);
  backdrop-filter: blur(12px);
  z-index: 9;
  transition: all .4s ease;
}

@media (max-width: 600px) {
  .menu-open {
    height: 100vh;
    background-color: rgba(30, 31, 33, .9);
  }
}

// 常规宽度的导航块
nav {
  display: flex;

  @media (max-width: 600px) {
    display: none;
  }
  // 常规宽度的导航项
  .nav-item {
    cursor: pointer;

    .text-cn {
      font-size: 18px;
      font-weight: 700;
    }

    .text-en {
      line-height: 18px;
      margin-left: -8px;
      opacity: .5;
      filter: blur(1.5px);
      transition: all 0.5s cubic-bezier(.7, 0, .3, 1);
    }

    &:hover {
      .text-en {
        opacity: 1;
        margin-left: 2px;
        filter: blur(0px);
      }
    }
  }
  .router-link-active {
    .text-en {
      margin-left: 2px;
      filter: none;
    }
  }
}

// 窄宽度时 菜单按钮
.btn-menu {
  display: none;
  position: relative;
  width: 48px;
  height: 48px;
  margin-right: -13px;
  border: none;

  span {
    position: absolute;
    display: block;
    left: 15px;
    height: 1.2px;
    width: 18px;
    transition: all .3s ease;
    background: white;

    &:nth-child(1) {
      top: 17px;
    }

    &:nth-child(2) {
      top: 25px;
    }
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    display: block;
  }
}
// 窄宽度时 菜单按钮的激活状态样式，就是变成 X
.active {
  span {
    &:nth-child(1) {
      left: 15px;
      top: 24px !important;
      transform: rotate(45deg);
    }
    &:nth-child(2) {
      left: 15px;
      top: 24px !important;
      transform: rotate(-45deg);
    }
  }
}

// 窄宽度时展开的导航菜单
.nav-menu {
  display: none;
  flex-grow: 1;

  .nav-menu-item {
    height: 64px;
    display: flex;
    align-items: flex-end;
    padding: 0 32px;

    .text-cn {
      font-size: 28px;
    }

    .text-en {
      margin-left: 4px;
      opacity: .5;
      transition: all .3s ease;
    }

    &:hover {
      .text-en {
        margin-left: 8px;
        opacity: 1;
      }
    }
  }

  .router-link-active {
    .text-en {
      opacity: 1;
    }
  }
  
  @media (max-width: 600px) {
    display: flex;
  }
}

.animate__animated.animate__fadeIn {
  --animate-duration: 1s;
}

// 展开导航菜单式禁止滚动的样式
.stop-scrolling {
  height: 100%;
  overflow: hidden;
}
</style>
