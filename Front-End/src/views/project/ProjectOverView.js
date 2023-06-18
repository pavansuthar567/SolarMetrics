// import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import DashboardCard from 'src/components/shared/DashboardCard';

const ProjectOverView = () => {
  const { selectedProject } = useSelector((state) => state.project);
  return (
    <DashboardCard
      title={selectedProject?.title}
      subtitle={selectedProject?.description}
      // action={
      //   <Box>
      //     <Button color="primary" variant="contained" size="large" fullWidth>
      //       Add Project
      //     </Button>
      //   </Box>
      // }
    ></DashboardCard>
  );
};

export default ProjectOverView;
