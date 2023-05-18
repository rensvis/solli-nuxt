<template>
  <div class="py-24">
    <div class="c-container md:mb-0">
      <h1 class="mb-10 text-4xl font-bold" style="overflow-wrap: anywhere;">Solliciteren</h1>
      <div class="flex flex-col gap-10 lg:flex-row">
        <div class="basis-2/3">
          <h4 class="mb-1 text-md">Vacature</h4>
          <ul class="mb-4">
            <JobListItemSkeleton v-if="!job" />
            <JobListItem v-else :job="job" :hasBackground="true" classString="!bg-white" />
          </ul>

          <FormKit type="group" #default="{ value }" v-model="formValue">
            <div class="grid grid-cols-2 gap-x-4">
              <FormKit type="text" label="Voornaam" name="voornaam" validation="required"
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" />
              <FormKit type="text" label="Achternaam" name="achternaam" validation="required"
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" />
              <FormKit type="email" label="E-mailadres" name="emailadres" validation="required"
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" />
              <FormKit type="tel" label="Telefoonnummer" name="telefoonnummer" validation="required"
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" />
              <FormKit type="textarea" label="Motivatie" name="motivatie" validation="required"
                :classes="{ outer: 'col-span-2', inner: '!max-w-full' }" />
              <!-- <FormKit type="datepicker" name="date" label="Startdatum" placeholder="Datum" overlay /> -->


            </div>
            <pre wrap>formValue: {{ formValue }}</pre>
            <div>
              <Button label="Versturen"></Button>
            </div>
          </FormKit>


        </div>
        <div class="basis-1/3">
          <!-- <Card> -->
          <Card class="border-none !bg-neutral-200">
            <p class="mb-2">
              Leuk dat je op deze vacature wilt solliciteren! 💪 Om het sollicitatieproces zo soepel mogelijk te laten
              verlopen, moet je hier rekening mee houden:
            </p>
            <ul class="list-disc list-outside pl-7">
              <li><b>Schrijf een goede motivatie.</b> Hier kun je vertellen waarom je geïnteresseerd bent in juist deze
                functie en waarom jij denkt dat je een goede match bent voor het team. Zo kan de werkgever een beter beeld
                krijgen van wie je bent en wat je kunt bijdragen aan het bedrijf.</li>
              <li>Geef aan vanaf wanneer je <b>beschikbaar</b> bent.</li>
              <li>Je kunt optioneel <b>een cv toevoegen</b> aan je sollicitatie. Mocht je deze hebben, dan kun je deze
                uploaden. Het kan de werkgever helpen om een beter beeld te krijgen van je werkervaring en achtergrond.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IJob } from "~/types/job/Job";

const route = useRoute();
const client = useSupabaseClient();

const jobId = route.params.id as string;
const job = ref<IJob | null>(null);
const formValue = ref<any>(null);

onBeforeRouteLeave((_to, _from, next) => {
  console.log(Object.values(formValue.value));
  const formHasValues = Object.values(formValue.value).some((value) => value !== undefined && value !== '');
  if (!formHasValues) return next();
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
  console.log(answer);
  if (answer) {
    next();
  } else {
    next(false);
  }
});

onMounted(() => {
  getJob();
});

const getJob = async () => {
  const { data, error } = await client
    .from('jobs')
    .select(`*,
    company:companies (
      *
    )
    )`)
    .eq('id', jobId)
    .single();

  if (error) {
    console.error('Error fetching job details:', error);
  } else {
    console.log(data);
    job.value = data as unknown as IJob;
  }
};
</script>

<style lang="scss"></style>