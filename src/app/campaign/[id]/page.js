import PropTypes from 'prop-types';

import axios, { endpoints } from 'src/utils/axios';

import { LoginDialogProvider } from 'src/components/settings';

import { CampaignDetailsView } from 'src/sections/campaign/view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Campaign Details',
};

export default function CampaignDetailsPage({ params }) {
  const { id } = params;

  return (
    <LoginDialogProvider>
      <CampaignDetailsView id={id} />;
    </LoginDialogProvider>
  )
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.campaign.list);

  const campaigns = res.data?.data?.campaign

  // for (let index = 0; index < campaigns.length; index++) {
  //   const element = campaigns[index];
  //   console.log(element.id)
  // }

  return campaigns.map((campaign) => ({
    id: campaign.id,
  }));
}

CampaignDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
