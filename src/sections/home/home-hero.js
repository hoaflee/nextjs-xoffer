import PropTypes from 'prop-types';

import { m, useScroll } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from 'src/layouts/config-layout';
import { bgBlur, bgGradient, textGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import HomeSlider from './home-slider';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  marginTop: '70px',
  // padding: '40px 0 ',
  paddingTop: '20px',
  // width: '100%',
  // height: '100vh',
  // position: 'relative',
  // [theme.breakpoints.up('md')]: {
  //   top: 0,
  //   left: 0,
  //   position: 'fixed',
  // },
}));


const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  // display: 'inline',
  paddingBottom: 8,
  marginTop: 8,
  lineHeight: 1,
  fontWeight: 800,
  // marginBottom: 24,
  // letterSpacing: 8,
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: '1.5rem',
  fontFamily: theme.typography.fontSecondaryFamily,
  [theme.breakpoints.up('md')]: {
    fontSize: `4rem`,
  },
}));


// ----------------------------------------------------------------------

export default function HomeHero({ CampaignList }) {
  return (
    <StyledRoot>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: 1,
          mx: 'auto',
          my: { md: 5 },
          // maxWidth: 480,
        }}
      >

        <m.div variants={varFade().in}>
          <StyledTextGradient
            animate={{ backgroundPosition: '200% center' }}
            transition={{
              repeatType: 'reverse',
              ease: 'linear',
              duration: 20,
              repeat: Infinity,
            }}
          >
            Embark On The Journey Today
          </StyledTextGradient>
        </m.div>

        {/* <m.div variants={varFade().in}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          The starting point for your journey to earn online and passively through affiliate marketing campaigns.
        </Typography>
      </m.div> */}

      </Stack>


      <HomeSlider data={CampaignList} />


    </StyledRoot>
  );
}

HomeHero.propTypes = {
  CampaignList: PropTypes.any,
};
