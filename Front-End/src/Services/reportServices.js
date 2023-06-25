import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from 'src/Environment';
import { setLoading } from 'src/Store/Reducers/AuthSlice';
import { setReportList } from 'src/Store/Reducers/reportSlice';

const toastError = (msg) => {
  toast.error(msg || 'Something went wrong, Please try again later');
};

export const getReports = (project_id, product_id, isAddDummy) => async (dispatch) => {
  try {
    if (project_id && product_id) {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${REACT_APP_APIURL}/projects/${project_id}/reports/${product_id}`,
      );
      const { err, data } = response.data;
      if (err === 0) {
        if (isAddDummy && data) {
          data.unshift({
            _id: 'select_report',
            title: 'Select Report',
          });
        }
        dispatch(setReportList(data || []));
        return true;
      }
    }
  } catch (error) {
    toastError(error.message);
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};
