'use client';

import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import axios, { endpoints } from 'src/utils/axios';

import { countries } from 'src/assets/data';
import { formatCampaignData } from 'src/api/campaign';
import {
  CHAINS_OPTIONS,
  CATEGORY_OPTIONS,
  JOB_SORT_OPTIONS,
  JOB_BENEFIT_OPTIONS,
  CAMPAIGN_TYPE_OPTIONS,
} from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CampaignSort from '../campaign-sort';
import CampaignList from '../campaign-list';
import CampaignSearch from '../campaign-search';
import CampaignFilters from '../campaign-filters';
import CampaignFiltersResult from '../campaign-filters-result';

// ----------------------------------------------------------------------

const defaultFilters = {
  // roles: [],
  locations: [],
  benefits: [],
  // experience: 'all',
  // employmentTypes: [],
  chains: 'all',
  campaignTypes: [],
  categories: [],
  subcategory: [],
};

// ----------------------------------------------------------------------

export default function CampaignListView({ showBreadcrumbs = false }) {
  const mdUp = useResponsive('up', 'md');

  const settings = useSettingsContext();

  // const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('latest');

  const [search, setSearch] = useState({
    query: '',
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  // console.log('loading: ', loading)


  useEffect(() => {
    const fetchData = async () => {
      const url = endpoints.public.srcCampaigns
      try {
        const response = await axios.get(url);
        // console.log("srcCampaigns: ", response.data.data.campaign)
        const tmpCampaigns = response.data.data.campaign

        tmpCampaigns.forEach((item) => {
          item = formatCampaignData(item)
        });

        setCampaigns(tmpCampaigns)

        // setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const dataFiltered = applyFilter({
    inputData: campaigns,
    filters,
    sortBy,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = []
        // const results = _jobs.filter(
        //   (job) => job.title.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        // );

        // const results = campaigns.filter(
        //   (campaign) => campaign.name.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        // );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    }, []
    // [search.query]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'row', sm: 'row' }}
    >
      {showBreadcrumbs ?
        <>
          <CampaignSearch
            query={search.query}
            results={search.results}
            onSearch={handleSearch}
            hrefItem={(id) => paths.dashboard.job.details(id)}
          />


          <Stack direction="row" spacing={1} flexShrink={0}>
            <CampaignFilters
              open={openFilters.value}
              onOpen={openFilters.onTrue}
              onClose={openFilters.onFalse}
              //
              filters={filters}
              onFilters={handleFilters}
              //
              canReset={canReset}
              onResetFilters={handleResetFilters}
              //
              locationOptions={countries.map((option) => option.label)}
              // roleOptions={_roles}
              categoryOptions={CATEGORY_OPTIONS}
              benefitOptions={JOB_BENEFIT_OPTIONS.map((option) => option.label)}
              // experienceOptions={['all', ...JOB_EXPERIENCE_OPTIONS.map((option) => option.label)]}
              chainsOptions={['all', ...CHAINS_OPTIONS.map((option) => option.label)]}
              // employmentTypeOptions={CAMPAIGN_TYPE_OPTIONS.map((option) => option.label)}
              campaignTypeOptions={CAMPAIGN_TYPE_OPTIONS.map((option) => option.label)}
            />

            <CampaignSort sort={sortBy} onSort={handleSortBy} sortOptions={JOB_SORT_OPTIONS} />
          </Stack>
        </> : <>
          <Typography variant="body1" sx={{ fontSize: '1.125rem', fontWeight: 700 }} >
            Impressive Communities
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Button
              size="small"
              color="inherit"
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
              component={RouterLink} href='/campaign'
            >
              View All
            </Button>
          </Box>
        </>
      }

    </Stack>
  );

  const renderResults = (
    <CampaignFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );


  return (
    <Container disableGutters={mdUp} maxWidth={settings.themeStretch ? false : 'lg'}>
      {
        showBreadcrumbs && <CustomBreadcrumbs
          heading="Campaign Explorer"
          links={[
            { name: 'Home', href: '/' },
            { name: 'Campaigns' },
          ]}

          sx={{
            mb: { xs: 2, md: 4 },
          }}
        />
      }


      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && <EmptyContent filled title="No Data" sx={{ py: 10 }} />}

      <CampaignList campaigns={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, filters, sortBy }) => {

  // console.log(`inputData: `, inputData)
  // console.log(`filters: `, filters)
  const {
    campaignTypes,
    chains,
    // experience, 
    // roles,
    categories,
    locations, benefits } = filters;

  // SORT BY
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // FILTERS
  if (campaignTypes.length) {
    inputData = inputData.filter((campaign) =>
      // campaign.type_id.some((item) => campaignTypes.includes(item))
      campaignTypes.includes(campaign.type)
    );
  }

  // if (experience !== 'all') {
  //   inputData = inputData.filter((job) => job.experience === experience);
  // }

  if (chains !== 'all') {
    inputData = inputData.filter((campaign) => campaign.step_reward_policy.chain === chains);
  }

  // if (roles.length) {
  //   inputData = inputData.filter((job) => roles.includes(job.role));
  // }

  if (categories.length) {
    inputData = inputData.filter((campaign) => categories.includes(campaign.step_info_general.category));
  }

  if (locations.length) {
    inputData = inputData.filter((job) => job.locations.some((item) => locations.includes(item)));
  }

  if (benefits.length) {
    inputData = inputData.filter((job) => job.benefits.some((item) => benefits.includes(item)));
  }

  return inputData;
};

CampaignListView.propTypes = {
  showBreadcrumbs: PropTypes.bool,
};
