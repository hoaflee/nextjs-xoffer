import PropTypes from 'prop-types';
import {
  useState,
  useEffect,
  forwardRef,
  useContext,
  useCallback,
} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ListItemButton from '@mui/material/ListItemButton';
import LinearProgress from '@mui/material/LinearProgress';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import axios, { endpoints } from 'src/utils/axios';

import { TMP_BEARER, TMP_VENDOR_ID } from 'src/config-global';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import { LoginDialogContext } from 'src/components/settings';

import CampaignLeaderboard from './campaign-learderboard';
import CampaignRewardPolicy from './campaign-reward-policy';


// import LoginDialog from '../auth/jwt/login-dialog';

// ----------------------------------------------------------------------
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function CampaignDetailsSummary({
  // items,
  campaign,
  ...other
}) {

  const { handleOpenLoginDialog } = useContext(LoginDialogContext);

  const mdUp = useResponsive('up', 'md');
  const dialog = useBoolean();
  const [loading, setLoading] = useState(1);
  const [dialogContent, setDialogContent] = useState({ title: null, content: null });
  // const [selectedIndex, setSelectedIndex] = useState(1);

  const {
    id,
    name,
    logo_image,
    type,
    step_reward_policy,
    step_campaign_details,
    user_completed,
  } = campaign;

  // list những link social
  const socialArr = [
    { icon: 'mdi:youtube', value: campaign.youtube },
    { icon: 'mdi:web', value: campaign.website },
    { icon: 'hugeicons:new-twitter-ellipse', value: campaign.twitter },
    { icon: 'mingcute:telegram-fill', value: campaign.telegram },
    { icon: 'tabler:brand-reddit', value: campaign.reddit },
    { icon: 'streamline:linkedin-solid', value: campaign.linkedIn },
    { icon: 'icon-park-solid:facebook', value: campaign.facebook },
    { icon: 'flowbite:discord-solid', value: campaign.discord },
  ]

  // list những hướng dẫn có trong chiến dịch
  const guideList = [
    { key: 'guide_instructions_check', name: 'Guide', icon: 'ep:guide', color: 'primary', content: 'guide_instructions' },
    { key: 'intrusion_conditions_check', name: 'Acceptance conditions', icon: 'mdi:check-circle', color: 'green', content: 'intrusion_conditions' },
    { key: 'refusal_conditions_check', name: 'Refusal conditions', icon: 'mdi:close-circle', color: 'red', content: 'refusal_conditions' },
  ]

  // console.log('CampaignDetailsSummary: ', campaign)
  const [learderboard, setLearderboard] = useState();
  // cái này sau này sẽ đổi lại api ở backend, lấy quest đồng thời với thông tin chiến dịch luôn
  useEffect(() => {
    const fetchData = async () => {

      // lấy data learderboard
      const url = endpoints.campaign.leaderboard
      setLoading(true)
      try {
        const response = await axios.get(url, {
          params: {
            campaign_id: id,
            sort: 'desc',
            limit: 10,
            type_id: 62,
            skip: 0,
            type: 'condition',
            status: 1
          },
          headers: {
            Authorization: TMP_BEARER,
            "Content-Type": "application/json",
            "Role-Id": 3,
            "Vendor-Id": TMP_VENDOR_ID
          }
        });

        // console.log("response.data.data: ", response.data.data)
        setLearderboard(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  // mở mấy cái mạng xã hội của chiến dịch
  const handleOpenLinkClick = (url) => {
    window.open(url, '_blank');
  };

  const renderInfo = (
    <Stack component={Card} direction="row" spacing={2} sx={{ p: 3 }}>
      <Avatar alt={name} src={logo_image} sx={{ width: 60, height: 60 }} />

      <Stack spacing={1}>
        <ListItemText
          primary={type}
          primaryTypographyProps={{
            typography: 'h6',
          }}
        />

        <Stack spacing={1} direction="row">
          {socialArr.map((item, index) =>
          (
            item.value && (
              <Tooltip key={index} title={item.value}>
                <IconButton
                  key={index}
                  size="small"
                  color="secondary"
                  sx={{
                    borderRadius: 1,
                    bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.16),
                    },
                  }}
                  onClick={() => handleOpenLinkClick(item.value)}
                >
                  <Iconify width={20} icon={item.icon} />
                </IconButton>
              </Tooltip>
            )
          ))}
        </Stack>
      </Stack>
    </Stack>
  )

  const renderOtherInfo = (
    <Stack component={Card}>
      <List component="nav">

        <ListItemButton onClick={() => handleRewardListClick()}>
          <ListItemIcon>
            <Iconify icon="mdi:trophy" width={30} color="orange" />
          </ListItemIcon>
          <ListItemText primary="Reward Policy" />
        </ListItemButton>

        {guideList.map((item, index) =>
        (
          (step_campaign_details && step_campaign_details[item.key]) && (
            <>
              <Divider key={item.name} sx={{ borderStyle: 'dashed' }} />

              <ListItemButton key={index}
                onClick={() => handleListItemClick(item)}
              >
                <ListItemIcon>
                  <Iconify icon={item.icon} width={30} color={item.color} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton >

            </>
          )
        ))}
      </List>
    </Stack >
  )

  // sự kiện khi bấm vào mấy cái guide
  const handleListItemClick = useCallback((item) => {
    // console.log(item, step_campaign_details[item.content])
    setDialogContent({
      title: item.name,
      content: <Markdown children={step_campaign_details[item.content]} />
    })
    dialog.onTrue();
  }, [step_campaign_details, dialog]);

  // render Reward Policy dialog
  const handleRewardListClick = () => {
    setDialogContent({
      title: "Reward Policy",
      content: <CampaignRewardPolicy rewardPolicy={step_reward_policy} />
    })
    dialog.onTrue();
  }

  // const handleJoinNow = () => {
  //   alert("Join Now")
  // };

  const renderDialog = (
    <Dialog
      fullScreen={!mdUp}
      fullWidth
      keepMounted
      open={dialog.value}
      TransitionComponent={Transition}
      onClose={dialog.onFalse}
    >
      {
        dialogContent.title &&
        <>
          <DialogTitle
            sx={{ py: 2, mb: 2, backgroundColor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
          >
            {dialogContent.title}
          </DialogTitle>

          {/* <Iconify width={25} icon="solar:users-group-rounded-bold"
            onClick={dialog.onFalse}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          /> */}
        </>

      }

      {
        dialogContent.content &&
        <DialogContent sx={{ color: 'text.secondary' }}>
          {dialogContent.content}
        </DialogContent>
      }

      <DialogActions sx={{ pt: 1 }}>
        <Button variant="contained" onClick={dialog.onFalse} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )

  const renderReward = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>

      <Typography variant="h4">Rewards</Typography>

      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{}}>
        <Box sx={{ textAlign: 'center', px: 1 }}>
          <Image src="/assets/xo.webp"
            style={{ width: 48, height: 48 }}
          />

          <Typography variant="h5" sx={{ mt: 1 }} color="primary.main">
            {step_reward_policy?.airdrop_prizes ? step_reward_policy?.airdrop_prizes : ''} &#x24;{step_reward_policy.airTokenName}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', px: 1 }}>
          <Image
            src="/assets/illustrations/reward-start.webp"
            style={{ width: 48, height: 48 }}
          />

          <Typography variant="h5" sx={{ mt: 1 }} color="orange">
            1.000 xPoint
          </Typography>
        </Box>

      </Box>

      <Button size="large" fullWidth variant="contained" color="primary" onClick={handleOpenLoginDialog}>
        Join Now
      </Button>

      <Stack
        spacing={0.5}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ color: 'success.main', typography: 'h6' }}
      >
        <Iconify width={25} icon="solar:users-group-rounded-bold" />

        {user_completed}/{step_reward_policy?.airdrop_prizes} Participants
      </Stack>

    </Stack>
  )

  return (
    <Stack spacing={2} sx={{}} {...other}>

      {renderInfo}

      {renderReward}

      {loading &&
        <Box sx={{ width: '100%', py: 2 }}>
          <LinearProgress />
        </Box>
      }

      {learderboard && learderboard.length > 0 && <CampaignLeaderboard
        title="Learderboard"
        tableData={learderboard}
        tableLabels={[
          { label: 'Rank', align: 'center' },
          { label: 'User Name' },
          { label: 'Points', align: 'right' },
        ]}
      />
      }

      {renderOtherInfo}

      {renderDialog}

    </Stack>
  );
}

CampaignDetailsSummary.propTypes = {
  // items: PropTypes.array,
  campaign: PropTypes.object,
};
