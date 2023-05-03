<script setup>
</script>

<template>
  <section class="h-screen">
    <div class="h-full sm:px-16 c-container">
      <div class="flex flex-col items-center justify-center w-[700px] max-w-full h-full m-auto">
        <img src="/images/solli-logo-color.png" alt="logo" class="mb-10 sm:mb-16" />
        <h2 class="mb-6 text-2xl font-bold text-center max-[400px]:text-xl sm:text-3xl md:text-3xl sm:mb-12">Vanaf 1 juni
          vind je hier alle
          bijbaantjes bij jou in de
          buurt!
        </h2>
        <!-- <LinkButton text="Volg ons op Instagram"></LinkButton> -->
        <a href="https://www.instagram.com/solli.nl/" target="_blank" rel="noreferrer"
          class="flex items-center text-xl md:text-2xl max-[400px]:text-lg">
          <ClientOnly>
            <font-awesome-icon icon="fa-brands fa-instagram" class="mr-3 text-2xl max-[400px]:mr-1 max-[400px]:text-xl" />
          </ClientOnly>
          <span>
            Volg ons alvast op Instagram
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

