<script setup lang="ts">
import MapView from './components/MapView.vue';
import ControlPanel from './components/ControlPanel.vue';
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { onMounted } from "vue";

// const initMap:any = () => {
//   const map = L.map('mapContainer').setView([51.505, -0.09], 13);

//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);

//   L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();

// }

// onMounted(()=>{
//   initMap()
// })

</script>

<template>
  <!-- <h1>Hello, world!</h1> -->
  <!-- <div id="mapContainer"></div> -->
  <ControlPanel></ControlPanel>
  <MapView></MapView>
</template>

<style scoped>
/* #mapContainer {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
} */

</style>
