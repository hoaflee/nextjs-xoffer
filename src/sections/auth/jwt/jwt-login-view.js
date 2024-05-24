'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { bgGradient } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { connectTonWallet } from 'src/ton-connect/ton-connect';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();
  const { connect, loadingConnect } = connectTonWallet();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '', // 'demo@xOffers.cc',
    password: '' // 'demo1234',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  // login bằng mạng xã hộij
  const socialLogin = (
    <Stack spacing={1.5}>
      <LoadingButton
        fullWidth
        color="secondary"
        // size="large"
        variant="contained"
        loading={isSubmitting}
        startIcon={<Iconify icon="fluent:wallet-24-filled" width={24} />}
        sx={{
          ...bgGradient({
            direction: "to right",
            startColor: `#ff930f 0%`,
            endColor: `#ffd642 100%`,
          }),
          '&:hover': {
            cursor: 'not-allowed'
          },
          // bgcolor: (theme) => alpha(theme.palette.warning.main, 0.9),
          // '&:hover': {
          //   bgcolor: (theme) => alpha(theme.palette.warning.main, 0.7),
          // },
        }}
      >
        Continue with EVM Wallet
      </LoadingButton>

      <LoadingButton
        fullWidth
        color="secondary"
        sx={{
          ...bgGradient({
            direction: "to right",
            startColor: `#0061ff 0%`,
            endColor: `#60efff 100%`,
          }),
          '&:hover': {
            cursor: loadingConnect ?'not-allowed' : 'pointer'
          },
        }}
        type="submit"
        variant="contained"
        startIcon={<img alt="icon" src="/assets/tokens/ton.png" width={24} />}
        loading={isSubmitting}
        onClick={connect}
      >
        {!loadingConnect ? 'Continue with TON Wallet' : 'Connecting ...'}
      </LoadingButton>
      <LoadingButton
        fullWidth
        // color="secondary"
        type="submit"
        variant="outlined"
        loading={isSubmitting}
        startIcon={<img alt="icon" src="/assets/icons/app/google.png" width={24} />}
        sx={{
          '&:hover': {
            cursor: 'not-allowed'
          },
        }}
      >
        Continue with Google
      </LoadingButton>

    </Stack >
  );

  const renderForm = (
    <Stack spacing={1.5}>
      <RHFTextField name="email" size="small" label="Email address" />

      <RHFTextField
        size="small"
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link> */}

      <LoadingButton
        fullWidth
        color="inherit"
        // size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <>

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4">Sign in to xOffer</Typography>
        <Typography variant="caption" sx={{ color: 'grey' }}>Sign-in to your account and start the adventure</Typography>
      </Stack>

      {socialLogin}

      <Divider sx={{ borderStyle: 'dashed', my: 0.5 }} > <Typography variant="caption" sx={{ color: 'grey' }}>Or</Typography> </Divider>

      {/* <Stack spacing={2} sx={{ my: 1 }}>
        <Typography variant="caption">Login with email</Typography>
      </Stack> */}

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@xOffers.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>

      <Stack component="span" direction="row" alignItems="center" justifyContent="center" sx={{ mt: 1.5 }}>
        {/* <Typography variant="body2">New user?</Typography> */}

        <Link component={RouterLink} href={paths.register} variant="subtitle2">
          Create an account with your email
        </Link>
      </Stack>

    </>
  );
}
