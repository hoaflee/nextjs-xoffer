import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { CAMPAIGN_TYPE_OPTIONS } from 'src/_mock';

// ----------------------------------------------------------------------

export function useGetCampaigns() {
  const URL = endpoints.campaign.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      campaigns: data?.campaigns || [],
      campaignsLoading: isLoading,
      campaignsError: error,
      campaignsValidating: isValidating,
      campaignsEmpty: !isLoading && !data?.campaigns.length,
    }),
    [data?.campaigns, error, isLoading, isValidating]
  );

  return memoizedValue;
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

// ----------------------------------------------------------------------

export function formatCampaignData(campaign) {

  try {
    ["step_campaign_details", "step_info_general", "step_reward_policy", "step_marketing_infor"].forEach((key) => {
      if (isString(campaign[key])) campaign[key] = JSON.parse(campaign[key]);
    });

    // số người tham gia tối đa
    campaign.maximumNumberOfParticipants = campaign.step_reward_policy.airdrop_prizes ? campaign.step_reward_policy.airdrop_prizes
      : campaign.step_reward_policy.totalUser;

    // phần thưởng cho mỗi người
    campaign.rewardsPerUser = Math.round(
      campaign.step_reward_policy.your_budget /
      campaign.maximumNumberOfParticipants
    );

    const typeObj = CAMPAIGN_TYPE_OPTIONS.find(type => type.value === campaign.type_id)
    campaign.type = typeObj.label
  } catch (error) {
    console.error(error);
  }


  return campaign;
}

// ----------------------------------------------------------------------

export function useGetCampaign(campaignId) {
  const baseUrl = `${endpoints.campaign.details}${campaignId}/view`

  const { data, isLoading, error, isValidating } = useSWR(baseUrl, fetcher);

  // console.log('useGetCampaign: ', error)

  const formattedData = data ? formatCampaignData(data) : data;

  const memoizedValue = useMemo(
    () => ({
      campaign: formattedData,
      campaignLoading: isLoading,
      campaignError: error,
      campaignValidating: isValidating,
    }),
    [formattedData, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchCampaigns(query) {
  const URL = query ? [endpoints.campaign.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
