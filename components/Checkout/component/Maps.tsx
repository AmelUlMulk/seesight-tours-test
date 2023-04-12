/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Polygon,
  Marker,
  Autocomplete
} from '@react-google-maps/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const containerStyle = {
  width: '100%',
  height: '40vh'
};

interface MapProps {
  pickupBounds: any;
  center: {
    lat: number;
    lng: number;
  };
  setPickUpLocation: React.Dispatch<React.SetStateAction<string>>;
  pickupLocation: string;
  setSpecialRequierments: React.Dispatch<React.SetStateAction<string>>;
  specialRequierment: string;
  customer: {
    email: string;
    name: string;
    secondaryPhone: string;
    secondaryEmail: string;
  };
  source: string;
  rezdyId: string;
  id: string;
  status: string;
  phone: string;
  setThankYou: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmationLoading: React.Dispatch<React.SetStateAction<boolean>>;
  next: () => void;
}

function Map({
  center,
  pickupBounds,
  setPickUpLocation,
  pickupLocation,
  setSpecialRequierments,
  specialRequierment,
  customer,
  source,
  rezdyId,
  id,
  status,
  phone,
  setThankYou,
  setConfirmationLoading,
  next
}: MapProps) {
  const [pickupCoords, setPickupCoords] = useState<any>(null);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [wrongLocation, setWrongLocation] = useState<Boolean>(false);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `AIzaSyCK_FbJyCK7eV-1GkrJ0cfsyJIuB0QJ2Ow`,
    libraries: ['places']
  });
  const router = useRouter();
  const checkValidity = (result: any) => {
    let coords = result?.geometry?.location;
    if (pickupBounds) {
      const polygon = new google.maps.Polygon({ paths: pickupBounds });
      const contains = window.google.maps.geometry.poly.containsLocation(
        coords,
        polygon
      );

      let address = '';
      if (result?.name && !result?.formatted_address.includes(result?.name)) {
        address = `${result.name}, ${result?.formatted_address}`;
      } else {
        address = result?.formatted_address;
      }
      if (contains) {
        setPickUpLocation(address);
        setWrongLocation(false);
        return true;
      }
      setWrongLocation(true);
      setPickUpLocation('');
    }
  };

  const getCoords = async (latLng: any) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        setPickupCoords(results[0].geometry?.location);
        checkValidity(results[0]);
      }
    });
  };

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  useEffect(() => {
    const setZoom = setTimeout(() => {
      if (map !== null) {
        map.setZoom(13);
      }
    }, 2000);
    return () => {
      clearTimeout(setZoom);
    };
  }, [map]);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);
  const handleChange = () => {
    if (autocomplete !== null) {
      const exist = checkValidity(autocomplete?.getPlace());
      if (exist) {
        setPickupCoords(autocomplete?.getPlace()?.geometry?.location);
        if (
          autocomplete
            ?.getPlace()
            .formatted_address.includes(autocomplete?.getPlace().name)
        ) {
          setPickUpLocation(autocomplete?.getPlace().formatted_address);
        } else {
          setPickUpLocation(
            `${autocomplete?.getPlace().name}, ${
              autocomplete?.getPlace().formatted_address
            }`
          );
        }
      }
    }
  };
  const confirmBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pickupLocation.length < 3 || wrongLocation) {
      return;
    }
    setConfirmationLoading(true);
    const headers = {
      'Content-Type': 'application/json'
    };

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_PAYMENT_API}//booking/${id}`,
      {
        ...customer,
        location: pickupLocation,
        notes: specialRequierment,
        source,
        rezdyId,
        status: status,
        phone
      },
      { headers }
    );
    setConfirmationLoading(false);
    if (response.status === 200) {
      setThankYou(true);
      next();
    }
  };
  console.log('pickupBound:', pickupBounds);
  console.log('pickupCooords:', pickupCoords);
  console.log('pickuplocation:', pickupLocation);
  return isLoaded ? (
    <div className="flex flex-col lg:flex-row justify-between">
      {pickupBounds && (
        <div className="w-full lg:w-[48%]">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Polygon
              paths={pickupBounds}
              options={{
                fillColor: 'red',
                fillOpacity: 0.2,
                strokeColor: 'red',
                strokeOpacity: 1,
                strokeWeight: 1
              }}
              onClick={e => {
                const { latLng } = e;
                getCoords(latLng);
              }}
            />
            {pickupCoords && (
              <Marker
                position={{
                  lat: pickupCoords.lat(),
                  lng: pickupCoords.lng()
                }}
              />
            )}
          </GoogleMap>
        </div>
      )}

      <div className="w-full lg:w-[48%] flex justify-center align-middle  ">
        <form
          action=""
          className="w-full justify-center align-middle flex-col flex gap-4 "
          id="confirmation-form"
          onSubmit={e => confirmBooking(e)}
        >
          <h2 className="text-white  text-3xl  ">Pick Up Location</h2>
          {wrongLocation && (
            <p className="text-red-500 text-xl ">
              {' '}
              Please Select a location inside the boundary{' '}
            </p>
          )}
          <Autocomplete
            onLoad={autocomplete => setAutocomplete(autocomplete)}
            onPlaceChanged={handleChange}
            bounds={
              center && {
                north: Number(center.lat) + 0.2,
                south: Number(center.lat) - 0.2,
                east: Number(center.lng) + 0.2,
                west: Number(center.lng) - 0.2
              }
            }
            className="address-input w-full"
          >
            <input
              type="text"
              className="text-2xl w-full py-2 text-black rounded-bl-lg rounded-tr-lg"
              placeholder="Search Address"
              value={pickupLocation}
              required
              onChange={e => {
                setPickUpLocation(e.target.value);
              }}
            />
          </Autocomplete>

          <div className="flex flex-col ">
            <span className="text-white text-3xl mb-4 ">
              Special Requirements
            </span>
            <textarea
              rows={4}
              className="text-2xl py-2 text-black rounded-bl-lg rounded-tr-lg"
              onChange={e => setSpecialRequierments(e.target.value)}
              value={specialRequierment}
            />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}
export default Map;
