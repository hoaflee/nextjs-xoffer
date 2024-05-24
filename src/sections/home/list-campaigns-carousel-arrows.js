import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fNumber } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport } from 'src/components/animate';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function ListCampaignsCarouselArrows({ title, subheader, list, sx, ...other }) {
  const theme = useTheme();

  const carousel = useCarousel({
    slidesToShow: list.length <= 3 ? list.length : 3,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  return (
    <>
      {list.length === 0 ? null : (
        <Container
          component={MotionViewport}
          sx={{
            py: { xs: 2, md: 5 },
            // pb: {xs: 2, md: 0},
            px: 2,
          }}
        >
          <Box sx={{ pt: 2, ...sx }} {...other}>
            <CardHeader
              title={title}
              subheader={subheader}
              action={<CarouselArrows onNext={carousel.onNext} onPrev={carousel.onPrev} />}
              sx={{
                p: 0,
                mb: 3,
              }}
            />

            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {list.map((item) => (
                <CampaignItem key={item.id} item={item} />
              ))}
            </Carousel>
          </Box>
        </Container>
      )}
    </>
  );
}

ListCampaignsCarouselArrows.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function CampaignItem({ item }) {
  const router = useRouter();

  const { model_id, name_type, campaign, title, isHot = true, user_completed } = item;

  const handleView = useCallback(() => {
    router.push(paths.campaign.details(model_id));
  }, [model_id, router]);

  // console.log("RecommendItem: ", item)

  return (
    <Paper
      sx={{
        mr: 3,
        borderRadius: 2,
        position: 'relative',
        bgcolor: 'background.neutral',
        cursor: 'pointer',
      }}
      onClick={() => {
        handleView();
      }}
    >
      <Stack
        spacing={2}
        sx={{
          px: 2,
          pb: 0.5,
          pt: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ minHeight: 65 }}>
          <Avatar alt={title} src={campaign.logo_image} sx={{ width: 48, height: 48 }} />
          <ListItemText
            primary={title}
            secondary={name_type}
            secondaryTypographyProps={{
              // mt: 0.5,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Stack>

        <Stack
          rowGap={1}
          columnGap={3}
          flexWrap="wrap"
          direction="row"
          alignItems="center"
          sx={{ color: 'text.secondary', typography: 'caption' }}
        >
          <Stack direction="row" alignItems="center">
            <Iconify width={16} icon="solar:calendar-date-bold" sx={{ mr: 0.5, flexShrink: 0 }} />
            {
              // fDateTime(new Date())
              campaign.created_at
            }
          </Stack>

          <Stack direction="row" alignItems="center">
            <Iconify
              width={16}
              icon="solar:users-group-rounded-bold"
              sx={{ mr: 0.5, flexShrink: 0 }}
            />
            {user_completed}/{campaign.step_reward_policy.airdrop_prizes} Participants
          </Stack>
        </Stack>
      </Stack>

      <Label
        variant="filled"
        sx={{
          right: 16,
          zIndex: 9,
          bottom: 16,
          position: 'absolute',
        }}
      >
        {isHot && '🔥'} {fNumber(campaign.step_reward_policy.your_budget)} $
        {campaign.step_reward_policy.airTokenName}
      </Label>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Image alt={title} src={campaign.banner_small_image} sx={{ borderRadius: 1.5 }} />
        {/* ratio="1/1"  */}
      </Box>
    </Paper>
  );
}

CampaignItem.propTypes = {
  item: PropTypes.object,
};
