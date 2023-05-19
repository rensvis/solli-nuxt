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

          <el-form :model="form" label-width="120px" label-position="top" size="large">
            <div class="grid grid-cols-2 gap-x-4">
              <el-form-item prop="firstname" label="Voornaam" class="col-span-2 sm:col-span-1" :rules="[
                {
                  required: true,
                  message: 'Vul een voornaam in',
                  trigger: 'blur'
                }
              ]">
                <el-input v-model="form.firstname" type="text" />
              </el-form-item>
              <el-form-item prop="lastname" label="Achternaam" class="col-span-2 sm:col-span-1" :rules="[
                {
                  required: true,
                  message: 'Vul een achternaam in',
                  trigger: 'blur'
                }
              ]">
                <el-input v-model="form.lastname" type="text" />
              </el-form-item>
              <el-form-item prop="email" label="Email" class="col-span-2 sm:col-span-1" :rules="[
                {
                  required: true,
                  message: 'Vul een e-mailadres in',
                  trigger: 'blur',
                },
                {
                  type: 'email',
                  message: 'Vul een geldig e-mailadres in',
                  trigger: ['blur'],
                },
              ]">
                <el-input v-model="form.email" type="email" />
              </el-form-item>
              <el-form-item prop="phone" label="Telefoonnummer" class="col-span-2 sm:col-span-1" :rules="[
                {
                  required: true,
                  message: 'Vul een telefoonnummer in',
                  trigger: 'blur'
                }
              ]">
                <el-input v-model="form.phone" type="tel" />
              </el-form-item>

              <el-form-item prop="startDate" label="Beschikbaar vanaf" class="col-span-2 sm:col-span-1" :rules="[
                {
                  required: true,
                  message: 'Kies een startdatum',
                  trigger: 'blur'
                }
              ]">
                <el-date-picker v-model="form.startDate" :disabled-date="disabledStartDate" :shortcuts="shortcuts" :rules="[
                  {
                    required: true,
                    message: 'Kies een datum',
                    trigger: 'blur'
                  },

                ]">
                </el-date-picker>
              </el-form-item>

              <el-form-item prop="age" label="Leeftijd" class="col-span-2 sm:col-span-1" :rules="[
                {
                  required: true,
                  message: 'Vul je leeftijd in',
                  trigger: 'blur'
                }
              ]">
                <el-input v-model="form.age" type="number" />
              </el-form-item>


              <el-form-item prop="motivation" label="Motivatie" class="col-span-2" :rules="[
                {
                  required: true,
                  message: 'Schrijf een motivatie',
                  trigger: 'blur'
                }
              ]">
                <el-input v-model="form.motivation" :autosize="{ minRows: 7 }" type="textarea" placeholder="" />
              </el-form-item>

              <label for="CV">CV</label>
              <el-upload drag class="col-span-2 mb-4" ref="resume" accept="application/pdf" :multiple="false" :limit="1"
                :on-exceed="handleExceed">
                <client-only>
                  <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" size="2xl" class="mb-4" />
                </client-only>
                <div class="text-sm">
                  Sleep bestand of klik om te uploaden
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload>


            </div>
            <pre wrap>formValue: {{ form }}</pre>
            <div>
              <Button label="Versturen"></Button>
            </div>
          </el-form>
          <!-- </FormKit> -->


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
import { genFileId } from 'element-plus';
import type { UploadProps, UploadUserFile, UploadInstance, UploadRawFile } from 'element-plus';
import { IJob } from "~/types/job/Job";
import useConfirmDialog from "~/composables/useConfirmDialog";

const confirmDialog = inject('confirmDialog');
const {
  openDialog
} = confirmDialog as any;

const route = useRoute();
const client = useSupabaseClient();

const jobId = route.params.id as string;
const job = ref<IJob | null>(null);
const formValue = ref<any>(null);

const form = reactive({
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  phone: undefined,
  startDate: undefined,
  age: undefined,
  resume: undefined,
  motivation: undefined,
});

const resume = ref<UploadInstance>();

onBeforeRouteLeave((_to, _from, next) => {
  const formHasValues = Object.values(form).some((value) => value !== undefined && value !== '');
  if (!formHasValues) return next();
  openDialog('Weet je het zeker?', 'Je wijzigingen worden niet opgeslagen.', () => next(), () => next(false));
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
    job.value = data as unknown as IJob;
  }
};

const shortcuts = [
  {
    text: 'Vandaag 💪',
    value: new Date(),
  },
  {
    text: 'Morgen',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: 'Aanstaande maandag',
    value: () => {
      const date = new Date();
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1) + 7;
      date.setDate(diff);
      return date;
    },
  },
  {
    text: 'Volgende maand',
    value: () => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      return date;
    },
  }
];

const disabledStartDate = (time: Date) => {
  return time.getTime() < (Date.now() - 3600 * 1000 * 24);
};

const handleExceed: UploadProps['onExceed'] = (files) => {
  resume.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  resume.value!.handleStart(file);
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