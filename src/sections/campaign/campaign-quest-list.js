'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Rating from '@mui/material/Rating';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// import { LoadingScreen } from 'src/components/loading-screen';
import LinearProgress from '@mui/material/LinearProgress';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { fShortenNumber } from 'src/utils/format-number';
// import Iconify from 'src/components/iconify';

import axios, { endpoints } from 'src/utils/axios';

import { TMP_BEARER, TMP_VENDOR_ID } from 'src/config-global';

import CampaignQuestItem from './campaign-quest-item';

// import ProductReviewList from './product-review-list';
// import ProductReviewNewForm from './product-review-new-form';

// ----------------------------------------------------------------------

export default function CampaignQuestList({ id }) {
  const [loading, setLoading] = useState(true);
  const [quests, setQuests] = useState();

  // cái này sau này sẽ đổi lại api ở backend, lấy quest đồng thời với thông tin chiến dịch luôn
  useEffect(() => {
    const fetchData = async () => {
      const url = `${endpoints.campaign.questList}${id}`
      setLoading(true)
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: TMP_BEARER,
            "Content-Type": "application/json",
            "Role-Id": 3,
            "Vendor-Id": TMP_VENDOR_ID
          }
        });
        // console.log("quest list: ", response.data.data)
        // const tmpCampaigns = response.data.data

        setQuests(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        // xs: 'repeat(1, 1fr)',
        md: 'repeat(1, 1fr)',
      }}
      sx={{
        pt: { xs: 1, md: 1 },
      }}
    >
      <Stack spacing={2} sx={{ px: 3 }} alignItems="flex-start">
        <Typography variant="h5">Quest Tasks</Typography>
      </Stack>

      <Stack spacing={2} sx={{ px: 3 }}>
        {
          loading ? (
            <Box sx={{ width: '100%', py: 2 }}>
              <LinearProgress />
            </Box>
          ) : (
            <>
              {quests?.sprints.map((sprint, sprintIndex) => (
                <div key={sprintIndex}>
                  {sprint.quests.map((quest, questIndex) => (
                    <CampaignQuestItem key={questIndex} quest={quest} />
                  ))}
                </div>
              ))}
            </>
          )
        }
      </Stack>
    </Box>

  );
}

CampaignQuestList.propTypes = {
  id: PropTypes.string,
};
