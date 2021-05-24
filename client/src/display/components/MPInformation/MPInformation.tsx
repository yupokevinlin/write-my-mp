import React from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
import Typography from "@material-ui/core/Typography";
import CrossFadeImage from "react-crossfade-image";
import Button from "@material-ui/core/Button";
import {getPartyBackgroundColor, getPartyColor} from "./types";
import {LanguageUtils} from "../../../helpers/LanguageUtils";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

export type MPInformationProps = MPInformationDataProps & MPInformationStyleProps & MPInformationEventProps;

export interface MPInformationDataProps {
  isEnglish: boolean;
  currentMapPolygon: MapPolygon | null;
  isESRIMapLoaded: boolean;
}

export interface MPInformationStyleProps {
  width: Breakpoint;
}

export interface MPInformationEventProps {
  handleFindMPClick(): void;
  handleClose(): void;
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
        height: "230px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "320px",
      },
      [theme.breakpoints.up("md")]: {
        height: "400px",
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
        height: "126.5px",
        paddingBottom: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "172.5px",
        paddingBottom: "11px",
      },
      [theme.breakpoints.up("md")]: {
        height: "184px",
        paddingBottom: "13px",
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
        height: "126.5px",
        width: "78.1px",
        marginTop: "9px",
        marginLeft: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "172.5px",
        width: "106.5px",
        marginTop: "11px",
        marginLeft: "11px",
      },
      [theme.breakpoints.up("md")]: {
        height: "184px",
        width: "113.6px",
        marginTop: "13px",
        marginLeft: "13px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "230px",
        width: "142px",
        marginTop: "15px",
        marginLeft: "15px",
      },
    },
    infoWrapper: {
      [theme.breakpoints.up("xs")]: {
        height: "100%",
        width: "calc(100% - 87.1px)",
        marginTop: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "100%",
        width: "calc(100% - 117.5px)",
        marginTop: "11px",
      },
      [theme.breakpoints.up("md")]: {
        height: "100%",
        width: "calc(100% - 126.6px)",
        marginTop: "13px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "100%",
        width: "calc(100% - 157px)",
        marginTop: "15px",
      },
    },
    title: {
      [theme.breakpoints.up("xs")]: {
        height: "12px",
        marginBottom: "8px",
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        height: "22px",
        marginBottom: "6px",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        height: "26px",
        marginBottom: "4px",
        width: "100%",
      },
      [theme.breakpoints.up("lg")]: {
        height: "30px",
        marginBottom: "5px",
        width: "100%",
      },
    },
    titleButtonWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100%",
      width: "100%",
    },
    titleText: {
      [theme.breakpoints.up("xs")]: {
        marginLeft: "9px",
        width: "calc(100% - 39px)",
        "@media (min-height: 0px) and (max-height: 599px)": {
          fontSize: "10px",
          fontWeight: "bold",
        },
        "@media (min-height: 600px)": {
          fontSize: "12px",
        },
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px",
        marginLeft: "11px",
        width: "calc(100% - 44px)",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
        marginLeft: "13px",
        width: "calc(100% - 52px)",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "24px",
        marginLeft: "15px",
        width: "calc(100% - 60px)",
      },
    },
    titleButton: {
      [theme.breakpoints.up("xs")]: {
        height: "12px",
        width: "12px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "22px",
        width: "22px",
      },
      [theme.breakpoints.up("md")]: {
        height: "26px",
        width: "26px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "30px",
        width: "30px",
      },
    },
    titleButtonIcon: {
      [theme.breakpoints.up("xs")]: {
        height: "10px",
        width: "10px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "14px",
        width: "14px",
      },
      [theme.breakpoints.up("md")]: {
        height: "18px",
        width: "18px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "22px",
        width: "22px",
      },
    },
    label: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {
        height: "14px",
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        height: "16px",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        height: "18px",
        width: "100%",
      },
      [theme.breakpoints.up("lg")]: {
        height: "22px",
        width: "100%",
      },
    },
    labelText: {
      fontWeight: "bold",
      [theme.breakpoints.up("xs")]: {
        fontSize: "8px",
        marginLeft: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "10px",
        marginLeft: "11px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "12px",
        marginLeft: "13px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
        marginLeft: "15px",
      },
    },
    value: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {
        height: "10px",
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        height: "16px",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        height: "18px",
        width: "100%",
      },
      [theme.breakpoints.up("lg")]: {
        height: "22px",
        width: "100%",
      },
    },
    valueText: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      [theme.breakpoints.up("xs")]: {
        fontSize: "8px",
        marginLeft: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "11px",
        marginLeft: "11px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "12px",
        marginLeft: "13px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
        marginLeft: "15px",
      },
    },
    partyBar: {
      [theme.breakpoints.up("xs")]: {
        width: "calc(100% - 18px)",
        height: "2px",
        marginBottom: "2px",
        marginLeft: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "calc(100% - 22px)",
        height: "3px",
        marginBottom: "3px",
        marginLeft: "11px",
      },
      [theme.breakpoints.up("md")]: {
        width: "calc(100% - 26px)",
        height: "4px",
        marginBottom: "4px",
        marginLeft: "13px",
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
        width: "calc(100% - 18px)",
        height: "calc(100% - 18px)",
        margin: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "calc(100% - 22px)",
        height: "calc(100% - 22px)",
        margin: "11px",
      },
      [theme.breakpoints.up("md")]: {
        width: "calc(100% - 26px)",
        height: "calc(100% - 26px)",
        margin: "13px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(100% - 30px)",
        height: "calc(100% - 30px)",
        margin: "15px",
      },
    },
    noSelectText: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "14px",
        marginBottom: "3px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px",
        marginBottom: "3px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
        marginBottom: "5px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "20px",
        marginBottom: "5px",
      },
    },
    noSelectTextParagraph: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "10px",
        marginBottom: "2px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
        marginBottom: "2px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "14px",
        marginBottom: "3px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
        marginBottom: "3px",
      },
    },
    noSelectButton: {
      [theme.breakpoints.up("xs")]: {
        marginTop: "4px",
        height: "24px",
        width: "200px",
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: "4px",
        height: "28px",
        width: "230px",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "4px",
        height: "32px",
        width: "250px",
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "5px",
        height: "40px",
        width: "300px",
      },
    },
    noSelectButtonText: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "10px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "12px",
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
      height: "max-content",
    },
    emailWebsiteWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      [theme.breakpoints.up("md")]: {
        marginTop: "8px",
        height: "38px",
        width: "100%",
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
    },
    contactWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: "max-content",
      [theme.breakpoints.up("xs")]: {
        marginTop: "2px",
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: "4px",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "8px",
        width: "100%",
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "10px",
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
        height: "14px",
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        height: "18px",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        height: "20px",
        width: "100%",
      },
      [theme.breakpoints.up("lg")]: {
        height: "26px",
        width: "100%",
      },
    },
    contactTitleText: {
      fontWeight: "bold",
      [theme.breakpoints.up("xs")]: {
        fontSize: "10px",
        marginLeft: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "12px",
        marginLeft: "11px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "14px",
        marginLeft: "13px",
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
    width,
    handleFindMPClick,
    handleClose,
  } = props;

  const handleFindMPButtonClick = (e: React.MouseEvent<HTMLElement>): void => {
    handleFindMPClick();
  };

  const handleCloseButtonClick = (e: React.MouseEvent<HTMLElement>): void => {
    handleClose();
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

  const isSmall: boolean = width === "xs" || width === "sm";

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
          <div className={classes.picture}>
            <CrossFadeImage src={isVacant ? "./resources/vacant-seat.png" : currentMapPolygon?.mpData?.photoSrc}/>
          </div>
          <div className={classes.infoWrapper}>
            <div className={classes.title}>
              <div className={classes.titleButtonWrapper}>
                <Typography className={classes.titleText}>
                  {
                    name
                  }
                </Typography>
                <IconButton className={classes.titleButton} onClick={handleCloseButtonClick}>
                  <CloseOutlinedIcon className={classes.titleButtonIcon}/>
                </IconButton>
              </div>
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
            {
              isSmall ? (
                <React.Fragment>
                  <div className={classes.label}>
                    <div className={classes.label} style={{width: "50%"}}>
                      <Typography className={classes.labelText}>
                        {
                          isEnglish ? "Province / Territory:" : "Province / Territoire:"
                        }
                      </Typography>
                    </div>
                    <div className={classes.label} style={{width: "50%"}}>
                      <Typography className={classes.labelText}>
                        {
                          isEnglish ? "Email:" : "Courriel:"
                        }
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.value}>
                    <div className={classes.value} style={{width: "50%"}}>
                      <Typography className={classes.valueText}>
                        {
                          province
                        }
                      </Typography>
                    </div>
                    <div className={classes.value} style={{width: "50%"}}>
                      <Link component={"button"} variant={"h5"} className={classes.valueText} onClick={handleEmailClick}>
                        {
                          email
                        }
                      </Link>
                    </div>
                  </div>

                  <div className={classes.label}>
                    <div className={classes.label} style={{width: "50%"}}>
                      <Typography className={classes.labelText}>
                        {
                          isEnglish ? "Preferred Language:" : "Langue préférée:"
                        }
                      </Typography>
                    </div>
                    <div className={classes.label} style={{width: "50%"}}>
                      <Typography className={classes.labelText}>
                        {
                          hasWebsite ? (isEnglish ? "Website:" : "Site web:") : ""
                        }
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.value}>
                    <div className={classes.value} style={{width: "50%"}}>
                      <Typography className={classes.valueText}>
                        {
                          preferredLanguage
                        }
                      </Typography>
                    </div>
                    <div className={classes.value} style={{width: "50%"}}>
                      <Link component={"button"} variant={"h5"} className={classes.valueText} onClick={handleWebsiteClick}>
                        {
                          getWebsite()
                        }
                      </Link>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
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
                </React.Fragment>
              )
            }
          </div>
        </div>
      );
    };

    const renderMPContact = (): React.ReactElement => {
      if (!isVacant) {
        return (
          <div className={classes.contactRoot}>
            {
              isSmall ? null : (
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
              )
            }
            <div className={classes.contactWrapper}>
              <div className={clsx(classes.contact, {
                [classes.contactNoAlternateOffice]: !hasAlternateOffice || !hasMainOffice
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
              {
                hasMainOffice ? (
                  <div className={clsx(classes.contact, {
                    [classes.contactNoAlternateOffice]: !hasAlternateOffice || !hasMainOffice
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
                ) : null
              }
              {
                hasAlternateOffice ? (
                  <div className={clsx(classes.contact, {
                    [classes.contactNoAlternateOffice]: !hasAlternateOffice || !hasMainOffice
                  })}>
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
              isEnglish ? "Welcome to Write My MP" : "Bienvenue à Écrire à Mon Député"
            }
          </Typography>
          <Typography className={classes.noSelectTextParagraph}>
            {
              isEnglish ? "You have not selected a MP" : "Vous n'avez pas choisi de député"
            }
          </Typography>
          <Typography className={classes.noSelectTextParagraph}>
            {
              isEnglish ? "Select a MP by left clicking their constituency on the map or by left clicking their row on the table." : "Sélectionnez un député en cliquant avec le bouton gauche sur sa circonscription dans la carte ou en cliquant avec le bouton gauche sur sa ligne dans le tableau."
            }
          </Typography>
          <Typography className={classes.noSelectTextParagraph}>
            {
              isEnglish ? "Close the MP window or right click anywhere on the map or table to unselect." : "Fermez la fenêtre de député ou cliquez avec le bouton droit n'importe où dans la carte ou le tableau pour désélectionner."
            }
          </Typography>
          <Typography className={classes.noSelectTextParagraph}>
            {
              isEnglish ? "You can find your MP using your address." : "Vous pouvez trouver votre député en utilisant votre adresse."
            }
          </Typography>
          <Typography className={classes.noSelectTextParagraph}>
            {
              isEnglish ? "Alternatively, you can also use the button below to find your MP using your IP address." : "En alternative, vous pouvez aussi utilisez le bouton ci-dessous pour trouver votre député en utilisant votre adresse IP."
            }
          </Typography>
          <Button classes={{
            root: classes.noSelectButton,
            label: classes.noSelectButtonText,
          }} color={"secondary"} variant={"contained"} onClick={handleFindMPButtonClick} disabled={!isESRIMapLoaded}>
            {
              isEnglish ? "Find My MP" : "Trouver Mon Député"
            }
          </Button>
        </div>
      </div>
    );
  }
};

export default MPInformation;

