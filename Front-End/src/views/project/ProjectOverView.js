import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProject } from 'src/Services/projectServices';
import DashboardCard from 'src/components/shared/DashboardCard';
import Map from '../Map/map';
import { getProductList } from 'src/Services/productServices';
import ProductModal from './ProductModal';

const ProjectOverView = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCoord, setSelectedCoord] = useState('');
  const open = Boolean(anchorEl);

  const { selectedProject } = useSelector((state) => state.project);

  const loadData = useCallback(async () => {
    await dispatch(getProject(projectId));
    await dispatch(getProductList());
  }, [projectId]);

  useEffect(() => {
    loadData();
  }, []);

  const onCloseModal = useCallback(() => {
    setAnchorEl(null);
    //   dispatch(setSelectedProject(newItem));
  }, []);

  const onOpenProductModal = useCallback((e) => {
    setAnchorEl(e.currentTarget);
    //   dispatch(setSelectedProject(newItem));
  }, []);

  return (
    <>
      <DashboardCard title={selectedProject?.title} subtitle={selectedProject?.description}>
        <Map
          onOpenProductModal={onOpenProductModal}
          setSelectedCoord={setSelectedCoord}
          selectedCoord={selectedCoord}
        />
      </DashboardCard>
      <ProductModal
        open={open}
        selectedCoord={selectedCoord}
        setSelectedCoord={setSelectedCoord}
        handleClose={onCloseModal}
        selectedProject={selectedProject}
        loadData={loadData}
      />
    </>
  );
};

export default ProjectOverView;
