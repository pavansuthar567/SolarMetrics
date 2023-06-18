import { IconButton } from '@mui/material';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
  useLoadScript,
} from '@react-google-maps/api';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_GOOGLE_MAP_API_KEY } from 'src/Environment';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { blue, green, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

export const defaultCenter = {
  lat: 21.17024,
  lng: 72.831062,
};

export const defaultMapOptions = {
  mapId: '8914cb112547e41',
  controlSize: 30,
  streetViewControl: false, //streetViewControl don't show
  clickableIcons: false,
  fullscreenControl: true, // for fullscreen button
  fullscreenControlOptions: { position: 11 },
  mapTypeControl: true,
  mapTypeControlOptions: {
    position: 11,
    style: 'hybrid',
  },
};

// Working Map

const Map = ({ onOpenProductModal, setSelectedCoord, selectedCoord }) => {
  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${REACT_APP_GOOGLE_MAP_API_KEY}`,
  });

  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const { productList } = useSelector((state) => state.product);

  const onClickMap = useCallback(
    (lat, lng) => {
      setSelectedCoord({ lat, lng });
    },
    [dispatch],
  );

  const map = useMemo(() => {
    if (isLoaded)
      return (
        <GoogleMap
          onClick={(e) => onClickMap(e.latLng.lat(), e.latLng.lng())}
          zoom={15}
          center={defaultCenter}
          mapContainerClassName="map"
          options={defaultMapOptions}
          onLoad={onLoad}
        >
          <MarkerClusterer clusterClass="cluster">
            {(clusterer) =>
              productList?.map((x, i) => {
                return (
                  <Marker key={i} position={{ lat: x?.lat, lng: x?.lng }} clusterer={clusterer}>
                    <InfoWindow
                      options={{
                        pane: 'overlayLayer',
                        pixelOffset: new window.google.maps.Size(0, -50),
                        alignBottom: true,
                        boxStyle: {
                          boxShadow: `3px 3px 10px rgba(0,0,0,0.6)`,
                        },
                      }}
                      position={{ lat: x?.lat, lng: x?.lng }}
                    >
                      <div id="iw-container">
                        <div className="iw-title">{x?.title}</div>
                        <div>
                          Power Peak: {x?.power_peak_in_watt ? x?.power_peak_in_watt : 0} (watt)
                        </div>
                        <div>Area Sm : {x?.area_sm ? x?.area_sm : 0}</div>
                        <div>Orientation: {x?.orientation ? x?.orientation : 0}</div>
                        <div>Inclination: {x?.inclination ? x?.inclination : 0}</div>
                        <div style={{ marginTop: '5px' }}>
                          <IconButton aria-label="delete" sx={{ marginRight: '5px', padding: '0' }}>
                            <CreateIcon sx={{ color: green[500] }} />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <DeleteIcon sx={{ color: red[500] }} />
                          </IconButton>
                        </div>
                      </div>
                    </InfoWindow>
                  </Marker>
                );
              })
            }
          </MarkerClusterer>
          {selectedCoord?.lat ? (
            <Marker position={selectedCoord}>
              <InfoWindow
                options={{
                  maxWidth: 10,
                  pane: 'overlayLayer',
                  pixelOffset: new window.google.maps.Size(0, -50),
                  alignBottom: true,
                  boxStyle: {
                    boxShadow: `3px 3px 10px rgba(0,0,0,0.6)`,
                  },
                }}
                position={selectedCoord}
              >
                <IconButton
                  aria-label="Create"
                  sx={{ padding: 0, paddingLeft: '15px' }}
                  onClick={onOpenProductModal}
                >
                  <AddCircleIcon sx={{ color: blue[500] }} />
                </IconButton>
              </InfoWindow>
            </Marker>
          ) : null}
        </GoogleMap>
      );
  }, [isLoaded, onClickMap, onLoad, productList, selectedCoord]);

  return <>{map}</>;
};

export default Map;
