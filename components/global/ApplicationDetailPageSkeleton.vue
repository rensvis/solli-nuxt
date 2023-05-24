<template>
  <div class="flex flex-col lg:gap-10 lg:flex-row">

    <div class="basis-1/3 lg:order-2">
      <div class="mb-10">
        <div class="mb-3 text-lg">Sollicitant</div>
        <Card>
          <div class="flex items-center gap-4 mb-4">
            <SkeletonItem name="avatar" class="rounded-lg w-14 h-14"></SkeletonItem>
            <div class="">
              <div class="">
                <SkeletonItem name="name" class="w-40 h-6 mb-1"></SkeletonItem>
              </div>
              <div class="text-neutral-500">
                <SkeletonItem name="name" class="w-16 h-5"></SkeletonItem>
              </div>
            </div>
          </div>

          <SkeletonItem name="start-date" class="w-full h-5 mb-1"></SkeletonItem>
          <SkeletonItem name="start-date" class="w-32 h-5 mb-3"></SkeletonItem>

          <div class="flex flex-wrap gap-2">
            <SkeletonItem name="contact-button" class="w-32 h-10"></SkeletonItem>
            <SkeletonItem name="contact-button" class="w-32 h-10"></SkeletonItem>
            <SkeletonItem name="contact-button" class="w-32 h-10"></SkeletonItem>
          </div>
        </Card>
      </div>
    </div>

    <div class="basis-2/3 lg:order-1">

      <div class="mb-10">
        <div class="mb-3 text-lg">Datum en tijd</div>
        <SkeletonItem name="application-date" class="w-40 h-6"></SkeletonItem>
      </div>

      <div class="mb-10">
        <div class="mb-3 text-lg">Vacature</div>
        <ul class="">
          <JobListItemSkeleton />
        </ul>
      </div>



      <div class="mb-10">
        <div class="mb-3 text-lg">Motivatie</div>
        <Card class="border-none !bg-neutral-200">
          <div class="application-motivation-card">
            <div class="">
              <SkeletonItem name="motivation" classString="bg-neutral-300 mb-2 w-full h-4"></SkeletonItem>
              <SkeletonItem name="motivation" classString="bg-neutral-300 mb-2 w-full h-4"></SkeletonItem>
              <SkeletonItem name="motivation" classString="bg-neutral-300 mb-2 w-full h-4"></SkeletonItem>
              <SkeletonItem name="motivation" classString="bg-neutral-300 mb-2 w-32 h-4"></SkeletonItem>
            </div>
          </div>
          <div class="flex justify-center">
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
