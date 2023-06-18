import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from 'src/Services/productServices';

const ProductModal = ({
  open,
  handleClose,
  selectedProject,
  loadData,
  setSelectedCoord,
  selectedCoord,
}) => {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.product);

  const { handleChange, errors, values, handleBlur, touched, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedProduct?.title || '',
      lat: selectedProduct?.title || selectedCoord?.lat || '',
      lng: selectedProduct?.title || selectedCoord?.lng || '',
      orientation: selectedProduct?.orientation || '',
      inclination: selectedProduct?.inclination || '',
      power_peak_in_watt: selectedProduct?.power_peak_in_watt || '',
      area_sm: selectedProduct?.area_sm || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
    }),
  });

  const onClose = () => {
    handleClose();
    resetForm();
  };

  const onSubmit = useCallback(
    async (v) => {
      let res;
      console.log('selectedProduct', selectedProduct);
      if (selectedProduct?._id)
        res = await dispatch(updateProduct(v, selectedProject?._id, selectedProduct?._id));
      else res = await dispatch(createProduct(v, selectedProject?._id));
      if (res) {
        handleClose();
        loadData();
      }
    },
    [dispatch, selectedProduct, loadData, handleClose],
  );
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{selectedProduct?._id ? 'Update' : 'New'} Product</DialogTitle>
        <DialogContent>
          <Stack>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
              >
                Name
              </Typography>
              <CustomTextField
                id="name"
                type="text"
                variant="outlined"
                fullWidth
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.title || ''}
              />
              {errors?.title && touched?.title && (
                <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.title}</p>
              )}
            </Box>
            <Box mt={'25px'}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
              >
                Coordinates
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <CustomTextField
                  id="name"
                  type="number"
                  variant="outlined"
                  fullWidth
                  name="lat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.lat || ''}
                  sx={{ paddingRight: '5px' }}
                />
                <CustomTextField
                  id="name"
                  type="number"
                  variant="outlined"
                  fullWidth
                  name="lng"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.lng || ''}
                />
              </Box>
              {(errors?.lat && touched?.lat) ||
                (errors?.lng && touched?.lng && (
                  <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>
                    {errors?.lat || errors?.lng}
                  </p>
                ))}
            </Box>
            <Box mt={'25px'} sx={{ display: 'flex' }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name">
                  Area Sm
                </Typography>
                <CustomTextField
                  id="name"
                  type="number"
                  variant="outlined"
                  fullWidth
                  name="area_sm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.area_sm || ''}
                  sx={{ paddingRight: '5px' }}
                />
                {errors?.area_sm && touched?.area_sm && (
                  <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.area_sm}</p>
                )}
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name">
                  Orientation
                </Typography>
                <CustomTextField
                  id="name"
                  type="number"
                  variant="outlined"
                  fullWidth
                  name="orientation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.orientation || ''}
                />
                {errors?.orientation && touched?.orientation && (
                  <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>
                    {errors?.orientation}
                  </p>
                )}
              </Box>
            </Box>
            <Box mt={'25px'} sx={{ display: 'flex' }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name">
                  Inclination
                </Typography>
                <CustomTextField
                  id="name"
                  type="number"
                  variant="outlined"
                  fullWidth
                  name="inclination"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.inclination || ''}
                  sx={{ paddingRight: '5px' }}
                />
                {errors?.inclination && touched?.inclination && (
                  <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>
                    {errors?.inclination}
                  </p>
                )}
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name">
                  Power Peak (Watt)
                </Typography>
                <CustomTextField
                  id="name"
                  type="number"
                  variant="outlined"
                  fullWidth
                  name="power_peak_in_watt"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.power_peak_in_watt || ''}
                />
                {errors?.power_peak_in_watt && touched?.power_peak_in_watt && (
                  <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>
                    {errors?.power_peak_in_watt}
                  </p>
                )}
              </Box>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(values)}>
            {selectedProduct?._id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductModal;
