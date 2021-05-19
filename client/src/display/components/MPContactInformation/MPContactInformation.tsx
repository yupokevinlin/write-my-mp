import React from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import {getPartyBackgroundColor, getPartyColor} from "../MPInformation/types";

export type MPContactInformationProps = MPContactInformationDataProps & MPContactInformationStyleProps & MPContactInformationEventProps;

export interface MPContactInformationDataProps {
  isEnglish: boolean;
  currentMapPolygon: MapPolygon | null;
}

export interface MPContactInformationStyleProps {

}

export interface MPContactInformationEventProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
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
        height: "255px",
      },
    },
    emailWebsiteWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "10px",
        height: "44px",
        width: "100%",
      },
    },
    emailWebsite: {
      height: "100%",
      width: "50%",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {

      },
    },
    contactWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "10px",
        height: "44px",
        width: "100%",
      },
    },
    contact: {
      height: "100%",
      width: "33%",
    },
    contactNoAlternateOffice: {
      width: "50%",
    },
    contactTitle: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "26px",
        width: "100%",
      },
    },
    contactTitleText: {
      fontWeight: "bold",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "16px",
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
  }),
);

const MPContactInformation: React.FC<MPContactInformationProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    isEnglish,
    currentMapPolygon,
  } = props;

  const handleEmailClick = (e: React.MouseEvent<HTMLElement>): void => {
    const email: string = currentMapPolygon.mpData.contact.email.toLowerCase();
    const newWindow: Window = window.open(`mailto:${email}`, "_blank", "noopener,noreferrer")
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const handleWebsiteClick = (e: React.MouseEvent<HTMLElement>): void => {
    const website: string = getWebsite();
    const newWindow: Window = window.open(website, "_blank", "noopener,noreferrer")
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const getWebsite = (): string => {
    return isEnglish ? currentMapPolygon.mpData.contact.website : (currentMapPolygon.mpData.contact.website ? currentMapPolygon.mpData.contact.website.replace(".ca/?lang=en", ".ca").replace(".ca/en", ".ca") : "") || "";
  };

  const hillOfficeName: string = isEnglish ? "House of Commons" : "Chambre des communes";
  const hillOfficeAddress: Array<string> = isEnglish ? ["Ottawa, Ontario,", "Canada", "K1A 0A6"] : ["Ottawa (Ontario)", "Canada", "K1A 0A6"];
  const hillOfficeTelephone: string = "613-992-4211";
  const hillOfficeFax: string = "613-947-0310";

  if (!!currentMapPolygon && !!currentMapPolygon.mpData && currentMapPolygon.mpData.party !== "Vacant") {
    const email: string = currentMapPolygon.mpData.contact.email.toLowerCase();
    const hasWebsite: boolean = !!currentMapPolygon.mpData.contact.website;
    const hasMainOffice: boolean = !!currentMapPolygon.mpData.contact.mainOffice.name;
    const hasAlternateOffice: boolean = !!currentMapPolygon.mpData.contact.alternateOffice.name;
    return (
      <div className={classes.root} style={{backgroundColor: getPartyBackgroundColor(currentMapPolygon.mpData.party, false)}}>
        <div className={classes.emailWebsiteWrapper}>
          <div className={classes.emailWebsite}>
            <div className={classes.label}>
              <Typography className={classes.labelText}>
                {
                  isEnglish ? "Email:" : "Courriel:"
                }
              </Typography>
            </div>
            <div className={classes.value}>
              <Link component={"button"} variant={"h5"} className={classes.valueText} onClick={handleEmailClick}>
                {
                  email
                }
              </Link>
            </div>
          </div>
          <div className={classes.emailWebsite}>
            <div className={classes.label}>
              <Typography className={classes.labelText}>
                {
                  hasWebsite ? (isEnglish ? "Website:" : "Site web:") : ""
                }
              </Typography>
            </div>
            <div className={classes.value}>
              <Link component={"button"} variant={"h5"} className={classes.valueText} onClick={handleWebsiteClick}>
                {
                  getWebsite()
                }
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.contactWrapper}>
          <div className={clsx(classes.contact, {
            [classes.contactNoAlternateOffice]: !hasAlternateOffice
          })}>
            <div className={classes.contactTitle}>
              <Typography className={classes.contactTitleText}>
                {
                  isEnglish ? "Hill Office" : "Bureau de la colline"
                }
              </Typography>
            </div>
            <div className={classes.label}>
              <Typography className={classes.labelText}>
                {
                  hillOfficeName
                }
              </Typography>
            </div>
            {
              hillOfficeAddress.map((address, index) => (
                <div className={classes.value} key={index}>
                  <Typography className={classes.valueText}>
                    {
                      address
                    }
                  </Typography>
                </div>
              ))
            }
            <div className={classes.value}>
              <Typography className={classes.valueText}>
                {
                  `${isEnglish ? "Telephone:" : "Téléphone:"} ${hillOfficeTelephone}`
                }
              </Typography>
            </div>
            <div className={classes.value}>
              <Typography className={classes.valueText}>
                {
                  `${isEnglish ? "Fax:" : "Télécopieur:"} ${hillOfficeFax}`
                }
              </Typography>
            </div>
          </div>

          <div className={clsx(classes.contact, {
            [classes.contactNoAlternateOffice]: !hasAlternateOffice
          })}>
            <div className={classes.contactTitle}>
              <Typography className={classes.contactTitleText}>
                {
                  hasMainOffice ? (isEnglish ? "Main Office" : "Bureau principal") : ""
                }
              </Typography>
            </div>
            <div className={classes.label}>
              <Typography className={classes.labelText}>
                {
                  ((isEnglish ? currentMapPolygon.mpData.contact.mainOffice?.name : currentMapPolygon.mpData.contact.mainOfficeFrench?.name) || "").replace("Main office - ", "").replace("Bureau principal - ", "")
                }
              </Typography>
            </div>
            {
              (hasMainOffice ? (isEnglish ? currentMapPolygon.mpData.contact.mainOffice.address : currentMapPolygon.mpData.contact.mainOfficeFrench.address) : []).map((address, index) => (
                <div className={classes.value} key={index}>
                  <Typography className={classes.valueText}>
                    {
                      address
                    }
                  </Typography>
                </div>
              ))
            }
            <div className={classes.value}>
              <Typography className={classes.valueText}>
                {
                  currentMapPolygon.mpData.contact.mainOffice?.telephone ? `${isEnglish ? "Telephone:" : "Téléphone:"} ${currentMapPolygon.mpData.contact.mainOffice?.telephone || ""}` : ""
                }
              </Typography>
            </div>
            <div className={classes.value}>
              <Typography className={classes.valueText}>
                {
                  currentMapPolygon.mpData.contact.mainOffice?.fax ? `${isEnglish ? "Fax:" : "Télécopieur:"} ${currentMapPolygon.mpData.contact.mainOffice?.fax || ""}` : ""
                }
              </Typography>
            </div>
          </div>

          {
            hasAlternateOffice ? (
              <div className={classes.contact}>
                <div className={classes.contactTitle}>
                  <Typography className={classes.contactTitleText}>
                    {
                      hasAlternateOffice ? (isEnglish ? "Office" : "Bureau") : ""
                    }
                  </Typography>
                </div>
                <div className={classes.label}>
                  <Typography className={classes.labelText}>
                    {
                      (isEnglish ? currentMapPolygon.mpData.contact.alternateOffice?.name : currentMapPolygon.mpData.contact.alternateOfficeFrench?.name) || ""
                    }
                  </Typography>
                </div>
                {
                  (hasAlternateOffice ? (isEnglish ? currentMapPolygon.mpData.contact.alternateOffice.address : currentMapPolygon.mpData.contact.alternateOfficeFrench.address) : []).map((address, index) => (
                    <div className={classes.value} key={index}>
                      <Typography className={classes.valueText}>
                        {
                          address
                        }
                      </Typography>
                    </div>
                  ))
                }
                <div className={classes.value}>
                  <Typography className={classes.valueText}>
                    {
                      currentMapPolygon.mpData.contact.alternateOffice?.telephone ? `${isEnglish ? "Telephone:" : "Téléphone:"} ${currentMapPolygon.mpData.contact.alternateOffice?.telephone || ""}` : ""
                    }
                  </Typography>
                </div>
                <div className={classes.value}>
                  <Typography className={classes.valueText}>
                    {
                      currentMapPolygon.mpData.contact.alternateOffice?.fax ? `${isEnglish ? "Fax:" : "Télécopieur:"} ${currentMapPolygon.mpData.contact.alternateOffice?.fax || ""}` : ""
                    }
                  </Typography>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>

      </div>
    );
  }
};

export default MPContactInformation;

