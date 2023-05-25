<template>
  <div class="py-10">
    <div class="c-container md:mb-0">
      <h1 class="mb-10 text-4xl font-bold" style="overflow-wrap: anywhere;">Nieuwe sollicitatie</h1>
      <!-- <ApplicationDetailPageSkeleton v-if="flashSkeleton"></ApplicationDetailPageSkeleton> -->
      <ApplicationDetailPageSkeleton v-if="!application"></ApplicationDetailPageSkeleton>
      <div v-else-if="application" class="flex flex-col lg:gap-10 lg:flex-row">

        <div class="basis-1/3 lg:order-2">
          <div class="mb-10">
            <div class="mb-3 text-lg">Sollicitant</div>
            <Card>
              <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center justify-center bg-indigo-300 rounded-lg w-14 h-14">
                  <span class="text-xl font-bold text-indigo-800 uppercase initials">{{ applicantInitials }}</span>
                </div>
                <div class="leading-tight">
                  <div class="text-lg">
                    {{ application.first_name }} {{ application.last_name }}
                  </div>
                  <div class="text-neutral-500">{{ application.age }} jaar</div>
                </div>
              </div>

              <p class="mb-4">{{ application.first_name }} heeft aangegeven te kunnen starten vanaf <span
                  class="font-bold">{{
                    new Date(application.start_date).toLocaleDateString('nl-NL', {
                      weekday: 'long', month: 'long', day:
                        'numeric'
                    }) }}</span>.</p>

              <div class="flex flex-wrap gap-2">
                <Button :to="`https://wa.me/${formattedWhatsappNumber}`" type="outlined">
                  <client-only>
                    <font-awesome-icon icon="fa-brands fa-whatsapp" class="mr-1" />
                  </client-only>
                  Whatsapp
                </Button>
                <Button :to="`mailto:${application.email}`" type="outlined">
                  <client-only>
                    <font-awesome-icon icon="fa-solid fa-envelope" class="mr-1" />
                  </client-only>
                  E-mail</Button>
                <Button :to="`tel:${application.phone_number}`" type="outlined">
                  <client-only>
                    <font-awesome-icon icon="fa-solid fa-phone" class="mr-1" />
                  </client-only>
                  Bellen</Button>
              </div>
            </Card>
          </div>
        </div>

        <div class="basis-2/3 lg:order-1">

          <div class="mb-10">
            <div class="mb-3 text-lg">Datum en tijd</div>
            <span class="px-3 py-1 text-sm rounded text-neutral-600 bg-neutral-200">
              {{ formattedApplicationDate }}
            </span>
          </div>

          <div class="mb-10">
            <div class="mb-3 text-lg">Vacature</div>
            <ul class="">
              <JobListItemSkeleton v-if="!job" />
              <JobListItem v-else :job="job" :hasBackground="true" classString="!bg-whitee" />
            </ul>
          </div>



          <div class="mb-10">
            <div class="mb-3 text-lg">Motivatie</div>
            <Card class="border-none !bg-neutral-200">
              <div :class="{ 'application-motivation-card--open': motivationIsOpen || !showExpandMotivation }"
                class="application-motivation-card">
                <div class="application-motivation-card__content styled-text" v-html="renderedMotivation"></div>
              </div>
              <div class="flex justify-center">
                <Button v-if="showExpandMotivation" type="textbutton" :onClick="toggleMotivation">
                  {{ motivationIsOpen ? 'Minder weergeven' : 'Meer weergeven' }}
                  <font-awesome-icon :icon="['fas', `chevron-${motivationIsOpen ? 'up' : 'down'}`]" size="xs" />
                </Button>
              </div>
            </Card>
          </div>





        </div>

      </div>
      <!-- <pre wrap>{{ application }}</pre>
      <pre wrap>{{ job }}</pre> -->

    </div>
  </div>
</template>

<style lang="scss">
.application-motivation-card {
  display: grid;
  grid-template-rows: .2fr;
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
import { marked } from 'marked';
import { render } from "nuxt/dist/app/compat/capi";
import { IApplication } from "~/types/Application";
import { Database } from "~/types/Database";
import { IJob } from "~/types/job/Job";

const route = useRoute();
const router = useRouter();
const supabaseClient = useSupabaseClient<Database>();

const applicationId = route.params.id as string;
const application = ref<IApplication | null>(null);
const job = ref<IJob | null>(null);
const motivationIsOpen = ref<boolean>(false);

const flashSkeleton = ref(false);
// setInterval(() => {
//   flashSkeleton.value = !flashSkeleton.value;
// }, 1000);

const formattedWhatsappNumber = computed(() => {
  if (!application.value) return '';
  console.log(application.value);
  console.log(`31${application.value.phone_number.replace(/\s/g, '').substring(1)}`);
  return `31${application.value.phone_number.replace(/\s/g, '').substring(1)}`;
});

const toggleMotivation = () => {
  motivationIsOpen.value = !motivationIsOpen.value;
};

const formattedApplicationDate = computed(() => {
  if (!application) return '';
  const dateString = new Date(application.value!.created_at).toLocaleDateString('nl-NL', {
    weekday: 'long', month: 'long', day:
      'numeric', hour: 'numeric', minute: 'numeric'
  });
  return dateString.charAt(0).toUpperCase() + dateString.slice(1);
});

const showExpandMotivation = computed(() => {
  if (!application.value) return false;
  return application.value.motivation.split(' ').length > 100;
});



// set noindex
useHead({
  meta: [{
    hid: 'robots', name: 'robots', content: 'noindex'
  }]
});

onMounted(() => {
  setData();
});

const applicantInitials = computed(() => {
  if (!application.value) return '';
  return `${capitalize(application.value.first_name.charAt(0))}${application.value.last_name.charAt(0)}`;
});

const renderedMotivation = computed(() => {
  return marked.parse(application.value?.motivation ?? '');
});

const setData = async () => {
  // get application
  const { data: applicationData, error: applicationError } = await supabaseClient
    .from('applications')
    .select(`*`)
    .eq('id', applicationId)
    .single();
  if (applicationError) {
    router.push('/404');
    return console.error('Error fetching application details:', applicationError);
  };
  application.value = applicationData as unknown as IApplication;

  // get job
  const { data: jobData, error: jobError } = await supabaseClient
    .from('jobs')
    .select(`*,
    company:companies (
      *
    )
    )`)
    .eq('id', application.value.job_id)
    .single();

  if (jobError) return console.error('Error fetching job details:', jobError);
  job.value = jobData as unknown as IJob;
};



</script>

