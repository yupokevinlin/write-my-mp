import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import "./ESRIMap.css";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {usePreviousProps} from "../../../hooks/usePreviousProps";
import {loadModules} from "esri-loader";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import Map = __esri.Map;
import MapView = __esri.MapView;
import FeatureLayer = __esri.FeatureLayer;
import Legend = __esri.Legend;
import FieldProperties = __esri.FieldProperties;
import ClassBreaksRenderer = __esri.ClassBreaksRenderer;
import GraphicsLayer = __esri.GraphicsLayer;
import Graphic = __esri.Graphic;
import Polygon = __esri.Polygon;
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
import {ESRIMapLayerNames} from "./types";

export type ESRIMapProps = ESRIMapDataProps & ESRIMapStyleProps & ESRIMapEventProps;

export interface ESRIMapDataProps {
  mapPolygons: Array<MapPolygon>;
  initialBaseMap: string;
}

export interface ESRIMapStyleProps {
  width: Breakpoint;
}

export interface ESRIMapEventProps {
  handleMapPolygonClick(mapPolygon: MapPolygon): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
    }
  }),
);

let map: Map = null;
let mapView: MapView = null;
let polygonLayer: FeatureLayer = null;
let highlightLayer: GraphicsLayer = null;
let localMapPolygons: Array<MapPolygon> = [];

export const destroyESRIMap = (): void => {
  map = null;
  mapView = null;
  polygonLayer = null;
  highlightLayer = null;
  localMapPolygons = [];
};

const ESRIMap: React.FC<ESRIMapProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const mapRef: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const {
    mapPolygons,
    initialBaseMap,
    width,
    handleMapPolygonClick,
  } = props;

  const [highlightGeometry, setHighlightGeometry] = useState<Array<Array<[number, number]>>>([]);

  const prevProps: ESRIMapProps = usePreviousProps<ESRIMapProps>(props);
  useEffect(() => {
    loadModules(
      ["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer", "esri/widgets/Legend", "esri/geometry/Point", "esri/geometry/Polygon", "esri/Graphic"],
      {
        css: true,
      }
    ).then(([Map, MapView, FeatureLayer, GraphicsLayer, Legend, Point, Polygon, Graphic]) => {

      if (!map) {
        initialize(Map, MapView, FeatureLayer, GraphicsLayer, Legend, Point);
      }

      if (prevProps) {
        if (prevProps.mapPolygons !== mapPolygons) {
          localMapPolygons = mapPolygons;
          handleMapPolygonsChange();
        }
      }
      handleHighlightGeometryChange(Polygon, Graphic);
      return destroyESRIMap;
    });
  }, [mapPolygons, highlightGeometry]);

  const initialize = (Map, MapView, FeatureLayer, GraphicsLayer, Legend, Point): void => {
    map = new Map({
      basemap: initialBaseMap,
    });

    mapView = new MapView({
      container: mapRef.current,
      map: map,
      center: [-93, 53],
      zoom: 5,
      ui: {
        components: ["attribution", "zoom", "compass"],
      },
    });
    mapView.popup.collapseEnabled = false;
    mapView.popup.dockOptions = {
      position: "top-right"
    };
    mapView.constraints = {
      rotationEnabled: false,
    }

    polygonLayer = getPolygonLayer(FeatureLayer);
    highlightLayer = getHighlightLayer(GraphicsLayer);

    const layers: Array<FeatureLayer | GraphicsLayer> = [polygonLayer, highlightLayer];
    layers.forEach(layer => map.add(layer));

    const legend: Legend = new Legend({
      view: mapView,
    });

    mapView.ui.add(legend, "bottom-left");

    mapView.on("click", (event) => {
      switch (event.button) {
        case 0: {
          mapView.hitTest(event).then((rsp => {
            const hitResults: Array<any> = rsp.results;
            hitResults.forEach(result => {
              const sourceLayerName: string = result?.graphic?.sourceLayer?.id;
              if (!!sourceLayerName) {
                switch (sourceLayerName) {
                  case ESRIMapLayerNames.polygonLayer: {
                    const objectId: number = result.graphic.attributes.OBJECTID;
                    polygonLayer.queryFeatures().then((featureRsp) => {
                      const features: Array<any> = featureRsp.features;
                      for (let i = 0; i < features.length; i++) {
                        const feature: any = features[i];
                        if (feature.attributes.OBJECTID === objectId) {
                          const constituency: string = feature.attributes.constituency;
                          const matchingMapPolygon: MapPolygon = localMapPolygons.find(mapPolygon => mapPolygon.constituency === constituency);
                          if (matchingMapPolygon) {
                            setHighlightGeometry(matchingMapPolygon.geometry);
                            handleMapPolygonClick(matchingMapPolygon);
                          }
                          break;
                        }
                      }
                    });
                    break;
                  }
                  default: {
                    break;
                  }
                }
              }
            });
          }));
          break;
        }
        case 2: {
          setHighlightGeometry([]);
        }
      }
    });
  };

  const handleMapPolygonsChange = (): void => {
    if (!polygonLayer) {
      return;
    }
    
    polygonLayer.queryFeatures().then(result => {
      const renderer = (polygonLayer.renderer as ClassBreaksRenderer).clone();

      const addFeatures: Array<any> = mapPolygons.map(mapPolygon => {
        return {
          attributes: {
            constituency: mapPolygon.constituency,
            party: mapPolygon.mpData.party,
          },
          geometry: {
            type: "polygon",
            hasZ: false,
            hasM: false,
            rings: mapPolygon.geometry,
            spatialReference: { wkid: 4326 },
          },
        }
      });

      const deleteFeatures: Array<{ objectId: number }> = [];

      polygonLayer.renderer = renderer;
      polygonLayer.applyEdits({
        addFeatures: addFeatures,
        deleteFeatures: deleteFeatures,
      }).then(rsp => {

      });
    });
  };

  const handleHighlightGeometryChange = (Polygon, Graphic): void => {
    const polygon: Polygon = new Polygon({
      rings: highlightGeometry,
      spatialReference: { wkid: 4326 }
    })
    if (!highlightLayer) {
      return;
    }
    highlightLayer.removeAll();
    if (highlightGeometry.length === 0) {
      return;
    }
    const simpleFillSymbol = {
      type: "simple-fill",
      color: [0, 0, 0, 0],
      outline: {
        color: [128, 222, 234],
        width: 3,
      }
    };
    const polygonGraphic: Graphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
    })
    highlightLayer.add(polygonGraphic);
  };

  const getPolygonLayer = (FeatureLayer): FeatureLayer => {
    const opacity: number = 0.3;
    const outlineOpacity: number = 0.4;
    const fields: Array<FieldProperties> = [
      {
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "oid",
      },
      {
        name: "constituency",
        alias: "constituency",
        type: "string",
      },
      {
        name: "party",
        alias: "party",
        type: "string",
      }
    ];

    const renderer = {
      type: "unique-value",
      field: "party",
      legendOptions: {
        title: "Political Party",
      },
      defaultSymbol: {
        type: "simple-fill",
        style: "backward-diagonal",
        color: [126, 126, 126, opacity],
        outline: {
          width: 1,
          color: [0, 0, 0, outlineOpacity],
        },
      },
      defaultLabel: "Vacant",
      uniqueValueInfos: [
        {
          value: "Liberal",
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [237, 46, 56, opacity],
            outline: {
              width: 1,
              color: [0, 0, 0, outlineOpacity],
            },
          },
        },
        {
          value: "Conservative",
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [0, 35, 149, opacity],
            outline: {
              width: 1,
              color: [0, 0, 0, outlineOpacity],
            },
          },
        },
        {
          value: "Bloc Québécois",
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [0, 136, 206, opacity],
            outline: {
              width: 1,
              color: [0, 0, 0, outlineOpacity],
            },
          },
        },
        {
          value: "NDP",
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [255, 88, 0, opacity],
            outline: {
              width: 1,
              color: [0, 0, 0, outlineOpacity],
            },
          },
        },
        {
          value: "Green Party",
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [66, 119, 48, opacity],
            outline: {
              width: 1,
              color: [0, 0, 0, outlineOpacity],
            },
          },
        },
        {
          value: "Independent",
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [192, 192, 192, opacity],
            outline: {
              width: 1,
              color: [0, 0, 0, outlineOpacity],
            },
          },
        },
      ],
    };

    return new FeatureLayer({
      id: ESRIMapLayerNames.polygonLayer,
      title: "",
      geometryType: "polygon",
      source: [],
      fields: fields,
      objectIdField: "OBJECTID",
      renderer: renderer,
    });
  };

  const getHighlightLayer = (GraphicsLayer): GraphicsLayer => {
    return new GraphicsLayer({
      id: ESRIMapLayerNames.highlightLayer,
    });
  };

  return (
    <div className={classes.root} ref={mapRef}/>
  );
};

export default ESRIMap;
