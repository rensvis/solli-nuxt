<script setup lang="ts">
const gifUrl = ref('');

useHead({
  meta: [{
    hid: 'description',
    name: 'description',
    content: 'Oh oh, die pagina bestaat niet (meer).'
  }],
  title: '404 pagina niet gevonden',
});

const getGif = async () => {
  const gifs = [
    'https://media.giphy.com/media/gPdC6JQLdJxP9dy3A8/giphy-downsized-large.gif',
    'https://media.giphy.com/media/3oEjI80DSa1grNPTDq/giphy.gif',
    'https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif',
    'https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif',
    'https://media.giphy.com/media/iJJ6E58EttmFqgLo96/giphy.gif',
    'https://media.giphy.com/media/T1WqKkLY753dZghbu6/giphy.gif',
    'https://media.giphy.com/media/T1WqKkLY753dZghbu6/giphy.gif',
    'https://media.giphy.com/media/14aUO0Mf7dWDXW/giphy.gif',
    'https://media.giphy.com/media/26tPoyDhjiJ2g7rEs/giphy.gif',
    'https://media.giphy.com/media/9n5UIlRppk91e/giphy.gif',


  ];
  const item = gifs[Math.floor(Math.random() * gifs.length)];
  gifUrl.value = item;
};
getGif()

</script>

<template>
  <div class="py-10">
    <div class="c-container md:mb-0">
      <h1 class="mb-10 text-4xl font-bold" style="overflow-wrap: anywhere;">404...</h1>
      <p class="mb-6">Oeps, die link bestaat niet (meer).</p>
      <Button to="/" class="mb-8">Naar home</Button>
      <img v-if="gifUrl" :src="gifUrl" class="mb-8" alt="Success Gif" />

    </div>
  </div>
</template>