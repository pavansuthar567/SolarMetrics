import React from 'react';
import { Box, Typography, FormGroup, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({
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

    <Stack>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="username"
          mb="5px"
        >
          Username
        </Typography>
        <CustomTextField
          id="username"
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
      </Box>
      <Box mt="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Password
        </Typography>
        <CustomTextField
          id="password"
          type="password"
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
      </Box>
      <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
        <FormGroup>
          {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber this Device" /> */}
        </FormGroup>
        <Typography
          component={Link}
          to="/"
          fontWeight="500"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
          }}
        >
          Forgot Password ?
        </Typography>
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        to="/"
        type="submit"
        onClick={onSubmit}
      >
        Sign In
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;
