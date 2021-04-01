<template>
  <div class="card-body">
    <div class="row">
      <!-- Leaflet 地圖套件開始 -->
      <div class="col-lg-8 col-md-12 mb-lg-0 mb-5">
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
      <!-- 會合地點介紹與導航開始 -->
      <div class="col-lg-4 mt-lg-1 col-md-12 mt-0">
        <h5>{{ departureLocationInfo.locationName }}</h5>
        <div
          v-html="departureLocationInfo.locationDescription"
          class="mt-3 mb-4"
        ></div>
        <a
          :href="`https://www.google.com/maps/dir/${
            userLocation.length == 0
              ? ''
              : `${userLocation[0]},${userLocation[1]}`
          }/${departureLocationInfo.locationName}`"
          target="_blank"
          class="d-flex justify-content-center"
        >
          <input type="button" value="Google路線導航" class="btn btn-success" />
        </a>
      </div>
      <!-- 會合地點介紹與導航結束 -->
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
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconAnchor: [12.5, 40],
          popupAnchor: [0, -30],
        },
      },
      userLocation: [0, 0],
    };
  },
  props: ["departureLocationInfo"],
  components: { LMap, LTileLayer, LMarker, LPopup, LIcon },
  created() {
    // 詢問使用者位置，以利使用者使用 google 地圖導覽功能
    navigator.geolocation.getCurrentPosition(this.getUserLocationSucess);

    this.mapData.mapMarkerLocation = [
      this.departureLocationInfo.locationLat,
      this.departureLocationInfo.locationLng,
    ];
  },
  methods: {
    // 回呼函式：獲知使用者位置成功
    getUserLocationSucess(location) {
      this.userLocation = [location.coords.latitude, location.coords.longitude];
    },
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
h5 {
  font-weight: 600;
}
</style>