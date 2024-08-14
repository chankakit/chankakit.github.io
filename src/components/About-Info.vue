<script setup lang="ts">
import personalInfo from '@/common/personal-info'
//import Contact from '../components/Contact.vue'
</script>

<template>
  <div class="info-wrap  global-padding">
    <div class="info-item">
      <div class="flex items-end info-subtitle">
        <div class="info-subtitle-cn">教育</div>
        <div class="info-subtitle-en">education</div>
      </div>
      <ul class="info-detail">
        <li class="flex info-detail-item" v-for="edu in personalInfo.education">
          <span class="desc-text">{{ edu.degree }}</span>
          <div class="main-text">{{ edu.school }}</div>
        </li>
      </ul>
    </div>
    <div class="info-item">
      <div class="flex items-end info-subtitle">
        <div class="info-subtitle-cn">工作</div>
        <div class="info-subtitle-en">work</div>
      </div>
      <ul class="info-detail">
        <li class="flex info-detail-item" v-for="workExp in personalInfo.workExp">
          <div class="dur-time">
            <span class="desc-text span-box" v-for="c in workExp.startTime">{{ c }}</span>
            <span class="to-line"></span>
            <span class="desc-text span-box" v-for="c in workExp.endTime">{{ c }}</span>
          </div>
          <div>
            <div class="main-text">{{ workExp.company }}</div>
            <div class="main-text" style="opacity: .6;;">{{ workExp.title }}</div>
          </div>
        </li>
      </ul>
    </div>
    <slot></slot>
    <!--<contact :wx-b64="personalInfo.wechat" :mail-b64="personalInfo.mail"></contact>-->
  </div>
</template>

<style lang="scss">
.info-item {
  margin-top: 48px;

  .info-detail {
    padding-left: 24px;
  }

  .dur-time {
    display: flex;
    align-items: center;
    height: fit-content;
  }

  .to-line {
    display: block;
    margin: 0 4px;
    width: 5px;
    height: 1px;
    background-color: #ccc;
  }

  .desc-text {
    color: #ccc;
  }

  .desc-text.span-box {
    display: inline-block;
    width: 8px;
    text-align: center;

    @media (max-width: 600px) {
      width: 7.5px;
    }
  }

  .main-text {
    margin-left: 16px;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    margin-top: 32px;

    .info-detail {
      padding-left: 15px;
    }

    .desc-text {
      font-size: 14px;
    }

    .main-text {
      font-size: 14px;
    }
  }
}

.info-subtitle {
  margin-bottom: 16px;
  padding-left: 16px;
  border-left: 8px solid white;

  .info-subtitle-cn {
    font-weight: 600;
  }

  .info-subtitle-en {
    margin-left: 4px;
    line-height: 19px;
    font-family: "Avenir Next", Helvetica, "PingFang SC", Arial, sans-serif;
    opacity: .5;
  }

  @media (max-width: 600px) {
    margin-bottom: 8px;
    padding-left: 8px;
    border-left: 5px solid white;

    .info-subtitle-en {
      font-size: 14px;
    }
  }
}

.info-detail-item:not(:first-child) {
  margin-top: 8px;
}
</style>
