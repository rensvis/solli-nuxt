<template>
  <li class="@container">

    <!-- < small -->
    <Card :hasBackground="false" class="mb-4 bg-neutral-50 @lg:hidden">
      <div class="flex items-center gap-4 mb-4">
        <SkeletonItem name="logo"
          classString="flex items-center justify-center flex-shrink w-16 h-16 p-2rounded-lg sm:w-20 sm:h-20 aspect-square">
        </SkeletonItem>
        <div class="leading-none ">
          <SkeletonItem name="title" classString="mb-2 w-36 h-6"></SkeletonItem>
          <SkeletonItem name="company" classString="mb-2 w-40 h-4"></SkeletonItem>
        </div>
      </div>
      <SkeletonItem name="summary" classString="mb-4 w-40 h-4"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-1 w-full h-4"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-5 w-72 h-4"></SkeletonItem>
      <div class="flex items-center gap-4 mb-2">
        <SkeletonItem name="parttime-fulltime" classString="w-20 h-8 rounded-full"></SkeletonItem>
        <SkeletonItem name="time-ago" classString="w-24 h-4 rounded-full"></SkeletonItem>

      </div>
    </Card>

    <!-- > small -->
    <Card :hasBackground="false"
      class="hidden mb-4 bg-neutral-50 @lg:block transition hover:bg-neutral-100 motion-reduce:transition-none">
      <SkeletonItem name="parttime-fulltime" classString="mb-2 w-20 h-8 rounded-full float-right"></SkeletonItem>
      <div class="flex items-center gap-4 mb-4">
        <SkeletonItem name="logo"
          classString="flex items-center justify-center flex-shrink w-16 h-16 p-2rounded-lg sm:w-20 sm:h-20 aspect-square">
        </SkeletonItem>
        <div class="leading-none ">
          <div class="flex items-center gap-4 mb-2 mr-2">
            <SkeletonItem name="title" classString="w-32 h-6"></SkeletonItem>
            <SkeletonItem name="time-ago" classString="w-24 h-4 rounded-full"></SkeletonItem>
          </div>
          <SkeletonItem name="company" classString="mb-2 w-30 h-4"></SkeletonItem>
        </div>
      </div>
      <SkeletonItem name="summary" classString="mb-3 w-72 h-4"></SkeletonItem>
      <SkeletonItem name="description" classString="mb-1 w-full h-5"></SkeletonItem>
      <SkeletonItem name="description" classString="w-96 h-5"></SkeletonItem>
    </Card>

  </li>
</template>


<script setup lang="ts">
</script>