<template>
  <div
    class="responsive-button"
    @mouseover="showArrows = true"
    @mouseout="showArrows = false"
    :class="position"
  >
    <span
      v-for="(breakpoint, index) in sortedBreakpoints"
      :class="[breakpoint.name, 'breakpoint']"
      :style="[{ display: browserWidth > breakpoint.pixels ? 'block' : 'none' }, { zIndex: index }]"
      :key="`${breakpoint.name} - ${breakpoint.pixels}`"
      >{{ breakpoint.name }}</span
    >

    <div class="button-arrow top" v-show="showArrows" @click="moveY('top')">&uarr;</div>
    <div class="button-arrow bottom" v-show="showArrows" @click="moveY('bottom')">&darr;</div>
    <div class="button-arrow top left" v-show="showArrows" @click="moveX('left')">&larr;</div>
    <div class="button-arrow top right" v-show="showArrows" @click="moveX('right')">&rarr;</div>
  </div>
</template>

<script>
export default {
  name: "ResponsiveButton",
  props: {
    breakpoints: {
      type: Array,
      default: function() {
        return [
          {
            name: "xs",
            pixels: 450
          },
          {
            name: "s",
            pixels: 600
          },
          {
            name: "m",
            pixels: 800
          },
          {
            name: "l",
            pixels: 1000
          },
          {
            name: "xl",
            pixels: 1300
          }
        ];
      }
    }
  },
  data: function() {
    return {
      sortedBreakpoints: null,
      showArrows: false,
      positionArgs: { y: "bottom", x: "left" },
      currentBreakpoint: null,
      browserWidth: null
    };
  },
  methods: {
    moveY(direction) {
      this.positionArgs.y = direction;
    },
    moveX(direction) {
      this.positionArgs.x = direction;
    },
    setBrowserWidth() {
      this.browserWidth = window.innerWidth;
    }
  },
  computed: {
    position() {
      return this.positionArgs.y + " " + this.positionArgs.x;
    }
  },
  mounted() {
    this.browserWidth = window.innerWidth;
    window.addEventListener("resize", this.setBrowserWidth);

    let sorted = this.breakpoints;
    sorted.sort((a, b) => a.pixels - b.pixels);
    sorted = [{ pixels: 0, name: sorted[0].name }, ...sorted]; // Add in a zero pixel breakpoint in order for the logic to work
    this.sortedBreakpoints = sorted;
  }
};
</script>

<style scoped lang="scss">
$mini-button-border: 2px solid white;
$mini-button-background-color: hotpink;
$mini-button-text-color: white;
$mini-button-size: 35px;

$mini-button-arrow-background-color: darken($mini-button-background-color, 20%);
$mini-button-arrow-size: 20px;

.button-arrow {
  background-color: $mini-button-arrow-background-color;
  color: $mini-button-text-color;
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: darken($mini-button-arrow-background-color, 20%);
  }
  &.top {
    top: -$mini-button-arrow-size;
    height: $mini-button-arrow-size;
    width: 100%;
  }
  &.bottom {
    bottom: -$mini-button-arrow-size;
    height: $mini-button-arrow-size;
    width: 100%;
  }
  &.left {
    top: 0;
    left: -$mini-button-arrow-size;
    bottom: 0;
    width: $mini-button-arrow-size;
    height: $mini-button-size;
  }
  &.right {
    top: 0;
    right: -$mini-button-arrow-size;
    bottom: 0;
    width: $mini-button-arrow-size;
    height: $mini-button-size;
  }
}

.responsive-button {
  background-color: $mini-button-background-color;
  color: $mini-button-text-color;
  width: $mini-button-size;
  height: $mini-button-size;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 99;
  &.top {
    top: 0;
    bottom: auto;
  }
  &.left {
    left: 0;
    right: auto;
  }
  &.right {
    right: 0;
    left: auto;
  }
  &.bottom {
    bottom: 0;
    top: auto;
  }
}

.breakpoint {
  display: none;
  width: 100%;
  text-align: center;
  position: absolute;
  background-color: $mini-button-background-color;
}
</style>
