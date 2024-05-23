import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CampaignFiltersResult({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  results,
  ...other
}) {
  const handleRemoveCampaignTypes = (inputValue) => {
    const newValue = filters.campaignTypeOptions.filter((item) => item !== inputValue);
    onFilters('campaignTypes', newValue);
  };

  // const handleRemoveExperience = () => {
  //   onFilters('experience', 'all');
  // };

  const handleRemoveChains = () => {
    onFilters('chains', 'all');
  };

  const handleRemoveCategories = (inputValue) => {
    const newValue = filters.roles.filter((item) => item !== inputValue);
    onFilters('role', newValue);
  };

  const handleRemoveLocations = (inputValue) => {
    const newValue = filters.locations.filter((item) => item !== inputValue);
    onFilters('locations', newValue);
  };

  const handleRemoveBenefits = (inputValue) => {
    const newValue = filters.benefits.filter((item) => item !== inputValue);
    onFilters('benefits', newValue);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!filters.campaignTypes.length && (
          <Block label="Campaign Types:">
            {filters.campaignTypes.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveCampaignTypes(item)}
              />
            ))}
          </Block>
        )}

        {/* {filters.experience !== 'all' && (
          <Block label="Experience:">
            <Chip size="small" label={filters.experience} onDelete={handleRemoveChains} />
          </Block>
        )}
         */}

        {filters.chains !== 'all' && (
          <Block label="Run on chains:">
            <Chip size="small" label={filters.chains} onDelete={handleRemoveChains} />
          </Block>
        )}

        {!!filters.categories.length && (
          <Block label="Categories:">
            {filters.categories.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveCategories(item)} />
            ))}
          </Block>
        )}

        {!!filters.locations.length && (
          <Block label="Locations:">
            {filters.locations.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveLocations(item)}
              />
            ))}
          </Block>
        )}

        {!!filters.benefits.length && (
          <Block label="Benefits:">
            {filters.benefits.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveBenefits(item)}
              />
            ))}
          </Block>
        )}

        {canReset && (
          <Button
            color="error"
            onClick={onResetFilters}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            Clear
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

CampaignFiltersResult.propTypes = {
  canReset: PropTypes.bool,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  onResetFilters: PropTypes.func,
  results: PropTypes.number,
};

// ----------------------------------------------------------------------

function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
