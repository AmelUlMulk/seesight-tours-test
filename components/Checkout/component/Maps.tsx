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

  next
}: MapProps) {
  const [confirmLoading, setComfirmationLoading] = useState<boolean>(false);

  const [pickupCoords, setPickupCoords] = useState<any>(null);

  const [autocomplete, setAutocomplete] = useState<any>(null);

  const [wrongLocation, setWrongLocation] = useState<Boolean>(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `AIzaSyCK_FbJyCK7eV-1GkrJ0cfsyJIuB0QJ2Ow`,
    libraries: ['places']
  });

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
    setComfirmationLoading(true);
    const headers = {
      'Content-Type': 'application/json'
    };

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_PAYMENT_API}/booking/${id}`,
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
    setComfirmationLoading(false);
    if (response.status === 200) {
      setThankYou(true);
      next();
    }
  };
  return isLoaded ? (
    <div className="flex flex-col lg:flex-row justify-between mt-4 items-start ">
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

      <div className="w-full lg:w-[48%] flex justify-center align-middle   ">
        <form
          className="w-full justify-center align-middle flex-col flex gap-1 "
          id="confirmation-form"
          onSubmit={e => confirmBooking(e)}
        >
          <h2 className="text-black  text-xl  ">Pick Up Location</h2>
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
              className="text-base px-2 w-full py-2 text-black border-2 border-gray-300  "
              placeholder="Search Address"
              value={pickupLocation}
              required
              onChange={e => {
                setPickUpLocation(e.target.value);
              }}
            />
          </Autocomplete>

          <div className="flex flex-col  ">
            <span className="text-black text-xl mt-4 ">
              Special Requirements
            </span>
            <textarea
              rows={4}
              className="text-base px-2 w-full py-2 text-black border-2 border-gray-300"
              onChange={e => setSpecialRequierments(e.target.value)}
              value={specialRequierment}
            />
          </div>
          <div className="flex justify-between mt-6 ">
            <button
              className=" bg-[#F15C5A]  py-3 rounded-md w-1/3 text-white   "
              onClick={e => {
                e.preventDefault();
                setThankYou(true);
              }}
            >
              Confirm Later
            </button>

            <button
              className="border-2 border-[#F15C5A]  py-3 rounded-md w-1/3  "
              type="submit"
              form="confirmation-form"
            >
              {confirmLoading ? (
                <span className="animate-pulse">Processing</span>
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}
export default Map;
