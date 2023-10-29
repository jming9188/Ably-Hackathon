import logo from './logo.svg';
import './App.css';
import Counter from './counter'
import React, { Fragment } from 'react';
import Chat from './Chat';
import Ablycomp from './Ablycomp';
import GoogleMap from './Googlemap';
import MapComponent from './Mapcomp';
import GoogleMapWithAbly from './Googlemapwithably';
import AblyPublisher from './publish';

function App() {
  
  return (
    <Fragment>
      <h1>User Chat</h1>
      <Chat/>
      <h1 style = {{textAlign: 'center'}}>Map</h1>
      <div className="container">
      <AblyPublisher/>
      <GoogleMapWithAbly />
      </div>
    </Fragment>
    

    
  );
}

export default App;


