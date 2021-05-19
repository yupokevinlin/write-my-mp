import React from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
import Typography from "@material-ui/core/Typography";
import CrossfadeImage from "react-crossfade-image";
import Button from "@material-ui/core/Button";
import {getPartyBackgroundColor, getPartyColor} from "./types";
import {LanguageUtils} from "../../../helpers/LanguageUtils";
import Link from "@material-ui/core/Link";
import clsx from "clsx";

export type MPInformationProps = MPInformationDataProps & MPInformationStyleProps & MPInformationEventProps;

export interface MPInformationDataProps {
  isEnglish: boolean;
  currentMapPolygon: MapPolygon | null;
  isESRIMapLoaded: boolean;
}

export interface MPInformationStyleProps {

}

export interface MPInformationEventProps {
  handleFindMPClick(): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
      transition: "background-color 1s",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "500px",
      },
    },
    informationRoot: {
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
        paddingBottom: "15px",
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
        marginTop: "15px",
        marginLeft: "15px",
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
        marginTop: "15px",
        marginLeft: "15px",
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
        width: "calc(100% - 157px)",
        marginTop: "15px",
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
    noSelectWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        width: "100%",
        height: "100%",
        margin: "15px",
      },
    },
    noSelectText: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "20px",
        marginBottom: "5px",
      },
    },
    noSelectTextParagraph: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
        marginBottom: "3px",
      },
    },
    noSelectButton: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "5px",
        height: "40px",
        width: "200px",
      },
    },
    noSelectButtonText: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
      },
    },
    contactRoot: {
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
  }),
);

const MPInformation: React.FC<MPInformationProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    isEnglish,
    currentMapPolygon,
    isESRIMapLoaded,
    handleFindMPClick,
  } = props;

  const handleFindMPButtonClick = (e: React.MouseEvent<HTMLElement>): void => {
    handleFindMPClick();
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLElement>): void => {
    const email: string = currentMapPolygon?.mpData?.contact?.email.toLowerCase();
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
    return isEnglish ? currentMapPolygon?.mpData?.contact?.website : (currentMapPolygon?.mpData?.contact?.website ? currentMapPolygon?.mpData?.contact?.website.replace(".ca/?lang=en", ".ca").replace(".ca/en", ".ca") : "") || "";
  };

  if (!!currentMapPolygon && !!currentMapPolygon?.mpData) {
    const isVacant: boolean = currentMapPolygon?.mpData?.party === "Vacant";
    const name: string = isVacant ? (isEnglish ? "This seat is vacant" : "Ce siège est vacant") : (isEnglish ? (`${!!currentMapPolygon?.mpData?.title ? `The ${currentMapPolygon?.mpData?.title.replace("Hon.", "Honourable")} ` : ""}${currentMapPolygon?.mpData?.firstName} ${currentMapPolygon?.mpData?.lastName}`) : (`${!!currentMapPolygon?.mpData?.title ? `L'${currentMapPolygon?.mpData?.title.replace("Hon.", "honorable")} `.replace("L'Right", "Le très") : ""}${currentMapPolygon?.mpData?.firstName} ${currentMapPolygon?.mpData?.lastName}`));
    const party: string = isVacant ? `${isEnglish ? "N/A" : "n/d"}` : (isEnglish ? currentMapPolygon?.mpData?.party : LanguageUtils.getFrenchPartyFromParty(currentMapPolygon?.mpData?.party));
    const constituencyName: string = (isEnglish ? currentMapPolygon?.constituency : currentMapPolygon?.constituencyFrench).replace(/—/g, "-").replace(/-/g, " - ");
    const province: string = isEnglish ? currentMapPolygon?.mpData?.province : LanguageUtils.getFrenchProvinceFromProvince(currentMapPolygon?.mpData?.province);
    const preferredLanguage: string = isVacant ? `${isEnglish ? "N/A" : "n/d"}` : (isEnglish ? currentMapPolygon?.mpData?.contact?.preferredLanguage : currentMapPolygon?.mpData?.contact?.preferredLanguage.replace("English", "Anglais").replace("French", "Français"));
    const hillOfficeName: string = isEnglish ? "House of Commons" : "Chambre des communes";
    const hillOfficeAddress: Array<string> = isEnglish ? ["Ottawa, Ontario,", "Canada", "K1A 0A6"] : ["Ottawa (Ontario)", "Canada", "K1A 0A6"];
    const hillOfficeTelephone: string = "613-992-4211";
    const hillOfficeFax: string = "613-947-0310";

    const email: string = isVacant ? "" : currentMapPolygon?.mpData?.contact?.email.toLowerCase();
    const hasWebsite: boolean = isVacant ? false : !!currentMapPolygon?.mpData?.contact?.website;
    const hasMainOffice: boolean = isVacant ? false : !!currentMapPolygon?.mpData?.contact?.mainOffice?.name;
    const hasAlternateOffice: boolean = isVacant ? false : !!currentMapPolygon?.mpData?.contact?.alternateOffice?.name;

    const renderMPInfo = (): React.ReactElement => {
      return (
        <div className={classes.informationRoot}>
          {
            <CrossfadeImage className={classes.picture} src={isVacant ? "./resources/vacant-seat.png" : currentMapPolygon?.mpData?.photoSrc}/>
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
            <div className={classes.partyBar} style={{backgroundColor: getPartyColor(currentMapPolygon?.mpData?.party)}}/>
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
    };

    const renderMPContact = (): React.ReactElement => {
      if (!isVacant) {
        return (
          <div className={classes.contactRoot}>
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
                      ((isEnglish ? currentMapPolygon?.mpData?.contact?.mainOffice?.name : currentMapPolygon?.mpData?.contact?.mainOfficeFrench.name) || "").replace("Main office - ", "").replace("Bureau principal - ", "")
                    }
                  </Typography>
                </div>
                {
                  (hasMainOffice ? (isEnglish ? currentMapPolygon?.mpData?.contact?.mainOffice?.address : currentMapPolygon?.mpData?.contact?.mainOfficeFrench.address) : []).map((address, index) => (
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
                      currentMapPolygon?.mpData?.contact?.mainOffice?.telephone ? `${isEnglish ? "Telephone:" : "Téléphone:"} ${currentMapPolygon?.mpData?.contact?.mainOffice?.telephone || ""}` : ""
                    }
                  </Typography>
                </div>
                <div className={classes.value}>
                  <Typography className={classes.valueText}>
                    {
                      currentMapPolygon?.mpData?.contact?.mainOffice?.fax ? `${isEnglish ? "Fax:" : "Télécopieur:"} ${currentMapPolygon?.mpData?.contact?.mainOffice?.fax || ""}` : ""
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
                          (isEnglish ? currentMapPolygon?.mpData?.contact?.alternateOffice?.name : currentMapPolygon?.mpData?.contact?.alternateOfficeFrench.name) || ""
                        }
                      </Typography>
                    </div>
                    {
                      (hasAlternateOffice ? (isEnglish ? currentMapPolygon?.mpData?.contact?.alternateOffice?.address : currentMapPolygon?.mpData?.contact?.alternateOfficeFrench.address) : []).map((address, index) => (
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
                          currentMapPolygon?.mpData?.contact?.alternateOffice?.telephone ? `${isEnglish ? "Telephone:" : "Téléphone:"} ${currentMapPolygon?.mpData?.contact?.alternateOffice?.telephone || ""}` : ""
                        }
                      </Typography>
                    </div>
                    <div className={classes.value}>
                      <Typography className={classes.valueText}>
                        {
                          currentMapPolygon?.mpData?.contact?.alternateOffice?.fax ? `${isEnglish ? "Fax:" : "Télécopieur:"} ${currentMapPolygon?.mpData?.contact?.alternateOffice?.fax || ""}` : ""
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
        return null;
      }
    };

    return (
      <div className={classes.root} style={{backgroundColor: getPartyBackgroundColor(currentMapPolygon?.mpData?.party, false)}}>
        {
          renderMPInfo()
        }
        {
          renderMPContact()
        }
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.noSelectWrapper}>
          <Typography className={classes.noSelectText}>
            {
              "Welcome to Write My MP"
            }
          </Typography>
          <Typography className={classes.noSelectTextParagraph}>
            {
              "No MP Selected"
            }
          </Typography>
          <Typography className={classes.noSelectTextParagraph}>
            {
              "Select a MP by clicking their constituency on the map or find them using the table"
            }
          </Typography>
          <Typography className={classes.noSelectTextParagraph}>
            {
              "Right click anywhere on the map or table to unselect"
            }
          </Typography>
          <Typography className={classes.noSelectTextParagraph}>
            {
              "Use the button below to find your MP using your IP"
            }
          </Typography>
          <Button classes={{
            root: classes.noSelectButton,
            label: classes.noSelectButtonText,
          }} color={"secondary"} variant={"contained"} onClick={handleFindMPButtonClick} disabled={!isESRIMapLoaded}>
            {
              "Find My MP"
            }
          </Button>
        </div>
      </div>
    );
  }
};

export default MPInformation;

