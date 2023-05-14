import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

import { useQuery } from 'react-query';
import { getMyths } from '../api/getMyths';
import { COLORS } from '../common/styles/CMTheme';
import Loader from '../components/Loader';
import MythCard from '../components/MythCard';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import Wrapper from '../components/Wrapper';
import Error500 from './Error500';

const MythFeed: React.FC = () => {
  const { data, isLoading, error } = useQuery('myths', getMyths);

  if (error) return <Error500 />;

  return (
    <>
      <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
        <PageContent>
          <PageTitle>Climate change myths</PageTitle>
          <Box mb={3} px={5} textAlign="center">
            <Typography variant="h5" style={{ letterSpacing: 'normal' }}>
              Arm yourself with information to challenge these common maths and
              be part of the solution to fight climate change!
            </Typography>
          </Box>

          <Grid container>
            {isLoading && <Loader />}
            {data?.myths.map((myth, i) => (
              <MythCard myth={myth} key={i} />
            ))}
          </Grid>
        </PageContent>
      </Wrapper>
    </>
  );
};

export default MythFeed;
