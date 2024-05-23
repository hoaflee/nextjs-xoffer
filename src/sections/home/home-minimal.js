import Container from '@mui/material/Container';

import { MotionViewport } from 'src/components/animate';

import { CampaignListView } from 'src/sections/campaign/view';

// ----------------------------------------------------------------------


export default function HomeMinimal() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: 5,
        px: 0,
        pb: { xs: 2, md: 10 }
      }}
    >

      <CampaignListView />

    </Container>
  );
}
