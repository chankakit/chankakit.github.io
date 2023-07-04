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
    <div class="flex align-baseline" style="margin-top: 16px;">
      <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5124 20.0441C21.3906 20.1305 21.3108 20.2721 21.3108 20.4323C21.3108 20.4851 21.3228 20.5337 21.3366 20.5841C21.4578 21.0335 21.651 21.7541 21.6606 21.7871C21.675 21.8441 21.6996 21.9029 21.6996 21.9617C21.6996 22.0937 21.5922 22.2005 21.459 22.2005C21.4074 22.2005 21.3648 22.1813 21.321 22.1561L19.7447 21.2513C19.6253 21.1829 19.5005 21.1415 19.3625 21.1415C19.2887 21.1415 19.2179 21.1529 19.1507 21.1727C18.4151 21.3827 17.6219 21.5003 16.7998 21.5003C12.8241 21.5003 9.59967 18.8302 9.59967 15.5356C9.59967 12.2421 12.8241 9.57202 16.7998 9.57202C20.7767 9.57202 24 12.2421 24 15.5356C24 17.3326 23.0304 18.9509 21.5124 20.0441M14.4009 14.5206C14.8983 14.5206 15.3003 14.121 15.3003 13.6272C15.3003 13.1334 14.8983 12.7332 14.4009 12.7332C13.9047 12.7332 13.5021 13.1334 13.5021 13.6272C13.5021 14.121 13.9047 14.5206 14.4009 14.5206M19.1998 14.5206C19.6967 14.5206 20.0999 14.121 20.0999 13.6272C20.0999 13.1334 19.6967 12.7332 19.1998 12.7332C18.7036 12.7332 18.301 13.1334 18.301 13.6272C18.301 14.121 18.7036 14.5206 19.1998 14.5206M8.79261 3C13.1781 3 16.8136 5.57886 17.4754 8.95034C17.3176 8.94254 17.1586 8.93774 16.9984 8.93774C12.5703 8.93774 8.97982 11.8196 8.97982 15.3747C8.97982 15.9741 9.08422 16.5543 9.27503 17.1045C9.11542 17.1111 8.95402 17.1153 8.79261 17.1153C7.78879 17.1153 6.82037 16.9773 5.92274 16.7289C5.84054 16.7049 5.75414 16.6917 5.66414 16.6917C5.49553 16.6917 5.34193 16.7409 5.19733 16.8213L3.27248 17.8918C3.21908 17.9218 3.16688 17.9446 3.10268 17.9446C2.94127 17.9446 2.80987 17.818 2.80987 17.662C2.80987 17.5924 2.83867 17.5228 2.85727 17.4562C2.86867 17.416 3.10508 16.5639 3.25268 16.0317C3.27068 15.9723 3.28448 15.9147 3.28448 15.8529C3.28448 15.6627 3.18728 15.4947 3.03787 15.3921C1.18443 14.0985 0 12.1844 0 10.0574C0 6.15968 3.9367 3 8.79261 3M5.86163 8.80059C6.43525 8.80059 6.90026 8.35238 6.90026 7.79976C6.90026 7.24655 6.43525 6.79834 5.86163 6.79834C5.28742 6.79834 4.82181 7.24655 4.82181 7.79976C4.82181 8.35238 5.28742 8.80059 5.86163 8.80059M11.723 8.80059C12.2966 8.80059 12.7622 8.35238 12.7622 7.79976C12.7622 7.24655 12.2966 6.79834 11.723 6.79834C11.1494 6.79834 10.6838 7.24655 10.6838 7.79976C10.6838 8.35238 11.1494 8.80059 11.723 8.80059" fill="#888888"/>
      </svg>
      <div class="contact-info wx-dom" style="width: 120px;" @mouseenter="handleMouseEnter('wx')"
        @mouseleave="handleMouseLeave('wx')" @click="copyInfo(displayWx, 'wx')"
        data-clipboard-target="#info-wx">
        <span id="info-wx">{{ displayWx }}</span>
        <Transition name="fade"><span class="copied-tips" v-if="wxCopiedShow">copied</span></Transition>
      </div>
    </div>

    <div class="flex align-baseline" style="margin-top: 8px;">
      <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M3 19.5C2.44772 19.5 2 19.0523 2 18.5V5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V18.5C22 19.0523 21.5523 19.5 21 19.5H3ZM4.60006 6.20006C4.15823 5.86869 3.53143 5.95823 3.20006 6.40006C2.86869 6.84189 2.95823 7.46869 3.40006 7.80006L11.4001 13.8001C11.7556 14.0667 12.2445 14.0667 12.6001 13.8001L20.6001 7.80006C21.0419 7.46869 21.1314 6.84189 20.8001 6.40006C20.4687 5.95823 19.8419 5.86869 19.4001 6.20006L12.0001 11.7501L4.60006 6.20006Z"
          fill="#888888" />
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
