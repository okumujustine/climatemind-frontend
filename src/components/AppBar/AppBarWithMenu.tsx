import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useAuth } from '../../hooks/useAuth';
import MenuPaper from './MenuPaper';
import { ReactComponent as Logo } from '../../assets/cm-logo-bright.svg';
import AccountIcon from '../AccountIcon';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HomeIcon from '@material-ui/icons/Home';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Link as RouterLink } from 'react-router-dom';

import {
  useScrollTrigger,
  IconButton,
  AppBar,
  Slide,
  Tabs,
  Tab,
  Grid,
} from '@material-ui/core';
import { useNoSessionRedirect } from '../../hooks/useNoSessionRedirect';

interface Link {
  label: string;
  value: string;
  index: number;
}

export interface AppBarWithMenuProps {
  links: Link[];
}

interface StyleProps {
  isMenuShowing: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: (props: StyleProps) => (props.isMenuShowing ? 10100 : 1000),
      position: 'relative',
    },
    tabLabel: {
      fontSize: '12px',
      textTransform: 'none',
      marginTop: '-8px',
      marginBottom: '-8px',
    },
    rightCol: {
      paddingLeft: '24px',
    },
  })
);

const CmAppBarWithMenu: React.FC<AppBarWithMenuProps> = ({
  links,
}: AppBarWithMenuProps) => {
  const [isMenuShowing, setMenu] = useState(false);
  const classes = useStyles({ isMenuShowing });
  const trigger = useScrollTrigger();
  const iconStyle = { height: '20px' };
  const logoStyle = { height: '32px' };
  const { isLoggedIn } = useAuth();

  //supported icons
  const getIcon = (type: string) => {
    switch (type) {
      case '/climate-feed':
        return <HomeIcon style={iconStyle} data-testid="BottomMenuIconsFeed" />;
      case '/myths':
        return (
          <AnnouncementIcon
            style={iconStyle}
            data-testid="BottomMenuIconsMyths"
          />
        );
      case '/solutions':
        return (
          <EmojiObjectsIcon
            style={iconStyle}
            data-testid="BottomMenuIconsSolutions"
          />
        );
      case '/saved':
        return (
          <BookmarksIcon style={iconStyle} data-testid="BottomMenuIconsSaved" />
        );
      case '/conversations':
        return (
          <QuestionAnswerIcon
            style={iconStyle}
            data-testid="BottomMenuIconsConversations"
          />
        );
      default:
        return undefined;
    }
  };

  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };

  useNoSessionRedirect();

  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <Slide in={!trigger}>
          <AppBar
            position="fixed"
            color="default"
            data-testid="AppBarWithMenu"
            id="AppBar"
            aria-label="Climate Mind"
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {!isLoggedIn ? (
                <Grid>
                  <Logo style={logoStyle} data-testid="climate-mind-logo" />
                </Grid>
              ) : (
                <Grid>
                  <AccountIcon />
                </Grid>
              )}
              <Grid>
                <Tabs value={value} onChange={handleChange} centered>
                  {links.map((item) => (
                    <Tab
                      key={item.index}
                      label={
                        <span className={classes.tabLabel}>{item.label}</span>
                      }
                      icon={getIcon(item.value)}
                      component={RouterLink}
                      to={item.value}
                    />
                  ))}
                </Tabs>
              </Grid>
              <Grid className={classes.rightCol}>
                <IconButton
                  edge="start"
                  id="TopMenuToggle"
                  color="inherit"
                  aria-label="menu"
                  aria-expanded={isMenuShowing}
                  onClick={handleMenu}
                >
                  {isMenuShowing ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </Grid>
            </Grid>
          </AppBar>
        </Slide>
      </div>

      <MenuPaper isShowing={isMenuShowing} setIsShowing={setMenu} />
    </>
  );
};

export default CmAppBarWithMenu;
