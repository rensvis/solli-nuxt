<template>
  <div>
    <div
      class="flex items-center formkit-inner formkit-disabled:bg-neutral-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none max-w-md ring-1 ring-neutral-400 focus-within:ring-blue-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded mb-1 relative mb-4">
      <input :v-model="modelValue" id="locatie" name="locatie" type="text" placeholder="" @input="$emit('')"
        ref="locationRef"
        class="w-full py-2 pl-3 pr-10 text-base bg-transparent border-none appearance-none formkit-input focus:outline-none focus:ring-0 focus:shadow-none text-neutral-700 placeholder-neutral-400"
        pr-10 />
      <div class="absolute -translate-y-1/2 bg-white right-1 top-1/2">
        <Button type="textbutton" aria-label="Gebruik mijn locatie" class="!p-2" @click="getUserLocation">
          <client-only>
            <font-awesome-icon v-if="!state.isGettingUserLocation" :icon="['fas', 'location-arrow']" />
            <font-awesome-icon v-else :icon="['fas', 'gear']" spin />
            <!-- <font-awesome-icon :icon="['fas', 'location-crosshairs']" :spin="state.isGettingUserLocation" /> -->
          </client-only>
        </Button>
      </div>
    </div>
    <!-- isGettingUserLocation: {{ state.isGettingUserLocation }}
    <br>
    lat: {{ state.searchLocation?.lat }}
    <br>
    lng: {{ state.searchLocation?.lng }} -->
  </div>
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader';
import { ILocation } from "~/types/Location";

const props = defineProps({
  modelValue: {
    type: Object as PropType<ILocation | null>,
    default: null,
  },
});
const emit = defineEmits(['update:modelValue']);

interface State {
  isGettingUserLocation: boolean;
}

const state: State = reactive({
  searchLocation: null,
  isGettingUserLocation: false,
});

const locationRef = ref();

const loader = new Loader({
  apiKey: "AIzaSyAiuQsYUREMTTT2JtuMSrlwVvCyQ19igNo",
  version: "weekly",
  libraries: ["places"]
});

loader
  .load()
  .then(() => {
    console.log('google loaded');
    initPlacesAutocomplete();
  })
  .catch(e => {
  });

watch(() => props.modelValue, (newValue) => {
  locationRef.value.value = (newValue) ? newValue.name : '';
});

const initPlacesAutocomplete = () => {
  console.log('init places autocomplete');
  const autocomplete = new window.google.maps.places.Autocomplete(locationRef.value, {
    fields: ['geometry'],
    componentRestrictions: { country: 'nl' },
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;
    const name = (locationRef.value.value);
    const location = place.geometry.location;
    const lat = location?.lat();
    const lng = location?.lng();
    emit('update:modelValue', { lat, lng, name });
  });
};

const getUserLocation = () => {
  if ("geolocation" in navigator) {
    state.isGettingUserLocation = true;
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      state.isGettingUserLocation = false;
      updateInputWithUserLocation(lat, lng);
    }, (error) => {
      state.isGettingUserLocation = false;
      console.error("Error obtaining geolocation", error);
      alert("Locatie ophalen mislukt.");
    });
  } else {
    alert("Geolocatie wordt niet ondersteund in deze browser.");
  }
};

const updateInputWithUserLocation = (lat: number, lng: number) => {
  const geocoder = new window.google.maps.Geocoder();
  const latLng = new window.google.maps.LatLng(lat, lng);

  geocoder.geocode({ 'location': latLng }, function (results, status) {
    if (status === 'OK') {
      if (results && results[0]) {
        const name = results![0].formatted_address;
        const lat = results![0].geometry.location.lat();
        const lng = results![0].geometry.location.lng();
        // locationRef.value.value = name;
        emit('update:modelValue', { lat, lng, name });
      } else {
        console.error('No results found');
      }
    } else {
      console.error('Geocoder failed due to: ' + status);
    }
  });
};

</script>