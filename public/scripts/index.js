//Maps that show on Main Page:

const mapIdOne = L.map('mapid1').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(mapIdOne);

const markerOne = L.marker([51.5, -0.09]).addTo(mapIdOne);



const mapIdTwo = L.map('mapid2').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(mapIdTwo);

const markerTwo = L.marker([51.5, -0.09]).addTo(mapIdTwo);



const mapIdThree = L.map('mapid3').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(mapIdThree);

const markerThree = L.marker([51.5, -0.09]).addTo(mapIdThree);
