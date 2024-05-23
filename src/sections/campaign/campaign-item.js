import { t } from 'i18next';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fNumber } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function CampaignItem({
  campaign,
  // onView, onEdit, onDelete 
}) {
  // const popover = usePopover();
  // console.log('Campaign: ', campaign)
  const {
    id, logo_image, name,
    step_info_general,
    step_reward_policy,
    user_completed,
    maximumNumberOfParticipants,
    type_id,
    rewardsPerUser,
    banner_small_image,
    // createdAt, candidates, experience, employmentTypes, salary, role
  } = campaign;

  return (
    <>
      <Card>
        {/* <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}

        <Stack
          // spacing={0.5}
          // direction="row"
          sx={{
            p: (theme) => theme.spacing(1, 1, 0, 1),
            pb: 1
          }}
        >
          <Stack flexGrow={1} sx={{ position: 'relative' }}>
            <Image src={banner_small_image} sx={{ borderRadius: 1, height: 164, width: 1 }} />
          </Stack>
          {/* <Stack spacing={0.5}>
            <Image alt={images[1]} src={images[1]} ratio="1/1" sx={{ borderRadius: 1, width: 80 }} />
            <Image alt={images[2]} src={images[2]} ratio="1/1" sx={{ borderRadius: 1, width: 80 }} />
          </Stack> */}
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ px: 2, pb: 2 }}
        >
          <Avatar
            // alt={company.name}
            src={logo_image}
            variant="rounded"
            sx={{ width: 48, height: 48 }}
          />

          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle2">

              <Link component={RouterLink} href={paths.campaign.details(id)} color="inherit">
                {name}
              </Link>

            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ px: 2, pb: 2 }}>
          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{ color: 'primary.main', typography: 'caption' }}
          >
            <Iconify width={16} icon="material-symbols:trophy" />
            {fNumber(rewardsPerUser)} ${step_reward_policy.affTokenName}
          </Stack>
          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{ color: 'primary.main', typography: 'caption' }}
          >
            <Iconify width={16} icon="solar:users-group-rounded-bold" />
            {user_completed}/{maximumNumberOfParticipants} Participants
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 2 }}>
          {[
            {
              label: t(`type_id_${type_id}`),
              icon: <Iconify width={16} icon="mdi:hexagon-multiple" sx={{ flexShrink: 0 }} />,
            },
            // {
            //   label: step_info_general.category,
            //   icon: <Iconify width={16} icon="material-symbols:trophy" sx={{ flexShrink: 0 }} />,
            // },
            {
              label: `${step_info_general.category}, ${step_info_general.subcategory}`,
              icon: <Iconify width={16} icon="tdesign:app" sx={{ flexShrink: 0 }} />,
            },
            // {
            //   label: step_info_general.subcategory,
            //   icon: <Iconify width={16} icon="solar:wad-of-money-bold" sx={{ flexShrink: 0 }} />,
            // },
            // {
            //   label: role,
            //   icon: <Iconify width={16} icon="solar:user-rounded-bold" sx={{ flexShrink: 0 }} />,
            // },
          ].map((item) => (
            <Stack
              key={item.label}
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ color: 'text.disabled', minWidth: 0 }}
            >
              {item.icon}
              <Typography variant="caption" noWrap>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Card>

      {/* <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover> */}
    </>
  );
}

CampaignItem.propTypes = {
  campaign: PropTypes.object,
  // onDelete: PropTypes.func,
  // onEdit: PropTypes.func,
  // onView: PropTypes.func,
};
