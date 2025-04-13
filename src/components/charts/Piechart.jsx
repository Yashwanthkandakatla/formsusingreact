
import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip} from 'recharts';

function Piechart() {
    const data = [
        {name:'Facebook',value:4566660},
        {name:'Google',value:48956565},
        {name:'Twitter',value:9976878},
        {name:'Tesla',value:54789856},
    ];

  return (
    
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#8884d9" />
      {/* <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label /> */}
    <Tooltip/>
    </PieChart>
  
  )
}

export default Piechart