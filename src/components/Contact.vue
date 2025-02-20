<script setup lang="ts">
import isMobile from '@/common/is-mobile'
import { ref, onMounted } from 'vue'

let actTips:string
if (isMobile) {
  actTips = "(tap to decode)"
} else {
  actTips = "(hover to decode, click to copy)"
}

const props = defineProps<{
  wxB64: string,
  mailB64: string
}>()

const displayWx = ref(props.wxB64)
const displayMail = ref(props.mailB64)

const inWxDom = ref(false)
const inMailDom = ref(false)

const handleMouseEnter = (target: string) => {
  if (target == 'mail') {
    inMailDom.value = true
  }
  else {
    inWxDom.value = true
  }
  setTimeout(function () {
    if (target == 'mail' && inMailDom.value) {
      textChangeAnimate(displayMail.value, atob(props.mailB64), displayMail)
    }
    else if (target == 'wx' && inWxDom.value) {
      textChangeAnimate(displayWx.value, atob(props.wxB64), displayWx)
    }
  }, 200)
}

const handleMouseLeave = (target: string) => {
  if (target == 'mail') {
    inMailDom.value = false
    textChangeAnimate(displayMail.value, props.mailB64, displayMail)
    mailCopiedShow.value = false
  }
  else {
    inWxDom.value = false
    textChangeAnimate(displayWx.value, props.wxB64, displayWx)
    wxCopiedShow.value = false
  }
}
const textChangeAnimate = (originalText: string, targetText: string, target: any) => {
  let originalPart = ''
  let targetPart = ''

  function setValue(i: number, decodePart: string, base64Part: string, target: any) {
    setTimeout(function () {
      target.value = decodePart + base64Part
    }, i * 30);
  }

  let l = Math.max(originalText.length, targetText.length)
  for (let i = 0; i <= l; i++) {
    targetPart = targetText.substring(0, i)
    originalPart = originalText.substring(i, originalText.length)

    setValue(i, targetPart, originalPart, target)

    targetPart = ''
  }
}

let mailCopiedShow = ref(false)
let wxCopiedShow = ref(false)
const copyInfo = async (_info: string, target: string) => {
  if(!isMobile) {
    if (target == 'mail') {
      mailCopiedShow.value = true
    }
    else {
      wxCopiedShow.value = true
    }
  }
}

onMounted(async() => {
  if(!isMobile) {
    const Clipboard = (await import('clipboard')).default
    new Clipboard('.contact-info')
  }
})
</script>

<template>
  <div class="contact sans-serif">
    <h3 class="semi-bold" style="margin-bottom: 12px;">
      contact
      <span style="font-size: 12px; font-weight: 400; opacity: .35; margin-left: 8px;">
        {{ actTips }}
      </span>
    </h3>
    <div class="flex" style="margin-top: 16px; align-items: center;">
      <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7196 19.424C20.608 19.5032 20.5348 19.633 20.5348 19.7798C20.5348 19.8282 20.5458 19.8728 20.5585 19.919C20.6696 20.3309 20.8467 20.9915 20.8555 21.0218C20.8687 21.074 20.8912 21.1279 20.8912 21.1818C20.8912 21.3028 20.7928 21.4007 20.6707 21.4007C20.6234 21.4007 20.5843 21.3831 20.5442 21.36L19.0993 20.5306C18.9899 20.4679 18.8754 20.4299 18.7489 20.4299C18.6813 20.4299 18.6164 20.4404 18.5548 20.4586C17.8805 20.6511 17.1534 20.7589 16.3998 20.7589C12.7555 20.7589 9.7997 18.3113 9.7997 15.2912C9.7997 12.2722 12.7555 9.82462 16.3998 9.82462C20.0453 9.82462 23 12.2722 23 15.2912C23 16.9385 22.1112 18.4219 20.7196 19.424M14.2008 14.3608C14.6568 14.3608 15.0253 13.9945 15.0253 13.5418C15.0253 13.0892 14.6568 12.7223 14.2008 12.7223C13.746 12.7223 13.3769 13.0892 13.3769 13.5418C13.3769 13.9945 13.746 14.3608 14.2008 14.3608M18.5999 14.3608C19.0553 14.3608 19.4249 13.9945 19.4249 13.5418C19.4249 13.0892 19.0553 12.7223 18.5999 12.7223C18.145 12.7223 17.7759 13.0892 17.7759 13.5418C17.7759 13.9945 18.145 14.3608 18.5999 14.3608M9.0599 3.80029C13.0799 3.80029 16.4125 6.16424 17.0191 9.25476C16.8745 9.24761 16.7287 9.24321 16.5819 9.24321C12.5228 9.24321 9.23151 11.8849 9.23151 15.1437C9.23151 15.6932 9.32721 16.2251 9.50211 16.7294C9.35581 16.7355 9.20786 16.7393 9.0599 16.7393C8.13973 16.7393 7.25202 16.6128 6.4292 16.3851C6.35385 16.3631 6.27464 16.351 6.19214 16.351C6.03759 16.351 5.89679 16.3961 5.76423 16.4698L3.9998 17.451C3.95084 17.4785 3.90299 17.4994 3.84414 17.4994C3.69619 17.4994 3.57574 17.3834 3.57574 17.2404C3.57574 17.1766 3.60214 17.1128 3.61919 17.0517C3.62964 17.0149 3.84634 16.2339 3.98165 15.746C3.99815 15.6915 4.0108 15.6387 4.0108 15.5821C4.0108 15.4077 3.92169 15.2537 3.78474 15.1597C2.08575 13.9739 1.00003 12.2193 1.00003 10.2695C1.00003 6.69666 4.60866 3.80029 9.0599 3.80029M6.37317 9.11725C6.89898 9.11725 7.32524 8.70639 7.32524 8.19983C7.32524 7.69272 6.89898 7.28186 6.37317 7.28186C5.84681 7.28186 5.42 7.69272 5.42 8.19983C5.42 8.70639 5.84681 9.11725 6.37317 9.11725M11.7461 9.11725C12.2719 9.11725 12.6987 8.70639 12.6987 8.19983C12.6987 7.69272 12.2719 7.28186 11.7461 7.28186C11.2203 7.28186 10.7935 7.69272 10.7935 8.19983C10.7935 8.70639 11.2203 9.11725 11.7461 9.11725" fill="#888888"/>
      </svg>
      <div class="contact-info wx-dom" style="width: 120px;" @mouseenter="handleMouseEnter('wx')"
        @mouseleave="handleMouseLeave('wx')" @click="copyInfo(displayWx, 'wx')"
        data-clipboard-target="#info-wx">
        <span id="info-wx">{{ displayWx }}</span>
        <Transition name="fade"><span class="copied-tips" v-if="wxCopiedShow">copied</span></Transition>
      </div>
    </div>
    <div class="flex" style="margin-top: 8px; align-items: center;">
      <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.22386 5 2 5.22386 2 5.5V18.5C2 18.7761 2.22386 19 2.5 19H21.5C21.7761 19 22 18.7761 22 18.5V5.5C22 5.22386 21.7761 5 21.5 5H2.5ZM3.30696 6.60547L2.69302 7.39482L12 14.6336L21.307 7.39482L20.693 6.60547L12 13.3667L3.30696 6.60547Z" fill="#888888"/>
      </svg>
      <div class="contact-info" style="width: 270px;" @mouseenter="handleMouseEnter('mail')"
        @mouseleave="handleMouseLeave('mail')" @click="copyInfo(displayMail, 'mail')"
        data-clipboard-target="#info-mail">
        <span id="info-mail">{{ displayMail }}</span>
        <Transition name="fade"><span class="copied-tips" v-if="mailCopiedShow">copied</span></Transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 复制信息提示动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.contact {
  margin-top: 48px;

  .contact-info {
    margin-left: 8px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #ccc;
    background-color: transparent;
    cursor: pointer;
    white-space: nowrap;
  }

  .copied-tips {
    display: inline-block;
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 600px) {
    .contact-info {
      margin-left: 4px;
      font-size: 14px;;
    }

    .copied-tips {
      margin-left: 3px;
    }

    .contact-icon {
      width: 18px;
    }
  }
}
</style>
