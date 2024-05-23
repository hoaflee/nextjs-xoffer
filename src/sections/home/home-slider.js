import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

import TopCarousel from './top-carousel';


export default function HomeSlider({ data }) {


  return (
    <Container
      component={MotionViewport}
      sx={{
        // py: 5,
        pb: 3,
        px: 0
      }}
    >
      <TopCarousel data={data} />

    </Container>
  );
}

HomeSlider.propTypes = {
  data: PropTypes.object,
};
