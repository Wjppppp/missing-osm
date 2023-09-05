<template>
    <div id="mapContainer"></div>
</template>

<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue'
import L, { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet-bing-layer"
import 'leaflet.control.opacity'
import { useMapStore } from '@/stores/map-store';
import { layerGroup } from 'leaflet';
import { map } from 'leaflet';
const mapStore = useMapStore() // map store
// const leafletMap = ref(); // map ref
const originLatLon = ref({ "lat": 5.66466, "lon": 10.24057 }); // yard 1
const zoomLevel = 17;
// const buildingLayer = new L.LayerGroup()

const initMap = () => {
    // map layers
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // maxZoom: 19,
        attribution: '© OpenStreetMap'
    });

    const esriImagery = L.tileLayer('http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        id: 'ESRI/Imagery',
        tileSize: 512,
        zoomOffset: -1,
        // maxZoom: 19,
        attribution: '© OpenStreetMap | ESRI'
    });

    const BingMapsKey = "AhUiTb_1C9bJJJBbIuwuHOZctXHnvyeVmM5jGtErwZ5U9IYe96rJEGZ-QwIY_J9V"
    const bingMap = (L.tileLayer as any).bing({
        bingMapsKey: BingMapsKey,
        // maxZoom: 19,
        imagerySet: 'AerialWithLabels',
        attribution: '© Bing Aerial'
    });

    // initiate map
    mapStore.map = L.map("mapContainer", {
        // drawControl: true,
        zoomControl: false,
        // zoomAnimation: false,
        center: [originLatLon.value.lat, originLatLon.value.lon],
        zoom: zoomLevel,
        layers: [osm]
    });

    // zoom control
    const zoomControl = L.control.zoom({
        position: "bottomright",
    }).addTo(mapStore.map);

    // osm base map
    const baseMaps = {
        "OpenStreetMap": osm
    };

    // overlay layers
    const overlays = {
        "Bing Aerial": bingMap,
        "ERSI Imagery": esriImagery
    }

    // map layer control
    mapStore.layerControl = L.control.layers(baseMaps, overlays, {
        collapsed: false,
        position: "topright"
    }).addTo(mapStore.map);


    // map opacity control
    L.control
        .opacity(overlays, {
            // label: 'Layers Opacity',
            collapsed: false,
            position: "topright"
        })
        .addTo(mapStore.map);

    // draw toolbar
    mapStore.map.pm.addControls({
        position: 'bottomleft',
        drawControls: true,
        editControls: true,
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawPolygon: false,
        drawCircle: false,
        drawText: false,
        rotateMode: false,
        cutPolygon: false,
        oneBlock: true,
        drawRectangle: true,
    });

    mapStore.map.on('pm:create', (e: any) => {
        const coords = e.layer.getLatLngs();
        // console.log(coords);
        mapStore.bbox_coords = coords

        const layer = e.layer
        layer.on("pm:change", (e: any) => {
            // console.log(e);
            const coords = e.layer.getLatLngs();
            mapStore.bbox_coords = coords
        });

        layer.on("pm:remove", (e: any) => {
            // console.log(e);
            // const coords = e.layer.getLatLngs();
            mapStore.bbox_coords = []
        });
    });

    // enable polygon Draw Mode
    // mapStore.map.pm.enableDraw("Polygon", {
    //     snappable: true,
    //     snapDistance: 20,
    // });

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