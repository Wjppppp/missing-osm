import { defineStore } from 'pinia'
import { ref } from 'vue'
import L, { Layer } from "leaflet";
import 'leaflet.control.opacity';

export const useMapStore = defineStore('map', () => {
    const map = ref();
    const layerControl = ref();
    const layerList:any = []
    const opacityControl = ref();

    // add a new overlay layer
    const addLayer = (layerName: string, layer: Layer, layerType = "base") => {
        if (layerType == "overlay") {
            layerControl.value.addOverlay(layer, layerName)
        } else {
            layerControl.value.addBaseLayer(layer, layerName)
        }
        layerList.push([layerName, layer as Layer])
        layerControl.value.addTo(map.value)
        layerControl.value.expand();
        layer.addTo(map.value)
        addOpacity()
    }

    // add opacity panel
    const addOpacity = () => {

        console.log("layers",layerList)
        const layerGroup = Object.fromEntries(new Map(layerList));
        // console.log("layers",layerGroup)
        if(opacityControl.value){
            opacityControl.value.remove();
        }
        opacityControl.value = L.control.opacity(layerGroup as any, {
            collapsed: false,
        }).addTo(map.value);
    }

    // remote an overlay layer
    const removeLayer = (layerName:string, layer: Layer) => {
        if (map.value.hasLayer(layer)) {
            map.value.removeLayer(layer)
        }
        layerControl.value.removeLayer(layer)

        layerList.forEach((element:any) => {
            if(element[0] == layerName){
                const index = layerList.indexOf(element)
                layerList.splice(index, 1)
            }
        });
        addOpacity()
    }

    // add GeoJson file
    const geoJsonDisplay = (geojsonObj: any, layerName: string) => {
        const geoJsonLayer = L.geoJSON(geojsonObj)
        addLayer(layerName, geoJsonLayer, "overlay")
    };

    return {
        map,
        layerControl,
        opacityControl,
        geoJsonDisplay,
        addLayer,
        removeLayer,
    }

})