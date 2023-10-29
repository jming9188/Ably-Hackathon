import React, { useState } from 'react';
import Ably from 'ably/promises';
import './AblyPublisher.css'

const apiKey = 'fmASfw.AzuJ7Q:cV9ZWR_Uj8SIfckLqwKUf1DaL0WIHXCM7SZOsxZE2MA'; // Replace with your Ably API key
const channelName = 'user-positions'; // Replace with your desired channel name

const AblyPublisher = () => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [offerDetails, setOfferDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ably = new Ably.Realtime({ key: apiKey });
    const channel = ably.channels.get(channelName);

    const data = {
        [name]: {
          offer: offerDetails,
          latlong: {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          },
          expiry: '2023/0/05 14:00', // You can modify this as needed
        },
      };
      console.log(data)

    try {
      await channel.publish('user-position', data);
      console.log('Data published successfully');
    } catch (error) {
      console.error('Error publishing data:', error);
    } finally {
      //ably.close();
    }
  };

  return (
    <div className = 'form-container'>
      <form onSubmit={handleSubmit} className='my-form'>
        <span className='form-group'> Publish special offers</span>
        <div className='form-group'>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Latitude:</label>
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Longitude:</label>
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Offer Details:</label>
          <textarea value={offerDetails} onChange={(e) => setOfferDetails(e.target.value)} required />
        </div >
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AblyPublisher;
