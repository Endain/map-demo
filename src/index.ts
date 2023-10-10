export {};

let map: google.maps.Map;
let infowindow: google.maps.InfoWindow;

function initMap(): void {
    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById("map-container") as HTMLElement, {
        center: new google.maps.LatLng(0, 0),
        zoom: 2,
        mapId: "f25bfbf973209c4e",
        disableDefaultUI: true
    });

    const fromInput = document.getElementById("from-input") as HTMLInputElement;
    const fromSearchBox = new google.maps.places.SearchBox(fromInput);
    let fromMarker: google.maps.marker.AdvancedMarkerElement;

    const toInput = document.getElementById("to-input") as HTMLInputElement;
    const toSearchBox = new google.maps.places.SearchBox(toInput);
    let toMarker: google.maps.marker.AdvancedMarkerElement;

    fromSearchBox.addListener("places_changed", () => {
        fromMarker = searchUpdate(fromSearchBox, fromMarker)!;
        updateBounds([fromMarker?.position, toMarker?.position]);
    });
    toSearchBox.addListener("places_changed", () => {
        toMarker = searchUpdate(toSearchBox, toMarker)!;
        updateBounds([fromMarker?.position, toMarker?.position]);
    });
}

function updateBounds(places: (google.maps.LatLng | google.maps.LatLngLiteral | google.maps.LatLngAltitudeLiteral | null | undefined)[]) {
    const bounds = new google.maps.LatLngBounds();

    for (let place of places) {
        if (place) bounds.extend(place);
    }

    map.fitBounds(bounds);
    map.setZoom(Math.min(map.getZoom()! - 0.66, 18));
}

function searchUpdate(search: google.maps.places.SearchBox, previousMarker: google.maps.marker.AdvancedMarkerElement) {
    // Get all matching places
    const places = search.getPlaces() ?? [];

    // Return if no results
    if (places.length == 0) {
        return;
    }

    // Pick the first match
    const place = places[0];

    // If no geometry/locations for the place, return
    if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
    }

    // Clear the previous marker if there was one
    if (previousMarker) previousMarker.map = null;

    // Make a new marker
    const pinBackground = new google.maps.marker.PinElement({
        background: '#999',
        glyphColor: '#333',
        borderColor: '#222'
    });
    previousMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: place.geometry.location,
        content: pinBackground.element,
    });

    // Return the new marker
    return previousMarker;
}

declare global {
    interface Window {
        initMap: () => void;
    }
}

window.initMap = initMap;