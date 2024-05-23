'use client';

import PropTypes from 'prop-types';

// import MainLayout from 'src/layouts/main';
import DashboardLayout from 'src/layouts/dashboard';
// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
