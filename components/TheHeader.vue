<script>
export default {
  data() {
    return {
      isMobileMenuVisible: false,
      scrolledDown: false,
    };
  },
  computed: {
    headerClasses() {
      return [
        'transition-shadow',
        this.scrolledDown ? 'shadow-md' : 'shadow-none',
      ];
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolledDown = window.scrollY > 0;
    },
    toggleMobileMenu() {
      console.log('toggleMobileMenu');
      this.isMobileMenuVisible = !this.isMobileMenuVisible;
      if (this.isMobileMenuVisible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  },
};

</script>
<template>
  <header :class="headerClasses"
    class="fixed top-0 left-0 right-0 z-10 flex items-center p-5 header md:text-lg bg-neutral-50">
    <NuxtLink to="/">
      <div class="logo">
        <img src="/images/solli-s-logo.png" alt="logo" class="h-10" />
      </div>
    </NuxtLink>
    <nav class="hidden ml-auto sm:block">
      <ul class="flex">
        <li class="mx-7">
          <NuxtLink to="/voor-werkgevers">Voor werkgevers</NuxtLink>
        </li>
        <li class="">
          <a href="https://www.instagram.com/solli.nl/" target="_blank" rel="noreferrer" class="">
            <font-awesome-icon icon="fa-brands fa-instagram" class="text-xl" />
          </a>
        </li>
        <!-- <li class="ml-7">
                                <NuxtLink to="/about">About</NuxtLink>
                                  </li> -->
      </ul>
    </nav>

    <div class="ml-auto sm:hidden">
      <div class="hamburger" v-on:click="toggleMobileMenu" :class="{ 'hamburger--open': isMobileMenuVisible }">
        <div class="hamburger__line"></div>
        <div class="hamburger__line"></div>
      </div>
    </div>
    <div class="text-xl mobile-menu sm:hidden" :class="{ 'mobile-menu--visible': isMobileMenuVisible }">
      <ul class="flex">
        <li class="mx-7">
          <NuxtLink to="/" v-on:click="toggleMobileMenu">Home</NuxtLink>
        </li>
        <li class="mx-7">
          <NuxtLink to="/voor-werkgevers" v-on:click="toggleMobileMenu">Voor werkgevers</NuxtLink>
        </li>
        <li class="">
          <a href="https://www.instagram.com/solli.nl/" target="_blank" rel="noreferrer" class="">
            <font-awesome-icon icon="fa-brands fa-instagram" class="text-2xl" />
          </a>
        </li>
        <!-- <li class="ml-7">
                                <NuxtLink to="/about" v-on:click="toggleMobileMenu">About</NuxtLink>
                              </li> -->
      </ul>
    </div>

  </header>
</template>

<style scoped lang="scss">
.logo,
.hamburger {
  z-index: 101;
  position: relative;
}

.hamburger {
  display: flex;
  flex-direction: column;
  align-items: flex-end;



  &__line {
    width: 30px;
    height: 2px;
    background-color: #000;
    margin: 3px 0;
    transition: all 0.3s ease;

    &:nth-of-type(2) {
      width: 20px;
    }
  }

  &--open {
    .hamburger__line {
      &:nth-of-type(1) {
        transform: rotate(45deg) translateY(1px);
        margin: 0;
      }

      &:nth-of-type(2) {
        transform: rotate(-45deg) translateY(-1px);
        width: 30px;
        margin: 0;
      }
    }
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 100;
  transform: translateX(100%);
  transition: all 0.3s ease;

  &--visible {
    transform: translateX(0);
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 20px 0;
    }
  }
}
</style>