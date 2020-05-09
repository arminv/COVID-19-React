import React from 'react';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

import styles from './Cards.module.css';

const Cards = ({ data }) => {
  const { country, cases, deaths, tests, day } = data;

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify='center'>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <Card variant='outlined'>
            <Typography variant='h5' component='h2'>
              {country === 'All' ? 'Global' : country}
            </Typography>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Total Cases
              </Typography>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={cases.total}
                  duration={2.5}
                  separator=','
                ></CountUp>
              </Typography>
              <Typography color='textSecondary' gutterBottom>
                Total New Cases
              </Typography>
              <Typography variant='h5'>
                +
                <CountUp
                  start={0}
                  end={cases.new ? parseInt(cases.new.substr(1)) : null}
                  duration={2.5}
                  separator=','
                ></CountUp>
              </Typography>
              <Typography color='textSecondary' gutterBottom>
                Total Deaths
              </Typography>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={deaths.total}
                  duration={2.5}
                  separator=','
                ></CountUp>
              </Typography>

              {tests.total ? (
                <>
                  <Typography color='textSecondary' gutterBottom>
                    Total Tests
                  </Typography>
                  <Typography variant='h5'>
                    <CountUp
                      start={0}
                      end={tests.total}
                      duration={2.5}
                      separator=','
                    ></CountUp>
                  </Typography>
                </>
              ) : (
                <></>
              )}

              <Typography color='textSecondary'>
                {new Date(day).toDateString()}
              </Typography>
              <Typography variant='body2'>Total Number of Cases</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
