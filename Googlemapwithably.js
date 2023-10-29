import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Ably from 'ably/promises';


const GoogleMapWithAbly = (props) => {
  const mapStyles = {
    width: '100%',
    height: '800px',
  };

  const [markerPositions, setMarkerPositions] = useState(
    {'Pizza Hut': { offer:'BOGO 10% off',  latlong: {lat: 40.7128, lng: -74.0060}, expiry: '2023/10/05 14:00' },
  'Burger King': { offer:'50% off Whoppers',  latlong: {lat: 80.7128, lng: -30.0060}, expiry: '2023/10/07 14:00'}
});


  useEffect(() => {
    console.log("in useEffect")
    // Initialize Ably
    const ably = new Ably.Realtime({ key: 'fmASfw.AzuJ7Q:cV9ZWR_Uj8SIfckLqwKUf1DaL0WIHXCM7SZOsxZE2MA' });

    // Subscribe to the Ably channel where location data is sent
    const channelName = 'user-positions';
    const channel = ably.channels.get(channelName);

    channel.subscribe('user-position', (message) => {
      console.log("subscribed ", message.data)
      setMarkerPositions((prevLocations) => ({
        ...prevLocations,
        ...message.data,
      }))
       //Update the marker position when new data is received from Ably
      },);

    //return () => {
      // Close the Ably connection when the component unmounts
      //channel.unsubscribe();
      //ably.close();
   // };
  }, []);

  return (
    
    <div>
      <Map
        google={props.google}
        style={mapStyles}
        //initialCenter={markerPosition1}
        zoom={2}
      >
        {
          //console.log("I am in here", markerPosition1)

        }
        {/* Render Marker components for each person's position */}
        {
         Object.keys(markerPositions).map(key => {
          console.log('markerpositions in jsx ',markerPositions)
          console.log('key',key)
          const latlong = markerPositions[key].latlong;
          console.log('latlong ',latlong)
          const MapLabel = key + "|" + markerPositions[key].offer
          return (
            
            <Marker
              key={key}
              name={key}
              position={latlong}
              label={MapLabel}
            />
            
            
          );
        })}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAxcMCt9Sjb3OY6K4brgVEimno6XryEOuA',
})(GoogleMapWithAbly);
