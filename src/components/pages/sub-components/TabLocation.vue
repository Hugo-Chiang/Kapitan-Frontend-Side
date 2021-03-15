<template>
  <div class="card-body">
    <div class="row">
      <!-- Leaflet 地圖套件開始 -->
      <div class="col-lg-8 col-md-12 mb-md-0 mb-5">
        <!-- Leaflet 初始佈局 -->
        <l-map
          :zoom="mapData.mapZoomlevel"
          :center="mapData.mapMarkerLocation"
          :options="mapData.mapOptions"
          style="height: 25rem"
        >
          <!-- 導入圖資 OpenStreetMap  -->
          <l-tile-layer
            :url="mapData.mapGISurl"
            :attribution="mapData.mapSourceAttribution"
          />
          <!-- 設置會合地點圖釘 -->
          <l-marker :lat-lng="mapData.mapMarkerLocation">
            <!-- 設置圖釘樣式 -->
            <l-icon
              :icon-url="mapData.mapIcon.iconUrl"
              :shadow-url="mapData.mapIcon.shadowUrl"
              :icon="mapData.mapIcon.iconUrl"
              :popup-anchor="mapData.mapIcon.popupAnchor"
            />
            <!-- 設置圖釘彈窗內容 -->
            <l-popup> {{ departureLocationInfo.locationName }} </l-popup>
          </l-marker>
        </l-map>
      </div>
      <!-- Leaflet 地圖套件結束 -->
      <div class="col-lg-4 col-md-12">
        <h5>{{ departureLocationInfo.locationName }}</h5>
        <div v-html="departureLocationInfo.locationDescription"></div>
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
      mapData: {
        mapGISurl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        mapMarkerLocation: [0, 0],
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
      },
    };
  },
  props: ["departureLocationInfo"],
  components: { LMap, LTileLayer, LMarker, LPopup, LIcon },
  created() {
    this.mapData.mapMarkerLocation = [
      this.departureLocationInfo.locationLat,
      this.departureLocationInfo.locationLng,
    ];
  },
  watch: {
    // 監看（方法）：若傳入的地點資訊物件內容有變，則更新地圖套件的經緯度
    departureLocationInfo: {
      handler(newObj) {
        if (newObj.locationLat != 0 && newObj.locationLng != 0)
          this.mapData.mapMarkerLocation = [
            newObj.locationLat,
            newObj.locationLng,
          ];
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ ol {
  padding: 0px 30px;
}
</style>