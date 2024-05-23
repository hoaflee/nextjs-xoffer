import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
// import { alpha } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import TableContainer from '@mui/material/TableContainer';

import { fNumber, fShortenWalletAddress } from 'src/utils/format-number';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

export default function CampaignLeaderboard({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />
      <TableContainer>
        <Scrollbar>
          <Table
            size="small"
            sx={{
              //  minWidth: 640 
            }}>
            <TableHeadCustom headLabel={tableLabels} />

            {tableData &&
              <TableBody>
                {tableData.map((row, index) => (
                  <CampaignLeaderboardRow key={row.id} row={row} index={index} />
                ))}
              </TableBody>
            }

          </Table>
        </Scrollbar>
      </TableContainer>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

CampaignLeaderboard.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function CampaignLeaderboardRow({ row, index }) {
  return (
    <TableRow>
      <TableCell align="center">
        {
          [
            <Iconify
              icon="solar:crown-bold"
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                color: 'warning.main',
              }}
            />,
            <Iconify
              icon="hugeicons:medal-second-place"
              sx={{
                mt: 0.5,
                width: 30,
                height: 30,
                borderRadius: '50%',
                color: '#78909C',
              }}
            />,
            <Iconify
              icon="hugeicons:medal-third-place"
              sx={{
                mt: 0.5,
                width: 30,
                height: 30,
                borderRadius: '50%',
                color: '#8D6E63',
              }}
            />,
          ][index] || <strong>{index + 1}</strong>
        }
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row.full_name} src={row.avatarUrl} sx={{ mr: 1.5, width: 35, height: 35 }} />
        {row.full_name ? row.full_name : fShortenWalletAddress(row.public_address)}
      </TableCell>

      <TableCell align="center">{fNumber(row.total_point)}</TableCell>

    </TableRow>
  );
}

CampaignLeaderboardRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};
