<template>
  <div class="flex flex-col gap-10 md:flex-row">
    <div class="basis-2/3">
      <div class="flex justify-between gap-4">
        <div class="w-full">
          <SkeletonItem name="name" classString="w-80 h-10 mb-2"></SkeletonItem>
          <div class="flex flex-wrap items-center gap-3 mb-2">
            <SkeletonItem name="company" classString="w-40 h-4"></SkeletonItem>
            <SkeletonItem name="parttime-fulltime" classString="w-20 h-8 rounded-full"></SkeletonItem>
          </div>
        </div>
        <div>
          <SkeletonItem name="solliciteren" classString="w-28 h-10 hidden md:block"></SkeletonItem>
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

      <div class="flex flex-col gap-0 mb-10 md:gap-2 md:flex-row">
        <div class="mb-10 basis-1/2 md:mb-0">
          <SkeletonItem name="vereisten" classString="mb-4 w-32 h-8"></SkeletonItem>
          <ul class="list-disc list-inside">
            <SkeletonItem name="requirement" classString="mb-1 w-28 h-4"></SkeletonItem>
            <SkeletonItem name="requirement" classString="mb-1 w-28 h-4"></SkeletonItem>
            <SkeletonItem name="requirement" classString="mb-1 w-28 h-4"></SkeletonItem>
          </ul>
        </div>
        <div class="basis-1/2">
          <SkeletonItem name="voorkeur" classString="mb-4 w-32 h-8"></SkeletonItem>
          <ul class="list-disc list-inside">
            <SkeletonItem name="requirement" classString="mb-1 w-28 h-4"></SkeletonItem>
            <SkeletonItem name="requirement" classString="mb-1 w-28 h-4"></SkeletonItem>
            <SkeletonItem name="requirement" classString="mb-1 w-28 h-4"></SkeletonItem>
          </ul>
        </div>
      </div>

      <SkeletonItem name="voordelen" classString="mb-4 w-32 h-8"></SkeletonItem>
      <ul class="flex flex-wrap gap-2">
        <SkeletonItem name="requirement" classString="mb-1 w-28 h-4"></SkeletonItem>
        <SkeletonItem name="requirement" classString="mb-1 w-28 h-4"></SkeletonItem>
        <SkeletonItem name="requirement" classString="mb-1 w-28 h-4"></SkeletonItem>
      </ul>

    </div>
    <div class="basis-1/3">
      <Card class="sticky">
        <div class="flex items-center justify-center">
          <SkeletonItem name="requirement" classString="mb-1 w-40 h-20"></SkeletonItem>
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
