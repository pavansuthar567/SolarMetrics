import { Box, Button, FormControl, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from 'src/Services/AuthServices';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import DashboardCard from 'src/components/shared/DashboardCard';
import { countryCodes } from 'src/helper/raw';
import * as Yup from 'yup';

const UserProfile = () => {
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.auth);

  const loadData = useCallback(async () => {
    await dispatch(getProfile());
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const { handleChange, errors, values, handleBlur, touched } = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email || '',
      name: user?.name || '',
      country_code: user?.country_code || '',
      location: user?.location || '',
      mobile: user?.mobile || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      location: Yup.string().required('Required'),
      country_code: Yup.number().required('Required'),
      mobile: Yup.number('Invalid number').required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),
  });

  const onSubmit = useCallback(async (v) => {
    await dispatch(updateProfile(v));
  }, []);

  return (
    <>
      <DashboardCard title="Profile">
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              User Name
            </Typography>
            <CustomTextField
              id="name"
              type="text"
              variant="outlined"
              fullWidth
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.name || ''}
            />
            {errors?.name && touched?.name && (
              <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.name}</p>
            )}
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Email
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.email || ''}
            />
            {errors?.email && touched?.email && (
              <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.email}</p>
            )}
          </Box>
          <Box mt="25px">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="username"
                  mb="5px"
                >
                  Country Code
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="country_code"
                    value={values?.country_code || ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {countryCodes?.map((x, i) => (
                      <MenuItem value={x?.value} key={i}>
                        {x?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors?.country_code && touched?.country_code && (
                  <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>
                    {errors?.country_code}
                  </p>
                )}
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="username"
                  mb="5px"
                >
                  Mobile
                </Typography>
                <CustomTextField
                  id="username"
                  variant="outlined"
                  fullWidth
                  name="mobile"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.mobile || ''}
                />
                {errors?.mobile && touched?.mobile && (
                  <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.mobile}</p>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="location"
              mb="5px"
            >
              Location
            </Typography>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="location"
              value={values?.location || ''}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {countryCodes?.map((x, i) => (
                <MenuItem value={x?.country} key={i}>
                  {x?.country}
                </MenuItem>
              ))}
            </Select>
            {errors?.location && touched?.location && (
              <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.location}</p>
            )}
          </Box>
        </Stack>
        <Box mt="25px">
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            onClick={() => onSubmit(values)}
          >
            Update Profile
          </Button>
        </Box>
      </DashboardCard>
    </>
  );
};

export default UserProfile;
