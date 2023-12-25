import React from 'react';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Box } from '@material-ui/core';

import { COLORS } from '../common/styles/CMTheme';
import { useCoreValues } from '../hooks/useCoreValues';
import PageTitle from './PageTitle';

const PersonalityChart: React.FC = () => {
  const { valueScores } = useCoreValues();
  const scores = valueScores?.map((value) => value.score);
  const labels = valueScores?.map((value) => value.personalValue);

  const data = {
    labels,
    datasets: [
      {
        label: 'Your Values',
        borderColor: COLORS.CHART1,
        backgroundColor: '#078DFF80',
        pointBackgroundColor: COLORS.CHART1,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        data: scores,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        // startAngle: 150,
        min: 0,
        max: 6,
        angleLines: {
          color: '#eaeaea',
          lineWidth: 2,
        },
        ticks: {
          showLabelBackdrop: false,
          font: {
            size: 14,
            family: 'Nunito',
          },
        },
        grid: {
          color: '#eaeaea',
          lineWidth: 2,
          borderWidth: 2,
        },
        pointLabels: {
          font: {
            size: 14,
            family: 'Nunito',
          },
          padding: 12,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as 'bottom',
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
            family: 'Bilo',
          },
        },
      },
    },
  };

  return (
    <Box my={2} mb={4}>
      <PageTitle variant="h2">Your Personal Value Web</PageTitle>

      <Radar
        data={data}
        typeof="radar"
        options={options}
        aria-label="A radial chart showing your personal values"
        role="img"
      />
    </Box>
  );
};

export default PersonalityChart;
