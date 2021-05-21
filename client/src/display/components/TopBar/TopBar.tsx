import React, {useState} from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

export type TopBarProps = TopBarDataProps & TopBarStyleProps & TopBarEventProps;

export interface TopBarDataProps {

}

export interface TopBarStyleProps {

}

export interface TopBarEventProps {
  handleLanguageChange(isEnglish: boolean): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBar: {
      backgroundColor: "#d61820",
      color: "#ffffff",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      userSelect: "none",
      [theme.breakpoints.up("xs")]: {
        height: "26px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "32px",
      },
      [theme.breakpoints.up("md")]: {
        height: "44px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "50px",
      },
    },
    topBarLeft: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.breakpoints.up("xs")]: {
        width: "70%",
      },
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },
    topBarRight: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      [theme.breakpoints.up("xs")]: {
        width: "30%",
      },
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },
    topBarLeftText: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
        fontWeight: "bold",
        marginLeft: "8px",
        marginRight: "8px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "16px",
        fontWeight: "bold",
        marginLeft: "12px",
        marginRight: "12px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
        fontWeight: "bold",
        marginLeft: "16px",
        marginRight: "16px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "24px",
        fontWeight: "bold",
        marginLeft: "20px",
        marginRight: "20px",
      },
    },
    topBarMapleLeafIcon: {
      [theme.breakpoints.up("xs")]: {
        height: "18px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "22px",
      },
      [theme.breakpoints.up("md")]: {
        height: "26px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "30px",
      },
    },
    topBarFeatherIcon: {
      [theme.breakpoints.up("xs")]: {
        height: "18px",
        marginLeft: "40px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "22px",
        marginLeft: "60px",
      },
      [theme.breakpoints.up("md")]: {
        height: "26px",
        marginLeft: "80px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "30px",
        marginLeft: "100px",
      },
    },
    languageSwitch: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      cursor: "pointer",
      [theme.breakpoints.up("xs")]: {
        height: "14px",
        width: "48px",
        marginRight: "40px",
        border: "2px solid white",
        borderRadius: "3px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "20px",
        width: "52px",
        marginRight: "60px",
        border: "2px solid white",
        borderRadius: "3px",
      },
      [theme.breakpoints.up("md")]: {
        height: "22px",
        width: "56px",
        marginRight: "80px",
        border: "3px solid white",
        borderRadius: "3px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "24px",
        width: "60px",
        marginRight: "100px",
        border: "3px solid white",
        borderRadius: "3px",
      },
    },
    languageSwitchText: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      color: "#d61820",
      backgroundColor: "#fff",
      fontWeight: "bold",
      transition: theme.transitions.create("margin-left", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("xs")]: {
        height: "10px",
        width: "20px",
        borderRadius: "2px",
        fontSize: "8px",
        lineHeight: "10px",
        marginLeft: "3px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "14px",
        width: "22px",
        borderRadius: "3px",
        fontSize: "11px",
        lineHeight: "11px",
        marginLeft: "3px",
      },
      [theme.breakpoints.up("md")]: {
        height: "16px",
        width: "24px",
        borderRadius: "3px",
        fontSize: "12px",
        lineHeight: "12px",
        marginLeft: "4px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "18px",
        width: "26px",
        borderRadius: "3px",
        lineHeight: "14px",
        fontSize: "14px",
        marginLeft: "4px",
      },
    },
    languageSwitchTextFrench: {
      [theme.breakpoints.up("xs")]: {
        marginLeft: "25px",
      },
      [theme.breakpoints.up("sm")]: {
        marginLeft: "27px",
      },
      [theme.breakpoints.up("md")]: {
        marginLeft: "28px",
      },
      [theme.breakpoints.up("lg")]: {
        marginLeft: "30px",
      },
    },
  }),
);

const TopBar: React.FC<TopBarProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    handleLanguageChange,
  } = props;

  const [isEnglish, setIsEnglish] = useState<boolean>(true);

  const handleToggleClick = (e: React.MouseEvent<HTMLElement>): void => {
    setIsEnglish(prevState => {
      setTimeout(() => {
        handleLanguageChange(!prevState);
        window.document.title = !prevState ? "Write My MP" : "Écrire à Mon Député";
      }, 300);
      return !prevState;
    });
  };

  return (
    <div className={classes.topBar}>
      <div className={classes.topBarLeft}>
        <img className={classes.topBarFeatherIcon} src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTIxLjI0IDEyMi44OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIxLjI0IDEyMi44ODsgZmlsbDogI2ZmZjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDt9PC9zdHlsZT48Zz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMDUsOTYuNkM2LjM4LDEwNS41MSwxLjQyLDExMy45NywwLDEyMi44OGw1LjEzLTAuNDRjOC4xLTIzLjU2LDE1LjQtMzkuNCwzMS4yMy01OS4yMSBDNDguMjQsNDguMzksNjEuMTMsMzYuNTgsNzcuNjYsMjcuMmM4LjgtNSwyMC4wNy0xMC40NywzMC4yMS0xMS44NWMyLjc3LTAuMzgsNS41OC0wLjQ5LDguNDYtMC4yNCBjLTMxLjQsNy4xOS01Ni4yNiwyMy44NC03Ni4xMiw0OC44QzMyLjEsNzQuMDksMjUuMDUsODUuNCwxOC41Nyw5Ny4zMmwxMS45NCwyLjE4bC00Ljk3LTIuNDdsMTcuNzgtMi44MyBjLTYuNi0yLjMzLTEzLjEyLTEuNTUtMTUuMjEtNC4wNmMxOC4zLTAuODMsMzMuMzQtNC43OCw0My45LTEyLjQ1Yy0zLjkzLTAuNTUtOC40Ni0xLjA0LTEwLjgyLTIuMTcgYzE3LjY5LTUuOTgsMjcuOTItMTYuNzMsNDAuOS0yNi4yN2MtMTYuODcsMy41NC0zMi40OCwyLjk2LTM3LTAuMjVjMjkuNzcsMi4yMSw0OS02LjAyLDU1LjU5LTI2Ljc3YzAuNTctMi4yNCwwLjczLTQuNSwwLjM3LTYuNzggQzExOC43NCwwLjYyLDkyLjQ5LTQuMzksODMuOTUsNy43N2MtMS43MSwyLjQzLTQuMTIsNC42Ni02LjExLDcuNDhMODUuOTcsMGMtMjEuODgsNy4zOS0yMy42OCwxNS41NC0zNSw0MC4wOSBjMC45LTcuNDcsMi45Ny0xNC4yNCw1LjY2LTIwLjYzYy0yNy4zNCwxMC41NS0zNi40NSwzNy4xMS0zNy45MSw1OS43Yy0wLjc5LTcuODgsMC42Ny0xNy43OCwzLjQ5LTI4LjkgYy03Ljk4LDgtMTMuNDEsMTcuMzktMTEuNDcsMzAuNzlsLTMuNjUtMS42M2wxLjkyLDcuMTlsLTUuNDYtMi41OUwxMC4wNSw5Ni42TDEwLjA1LDk2LjZ6Ii8+PC9nPjwvc3ZnPg0K"}/>
        <Typography className={classes.topBarLeftText}>
          {
            isEnglish ? "Write My MP" : "Écrire à Mon Député"
          }
        </Typography>
        <img className={classes.topBarMapleLeafIcon} src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTA5LjM1IDEyMi44OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTA5LjM1IDEyMi44ODtmaWxsOiNmZmYiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDt9PC9zdHlsZT48Zz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTUuMTUsODUuNjJjMS43MywxMS45LTAuOTMsMjEuNTEtOC4wNSwzMS4zN2MtMS42LDIuMjEtMy4yOSwzLjk5LTUuMjUsNS44OWMtMC4wMS0yLjYzLTEuNjktMy43Ni00LjIyLTQuMzQgQzQ4LjA0LDEwOC4yNSw1Mi4zMyw5Ni45LDUzLjcsODUuNjJoLTIuMzZjLTcuNzktMC43Ny0xNi4zMywxMi4zNS0yNi4zNSwxNS45MmM0Ljc3LTkuMTYtMC41Ni0xMC40LTEyLjY2LTYuMzMgYzkuMDUtMTAuOCw5LjkzLTE0Ljc5LDAtMTMuMzVjNS4xMy0zLjg4LDkuOS02LjExLDE0LjM4LTcuMDJjLTkuMzMtMi45Ny0xNy42My03Ljk3LTI0LjY0LTE1LjU3YzEzLjE2LTAuNDgsOS45My05LjM3LTIuMDUtMjIuNzYgYzE1LjkzLDguMDEsMjQuMzMsOS4wMiwyMS43My0wLjE3YzQuNzEsMy4xOCwxMC43NSw5LjI3LDE3LjExLDE2LjA5Yy0yLjQ1LTEyLjUtNC4yOS0yNC4zNC0zLjQyLTMzLjIgQzQxLjYzLDI4LjU2LDQ4LjMsMTkuMTIsNTQuODQsMGM1LjUxLDE3LjQ0LDExLjQzLDI3LjEyLDE4LjkyLDIwLjA4YzAuOTcsNy43Ni0wLjA3LDE2LjA2LTIuNzQsMjQuODFsLTAuMTcsNi42NyBjNi4yMS02LjcsMTIuMzEtMTMuMDMsMTcuMjItMTUuNDRjLTMuMDUsMTAuMDksNy42Myw2LjU3LDIxLjI4LDAuMzhjLTEyLjkyLDE0LjQ0LTEzLjk0LDIyLjA2LTIuNTcsMjIuNTkgYy00LjczLDcuMzYtMTMuMDcsMTEuODQtMjIuNzYsMTUuMjNjNC4yMiwxLjIxLDguNDQsMy40OSwxMi42Niw3LjAyYy04LjczLTAuNzItNi45LDUsMC4yNSwxNC4yYy0xMC45Mi0zLjItMTYuNDktMi4zMy0xMy4wNCw2IEM3MC45OCw5MC43NCw2MS43Nyw4NS41MSw1Ni4xMyw4NS42Mkg1NS4xNUw1NS4xNSw4NS42MnoiLz48L2c+PC9zdmc+DQo="}/>
      </div>
      <div className={classes.topBarRight}>
        <div className={classes.languageSwitch} onClick={handleToggleClick}>
          <Typography className={clsx(classes.languageSwitchText, {
            [classes.languageSwitchTextFrench]: !isEnglish,
          })}>
            {
              isEnglish ? "en" : "fr"
            }
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

