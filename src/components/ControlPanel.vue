<template>
    <div id="control-panel" class="side-panel">
        <a href="javascript:void(0)" class="close-btn" @click=closeNav>&times;</a>
        <ul>
            <li>
                
            </li>
            <li>
                
            </li>
            <li>
            </li>
            <li>
            </li>
            <li>
                
            </li>
        </ul>
    </div>

    <button class="open-btn" @click=openNav>&#9776; OSM</button>
</template>

<script setup lang="ts">
// show sidebar
const openNav = () => {
    document.getElementById("control-panel")!.style.width = "300px";
}

// hide sidebar
const closeNav = () => {
    document.getElementById("control-panel")!.style.width = "0";
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

</style>