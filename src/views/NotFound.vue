<script setup lang="ts">

</script>
<template>
  <div class="not-found">
    <h1 style="padding-top:48px;">
      <b>PAGE NOT FOUND</b> 
    </h1>
    <p>
      couldn't find that page. Try going
      <router-link to="/">
        <span class="hover-underline-animation">home</span>
      </router-link>
    </p>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  span {
    font-weight: 700;
    color: white;
    opacity: 1;
  }
}
</style>