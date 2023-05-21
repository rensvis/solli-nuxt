<template>
  <button v-if="!navigateTo" :class="[buttonClass, buttonSize, buttonDisabled]" @click="handleClick" :disabled="disabled">
    {{ label }}
  </button>
  <NuxtLink v-else :to="navigateTo" :class="[buttonClass, buttonSize, buttonDisabled]">
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
  },
  disabled: {
    type: Boolean,
    default: false
  },
  navigateTo: {
    type: Object as PropType<any>,
    default: null
  }
});

// Use props
const type = ref(props.type);
const label = ref(props.label);
const onClick = ref(props.onClick);
const navigateTo = ref(props.navigateTo);
const size = ref(props.size);

// Compute button class based on type
const buttonClass = computed(() => {
  switch (type.value) {
    case 'outlined':
      return 'rounded border border-blue-500 text-blue-500';
    case 'textbutton':
      return 'rounded text-blue-500';
    case 'danger':
      return 'rounded bg-red-400 text-white';
    default:
      return 'rounded bg-blue-500 text-white';
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

// Compute button disabled
const buttonDisabled = computed(() => {
  return (props.disabled) ? 'bg-neutral-400 cursor-not-allowed' : '';
});

// Handle click
const handleClick = () => {
  if (onClick.value) {
    onClick.value();
  }
};
</script>
