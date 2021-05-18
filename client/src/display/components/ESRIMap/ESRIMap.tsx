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
import Point = __esri.Point;
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
import {ESRIMapLayerNames, XYCoord} from "./types";
import {LanguageUtils} from "../../../helpers/LanguageUtils";

export type ESRIMapProps = ESRIMapDataProps & ESRIMapStyleProps & ESRIMapEventProps;

export interface ESRIMapDataProps {
  initComplete: boolean;
  isEnglish: boolean;
  mapPolygons: Array<MapPolygon>;
  initialBaseMap: string;
  currentPosition: XYCoord;
}

export interface ESRIMapStyleProps {
  width: Breakpoint;
}

export interface ESRIMapEventProps {
  handleMapPolygonClick(mapPolygon: MapPolygon | null): void;
  handleLoadComplete(): void;
  handleUnableToFindPolygonAtCurrentPosition(): void;
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
let currentPositionLayer: FeatureLayer = null;
let localMapPolygons: Array<MapPolygon> = [];

export const destroyESRIMap = (): void => {
  map = null;
  mapView = null;
  polygonLayer = null;
  highlightLayer = null;
  currentPositionLayer = null;
  localMapPolygons = [];
};

const ESRIMap: React.FC<ESRIMapProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const mapRef: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const {
    initComplete,
    mapPolygons,
    currentPosition,
    initialBaseMap,
    isEnglish,
    width,
    handleMapPolygonClick,
    handleLoadComplete,
    handleUnableToFindPolygonAtCurrentPosition,
  } = props;

  const [highlightGeometry, setHighlightGeometry] = useState<Array<Array<[number, number]>>>([]);

  const prevProps: ESRIMapProps = usePreviousProps<ESRIMapProps>(props);
  useEffect(() => {
    loadModules(
      ["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer", "esri/widgets/Legend", "esri/geometry/Point", "esri/geometry/Polygon", "esri/Graphic", "esri/geometry/geometryEngine"],
      {
        css: true,
      }
    ).then(([Map, MapView, FeatureLayer, GraphicsLayer, Legend, Point, Polygon, Graphic, geometryEngine]) => {

      if (!map) {
        initialize(Map, MapView, FeatureLayer, GraphicsLayer, Legend);
      }

      if (prevProps) {
        if (prevProps.mapPolygons !== mapPolygons) {
          localMapPolygons = mapPolygons;
          handleMapPolygonsChange();
        }
        if (prevProps.currentPosition !== currentPosition) {
          handleCurrentPositionChange(geometryEngine, Point);
        }
        if (prevProps.width !== width) {
          handleWidthChange();
        }
        if (prevProps.isEnglish !== isEnglish) {
          handleIsEnglishChange();
        }
      }
      handleHighlightGeometryChange(Polygon, Graphic);
      return destroyESRIMap;
    });
  }, [mapPolygons, highlightGeometry, currentPosition, width, isEnglish]);

  const initialize = (Map, MapView, FeatureLayer, GraphicsLayer, Legend): void => {
    map = new Map({
      basemap: initialBaseMap,
    });

    mapView = new MapView({
      container: mapRef.current,
      map: map,
      center: [-93, 53],
      zoom: 4,
      ui: {
        components: ["zoom", "compass"],
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
    currentPositionLayer = getCurrentPositionLayer(FeatureLayer);

    const layers: Array<FeatureLayer | GraphicsLayer> = [polygonLayer, highlightLayer, currentPositionLayer];
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
          handleMapPolygonClick(null);
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
        if (!initComplete) {
          handleLoadComplete();
        }
      });
    });
  };

  const handleCurrentPositionChange = (geometryEngine, Point): void => {
    polygonLayer.queryFeatures().then((rsp => {
      const allPolygons: Array<Graphic> = rsp.features;
      const point: Point = new Point({
        x: currentPosition.x,
        y: currentPosition.y,
        spatialReference: { wkid: 4326 },
      });
      const intersectingPolygons: Array<Graphic> = allPolygons.filter((graphic) => geometryEngine.intersects(graphic.geometry, point));
      const intersectingPolygon: Graphic | undefined = intersectingPolygons[0];
      updateCurrentPositionLayer();
      if (intersectingPolygon) {
        const constituency: string = intersectingPolygon.attributes.constituency;
        const matchingMapPolygon: MapPolygon = localMapPolygons.find(mapPolygon => mapPolygon.constituency === constituency);
        if (matchingMapPolygon) {
          setHighlightGeometry(matchingMapPolygon.geometry);
          handleMapPolygonClick(matchingMapPolygon);
          mapView.goTo(intersectingPolygon.geometry.extent, {
            duration: 1000,
          });
        }
      } else {
        setHighlightGeometry([]);
        handleMapPolygonClick(null);
        handleUnableToFindPolygonAtCurrentPosition();
      }
    }));
  };

  const updateCurrentPositionLayer = (): void => {
    if (currentPosition.x !== -1 && currentPosition.x !== -1) {
      const renderer = (currentPositionLayer.renderer as __esri.UniqueValueRenderer).clone();
      currentPositionLayer.queryObjectIds().then(oldObjectIds => {
        const addFeatures: Array<any> = []
        addFeatures.push({
          attributes: {
            width: width,
          },
          geometry: {
            type: "point",
            x: currentPosition.x,
            y: currentPosition.y,
            spatialReference: { wkid: 4326 },
          }
        })

        const deleteFeatures: Array<{ objectId: number }> = oldObjectIds.map(oldObjectId => ({ objectId: oldObjectId }));

        currentPositionLayer.renderer = renderer;

        currentPositionLayer.applyEdits({
          addFeatures: addFeatures,
          deleteFeatures: deleteFeatures,
        }).then(rsp => {

        });
      });
    }
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

    const renderer = getPolygonLayerRenderer();

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

  const getCurrentPositionLayer = (FeatureLayer): FeatureLayer => {
    const iconString: string = "data:image/svg+xml;base64,CiAgICA8c3ZnIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCI+CiAgICAgIDxnPgogICAgICAgIDxwYXRoIGQ9Ik01MTEuOTg2IDZjLTgwLjg1NCAwLjE4Ny0xNjIuOTAzIDI2LjY5Ny0yMjQuODQgODMuNzgxcy0xMDMuMzk1IDE0NC43MTktMTAzLjM5NSAyNjUuNTk2YzAgNDIuNTg2IDIwLjUgMTA0LjA0NiA1MC44MjIgMTczLjUxNHM3MC42NTggMTQ2LjYwMSAxMTAuOTc1IDIxOC42MzNjODAuNjM0IDE0NC4wNjQgMTYxLjI0IDI2Ny43NTIgMTYxLjI0IDI2Ny43NTIgNi40OTggMTEuMDk1IDMuOTk5IDExLjk2MiA5Ljg5NiAxLjA4OGwwLjcwOS0xLjA4OGMwIDAgODAuNTYzLTEyMy42OSAxNjEuMTUtMjY3Ljc1NCA0MC4yOTQtNzIuMDMyIDgwLjYwNS0xNDkuMTY0IDExMC45MS0yMTguNjMxczUwLjc5My0xMzAuOTI5IDUwLjc5My0xNzMuNTE0YzAtMTIwLjg3Ni00MS40NTgtMjA4LjUxMi0xMDMuMzk1LTI2NS41OTZzLTE0My45ODYtODMuNTk1LTIyNC44NC04My43ODFoLTAuMDE0ek01MTEuOTg2IDE4Yzc4LjI0OSAwLjE4MSAxNTcuMzI0IDI1Ljg0OSAyMTYuNzM2IDgwLjYwNXM5OS41MjUgMTM4LjYyNSA5OS41MjUgMjU2Ljc3MWMwIDM4LjYyMS0xOS43NDYgOTkuODM5LTQ5Ljc5MyAxNjguNzE1cy03MC4yMDYgMTQ1Ljc1LTExMC4zODMgMjE3LjU3MmMtNzMuNDQ2IDEzMS4yOTYtMTQzLjg5NCAyNDAuOTYtMTU1Ljk4MiAyNTkuNjU4LTEyLjA5NS0xOC42OTctODIuNTgzLTEyOC4zNjMtMTU2LjA3MC0yNTkuNjYtNDAuMTk5LTcxLjgyMi04MC4zODMtMTQ4LjY5Ny0xMTAuNDQ3LTIxNy41NzJzLTQ5LjgyLTEzMC4wOTMtNDkuODItMTY4LjcxM2MwLTExOC4xNDYgNDAuMTE0LTIwMi4wMTUgOTkuNTI1LTI1Ni43NzEgNTkuNDA1LTU0Ljc1MSAxMzguNDY5LTgwLjQxOSAyMTYuNzA5LTgwLjYwNXoiIGZpbGw9IiMwMDk2ODgiLz48cGF0aCBkPSJNODEyIDM1Mi44NDhjMCAxNjUuNjg1LTEzNC4zMTUgMzAwLTMwMCAzMDBzLTMwMC0xMzQuMzE1LTMwMC0zMDBjMC0xNjUuNjg1IDEzNC4zMTUtMzAwIDMwMC0zMDBzMzAwIDEzNC4zMTUgMzAwIDMwMHoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNNTEyIDEwMTEuNDQ5YzAgMC4xODQgMC4zNjcgMC41NTEgMC4zNjcgMC41NTFzMzIxLjg4MS00OTQuMjEzIDMyMS44ODEtNjU2LjYyM2MwLTIzOS4wMjMtMTYzLjE0NS0zNDMuMDA5LTMyMi4yNDktMzQzLjM3Ny0xNTkuMTAzIDAuMzY3LTMyMi4yNDkgMTA0LjM1NC0zMjIuMjQ5IDM0My4zNzcgMCAxNjIuNDEgMzIyLjA2NSA2NTYuNjIzIDMyMi4wNjUgNjU2LjYyM3MwLjE4NC0wLjU1MSAwLjE4NC0wLjU1MXpNNDAwLjQ4MSAzNDEuNzgxYzAtNjEuNzMxIDQ5Ljk3Mi0xMTEuNzAzIDExMS43MDMtMTExLjcwM3MxMTEuNzAzIDQ5Ljk3MiAxMTEuNzAzIDExMS43MDNjMCA2MS43MzEtNTAuMTU2IDExMS43MDMtMTExLjg4NyAxMTEuNzAzLTYxLjU0NyAwLTExMS41MTktNDkuOTcyLTExMS41MTktMTExLjcwM3oiIGZpbGw9IiMwMDk2ODgiLz4KICAgICAgPC9nPgogICAgPC9zdmc+CiAg";

    const fields: Array<FieldProperties> = [
      {
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "oid",
      },
      {
        name: "width",
        alias: "width",
        type: "string",
      },
    ];

    const renderer = {
      type: "unique-value",
      field: "width",
      uniqueValueInfos: [
        {
          value: "xs",
          symbol: {
            type: "picture-marker",
            url: iconString,
            height: "20px",
            width: "20px",
            yoffset: "10px",
          }
        },
        {
          value: "sm",
          symbol: {
            type: "picture-marker",
            url: iconString,
            height: "20px",
            width: "20px",
            yoffset: "10px",
          }
        },
        {
          value: "md",
          symbol: {
            type: "picture-marker",
            url: iconString,
            height: "30px",
            width: "30px",
            yoffset: "15px",
          }
        },
        {
          value: "lg",
          symbol: {
            type: "picture-marker",
            url: iconString,
            height: "40px",
            width: "40px",
            yoffset: "20px",
          }
        },
        {
          value: "xl",
          symbol: {
            type: "picture-marker",
            url: iconString,
            height: "40px",
            width: "40px",
            yoffset: "20px",
          }
        },
      ],
    };

    return new FeatureLayer({
      id: ESRIMapLayerNames.currentPositionLayer,
      title: "",
      geometryType: "point",
      source: [],
      fields: fields,
      objectIdField: "OBJECTID",
      renderer: renderer,
      popupEnabled: false,
      legendEnabled: false,
    });
  };

  const handleWidthChange = (): void => {
    updateCurrentPositionLayer();
  };

  const getPolygonLayerRenderer = (): any => {
    const legendOpacity: number = 0.3;
    const legendOutlineOpacity: number = 0.4;
    const renderer = {
      type: "unique-value",
      field: "party",
      legendOptions: {
        title: isEnglish ? "Political Affiliation" : "Affiliation politique",
      },
      defaultSymbol: {
        type: "simple-fill",
        style: "backward-diagonal",
        color: [126, 126, 126, legendOpacity],
        outline: {
          width: 1,
          color: [0, 0, 0, legendOutlineOpacity],
        },
      },
      defaultLabel: isEnglish ? "Vacant" : LanguageUtils.getFrenchPartyFromParty("Vacant"),
      uniqueValueInfos: [
        {
          value: "Liberal",
          label: isEnglish ? "Liberal" : LanguageUtils.getFrenchPartyFromParty("Liberal"),
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [237, 46, 56, legendOpacity],
            outline: {
              width: 1,
              color: [0, 0, 0, legendOutlineOpacity],
            },
          },
        },
        {
          value: "Conservative",
          label: isEnglish ? "Conservative" : LanguageUtils.getFrenchPartyFromParty("Conservative"),
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [0, 35, 149, legendOpacity],
            outline: {
              width: 1,
              color: [0, 0, 0, legendOutlineOpacity],
            },
          },
        },
        {
          value: "Bloc Québécois",
          label: isEnglish ? "Bloc Québécois" : LanguageUtils.getFrenchPartyFromParty("Bloc Québécois"),
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [0, 136, 206, legendOpacity],
            outline: {
              width: 1,
              color: [0, 0, 0, legendOutlineOpacity],
            },
          },
        },
        {
          value: "NDP",
          label: isEnglish ? "NDP" : LanguageUtils.getFrenchPartyFromParty("NDP"),
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [255, 88, 0, legendOpacity],
            outline: {
              width: 1,
              color: [0, 0, 0, legendOutlineOpacity],
            },
          },
        },
        {
          value: "Green Party",
          label: isEnglish ? "Green Party" : LanguageUtils.getFrenchPartyFromParty("Green Party"),
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [66, 119, 48, legendOpacity],
            outline: {
              width: 1,
              color: [0, 0, 0, legendOutlineOpacity],
            },
          },
        },
        {
          value: "Independent",
          label: isEnglish ? "Independent" : LanguageUtils.getFrenchPartyFromParty("Independent"),
          symbol: {
            type: "simple-fill",
            style: "solid",
            color: [192, 192, 192, legendOpacity],
            outline: {
              width: 1,
              color: [0, 0, 0, legendOutlineOpacity],
            },
          },
        },
      ],
    };
    return renderer;
  };

  const handleIsEnglishChange = (): void => {
    const renderer = getPolygonLayerRenderer();
    polygonLayer.renderer = renderer;
  };

  return (
    <div className={classes.root} ref={mapRef}/>
  );
};

export default ESRIMap;
