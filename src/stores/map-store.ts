import { defineStore } from 'pinia'
import { ref } from 'vue'
import L, { Layer } from "leaflet";
import 'leaflet.control.opacity';

export const useMapStore = defineStore('map', () => {
    const map = ref();
    const layerControl = ref();
    const layerList: any = ref([]);
    const bbox_coords = ref([]);
    // const opacityControl = ref();

    // add a new overlay layer
    const addLayer = (layerName: string, layer: Layer) => {

        layerControl.value.addOverlay(layer, layerName);
        layerList.value.push([layerName, layer as Layer]);

    }


    // remote an overlay layer
    const removeLayer = (layerName: string) => {
        console.log("1",layerList.value)

        layerList.value.forEach((element: any) => {
            if (element[0] == layerName) {
                const index = layerList.value.indexOf(element)

                const layer = layerList.value[index][1]
                if (map.value.hasLayer(layer)) {
                    map.value.removeLayer(layer)
                }
                layerControl.value.removeLayer(layer)

                layerList.value.splice(index, 1)
            }
        });
        console.log("2",layerList.value)
    }

    // add GeoJson file
    const geoJsonDisplay = (geojsonObj: any, layerName: string) => {
        const geoJsonLayer = L.geoJSON(geojsonObj)
        addLayer(layerName, geoJsonLayer)
    };

    return {
        map,
        layerControl,
        layerList,
        bbox_coords,
        // opacityControl,
        geoJsonDisplay,
        addLayer,
        removeLayer,
    }

})