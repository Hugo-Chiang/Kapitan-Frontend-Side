<template>
  <div class="card-body">
    <div class="row">
      <div class="col-8">
        <!-- Leaflet 初始佈局 -->
        <l-map
          :zoom="mapZoomlevel"
          :center="mapMarkerLocation"
          :options="mapOptions"
          style="height: 25rem"
        >
          <!-- 導入圖資 OpenStreetMap  -->
          <l-tile-layer :url="mapGISurl" :attribution="mapSourceAttribution" />
          <!-- 設置會合地點圖釘 -->
          <l-marker :lat-lng="mapMarkerLocation">
            <!-- 設置圖釘樣式 -->
            <l-icon
              :icon-url="mapIcon.iconUrl"
              :shadow-url="mapIcon.shadowUrl"
              :icon="mapIcon.iconUrl"
              :popup-anchor="mapIcon.popupAnchor"
            />
            <!-- 設置圖釘彈窗內容 -->
            <l-popup> 333 </l-popup>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
// 導入 Leaflet 元件
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";

export default {
  data() {
    return {
      mapGISurl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      mapMarkerLocation: [25.0238087, 121.5531104],
      mapZoomlevel: 16,
      mapSourceAttribution: `© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
      mapOptions: {
        zoomControl: true,
      },
      mapIcon: {
        iconUrl:
          "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        // iconUrl: "/static/img/marker-icon-blue.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconAnchor: [12.5, 40],
        popupAnchor: [0, -30],
      },
    };
  },
  components: { LMap, LTileLayer, LMarker, LPopup, LIcon },
};
</script>