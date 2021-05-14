import React, {useState} from "react";
import {createStyles, Theme, useTheme, withWidth} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MapPolygon} from "../../../../shared/types/data/Map/MapTypes";
import Typography from "@material-ui/core/Typography";
import ESRIMap from "../components/ESRIMap/ESRIMap";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import LoadingPageTransparent from "./statelessPages/LoadingPageTransparent";
import {XYCoord} from "../components/ESRIMap/types";

export type HomePageProps = HomePageDataProps & HomePageStyleProps & HomePageEventProps;

export interface HomePageDataProps {
  mapPolygons: Array<MapPolygon>;
}

export interface HomePageStyleProps {
  width: Breakpoint;
}

export interface HomePageEventProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: "100%",
      width: "100%",
    },
    esriContainer: {
      height: "100%",
      width: "60%",
    },
    tableContainer: {
      height: "100%",
      width: "40%",
    },
  }),
);

const HomePage: React.FC<HomePageProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    mapPolygons,
    width,
  } = props;

  const [isESRIMapLoaded, setIsESRIMapLoaded] = useState<boolean>(false);
  const [currentMapPolygon, setCurrentMapPolygon] = useState<MapPolygon | null>(null);
  const [currentPosition, setCurrentPosition] = useState<XYCoord>({x: 0, y: 0,});

  const handleLoadComplete = (): void => {
    setIsESRIMapLoaded(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({x: position.coords.longitude, y: position.coords.latitude,});
      });
    }
  };

  const handleMapPolygonClick = (mapPolygon: MapPolygon | null): void => {
    setCurrentMapPolygon(mapPolygon);
  };

  const handleUnableToFindPolygonAtCurrentPosition = (): void => {
    
  };

  return (
    <div className={classes.root}>
      <div className={classes.esriContainer}>
        <ESRIMap initComplete={isESRIMapLoaded} mapPolygons={mapPolygons} currentPosition={currentPosition} initialBaseMap={"topo"} width={width} handleMapPolygonClick={handleMapPolygonClick} handleLoadComplete={handleLoadComplete} handleUnableToFindPolygonAtCurrentPosition={handleUnableToFindPolygonAtCurrentPosition}/>
        <LoadingPageTransparent isLoading={!isESRIMapLoaded}/>
      </div>
      <div className={classes.tableContainer}>

      </div>
    </div>
  );
};

export default withWidth()(HomePage);

