<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
      default: "medium"
    },
    borderRadius: {
      type: String,
      default: "medium"
    },
    hasBackground: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      let baseClasses = "border border-neutral-200";
      if (this.hasBackground) {
        baseClasses += " bg-white";
      }
      if (this.padding === "large") {
        baseClasses += " p-4 sm:p-8";
      } else if (this.padding === "medium") {
        baseClasses += " p-4";
      } else if (this.padding === "small") {
        baseClasses += " p-1 sm:p-2";
      } else if (this.padding === "none") {
        baseClasses += " p-0";
      }

      if (this.borderRadius === "large") {
        baseClasses += " rounded-xl";
      } else if (this.borderRadius === "medium") {
        baseClasses += " rounded-md";
      } else if (this.borderRadius === "small") {
        baseClasses += " rounded-sm";
      } else if (this.borderRadius === "none") {
        baseClasses += " rounded-none";
      }
      return baseClasses;
    }
  }
};
</script>
