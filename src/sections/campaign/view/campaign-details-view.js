'use client';

import Head from 'next/head';
import PropTypes from 'prop-types';
import {
  useContext
} from 'react';

// import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
// import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
// import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fNumber } from 'src/utils/format-number';

import { useGetCampaign } from 'src/api/campaign';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext, LoginDialogContext } from 'src/components/settings';

import LoginDialog from 'src/sections/auth/jwt/login-dialog';

import CampaignQuestList from '../campaign-quest-list';
import { CampaignDetailsSkeleton } from '../campaign-skeleton';
import CampaignDetailsSummary from '../campaign-details-summary';

// ----------------------------------------------------------------------

export default function CampaignDetailsView({ id }) {
  const settings = useSettingsContext();
  const { dialogOpen, handleCloseLoginDialog } = useContext(LoginDialogContext);

  const { campaign, campaignLoading, campaignError } = useGetCampaign(id);

  console.log("CampaignDetailsView: ", campaign)

  const renderSkeleton = <CampaignDetailsSkeleton />;

  const renderMetadata = campaign && (
    <Head>
      <title>xOffer - {campaign.title}</title>
      <meta name="description" content={campaign.step_info_general.short_description} />
      <meta property="og:title" content={`xOffer - ${campaign.title}`} />
      <meta property="og:description" content={campaign.step_info_general.short_description} />
      <meta property="og:image" content={campaign.banner_small_image} />
    </Head>
  )

  const renderError = (
    <EmptyContent
      filled
      title={`${campaignError?.message}`}
      action={
        <Button
          component={RouterLink}
          // href={paths.campaign.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  // const renderMeta = campaign && (
  //   <Helmet>
  //     <title>xOffer - {campaign?.name}</title>
  //     <meta name="description" content={campaign?.step_info_general?.short_description} />
  //     <meta property="og:title" content={`xOffer - ${campaign?.name}`} />
  //     <meta property="og:description" content={campaign?.step_info_general?.short_description} />
  //     <meta property="og:image" content={campaign.banner_small_image} />
  //     <meta property="og:image:alt" content={campaign?.step_info_general?.short_description} />
  //   </Helmet>
  // )

  const renderCampaign = campaign && (
    <>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          {
            name: 'Campaigns',
            href: paths.campaign.root,
          },
          { name: campaign?.name },
        ]}
        sx={{ mb: { xs: 2, md: 4 } }}
      />

      <Grid container spacing={{ xs: 2, md: 2, lg: 4 }}>
        <Grid xs={12} md={8} lg={8}>
          <Card
            sx={{
              mb: 3,
            }}
          >
            <Image src={campaign.banner_small_image} sx={{ borderRadius: 1, width: 1 }} />
          </Card>

          <Card
            sx={{
              mb: 3,
            }}
          >
            <Stack spacing={1} sx={{ pb: 2 }} >
              <Stack spacing={2} sx={{ p: 3, pb: 2 }} >
                <Typography variant="h4">{campaign.name}</Typography>

                <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={2}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        variant="outlined"
                        label={`${fNumber(campaign.step_reward_policy.your_budget)} $${campaign.step_reward_policy.airTokenName}`}
                        color="success"
                      />
                      <Chip
                        sx={{ mx: 1 }}
                        variant="outlined"
                        label={campaign.step_reward_policy.chain}
                        avatar={
                          <Box
                            component="img"
                            alt="auth"
                            src="/assets/icons/chains/Polygon.webp"
                            sx={{
                              borderRadius: '100%',
                            }}
                          />
                        }
                        color="primary"
                      />
                    </Stack>
                  </Box>

                  <Box>
                    <Stack direction={{ xs: 'row', md: 'row' }} spacing={2}>
                      <Button
                        size="medium"
                        color="warning"
                        variant="soft"
                        startIcon={<Iconify icon="mingcute:bookmark-fill" width={20} />}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Bookmark
                      </Button>
                      <Button
                        variant="soft"
                        color="success"
                        startIcon={<Iconify icon="solar:share-bold" width={20} />}
                      >
                        Share
                      </Button>
                    </Stack>
                  </Box>
                </Stack>


                <Divider sx={{ borderStyle: 'dashed' }} />
                {
                  campaign?.step_campaign_details?.introduce &&
                  <Markdown children={campaign.step_campaign_details.introduce} />
                }

                {
                  campaign?.step_info_general?.campaign_detail &&
                  <Markdown
                    children={campaign.step_info_general.campaign_detail}
                  />
                }
              </Stack>


              <Divider sx={{ borderStyle: 'dashed' }} />

              <CampaignQuestList id={id} />

              {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

            </Stack>
          </Card>

          {/* <CampaignDetailsCarousel campaign={campaign} /> */}
        </Grid>

        <Grid xs={12} md={4} lg={4}>
          <CampaignDetailsSummary
            campaign={campaign}
          />
        </Grid>
      </Grid>
    </>
  );


  return (
    <>
      {renderMetadata}

      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
      >

        {campaignLoading && renderSkeleton}

        {campaignError && renderError}

        {campaign && renderCampaign}

        <LoginDialog
          open={dialogOpen}
          handleClose={handleCloseLoginDialog}
        />
      </Container>
    </>


  );
}

CampaignDetailsView.propTypes = {
  id: PropTypes.string,
};
