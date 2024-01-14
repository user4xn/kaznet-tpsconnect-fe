<template>
  <div id="loading">
    <div :class="`loader simple-loader ${!show ? 'd-none' : ''}`">
      <div class="loader-body d-flex justify-content-center align-items-center">
        <img src="@/assets/images/loader-red.webp" alt="loader" class="light-loader img-fluid w-25" width="200" height="200" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
