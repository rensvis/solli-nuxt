<template>
  <button v-if="!to" :class="[baseClass, buttonClass, buttonSize, buttonDisabled]" @click="handleClick"
    :disabled="disabled">
    <slot></slot>
  </button>
  <NuxtLink v-else :to="to" :class="[baseClass, buttonClass, buttonSize, buttonDisabled]"
    :target="isExternalLink ? '_blank' : ''" class="inline-block">
    <slot></slot>
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
  onClick: Function,
  size: {
    type: String,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  to: {
    default: null
  }
});

// Use props
const type = ref(props.type);
const onClick = ref(props.onClick);
const to = ref(props.to);
const size = ref(props.size);

// Compute whether link is external
const isExternalLink = computed(() => {
  return (to.value && to.value['startsWith'] && to.value?.startsWith('https'));
});

const baseClass = 'transition';

// Compute button class based on type
const buttonClass = computed(() => {
  switch (type.value) {
    case 'outlined':
      return 'rounded border border-keppel-500 text-keppel-500 hover:bg-keppel-100';
    case 'textbutton':
      return 'rounded text-keppel-500 hover:bg-keppel-100';
    case 'danger':
      return 'rounded bg-red-400 text-white';
    default:
      return 'rounded bg-keppel-500 text-white hover:bg-keppel-600';
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
