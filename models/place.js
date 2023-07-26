export class Place {
  constructor(title, imgUri, location, id) {
    this.title = title;
    this.imgUri = imgUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; //location is an object that contain lat and lng {lat:#, lng:#}
    this.id = id;
  }
}
