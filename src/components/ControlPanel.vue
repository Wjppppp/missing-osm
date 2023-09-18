<template>
    <div id="control-panel" class="side-panel">
        <a href="javascript:void(0)" class="close-btn" @click=closeNav>&times;</a>
        <ul>
            <li>
                <button id="add-btn" class="custom-btn" @click="addBtn"> Add Layer </button>
                <button class="custom-btn" @click="removeBtn"> Remove Layer </button>
            </li>
            <li id="geojson-block" class="hidden-block">
                Upload a GeoJson file:
                <div>
                    <input type="file" id="upload-geojson-btn" class="custom-input" @change="addLayer">
                    <label for="upload-geojson-btn" class="custom-btn">Choose a file</label>
                    <!-- <button class="custom-btn" id="push-geojson-btn" @click="pushGeoJson">Push</button>
                    <button class="custom-btn" id="delete-geojson-btn" @click="deleteGeoJson">Delete</button> -->
                </div>
            </li>
            <li id="remove-layer-block" class="hidden-block">
                Remove the selected layer:
                <select v-model="selectedLayer" id="selected-layer">
                    <option v-for="layer in mapStore.layerList">
                        {{ layer[0] }}
                    </option>
                    <option></option>
                </select>
                <button class="custom-btn" @click="removeLayer"> Confirm</button>
            </li>
            <li>
                <input type="radio" id="draw" value="draw" v-model="coordMode" />
                <label for="draw">Draw</label>

                <input type="radio" id="type" value="type" v-model="coordMode" />
                <label for="type">Type</label>
                <!-- {{ coordMode }} -->

                <form id="coords">
                    <label for="xmin">Left:</label>
                    <input v-model="xmin" placeholder="Min longitude">
                    <label for="ymax">Top: </label>
                    <input v-model="ymax" placeholder="Max latitude">
                    <label for="xmax">Right: </label>
                    <input v-model="xmax" placeholder="Max longitude">
                    <label for="ymin">Bottom: </label>
                    <input v-model="ymin" placeholder="Min Latitude">
                </form>
                <button class="custom-btn" @click="downloadSamples"> Download Samples </button>
            </li>
            <!-- <li>

            </li> -->
        </ul>
    </div>

    <button class="open-btn" @click=openNav>&#9776; OSM</button>
</template>

<script setup lang="ts">
import { useMapStore } from '@/stores/map-store';
import { ref } from 'vue'

const mapStore = useMapStore()
const selectedLayer = ref()

// add new geojson layer
const addBtn = () => {
    const dialog = document.getElementById("geojson-block") as HTMLElement;
    dialog.style.display = "block";
}

const removeBtn = () => {
    const dialog = document.getElementById("remove-layer-block") as HTMLElement;
    dialog.style.display = "block";
    console.log("layer list", mapStore.layerList);
    // forceRerender();
}

const removeLayer = () => {
    // console.log("layer control", mapStore.layerControl._layers);
    console.log("selected layer", selectedLayer.value, mapStore.layerList);

    // const layerCandidate = mapStore.layerList.find((layer: any) => layer.name === selectedLayer.value)    
    console.log("layer", selectedLayer.value);
    if (selectedLayer.value) {
        mapStore.removeLayer(selectedLayer.value);
    }
    (document.getElementById("remove-layer-block") as HTMLElement).style.display = "none";
}

// upload GeoJSON file and display objects on the map
const geoJsonObj = ref(); // geojson object container
const addLayer = (ev: any) => {
    console.log("upload geojson");

    // read json file
    const jsonFile = ev.target.files[0];

    // check if file is a .geojson or .json format
    const checkJsonFile = jsonFile.name.split(".").pop();
    const fileName = jsonFile.name.split(".")[0];
    if (checkJsonFile === "json" || checkJsonFile === "geojson") {

        // read json file as text
        const reader = new FileReader();
        reader.readAsText(jsonFile);
        reader.onload = (file) => {
            // convert text to json object
            geoJsonObj.value = JSON.parse(file.target?.result as any); // FeatureCollection from geojson/json file 
            // display geojson object
            // console.log("geojson", geoJsonObj.value);
            mapStore.geoJsonDisplay(geoJsonObj.value, fileName);
        }

        (document.getElementById("geojson-block") as HTMLElement).style.display = "none";

    } else {
        alert("Wrong file format!")
    }
}

// show sidebar
const openNav = () => {
    document.getElementById("control-panel")!.style.width = "300px";
}

// hide sidebar
const closeNav = () => {
    document.getElementById("control-panel")!.style.width = "0";
}


const coordMode = ref()
const xmin = ref()
const xmax = ref()
const ymin = ref()
const ymax = ref()
const downloadSamples = () => {
    console.log("coords", mapStore.bbox_coords);
    if (mapStore.bbox_coords.length >= 1) {
        const leftTop = mapStore.bbox_coords[0][1];
        const rightBottom = mapStore.bbox_coords[0][3];

        xmin.value = leftTop.lng
        xmax.value = rightBottom.lng
        ymin.value = rightBottom.lat
        ymax.value = leftTop.lat

    }
}

</script>

<style scoped>
.side-panel {
    height: auto;
    width: 0;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    background-color: rgb(255, 255, 255);
    overflow-x: hidden;
    padding-top: 40px;
    transition: 0.5s;
}

/* Navigation menu list */
.side-panel ul {
    list-style-type: none;
    padding: 0;
    margin: 10px;
}

.side-panel ul li {
    margin: 10px 0 0 0;
    padding: 10px;
    color: white;
    background-color: rgb(86, 143, 121);
    text-decoration: none;
    font-size: 20px;
    display: block;
}

/* Position and style the close button (top right corner) */
.side-panel .close-btn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    text-decoration: none;
    color: rgb(86, 143, 121);
}

/* Style the button that is used to open the side panel */
.open-btn {
    font-size: 20px;
    cursor: pointer;
    background-color: rgb(86, 143, 121);
    color: white;
    padding: 10px 15px;
    border: none;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
}

.open-btn:hover {
    background-color: rgb(51, 92, 78);
}

/* Buttons */
.custom-btn {
    font-size: 16px;
    font-weight: 500;
    padding: 5px;
    margin: 5px;
    border: 0;
    border-radius: 5px;
    color: white;
    background-color: rgb(51, 92, 78);
    display: inline-block;
    cursor: pointer;
}


.custom-btn:hover {
    background-color: rgb(245, 86, 12);
}

.custom-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.side-panel .hidden-block {
    display: none;
}

form input {
    box-sizing: border-box;
    width: calc(100% - 100px);
}

form label {
    display: inline-block;
    width: 80px;
}
</style>