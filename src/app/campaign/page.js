
import { CampaignListView } from 'src/sections/campaign/view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Campaigns Explorer',
};

export default function ShopPage() {
  return <CampaignListView showBreadcrumbs={true} />;
}
