<template>
  <div class="banner" :class="{ 'banner--open': showBanner }">
    <div class="w-full bg-texas-100 banner__content">
      <div class="flex items-start justify-between p-4">
        <div></div>
        <p class="my-auto lg:text-center">
          🫵 Ben jij één van de eerste <b>5 sollicitanten</b> die een bijbaantje vindt via Solli? Dan win jij een
          <b>cadeaubon t.w.v. 20 euro</b> van een lokale ondernemer voor een lekkere lunch, ijskoffie of
          woonaccessoires.
          ⭐️😍💪
        </p>
        <div class="basis-12 shrink-0">
          <client-only>
            <button class="p-1 ml-6 text-lg cursor-pointer" @click="hideBanner">
              <font-awesome-icon icon="fas fa-xmark" size="lg" aria-label="Sluit banner" />
            </button>
          </client-only>
        </div>
      </div>
    </div>
  </div>
  <header :class="headerClasses" class="sticky top-0 left-0 right-0 z-10 ">
    <div class="flex items-center p-5 header md:text-lg bg-neutral-50">
      <NuxtLink to="/">
        <div class="logo">
          <img src="/images/solli-s-logo.png" alt="logo" class="h-10" height="40" width="32" />
        </div>
      </NuxtLink>
      <nav class="hidden ml-auto sm:block">
        <ul class="flex">
          <li class="mx-3">
            <NuxtLink to="/">Alle baantjes</NuxtLink>
          </li>
          <li class="mx-3 mr-16">
            <NuxtLink to="/voor-werkgevers">Voor werkgevers</NuxtLink>
          </li>
          <li class="">
            <client-only>
              <a href="https://www.instagram.com/solli.nl/" target="_blank" rel="noreferrer" class=""
                aria-label="Volg Solli op Instagram">
                <font-awesome-icon icon="fa-brands fa-instagram" class="text-xl" />
              </a>
            </client-only>
          </li>
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
            <NuxtLink to="/" v-on:click="toggleMobileMenu" class="block mx-2">Alle baantjes</NuxtLink>
          </li>
          <li class="mx-7">
            <NuxtLink to="/voor-werkgevers" v-on:click="toggleMobileMenu" class="block mx-2">Voor werkgevers</NuxtLink>
          </li>
          <li class="">
            <client-only>
              <a href="https://www.instagram.com/solli.nl/" target="_blank" rel="noreferrer" class=""
                aria-label="Volg Solli op Instagram">
                <font-awesome-icon icon="fa-brands fa-instagram" class="text-2xl" />
              </a>
            </client-only>
          </li>
        </ul>
      </div>

    </div>
  </header>
</template>

<style lang="scss">
.banner {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .5s ease-in-out;

  &__content {
    overflow: hidden;
    grid-row: span 2;
  }

  &--open {
    grid-template-rows: 1fr;
  }
}
</style>

<script setup lang="ts">
const isMobileMenuVisible = ref(false);
let scrolledDown = ref(false);
const showBanner = ref(true);

const headerClasses = computed(() => {
  return [
    'transition-shadow',
    scrolledDown.value ? 'shadow-md' : 'shadow-none',
  ];
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  scrolledDown.value = window.scrollY > 0;
};
const toggleMobileMenu = () => {
  isMobileMenuVisible.value = !isMobileMenuVisible.value;
  if (isMobileMenuVisible.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
};
const hideBanner = () => {
  showBanner.value = false;
};
</script>


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