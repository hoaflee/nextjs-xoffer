'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import axios, { endpoints } from 'src/utils/axios';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

import HomeHero from '../home-hero';
import HomeMinimal from '../home-minimal';
import HomeAdvertisement from '../home-advertisement';
import ListCampaignsCarouselArrows from '../list-campaigns-carousel-arrows';

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
        console.log("response fetchData: ", response)

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
            {/* Hot and Recommend */}
            <ListCampaignsCarouselArrows title="Hot Campaigns" subheader={`${data?.hotcampaign?.length} campaigns waiting for you`} list={data.hotcampaign} />
            <ListCampaignsCarouselArrows title="Recommended Campaigns" subheader={`${data?.recommend?.length} campaigns waiting for you`} list={data.recommend} />
            {/* Các campaign đang chạy, không nằm trong 2 danh sách trên */}
            {/* <ListCampaignsCarouselArrows title="All Campaigns" subheader={`${data?.all?.length} campaigns waiting for you`} list={data.all} /> */}

            {/* <HomeSlider data={data.hotcampaign} /> */}
            <HomeMinimal/>

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
