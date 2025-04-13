import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const Piechart = () => {
  const [chartData, setChartData] = useState([]);
const BackEnd_url = 'http://localhost:3001';
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BackEnd_url+"/user/faculty-documents");
        const data = response.data;

        // Transform data into Highcharts format
        const formattedData = data.map((item) => ({
          name: item._id, // Faculty ID
          y: item.count, // Document count
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Proportion of Documents by Faculty",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Documents",
        colorByPoint: true,
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Piechart;

