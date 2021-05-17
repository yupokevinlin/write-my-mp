import React from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import {getPartyColor} from "../MPInformation/types";

export type MPContactInformationProps = MPContactInformationDataProps & MPContactInformationStyleProps & MPContactInformationEventProps;

export interface MPContactInformationDataProps {
  currentMapPolygon: MapPolygon | null;
}

export interface MPContactInformationStyleProps {

}

export interface MPContactInformationEventProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
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
    const website: string = currentMapPolygon.mpData.contact.website;
    const newWindow: Window = window.open(website, "_blank", "noopener,noreferrer")
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  if (!!currentMapPolygon && !!currentMapPolygon.mpData && currentMapPolygon.mpData.party !== "Vacant") {
    const email: string = currentMapPolygon.mpData.contact.email.toLowerCase();
    const hasWebsite: boolean = !!currentMapPolygon.mpData.contact.website;
    const hasMainOffice: boolean = !!currentMapPolygon.mpData.contact.mainOffice.name;
    const hasAlternateOffice: boolean = !!currentMapPolygon.mpData.contact.alternateOffice.name;
    return (
      <div className={classes.paper} style={{backgroundColor: `${getPartyColor(currentMapPolygon.mpData.party)}15`}}>
        <div className={classes.emailWebsiteWrapper}>
          <div className={classes.emailWebsite}>
            <div className={classes.label}>
              <Typography className={classes.labelText}>
                Email:
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
                  hasWebsite ? "Website" : ""
                }
              </Typography>
            </div>
            <div className={classes.value}>
              <Link component={"button"} variant={"h5"} className={classes.valueText} onClick={handleWebsiteClick}>
                {
                  currentMapPolygon.mpData.contact.website || ""
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
                Hill Office
              </Typography>
            </div>
            <div className={classes.label}>
              <Typography className={classes.labelText}>
                {
                  currentMapPolygon.mpData.contact.hillOffice?.name || "N/A"
                }
              </Typography>
            </div>
            {
              currentMapPolygon.mpData.contact.hillOffice.address.map((address, index) => (
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
                  `Telephone: ${currentMapPolygon.mpData.contact.hillOffice?.telephone || "N/A"}`
                }
              </Typography>
            </div>
            <div className={classes.value}>
              <Typography className={classes.valueText}>
                {
                  `Fax: ${currentMapPolygon.mpData.contact.hillOffice?.fax || "N/A"}`
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
                  hasMainOffice ? "Main Office" : ""
                }
              </Typography>
            </div>
            <div className={classes.label}>
              <Typography className={classes.labelText}>
                {
                  currentMapPolygon.mpData.contact.mainOffice?.name || ""
                }
              </Typography>
            </div>
            {
              (hasMainOffice ? currentMapPolygon.mpData.contact.mainOffice.address : []).map((address, index) => (
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
                  currentMapPolygon.mpData.contact.mainOffice?.telephone ? `Telephone: ${currentMapPolygon.mpData.contact.mainOffice?.telephone || ""}` : ""
                }
              </Typography>
            </div>
            <div className={classes.value}>
              <Typography className={classes.valueText}>
                {
                  currentMapPolygon.mpData.contact.mainOffice?.fax ? `Fax: ${currentMapPolygon.mpData.contact.mainOffice?.fax || ""}` : ""
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
                      hasAlternateOffice ? "Alternate Office" : ""
                    }
                  </Typography>
                </div>
                <div className={classes.label}>
                  <Typography className={classes.labelText}>
                    {
                      currentMapPolygon.mpData.contact.alternateOffice?.name || ""
                    }
                  </Typography>
                </div>
                {
                  (hasAlternateOffice ? currentMapPolygon.mpData.contact.alternateOffice.address : []).map((address, index) => (
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
                      currentMapPolygon.mpData.contact.alternateOffice?.telephone ? `Telephone: ${currentMapPolygon.mpData.contact.alternateOffice?.telephone || ""}` : ""
                    }
                  </Typography>
                </div>
                <div className={classes.value}>
                  <Typography className={classes.valueText}>
                    {
                      currentMapPolygon.mpData.contact.alternateOffice?.fax ? `Fax: ${currentMapPolygon.mpData.contact.alternateOffice?.fax || ""}` : ""
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
      <div className={classes.paper}>

      </div>
    );
  }
};

export default MPContactInformation;

