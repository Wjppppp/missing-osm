<template>
    <div id="mapContainer"></div>
</template>

<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue'
import "leaflet/dist/leaflet.css";
import L, { Layer } from "leaflet";
import "leaflet-bing-layer"
import 'leaflet.control.opacity';
import { useMapStore } from '@/stores/map-store';

const mapStore = useMapStore() // map store
// const leafletMap = ref(); // map ref
const originLatLon = ref({ "lat": 5.66466, "lon": 10.24057 }); // yard 1
const zoomLevel = 17;
// const buildingLayer = new L.LayerGroup()

const initMap = () => {
    // map layers
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    });

    const esriImagery = L.tileLayer('http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        id: 'ESRI/Imagery',
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 19,
        attribution: '© OpenStreetMap | ESRI'
    });

    const BingMapsKey = "AhUiTb_1C9bJJJBbIuwuHOZctXHnvyeVmM5jGtErwZ5U9IYe96rJEGZ-QwIY_J9V"
    const bingMap = (L.tileLayer as any).bing({
        bingMapsKey: BingMapsKey,
        maxZoom: 19,
        imagerySet: 'AerialWithLabels',
        attribution: '© Bing Aerial'
    });

    // initiate map
    mapStore.map = L.map("mapContainer", {
        zoomControl: false,
        // zoomAnimation: false,
        center: [originLatLon.value.lat, originLatLon.value.lon],
        zoom: zoomLevel,
    });

    // zoom control
    const zoomControl = L.control.zoom({
        position: "bottomright",
    }).addTo(mapStore.map);
    
    mapStore.layerControl = L.control.layers();
    mapStore.addLayer("ERSI Imagery", esriImagery, "overlay");
    mapStore.addLayer("Bing Aerial", bingMap, "overlay");
    mapStore.addLayer("OpenStreetMap", osm, "overlay");
    // set initial layer
    // mapStore.map.addLayer(osm)
}


// Mount
onMounted(() => {
    initMap();
});


// export
defineExpose({
})

</script>

<style scoped>
#mapContainer {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
}
</style>