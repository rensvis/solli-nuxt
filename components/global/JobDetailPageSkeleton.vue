<template>
  <div class="flex flex-col gap-10 mb-10 md:flex-row">
    <div class="basis-2/3">
      <div class="flex justify-between gap-4">
        <div class="w-full">
          <SkeletonItem name="name" classString="w-80 h-10 mb-4"></SkeletonItem>
          <div class="flex flex-wrap items-center gap-3 mb-2">
            <SkeletonItem name="company" classString="w-40 h-6"></SkeletonItem>
            <SkeletonItem name="parttime-fulltime" classString="w-20 h-8 rounded-full"></SkeletonItem>
          </div>
        </div>
        <div>
          <SkeletonItem name="solliciteren" classString="w-36 h-12 hidden md:block"></SkeletonItem>
        </div>
      </div>
      <HorizontalRuler></HorizontalRuler>
      <SkeletonItem name="beschrijving" classString="mb-4 w-32 h-8"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-1 w-full h-4"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-1 w-full h-4"></SkeletonItem>
      <!-- <SkeletonItem name="description" classString="mb-3 w-96 h-4"></SkeletonItem> -->
      <SkeletonItem name="description" classString="mb-1 w-full h-4"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-1 w-full h-4"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-1 w-full h-4"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-1 w-full h-4"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-1 w-full h-4"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-8 w-96 h-4"></SkeletonItem>

      <div class="grid grid-cols-2 gap-y-10 gap-x-4">
        <div v-for="i in 3" class="max-[475px]:col-span-2" :class="[i === 3 ? 'col-span-2' : 'col-span-1']">
          <SkeletonItem name="requirement" classString="mb-2 w-32 h-8"></SkeletonItem>
          <div v-if="i < 3">
            <SkeletonItem name="highlight" class="h-4 mb-2 w-28"></SkeletonItem>
            <SkeletonItem name="highlight" class="h-4 mb-2 w-28"></SkeletonItem>
          </div>
          <ul v-else class="flex flex-wrap gap-2">
            <SkeletonItem name="highlight-tag" class="w-32 h-8"></SkeletonItem>
            <SkeletonItem name="highlight-tag" class="w-40 h-8"></SkeletonItem>
          </ul>
        </div>
      </div>

    </div>
    <div class="basis-1/3">
      <Card class="sticky">
        <div class="flex items-center justify-center">
          <SkeletonItem name="solliciteer-button" classString="mb-1 w-40 h-20"></SkeletonItem>
        </div>
        <HorizontalRuler></HorizontalRuler>
        <SkeletonItem name="company-title" classString="mb-2 w-32 h-6"></SkeletonItem>
        <SkeletonItem name="company-description" classString="mb-1 w-full h-4"></SkeletonItem>
        <SkeletonItem name="company-description" classString="mb-1 w-full h-4"></SkeletonItem>
        <SkeletonItem name="company-description" classString="w-44 h-4"></SkeletonItem>
      </Card>
    </div>
  </div>
</template>
