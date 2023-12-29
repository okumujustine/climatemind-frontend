import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, createStyles, Grid, makeStyles } from '@material-ui/core';
import CloudDoneIcon from '@material-ui/icons/CloudDone';

import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import PageTitle from '../../components/PageTitle';
import ROUTES_CONFIG from '../../router/RouteConfig';
import Wrapper from '../../components/Wrapper';
import { capitalize } from '../../helpers/capitalize';
import { useAlignment } from '../../hooks/useAlignment';
import { useUserB } from '../../hooks/useUserB';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { ClimateApi } from '../../api/ClimateApi';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import CmTypography from 'shared/components/CmTypography';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '60vh',
    },
    bold: {
      fontWeight: 800,
    },
    largeIcon: {
      transform: 'scale(8)',
      fill: '#ffffff',
    },
    span: {
      margin: '0px 3px 3px 0px',
    },
    leftButton: {
      marginLeft: '8px',
    },
    centerButton: {
      margin: '0 auto',
      display: 'block',
    },
  })
);

function UserBSharedSuccessPage() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { conversation } = useGetOneConversation(conversationId ?? '');
  const { alignmentScoresId, setAlignmentScoresId } = useAlignment();

  const { data, isSuccess } = useQuery(
    ['summary', alignmentScoresId],
    async () => {
      if (alignmentScoresId && alignmentScoresId !== '') {
        return await new ClimateApi(sessionId, accessToken).getSummary(
          alignmentScoresId
        );
      }

      if (alignmentScoresId === '' && conversationId) {
        const result = await new ClimateApi(
          sessionId,
          accessToken
        ).getOneConversation(conversationId);
        setAlignmentScoresId(result.alignmentScoresId!);
        return await new ClimateApi(sessionId, accessToken).getSummary(
          result.alignmentScoresId!
        );
      }
    }
  );

  const handleCreateAccount = () => {
    navigate(`${ROUTES_CONFIG.USERB_SIGN_UP_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  const handleBackImpacts = () => {
    navigate(`${ROUTES_CONFIG.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  const handleSharedTopics = () => {
    navigate(`${ROUTES_CONFIG.USERB_SHARED_SUMMARY_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  if (data === undefined) {
    return <Loader></Loader>;
  }

  return (
    <main>
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
          <PageSection>
            <PageTitle>Shared!</PageTitle>

            <Box textAlign="center" mb={10}>
              <CmTypography variant="h3">
                {capitalize(data?.userAName!)} can now see which values,
                impacts, and solutions you have in common and will be in touch
                soon!
              </CmTypography>
              <Button
                style={{ border: '1px solid #07373B', marginTop: '5px' }}
                onClick={() => handleSharedTopics()}
              >
                Shared Topics
              </Button>
            </Box>

            <Box textAlign="center">
              <CloudDoneIcon className={classes.largeIcon} />
            </Box>

            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.root}
              spacing={1}
            >
              <Box textAlign="center" mt={14}>
                <CmTypography variant="h3" style={{ margin: 0 }}>
                  Until then, why not create your own account?
                </CmTypography>
              </Box>

              <Box textAlign="center" mt={2}>
                <CmTypography variant="h4" style={{ margin: 0 }}>
                  Unlock the rest of your core values
                </CmTypography>
              </Box>

              <Box textAlign="center" mt={3}>
                <CmTypography variant="h4" style={{ margin: 0 }}>
                  Explore your own personalized climate topics and solutions
                </CmTypography>
              </Box>

              <Box textAlign="center" mt={3}>
                <CmTypography variant="h4" style={{ margin: 0 }}>
                  Match with even more friends
                </CmTypography>
              </Box>
            </Grid>

            <FooterAppBar bgColor={COLORS.ACCENT10}>
              {!conversation?.consent && (
                <Button
                  style={{
                    border: '1px solid #07373B',
                    marginRight: '8px',
                  }}
                  onClick={() => handleBackImpacts()}
                >
                  <span className={classes.span}>{'< '}</span>
                  Impacts
                </Button>
              )}

              <Button
                variant="contained"
                data-testid="take-quiz-userb-button"
                color="primary"
                disableElevation
                disabled={!isSuccess}
                className={
                  conversation?.consent
                    ? classes.centerButton
                    : classes.leftButton
                }
                style={{ border: '1px solid #a347ff' }}
                onClick={() => handleCreateAccount()}
              >
                Create Account
              </Button>
            </FooterAppBar>
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
}

export default UserBSharedSuccessPage;
