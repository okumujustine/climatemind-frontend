import React from 'react';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import { Typography, Grid, makeStyles, Box } from '@material-ui/core';
import Wrapper from '../components/Wrapper';
import { useHistory } from 'react-router';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  callToActionSection: {
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
});

const PrivacyPolicy: React.FC = () => {
  const classes = styles();
  const { push } = useHistory();

  return (
    <Grid
      container
      className={classes.root}
      data-testid="Privacy Policy"
      justify="space-around"
    >
      <Wrapper bgColor={COLORS.ACCENT4}>
        <Grid item sm={false} lg={4}>
          {/* left gutter */}
        </Grid>

        <Grid
          item
          sm={12}
          lg={4}
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item>
            <Box mt={2} mb={3} mx={2}>
              <Grid container direction="row" alignItems="center" spacing={5}>
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">Privacy Policy</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item sm={12} lg={12} container>
            <Typography variant="body1">
              Privacy Policy to follow here ...Sunt duis amet labore aliquip ex
              cillum. Ad fugiat officia laborum est ipsum qui reprehenderit
              labore sint id. Ipsum tempor nostrud pariatur duis esse quis magna
              adipisicing reprehenderit fugiat veniam nisi enim aute. Sunt duis
              amet labore aliquip ex cillum. Ad fugiat officia laborum est ipsum
              qui reprehenderit labore sint id. aute.
            </Typography>
            <Typography variant="h2">Privacy</Typography>
            <Typography variant="body1">
              Privacy Policy to follow here ...Sunt duis amet labore aliquip ex
              cillum. Ad fugiat officia laborum est ipsum qui reprehenderit
              labore sint id. Ipsum tempor nostrud pariatur duis esse quis magna
              adipisicing reprehenderit fugiat veniam nisi enim aute. Sunt duis
              amet labore aliquip ex cillum. Ad fugiat officia laborum est ipsum
              qui reprehenderit labore sint id. aute.
            </Typography>
            <Typography variant="body1">
              Privacy Policy to follow here ...Sunt duis amet labore aliquip ex
              cillum. Ad fugiat officia laborum est ipsum qui reprehenderit
              labore sint id. Ipsum tempor nostrud pariatur duis esse quis magna
              adipisicing reprehenderit fugiat veniam nisi enim aute. Sunt duis
              amet labore aliquip ex cillum. Ad fugiat officia laborum est ipsum
              qui reprehenderit labore sint id. aute.
            </Typography>
            <Typography variant="body1">
              Privacy Policy to follow here ...Sunt duis amet labore aliquip ex
              cillum. Ad fugiat officia laborum est ipsum qui reprehenderit
              labore sint id. Ipsum tempor nostrud pariatur duis esse quis magna
              adipisicing reprehenderit fugiat veniam nisi enim aute. Sunt duis
              amet labore aliquip ex cillum. Ad fugiat officia laborum est ipsum
              qui reprehenderit labore sint id. aute.
            </Typography>
            <Typography variant="body1">
              Privacy Policy to follow here ...Sunt duis amet labore aliquip ex
              cillum. Ad fugiat officia laborum est ipsum qui reprehenderit
              labore sint id. Ipsum tempor nostrud pariatur duis esse quis magna
              adipisicing reprehenderit fugiat veniam nisi enim aute. Sunt duis
              amet labore aliquip ex cillum. Ad fugiat officia laborum est ipsum
              qui reprehenderit labore sint id. aute.
            </Typography>
            <Typography variant="h1">Cookies</Typography>
            <Typography variant="body1">
              Privacy Policy to follow here ...Sunt duis amet labore aliquip ex
              cillum. Ad fugiat officia laborum est ipsum qui reprehenderit
              labore sint id. Ipsum tempor nostrud pariatur duis esse quis magna
              adipisicing reprehenderit fugiat veniam nisi enim aute. Sunt duis
              amet labore aliquip ex cillum. Ad fugiat officia laborum est ipsum
              qui reprehenderit labore sint id. aute.
            </Typography>
          </Grid>
          <Grid item container justify="center">
            <Box my={4}>
              <Button variant="contained" onClick={() => push('/')}>
                Go Home
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
    </Grid>
  );
};

export default PrivacyPolicy;
