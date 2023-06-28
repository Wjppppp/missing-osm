<template>
    <div id="mapContainer"></div>
</template>

<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-bing-layer"

const leafletMap = ref(); // map ref
const originLatLon = ref({ "lat": 5.66466, "lon": 10.24057 }); // yard 1
const zoomLevel = 17;
const buildingLayer = new L.LayerGroup()

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
    const bingMap = (L.tileLayer as any).bing ({
        bingMapsKey: BingMapsKey,
        maxZoom: 19,
        imagerySet: 'AerialWithLabels',
        attribution: '© Bing Aerial'
    });

    // initiate map
    leafletMap.value = L.map("mapContainer", {
        zoomControl: false,
        // zoomAnimation: false,
        center: [originLatLon.value.lat, originLatLon.value.lon],
        zoom: zoomLevel,
        layers: [osm]
    });

    const baseMaps = {
        "ERSI Imagery": esriImagery,
        "Bing Aerial": bingMap,
        "OpenStreetMap": osm,
    };

    const overlays = {
        "building": buildingLayer,
    }

    L.control.layers(baseMaps, overlays).addTo(toRaw(leafletMap.value));

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