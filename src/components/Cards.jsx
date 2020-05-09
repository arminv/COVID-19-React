import React from 'react';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardHeader,
} from '@material-ui/core';
import CountUp from 'react-countup';

import styles from './Cards.module.css';

const Cards = ({ data }) => {
  const { country, cases, deaths, tests, time } = data;
  console.log(typeof time);

  return (
    <div className={styles.container}>
      <Grid container spacing={1} justify='center'>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <Card variant='outlined'>
            <CardHeader title={country === 'All' ? 'Global' : country} />
            <CardContent>
              <Typography
                className={styles.totalCases}
                variant='h6'
                color='textSecondary'
                gutterBottom
              >
                Total Cases
              </Typography>
              <Typography variant='h6'>
                <CountUp
                  start={0}
                  end={cases.total}
                  duration={2.5}
                  separator=','
                ></CountUp>
              </Typography>
              <br />
              <Typography
                className={styles.totalNewCases}
                variant='h6'
                color='textSecondary'
                gutterBottom
              >
                Total New Cases
              </Typography>
              <Typography variant='h6'>
                +
                <CountUp
                  start={0}
                  end={cases.new ? parseInt(cases.new.substr(1)) : 0}
                  duration={2.5}
                  separator=','
                ></CountUp>
              </Typography>
              <br />
              <Typography
                className={styles.totalDeaths}
                variant='h6'
                color='textSecondary'
                gutterBottom
              >
                Total Deaths
              </Typography>
              <Typography variant='h6'>
                <CountUp
                  start={0}
                  end={deaths.total}
                  duration={2.5}
                  separator=','
                ></CountUp>
              </Typography>
              <br />
              {tests.total ? (
                <>
                  <Typography
                    className={styles.totalTests}
                    variant='h6'
                    color='textSecondary'
                    gutterBottom
                  >
                    Total Tests
                  </Typography>
                  <Typography variant='h6'>
                    <CountUp
                      start={0}
                      end={tests.total}
                      duration={2.5}
                      separator=','
                    ></CountUp>
                  </Typography>
                  <br />
                </>
              ) : (
                <></>
              )}

              <Typography color='textSecondary'>
                <i>
                  Last Update : {new Date(time).toDateString()} -
                  {new Date(time).toTimeString()}
                </i>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
