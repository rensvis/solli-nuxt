<script setup>

</script>

<template>
  <section class="flex items-center min-h-[100svh] py-56">
    <div class="h-full c-container--s">
      <h2 class="mb-20 text-5xl font-bold text-center">Hoe werkt Solli?</h2>

      <div class="gap-8 mb-12 md:flex">
        <div class="flex flex-col items-center max-w-xs mx-auto mb-20 text-center md:mb-0 basis-1/3">
          <img src="/images/pages/voor-werkgevers/cv.png" alt="Vacature" class="w-32 mb-10">
          <h3 class="mb-4 text-2xl font-medium">Plaats een vacature</h3>
          <p class="">Wil jij jouw vacature gratis geplaatst hebben? Vul dan <a
              href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__abcTuNUNDVVTFEzWDlSWkRMMlpVMzg3NUExSTUwTi4u"
              target="_blank" class="underline decoration-wavy">dit
              formulier</a> in!
          </p>
        </div>
        <div class="flex flex-col items-center max-w-xs mx-auto mb-20 text-center md:mb-0 basis-1/3">
          <img src="/images/pages/voor-werkgevers/social-media.png" alt="Vacature" class="w-32 mb-10">
          <h3 class="mb-4 text-2xl font-medium">Solli magic</h3>
          <p class="">Door onze social media strategie weten wij de juiste doelgroep te bereiken!</p>
        </div>
        <div class="flex flex-col items-center max-w-xs mx-auto mb-20 text-center md:mb-0 basis-1/3">
          <img src="/images/pages/voor-werkgevers/inbox.png" alt="Vacature" class="w-32 mb-10">
          <h3 class="mb-4 text-2xl font-medium">Direct contact</h3>
          <p class="">Bij interesse kan de bijbaanzoeker direct contact opnemen via de website. Dit komt meteen binnen in
            jouw mailbox!</p>
        </div>
      </div>

      <div class="flex justify-center">
        <Button
          :to="'https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__abcTuNUNDVVTFEzWDlSWkRMMlpVMzg3NUExSTUwTi4u'"
          type="primary" size="large">Plaats een vacature</Button>
      </div>

    </div>
  </section>
</template>

