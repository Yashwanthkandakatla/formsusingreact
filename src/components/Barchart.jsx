import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const Barchart = () => {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
const BackEnd_url = "http://localhost:3001";
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BackEnd_url+"/user/faculty-documents");
        const data = response.data;

        // Transform data for Highcharts
        const formattedCategories = data.map((item) => item._id); // Faculty IDs as categories
        const formattedData = data.map((item) => item.count); // Document counts as series data

        setCategories(formattedCategories);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "bar", // Bar chart
    },
    title: {
      text: "Documents by Faculty", // Chart title
    },
    xAxis: {
      categories: categories, // Faculty IDs as x-axis labels
      title: {
        text: "Faculty IDs",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Documents",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " documents",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true, // Display value on bars
        },
      },
    },
    series: [
      {
        name: "Documents",
        data: chartData, // Data for bar heights
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Barchart;
