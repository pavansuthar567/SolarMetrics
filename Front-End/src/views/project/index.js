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
import { deleteProduct, getProjectList } from 'src/Services/projectServices';
import DashboardCard from 'src/components/shared/DashboardCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { amber, green, red } from '@mui/material/colors';
import ProjectModal from './ProjectModal';
import { setSelectedProject } from 'src/Store/Reducers/projectSlice';
import { useNavigate } from 'react-router';

const newItem = {
  title: '',
  description: '',
  is_active: true,
};

const Project = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
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

  const onOpenMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    if (item) dispatch(setSelectedProject(item));
  };

  const onCloseMenu = (cleanItemId = true) => {
    setAnchorEl(null);
    if (cleanItemId) dispatch(setSelectedProject(newItem));
  };

  const onOpenModal = () => {
    setOpenDialog(true);
    onCloseMenu(false);
  };

  const onCloseModal = () => {
    setOpenDialog(false);
    dispatch(setSelectedProject(newItem));
  };

  const onDelete = useCallback(async (id) => {
    if (id) {
      onCloseMenu();
      const res = await dispatch(deleteProduct(id));
      if (res) {
        dispatch(setSelectedProject(newItem));
        loadData();
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
              onClick={onOpenModal}
            >
              Add Project
            </Button>
          </Box>
        }
      >
        {loading && projectList?.length === 0 ? (
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
                    <TableRow key={i}>
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
                          onClick={(e) => onOpenMenu(e, x)}
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
        onClose={onCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => navigate(`/projects/${selectedProject?._id}`)}>
          <IconButton aria-label="delete" size="small">
            <PreviewIcon sx={{ color: amber[500] }} />
          </IconButton>
          View
        </MenuItem>
        <MenuItem onClick={onOpenModal}>
          <IconButton aria-label="delete" size="small">
            <CreateIcon sx={{ color: green[500] }} />
          </IconButton>
          Edit
        </MenuItem>
        <MenuItem onClick={() => onDelete(selectedProject?._id)}>
          <IconButton aria-label="delete" size="small">
            <DeleteIcon sx={{ color: red[500] }} />
          </IconButton>
          Delete
        </MenuItem>
      </Menu>
      <ProjectModal
        open={openDialog}
        selectedProject={selectedProject}
        handleClose={onCloseModal}
        loadData={loadData}
      />
    </>
  );
};

export default Project;
