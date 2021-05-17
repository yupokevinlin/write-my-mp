import React from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import {getPartyColor} from "./types";
import {LanguageUtils} from "../../../helpers/LanguageUtils";

export type MPInformationProps = MPInformationDataProps & MPInformationStyleProps & MPInformationEventProps;

export interface MPInformationDataProps {
  isEnglish: boolean;
  currentMapPolygon: MapPolygon | null;
}

export interface MPInformationStyleProps {

}

export interface MPInformationEventProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "230px",
      },
    },
    picture: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "100%",
        width: "142px",
      },
    },
    vacantPicture: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.grey["400"],
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "100%",
        width: "142px",
      },
    },
    vacantPictureIcon: {
      color: theme.palette.grey["600"],
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "50%",
        width: "50%",
      },
    },
    infoWrapper: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "100%",
        width: "calc(100% - 142px)",
      },
    },
    title: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "30px",
        marginBottom: "5px",
        width: "100%",
      },
    },
    titleText: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "24px",
        marginLeft: "15px",
      },
    },
    label: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "22px",
        width: "100%",
      },
    },
    labelText: {
      fontWeight: "bold",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
        marginLeft: "15px",
      },
    },
    value: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "22px",
        width: "100%",
      },
    },
    valueText: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
        marginLeft: "15px",
      },
    },
    partyBar: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(100% - 30px)",
        height: "5px",
        marginBottom: "5px",
        marginLeft: "15px",
      },
    },
  }),
);

const MPInformation: React.FC<MPInformationProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    isEnglish,
    currentMapPolygon,
  } = props;

  if (!!currentMapPolygon && !!currentMapPolygon.mpData) {
    const isVacant: boolean = currentMapPolygon.mpData.party === "Vacant";
    const name: string = isVacant ? (isEnglish ? "This seat is vacant" : "Ce siège est vacant") : (isEnglish ? (`${!!currentMapPolygon.mpData.title ? `The ${currentMapPolygon.mpData.title.replace("Hon.", "Honourable")} ` : ""}${currentMapPolygon.mpData.firstName} ${currentMapPolygon.mpData.lastName}`) : (`${!!currentMapPolygon.mpData.title ? `L'${currentMapPolygon.mpData.title.replace("Hon.", "honorable")} `.replace("L'Right", "Le très") : ""}${currentMapPolygon.mpData.firstName} ${currentMapPolygon.mpData.lastName}`));
    const party: string = isVacant ? `${isEnglish ? "N/A" : "n/d"}` : (isEnglish ? currentMapPolygon.mpData.party : LanguageUtils.getFrenchPartyFromParty(currentMapPolygon.mpData.party));
    const constituencyName: string = (isEnglish ? currentMapPolygon.constituency : currentMapPolygon.constituencyFrench).replace(/—/g, "-").replace(/-/g, " - ");
    const province: string = isEnglish ? currentMapPolygon.mpData.province : LanguageUtils.getFrenchProvinceFromProvince(currentMapPolygon.mpData.province);
    const preferredLanguage: string = isVacant ? `${isEnglish ? "N/A" : "n/d"}` : (isEnglish ? currentMapPolygon.mpData.contact.preferredLanguage : currentMapPolygon.mpData.contact.preferredLanguage.replace("English", "Anglais").replace("French", "Français"));

    return (
      <div className={classes.paper} style={{backgroundColor: `${getPartyColor(currentMapPolygon.mpData.party)}15`}}>
        {
          isVacant ? (
            <div className={classes.vacantPicture}>
              <PersonIcon className={classes.vacantPictureIcon}/>
            </div>
          ) : (
            <img className={classes.picture} src={currentMapPolygon.mpData.photoSrc}/>
          )
        }
        <div className={classes.infoWrapper}>
          <div className={classes.title}>
            <Typography className={classes.titleText}>
              {
                name
              }
            </Typography>
          </div>
          <div className={classes.label}>
            <Typography className={classes.labelText}>
              {
                isEnglish ? "Political Affiliation:" : "Affiliation politique:"
              }
            </Typography>
          </div>
          <div className={classes.value}>
            <Typography className={classes.valueText}>
              {
                party
              }
            </Typography>
          </div>
          <div className={classes.partyBar} style={{backgroundColor: getPartyColor(currentMapPolygon.mpData.party)}}/>
          <div className={classes.label}>
            <Typography className={classes.labelText}>
              {
                isEnglish ? "Constituency:" : "Circonscription:"
              }
            </Typography>
          </div>
          <div className={classes.value}>
            <Typography className={classes.valueText}>
              {
                constituencyName
              }
            </Typography>
          </div>
          <div className={classes.label}>
            <Typography className={classes.labelText}>
              {
                isEnglish ? "Province / Territory:" : "Province / Territoire:"
              }
            </Typography>
          </div>
          <div className={classes.value}>
            <Typography className={classes.valueText}>
              {
                province
              }
            </Typography>
          </div>
          <div className={classes.label}>
            <Typography className={classes.labelText}>
              {
                isEnglish ? "Preferred Language:" : "Langue préférée:"
              }
            </Typography>
          </div>
          <div className={classes.value}>
            <Typography className={classes.valueText}>
              {
                preferredLanguage
              }
            </Typography>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.paper}>

      </div>
    );
  }

};

export default MPInformation;

