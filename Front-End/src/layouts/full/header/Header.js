import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge } from '@mui/material';
import PropTypes from 'prop-types';

// components
import Profile from './Profile';
import { IconArrowLeft, IconMenu } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from 'src/Store/Reducers/productSlice';
import { setSelectedProject } from 'src/Store/Reducers/projectSlice';
import { setSelectedReport } from 'src/Store/Reducers/reportSlice';

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const onClickBack = () => {
    const rawProject = {
      title: '',
      description: '',
      is_active: true,
    };
    dispatch(setSelectedProject(rawProject));
    dispatch(setSelectedProduct({}));
    dispatch(setSelectedReport({}));
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === 'object' && {
              color: 'primary.main',
            }),
          }}
          onClick={onClickBack}
        >
          <Badge
            // variant="dot"
            color="primary"
          >
            <IconArrowLeft size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Button variant="contained" color="primary"  target="_blank" href="https://adminmart.com/product/modernize-react-mui-dashboard-template/">
            Upgrade to Pro
          </Button> */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
