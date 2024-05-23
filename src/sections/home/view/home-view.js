'use client';

import { useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';


import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';

import axios, { endpoints } from 'src/utils/axios';

import { SplashScreen } from 'src/components/loading-screen';

import HomeHero from '../home-hero';
import HomeMinimal from '../home-minimal';
import HomePricing from '../home-pricing';
import HomeDarkMode from '../home-dark-mode';
import HomeLookingFor from '../home-looking-for';
import HomeForDesigner from '../home-for-designer';
import HomeColorPresets from '../home-color-presets';
import HomeAdvertisement from '../home-advertisement';
import HomeCleanInterfaces from '../home-clean-interfaces';
import HomeHugePackElements from '../home-hugepack-elements';

import RecommendedCampaigns from '../recommended-campaigns';

// ----------------------------------------------------------------------

const StyledPolygon = styled('div')(({ anchor = 'top', theme }) => ({
  left: 0,
  zIndex: 9,
  height: 80,
  width: '100%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  backgroundColor: theme.palette.background.default,
  display: 'block',
  lineHeight: 0,
  ...(anchor === 'top' && {
    top: -1,
    transform: 'scale(-1, -1)',
  }),
  ...(anchor === 'bottom' && {
    bottom: -1,
    backgroundColor: theme.palette.grey[900],
  }),
}));

// ----------------------------------------------------------------------

export default function HomeView() {
  // const { scrollYProgress } = useScroll();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true)
      const url = endpoints.public.hotCampaigns
      try {
        const response = await axios.get(url);
        console.log("response: ", response)

        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };

    fetchData();
  }, []);


  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      {/* <ScrollProgress scrollYProgress={scrollYProgress} /> */}

      {loading ? <SplashScreen /> : (
        <>
          <HomeHero CampaignList={data.hotcampaign} />

          <Box
            sx={{
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <RecommendedCampaigns title="Recommended Campaigns" subheader={`${data?.hotcampaign?.length} campaigns waiting for you`} list={data.hotcampaign} />

            {/* <HomeSlider data={data.hotcampaign} /> */}
            <HomeMinimal />

            {/* <HomeHugePackElements /> */}

            {/* <Box sx={{ position: 'relative' }}>
              <StyledPolygon />
              <HomeForDesigner />
              <StyledPolygon anchor="bottom" />
            </Box> */}

            {/* <HomeDarkMode />
                <HomeColorPresets />
                <HomeCleanInterfaces />
                <HomePricing />
                <HomeLookingFor /> */}

            <HomeAdvertisement />
          </Box>
        </>
      )
      }
    </MainLayout>
  );
}
