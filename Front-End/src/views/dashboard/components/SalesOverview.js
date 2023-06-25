import React, { useCallback, useEffect, useMemo } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectList } from 'src/Services/projectServices';
import { setSelectedProject } from 'src/Store/Reducers/projectSlice';
import { getProductList } from 'src/Services/productServices';
import { setProductList, setSelectedProduct } from 'src/Store/Reducers/productSlice';
import { getReports } from 'src/Services/reportServices';
import { setReportList, setSelectedReport } from 'src/Store/Reducers/reportSlice';
import { IconDownload, IconFileDownload } from '@tabler/icons';
import { isEmpty } from 'lodash';
import jsPDF from 'jspdf';

const emptyProduct = {
  _id: 'select_product',
  title: 'Select Product',
};
const emptyReport = {
  _id: 'select_report',
  title: 'Select Report',
};

const SalesOverview = () => {
  // select
  const dispatch = useDispatch();
  const { projectList, selectedProject } = useSelector((state) => state.project);
  const { productList, selectedProduct } = useSelector((state) => state.product);
  const { reportList, selectedReport } = useSelector((state) => state.report);

  const loadData = useCallback(async () => {
    await dispatch(getProjectList(true));
    dispatch(setProductList([emptyProduct]));
    dispatch(setReportList([emptyReport]));
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const onChangeProduct = async (item) => {
    if (item) {
      dispatch(setSelectedProduct(item));
      dispatch(setReportList([emptyReport]));
      dispatch(setSelectedReport(emptyReport));
      if (item._id !== 'select_product')
        await dispatch(getReports(selectedProject._id, item._id, true));
    }
  };

  const onChangeProject = async (item) => {
    if (item) {
      dispatch(setSelectedProject(item));
      dispatch(setProductList([emptyProduct]));
      dispatch(setReportList([emptyReport]));
      dispatch(setSelectedProduct(emptyProduct));
      dispatch(setSelectedReport(emptyReport));
      if (item._id !== 'select_project') {
        await dispatch(getProductList(item._id, true));
      }
    }
  };

  const onChangeReport = async (item) => {
    if (item) dispatch(setSelectedReport(item));
  };

  const onDownloadPdf = () => {
    const doc = new jsPDF();
    let y = 20;

    const generateHeader = () => {
      doc.setFontSize(14);
      doc.text(`${selectedProject.title} / ${selectedProduct.title}`, 20, y);
      y += 20;
    };

    const generateTableHeaders = () => {
      doc.setFontSize(10);
      doc.setFillColor('lightgrey');
      doc.setTextColor(0);

      // Draw background rectangles for each header cell
      doc.rect(20, y, 30, 10, 'F');
      doc.rect(50, y, 40, 10, 'F');
      doc.rect(90, y, 70, 10, 'F');

      // Draw borders for each header cell
      doc.rect(20, y, 30, 10, 'S');
      doc.rect(50, y, 40, 10, 'S');
      doc.rect(90, y, 70, 10, 'S');

      // Set text alignment for each header cell
      doc.text('Sr. No.', 30, y + 8, { align: 'center' });
      doc.text('Date', 59, y + 8, { align: 'center' });
      doc.text('Electricity Output', 108, y + 8, { align: 'center' });

      y += 10;
    };

    const generateTableData = () => {
      doc.setFontSize(10);
      doc.setTextColor(0);
      selectedReport.data.forEach((item, index) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
          generateHeader();
          generateTableHeaders();
        }
        doc.rect(20, y, 30, 10);
        doc.text(`${index + 1}`, 25, y + 8);
        doc.rect(50, y, 40, 10);
        doc.text(item.date, 55, y + 8);
        doc.rect(90, y, 70, 10);
        doc.text(`${item.electricity_output || 0}`, 95, y + 8);
        y += 10;
      });
    };

    generateHeader();
    generateTableHeaders();
    generateTableData();

    doc.save('data.pdf');
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const chatData = useMemo(() => {
    let xAxis = [];
    let yAxis = [];
    if (selectedReport?.data?.length > 0) {
      xAxis = selectedReport?.data?.map((x) => x.date);
      yAxis = [
        {
          name: 'Electicity Generation',
          data: selectedReport?.data?.map((x) => x.electricity_output),
        },
      ];
    }
    return {
      xAxis,
      yAxis,
    };
  }, [selectedReport]);

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
        tools: {
          download: false, // <== line to add
        },
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: chatData.xAxis,
      // categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  return (
    <DashboardCard
      title="Electricity Overview"
      action={
        <div style={{ display: 'flex' }}>
          <Select
            labelId="month-dd"
            id="month-dd"
            value={selectedProject?._id || 'select_project'}
            size="small"
            placeholder="Select Project"
          >
            {projectList?.length > 0 &&
              projectList.map((x, i) => {
                return (
                  <MenuItem
                    key={`${i}_chart_project_${x.title}`}
                    value={x._id}
                    onClick={() => onChangeProject(x)}
                  >
                    {x.title}
                  </MenuItem>
                );
              })}
          </Select>
          <Select
            style={{ marginLeft: '5px' }}
            labelId="month-dd"
            id="month-dd"
            value={selectedProduct?._id || 'select_product'}
            size="small"
          >
            {productList?.length > 0 &&
              productList.map((x, i) => {
                return (
                  <MenuItem
                    key={`${i}_chart_product_${x.title}`}
                    value={x._id}
                    onClick={() => onChangeProduct(x)}
                  >
                    {x.title}
                  </MenuItem>
                );
              })}
          </Select>
          <Select
            style={{ marginLeft: '5px' }}
            labelId="month-dd"
            id="month-dd"
            value={selectedReport?._id || 'select_report'}
            size="small"
          >
            {reportList?.length > 0 &&
              reportList.map((x, i) => {
                return (
                  <MenuItem
                    key={`${i}_chart_report_${x.title}`}
                    value={x._id}
                    onClick={() => onChangeReport(x)}
                  >
                    {x.title}
                  </MenuItem>
                );
              })}
          </Select>
          {!isEmpty(selectedReport) && selectedReport._id !== 'select_report' && (
            <div className="download-icon" style={{ display: 'flex' }} onClick={onDownloadPdf}>
              <IconDownload size="24" stroke="1" />
            </div>
          )}
        </div>
      }
    >
      <Chart options={optionscolumnchart} series={chatData.yAxis} type="bar" height="370px" />
    </DashboardCard>
  );
};

export default SalesOverview;
