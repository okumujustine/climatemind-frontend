import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, makeStyles } from '@material-ui/core';

import { Button } from '../../components/Button';
import PageContent from '../../components/PageContent';
import PageTitle from '../../components/PageTitle';
import ROUTES from '../../router/RouteConfig';
import { useUserB } from '../../hooks/useUserB';
import Wrapper from 'components/Wrapper';
import CmTypography from 'shared/components/CmTypography';

const styles = makeStyles(() => {
  return {
    message: { fontSize: '20px', fontWeight: 100 },
    buttonDiv: {
      textAlign: 'center',
    },
  };
});

function UserBNoConsentPage() {
  const classes = styles();
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();

  const handleBackToImpacts = () => {
    navigate(`${ROUTES.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  return (
    <Wrapper>
      <PageContent>
        <Grid item>
          <Box px={4}>
            <PageTitle>No Problem</PageTitle>
            <Box py={4}>
              <CmTypography variant="h4" style={{ margin: 0 }}>
                Your link from {location.state.userAName || 'your friend'} won't expire
                so you can return any time.
              </CmTypography>
            </Box>
            <Box>
              <CmTypography variant="h4">
                We'll be here if you do!
              </CmTypography>
            </Box>
          </Box>
        </Grid>

        <Grid item className={classes.buttonDiv}>
          <Box py={4}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleBackToImpacts}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </PageContent>
    </Wrapper>
  );
};

export default UserBNoConsentPage;
