<template>
  <svg
    viewBox="0 0 20 20"
    width="20px"
    height="20px"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    class="svg"
  >
    <desc>Arrow Icon</desc>
    <polyline fill="none" :stroke="color" stroke-width="2" points="3,5 10,12 17,5"></polyline>
  </svg>
</template>
<script>
export default {
  name: "Arrow",
  props: {
    color: {
      type: String,
      required: false,
      default: "#fff",
    },
  },
};
</script>
<style lang="scss" scoped>
.button-arrow.top .svg {
  transform: rotate(180deg);
}
.button-arrow.right .svg {
  transform: rotate(270deg);
}
.button-arrow.left .svg {
  transform: rotate(90deg);
}
</style>
