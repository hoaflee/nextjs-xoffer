import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fNumber } from 'src/utils/format-number';

import Image from 'src/components/image';
import Label from 'src/components/label';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';


// ----------------------------------------------------------------------

export default function TopCarousel({ data }) {
  const theme = useTheme();

  // console.log(data)
  const carousel = useCarousel({
    autoplay: true,
    speed: 1000,
    ...CarouselDots({
      rounded: true,
      sx: { mt: 3 },
    }),
  });

  return (
    <Box
      sx={{
        px: 2,
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16,
        },
      }}
    >
      <CarouselArrows
        filled
        shape="rounded"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        leftButtonProps={{ sx: { left: { xs: 20, md: -50 } } }}
        rightButtonProps={{ sx: { right: { xs: 20, md: -50 } } }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings} >
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box >
  );
}

TopCarousel.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function CarouselItem({ item }) {

  const router = useRouter();
  const theme = useTheme();

  const {
    campaign,
    title,
    model_id,
    name_type
  } = item

  const jsonKeys = ["step_campaign_details", "step_info_general", "step_reward_policy", "step_marketing_infor"]
  for (let index = 0; index < jsonKeys.length; index += 1) {
    const key = jsonKeys[index];
    if (isString(campaign[key])) campaign[key] = JSON.parse(campaign[key]);
  }

  // console.log('CarouselItem: ', campaign);
  // const handleGotoCampaign = () => {
  //   console.log('handleGotoCampaign:', model_id)
  //   router.push(paths.campaign.details(model_id))
  // }

  const handleView = useCallback(
    () => {
      router.push(paths.campaign.details(model_id));
    },
    [model_id, router]
  );

  // return <Image alt={title} src={coverUrl} ratio="1/1" />;
  return (
    <Stack
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        // height: { md: 1 },
        borderRadius: 2,
        // border: '1px solid',
        position: 'relative',
        color: 'primary.darker',
        // boxShadow: theme.customShadows.z0,
        // boxShadow: theme.customShadows.dropdown,
        // backgroundColor: 'common.white',
        cursor: 'pointer',
        // backgroundColor: theme.palette.background.default,
      }}
      onClick={() => {
        handleView();
      }}
    >
      <Stack
        component="span"
        justifyContent="center"
        sx={{
          maxHeight: 400,
          // p: { xs: 5, md: 3 },
          // m: 'auto',
        }}
      >
        <Image
          src={campaign.banner_small_image}
          sx={{
            borderRadius: { md: '20px 0 0 20px' },
            height: 1,
            // minHeight: 200,
          }}
        // height='300'
        // ratio='1/2'
        />
      </Stack>

      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          p: {
            xs: theme.spacing(1, 2, 0, 2),
            md: theme.spacing(4),
          },
          minHeight: { xs: 250, md: 400 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, whiteSpace: 'pre-line', mt: { xs: 2, md: 0 } }}>
          {title}
        </Typography>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ mb: 1 }}>
          <Stack direction="row" alignItems="center" flexGrow={1} sx={{ minWidth: 120 }}>
            <Image src="/assets/xo.webp"
              style={{ width: 28, height: 28 }}
            />

            <Typography variant="h6" sx={{ ml: 1 }} color="primary.main">
              {fNumber(campaign.step_reward_policy.your_budget / campaign.step_reward_policy.airdrop_prizes)} &#x24;{campaign.step_reward_policy.airTokenName}
            </Typography>

          </Stack>


          <Stack direction="row" alignItems="center" flexGrow={1} sx={{ minWidth: 120 }}>
            <Image src="/assets/illustrations/reward-start.webp"
              style={{ width: 28, height: 28 }}
            />

            <Typography variant="h5" sx={{ ml: 1 }} color="orange">
              1.000 xPoint
            </Typography>
          </Stack>
        </Box>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            width: 320,
            // mb: { xs: 1 },
            // overflow: 'hidden',
            // height: 100
          }}
        >
          {campaign.step_info_general.short_description}
        </Typography>

        <Box columnGap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ mt: 2, mb: { xs: 3, md: 0 } }}>
          <Label color="success" sx={{ p: 2 }}>
            {name_type}
          </Label>

          <Label color='warning' sx={{ p: 2 }}>
            {campaign.step_reward_policy.chain}
          </Label>

        </Box>

      </Stack>
    </Stack>
  )
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
