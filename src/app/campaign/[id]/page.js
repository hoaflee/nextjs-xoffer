import PropTypes from 'prop-types';

import axios, { endpoints } from 'src/utils/axios';

import { HOST_DOMAIN } from 'src/config-global';

import { LoginDialogProvider } from 'src/components/settings';

import { CampaignDetailsView } from 'src/sections/campaign/view';
// ----------------------------------------------------------------------

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata

// export const metadata = {
//   title: 'Campaign Details',
// };


export async function generateMetadata({ params }) {
  const { id } = params;
  const url = `${endpoints.campaign.details}${id}/view`

  console.log('generateMetadata: ', url);
  const res = await axios.get(url);
  const campaign = res.data;

  const { name, step_info_general, banner_small_image, htags } = campaign;

  const info = JSON.parse(step_info_general)

  // console.log(campaign);

  return {
    title: `xOffer - ${name}`,
    description: info.short_description,
    keywords: ['xOffer', 'web3', 'affiliate', step_info_general.category, step_info_general.subcategory, ...htags],
    openGraph: {
      title: `xOffer - ${name}`,
      description: info.short_description,
      url: `${HOST_DOMAIN}/campaign/${id}`,
      images: [
        {
          url: banner_small_image,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      title: `xOffer - ${name}`,
      description: info.short_description,
      images: [
        {
          url: banner_small_image,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
  };
}

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
