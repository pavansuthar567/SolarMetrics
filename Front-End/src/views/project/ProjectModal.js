import styled from '@emotion/styled';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Switch,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createProject, updateProject } from 'src/Services/projectServices';

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[500]};
    }
  
    &:focus {
      border-color: ${blue[500]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const ProjectModal = ({ open, handleClose, selectedProject, loadData }) => {
  const dispatch = useDispatch();

  const { handleChange, errors, values, handleBlur, touched, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedProject?.title || '',
      description: selectedProject?.description || '',
      is_active: selectedProject?.is_active ? true : false,
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
      if (selectedProject?._id) res = await dispatch(updateProject(v, selectedProject?._id));
      else res = await dispatch(createProject(v));
      if (res) {
        handleClose();
        loadData();
      }
    },
    [dispatch, selectedProject, loadData, handleClose],
  );

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{selectedProject?._id ? 'Update' : 'New'} Project</DialogTitle>
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
                Active
              </Typography>
              <Switch
                checked={values?.is_active}
                name="is_active"
                id="is_active"
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
            <Box
              mt="25px"
              className="d-flex flex-column"
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="username"
                mb="5px"
              >
                Description
              </Typography>
              <StyledTextarea
                aria-label="minimum height"
                minRows={3}
                placeholder="Solar Project"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.description || ''}
              />
              {errors?.description && touched?.description && (
                <p style={{ marginBottom: 0, marginTop: 0, color: 'red' }}>{errors?.description}</p>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(values)}>
            {selectedProject?._id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectModal;
