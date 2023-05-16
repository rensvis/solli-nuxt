<template>
  <button v-if="!to" :class="[buttonClass, buttonSize]" @click="handleClick">
    {{ label }}
  </button>
  <NuxtLink v-else :to="to" :class="[buttonClass, buttonSize]">
    {{ label }}
  </NuxtLink>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue';

// Define props
const props = defineProps({
  type: {
    type: String,
    default: 'solid'
  },
  label: String,
  onClick: Function,
  to: String,
  size: {
    type: String,
    default: 'medium'
  }
});

// Use props
const type = ref(props.type);
const label = ref(props.label);
const onClick = ref(props.onClick);
const to = ref(props.to);
const size = ref(props.size);

// Compute button class based on type
const buttonClass = computed(() => {
  switch (type.value) {
    case 'outlined':
      return 'border border-blue-500 text-blue-500 rounded';
    case 'textbutton':
      return 'text-blue-500';
    default:
      return 'bg-blue-500 text-white rounded';
  }
});

// Compute button size
const buttonSize = computed(() => {
  switch (size.value) {
    case 'small':
      return 'text-xs px-2 py-1';
    case 'large':
      return 'text-lg px-6 py-3';
    default:
      return 'text-base px-4 py-2';
  }
});

// Handle click
const handleClick = () => {
  if (onClick.value) {
    onClick.value();
  }
};
</script>
