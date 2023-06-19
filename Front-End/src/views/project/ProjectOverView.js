import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProject } from 'src/Services/projectServices';
import DashboardCard from 'src/components/shared/DashboardCard';
import Map from '../Map/map';
import { deleteProduct, getProductList } from 'src/Services/productServices';
import ProductModal from './ProductModal';
import { setSelectedProduct } from 'src/Store/Reducers/productSlice';

const ProjectOverView = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCoord, setSelectedCoord] = useState('');
  const open = Boolean(anchorEl);

  const { selectedProject } = useSelector((state) => state.project);

  const loadData = useCallback(async () => {
    await dispatch(getProject(projectId));
    await dispatch(getProductList(projectId));
  }, [projectId]);

  useEffect(() => {
    loadData();
  }, []);

  const onCloseModal = useCallback(() => {
    setAnchorEl(null);
    dispatch(setSelectedProduct({}));
  }, []);

  const onOpenProductModal = useCallback((e, product) => {
    if (product) dispatch(setSelectedProduct(product));
    setAnchorEl(e.currentTarget);
  }, []);

  const onDelete = useCallback(
    async (product) => {
      if (product?._id && selectedProject?._id) {
        const res = await dispatch(deleteProduct(selectedProject?._id, product?._id));

        if (res) {
          loadData();
        }
      }
    },
    [selectedProject?._id],
  );

  return (
    <>
      <DashboardCard title={selectedProject?.title} subtitle={selectedProject?.description}>
        <Map
          onOpenProductModal={onOpenProductModal}
          setSelectedCoord={setSelectedCoord}
          selectedCoord={selectedCoord}
          onDelete={onDelete}
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
