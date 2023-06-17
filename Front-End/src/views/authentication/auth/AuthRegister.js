import React from 'react';
import { Box, Typography, Button } from '@mui/material';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({
  title,
  subtitle,
  subtext,
  handleChange,
  onSubmit,
  values,
  errors,
  handleBlur,
  touched,
}) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Box>
      <Stack mb={3}>
        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
          Name
        </Typography>
        <CustomTextField
          id="name"
          variant="outlined"
          fullWidth
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.name}
        />
        {errors?.name && touched?.name && (
          <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.name}</p>
        )}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="email"
          mb="5px"
          mt="25px"
        >
          Email Address
        </Typography>
        <CustomTextField
          id="email"
          variant="outlined"
          fullWidth
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.email}
        />
        {errors?.email && touched?.email && (
          <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.email}</p>
        )}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
          mt="25px"
        >
          Password
        </Typography>
        <CustomTextField
          id="password"
          variant="outlined"
          fullWidth
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.password}
        />
        {errors?.password && touched?.password && (
          <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.password}</p>
        )}
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={onSubmit}
        type="submit"
      >
        Sign Up
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthRegister;
