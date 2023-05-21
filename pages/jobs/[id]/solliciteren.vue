<template>
  <div class="py-24">
    <div class="c-container md:mb-0" v-auto-animate>
      <h1 class="mb-10 text-4xl font-bold" style="overflow-wrap: anywhere;">Solliciteren</h1>

      <div v-if="!applicationSuccess" class="max-w-xl">
        <Card class="!bg-neutral-100 mb-8">
          <div class="flex items-center gap-3 mb-2">
            <ClientOnly>
              <font-awesome-icon icon="far fa-circle-check" class="mt-px text-lg text-green-400" size="2xl" />
            </ClientOnly>
            <h2 class="text-xl font-bold">Sollicitatie verstuurd!</h2>
          </div>
          <p>Houd je inbox en telefoon in de gaten want binnenkort kun je een reactie van <b>{{ (job) ? job?.company.name
            :
            'de werkgever' }}</b>
            verwachten! 🤩
          </p>
        </Card>
        <img v-if="gifUrl" :src="gifUrl" class="mb-8" alt="Success Gif" />
        <Button label="Terug naar home" to="/" type="outlined"></Button>

      </div>
      <div v-else class="flex flex-col gap-10 lg:flex-row">
        <div class="basis-2/3">
          <h4 class="mb-1 text-md">Vacature</h4>
          <ul class="mb-4">
            <JobListItemSkeleton v-if="!job" />
            <JobListItem v-else :job="job" :hasBackground="true" classString="!bg-white" />
          </ul>

          <FormKit type="form" id="applicationForm" #default="{ value, disabled }" v-model="formValue" :actions="false"
            @submit="submitForm" v-auto-animate>
            <div class="grid grid-cols-2 gap-x-4">
              <FormKit type="text" label="Voornaam" name="firstname" validation="required"
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" v-auto-animate />
              <FormKit type="text" label="Achternaam" name="lastname" validation="required"
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" v-auto-animate />
              <FormKit type="email" label="E-mailadres" name="email" validation="required|email"
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" v-auto-animate />
              <FormKit type="tel" label="Telefoonnummer" name="phone" validation="required"
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" v-auto-animate />
              <FormKit type="date" name="startDate" label="Startdatum" placeholder="Datum"
                :min="new Date().toISOString().split('T')[0]" validation="required" overlay
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" v-auto-animate />
              <FormKit type="number" label="Leeftijd" name="age" validation="required|between:12,100" min="12" max="100"
                :classes="{ outer: 'col-span-2 sm:col-span-1', inner: '!max-w-full' }" v-auto-animate />
              <FormKit type="textarea" label="Motivatie" name="motivation" validation="required" rows="71"
                :classes="{ outer: 'col-span-2', inner: '!max-w-full' }" v-auto-animate />
              <FormKit type="file" label="CV (optioneel)" accept=".pdf,.doc,.docx" name="resume"
                help="Sleep bestand of klik om te uploaden" multiple="false"
                :classes="{ outer: 'col-span-2', inner: '!max-w-full' }" />
            </div>
            <Button label="Versturen" type="primary" :disabled="disabled"></Button>
          </FormKit>

        </div>
        <div class="basis-1/3">
          <!-- <Card> -->
          <Card class="!bg-neutral-100">
            <!-- <Card class="border-none !bg-neutral-200"> -->
            <p class="mb-2">
              Leuk dat je op deze vacature wilt solliciteren! 💪 Om het sollicitatieproces zo soepel mogelijk te laten
              verlopen, moet je hier rekening mee houden:
            </p>
            <ul class="list-disc list-outside pl-7">
              <li><b>Schrijf een goede motivatie.</b> Hier kun je vertellen waarom je geïnteresseerd bent in juist
                deze
                functie en waarom jij denkt dat je een goede match bent voor het team. Zo kan de werkgever een beter
                beeld
                krijgen van wie je bent en wat je kunt bijdragen aan het bedrijf.</li>
              <li>Geef aan vanaf wanneer je <b>beschikbaar</b> bent.</li>
              <li>Je kunt optioneel <b>een cv toevoegen</b> aan je sollicitatie. Mocht je deze hebben, dan kun je deze
                uploaden. Het kan de werkgever helpen om een beter beeld te krijgen van je werkervaring en
                achtergrond.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import type { UploadProps, UploadUserFile, UploadInstance, UploadRawFile } from 'element-plus';
import { IConfirmDialogParams } from "~/types/ConfirmDialogParams";
import { Database } from "~/types/Database";
import { IJob } from "~/types/job/Job";
import { reset } from '@formkit/core';

const confirmDialog = inject('confirmDialog');
const {
  openDialog
} = confirmDialog as any;

const route = useRoute();
const supabaseClient = useSupabaseClient<Database>();

const jobId = route.params.id as string;
const job = ref<IJob | null>(null);
const formValue = ref<any>();
const applicationSuccess = ref<boolean>(false);
const gifUrl = ref('');

async function handleSubmit() {
  // Our api request:
  await new Promise((r) => setTimeout(r, 1000));
  reset('applicationForm');
}

async function submitForm(form: any) {
  const resume = formValue.value.resume[0];
  let resumeUrl: string | undefined, resumePath: string | undefined;

  if (resume) {
    resumePath = `${jobId}/${Date.now()}_${form.firstname + form.lastname}_${resume.name.replace(/\s/g, '_')}`;
    const { data: resumeData, error: resumeError } = await supabaseClient
      .storage
      .from('resumes')
      .upload(resumePath, resume.file, {
        cacheControl: '3600',
        upsert: false
      });
    if (resumeError) {
      return console.error('Error uploading resume:', resumeError);
    }
    const { data: resumeUrlData } = supabaseClient
      .storage
      .from('resumes')
      .getPublicUrl(resumePath);
    resumeUrl = resumeUrlData.publicUrl;
  }

  const { data: applicationData, error: applicationError } = await supabaseClient
    .from('applications')
    .insert([
      {
        job_id: jobId,
        first_name: form.firstname,
        last_name: form.lastname,
        email: form.email,
        phone_number: form.phone,
        start_date: form.startDate,
        age: form.age,
        motivation: form.motivation,
        resume_path: resumePath,
        resume_url: resumeUrl,
      }
    ]);

  if (applicationError) {
    return console.error('Error inserting application:', applicationError);
  } else {
    applicationSuccess.value = true;
    reset('applicationForm');
  }
};

onBeforeRouteLeave((_to, _from, next) => {
  if (!formValue.value) return next();
  const formHasValues = Object.values(formValue.value).some((value) => value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true));
  if (!formHasValues) return next();
  const params: IConfirmDialogParams = {
    newMessage: 'Je wijzigingen worden niet opgeslagen.',
    newConfirmText: 'Yup, gooi maar weg',
    newCancelText: 'Nee, ga terug',
    newConfirmHandler: () => next(),
    newCancelHandler: () => next(false),
  };
  openDialog(params);

});

onMounted(() => {
  getJob();
  getGif();

});

const getGif = async () => {
  const gifs = [
    'https://media.giphy.com/media/Q81NcsY6YxK7jxnr4v/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjQ4ODVjMTlmNDYxYjgyMTNkYTUxMjUyZjRhNjhkMjRmMjZiMjc4YSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/yoJC2GnSClbPOkV0eA/giphy.gif',
    'https://media1.giphy.com/media/mGK1g88HZRa2FlKGbz/giphy.gif?cid=2154d3d7ft1hcw1fi7igkwjij9w57cyenomnfo1vd01wqy11&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    'https://media4.giphy.com/media/Jir7AUookJHIVb5aYM/giphy.gif?cid=2154d3d7ft1hcw1fi7igkwjij9w57cyenomnfo1vd01wqy11&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    'https://media3.giphy.com/media/GK7grZYLG7cs0/giphy.gif?cid=2154d3d7t3yzo87nsisopvj7y1acpjl22w14w5iklxy6xa8n&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media3.giphy.com/media/LPGLF54a2Wd0Y/giphy.gif?cid=2154d3d749n7ve7i3mtxfiad8k9e9v9wuxxanjftrrl643jz&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media4.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif?cid=2154d3d7t3yzo87nsisopvj7y1acpjl22w14w5iklxy6xa8n&ep=v1_gifs_related&rid=giphy.gif&ct=g',

  ];
  const item = gifs[Math.floor(Math.random() * gifs.length)];
  gifUrl.value = item;

  // const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Tix6zmFoFJ1QiGDqXmk1x56WGBcuLpPM&q=success&limit=20`);
  // const data = await response.json();
  // console.log(data);
  // if (data.data) {
  //   const item = data.data[Math.floor(Math.random() * data.data.length)];
  //   gifUrl.value = item.images.downsized_medium.url;
  // }
};


const getJob = async () => {
  const { data, error } = await supabaseClient
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
    job.value = data as unknown as IJob;
  }
};

</script>

<style lang="scss">
.el-picker-panel__sidebar {
  padding: 16px 0;
}

.el-picker-panel__shortcut {
  margin-bottom: 12px;
  line-height: 1.25;
}
</style>