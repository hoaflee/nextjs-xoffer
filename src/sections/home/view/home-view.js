'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import axios, { endpoints } from 'src/utils/axios';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

import HomeHero from '../home-hero';
import HomeMinimal from '../home-minimal';
import HomeAdvertisement from '../home-advertisement';
import RecommendedCampaigns from '../recommended-campaigns';

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
