import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProject,
  deleteProduct,
  getProjectList,
  updateProject,
} from 'src/Services/projectServices';
import DashboardCard from 'src/components/shared/DashboardCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, red } from '@mui/material/colors';
import ProjectModal from './ProjectModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setSelectedProject } from 'src/Store/Reducers/projectSlice';

const Project = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState();
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const { projectList, selectedProject } = useSelector((state) => state.project);
  const { loading } = useSelector((state) => state.auth);

  const loadData = useCallback(async () => {
    await dispatch(getProjectList());
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const handleClick = (event, id) => {
    if (id) {
      setSelectedProjectId(id);
      setIsNew(false);
      const item = projectList?.filter((x) => x?._id === id);
      dispatch(setSelectedProject(item?.[0]));
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProjectId();
    dispatch(
      setSelectedProject({
        name: '',
        description: '',
        is_active: true,
      }),
    );
  };

  const { handleChange, errors, values, handleBlur, touched } = useFormik({
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

  const onSubmit = useCallback(async (v) => {
    let res;
    if (isNew) res = await dispatch(createProject(v));
    else res = await dispatch(updateProject(v, selectedProjectId));
    if (res) {
      loadData();
      handleCloseDialog();
    }
  }, []);

  const onDelete = useCallback(async (id) => {
    console.log('id', id);
    if (id) {
      const res = await dispatch(deleteProduct(id));
      if (res) {
        loadData();
        handleClose();
        setSelectedProjectId();
        setIsNew(true);
        dispatch(
          setSelectedProject({
            name: '',
            description: '',
            is_active: true,
          }),
        );
      }
    }
  }, []);

  return (
    <>
      <DashboardCard
        title="Projects"
        action={
          <Box>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleOpenDialog}
            >
              Add Project
            </Button>
          </Box>
        }
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: 'nowrap',
                mt: 2,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Id
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Active
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Budget
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectList?.map((x, i) => {
                  return (
                    <TableRow key={x?._id}>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: '15px',
                            fontWeight: '500',
                          }}
                        >
                          {i + 1}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                          {x?.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                          {x?.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          sx={{
                            px: '4px',
                            backgroundColor: x?.is_active ? 'success.main' : 'error.main',
                            color: '#fff',
                          }}
                          size="small"
                          label={x?.is_active ? 'Yes' : 'No'}
                        ></Chip>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={(e) => handleClick(e, x._id)}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        )}
      </DashboardCard>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenDialog}>
          <IconButton aria-label="delete" size="small">
            <CreateIcon sx={{ color: green[500] }} />
          </IconButton>
          Edit
        </MenuItem>
        <MenuItem onClick={() => onDelete(selectedProjectId)}>
          <IconButton aria-label="delete" size="small">
            <DeleteIcon sx={{ color: red[500] }} />
          </IconButton>
          Delete
        </MenuItem>
      </Menu>
      <ProjectModal
        open={openDialog}
        values={values}
        errors={errors}
        isNew={isNew}
        touched={touched}
        handleClose={handleCloseDialog}
        handleChange={handleChange}
        handleBlur={handleBlur}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Project;
