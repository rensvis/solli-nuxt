<script>
export default {
  props: {
    type: {
      /**
       * The type of button. Can be either 'link' or 'button'.
       */
      type: String,
      default: 'link',
      required: false,
    },
    /**
     * The URL to link to. Only used if type is 'link'.
     */
    url: {
      type: String,
      default: '',
      required: false,
    },
    /**
     * The text to display on the button.
     */
    text: {
      type: String,
      default: '',
      required: false,
    },
    /**
     * onClick event handler.
     */
    onClick: {
      type: Function,
      default: () => { },
      required: false,
    },
  }
};
</script>

<template>
  <a :href="link" class="button">
    {{ text }}
  </a>
</template>

<style lang="scss" scoped>
.button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  // font-size: 1.2rem;
  letter-spacing: 0.1rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
  }
}
</style>