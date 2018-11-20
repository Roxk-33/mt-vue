export function getAddress() {
  const map = new BMap.Map('allmap');
  const point = new BMap.Point(116.331398, 39.897445);
  map.centerAndZoom(point, 12);

  const geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function (r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      const mk = new BMap.Marker(r.point);
      map.addOverlay(mk);
      map.panTo(r.point);
      console.log(`您的位置：${r.point.lng},${r.point.lat}`);
      return `您的位置：${r.point.lng},${r.point.lat}`;
    }
    alert(`failed${this.getStatus()}`);
  });
}
export function getLocation() {
  return new Promise((resolve, reject) => {
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        // var mk = new BMap.Marker(r.point);
        // map.addOverlay(mk);
        // map.panTo(r.point);
        // var point = new BMap.Point(113.36963653560001, 23.097891524286087);
        // map.centerAndZoom(point, 12);
        resolve(`${r.point.lat},${r.point.lng}`);
      } else {
        reject(this.getStatus());
      }
    });
  });
}
