import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, Title} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, ArcElement, Title);

export default function CryptoPiechart(props){
    const userData = {'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': {
        labels: ['Mon','Tue','Wed'],
        datasets: [{
            data: [3,6,9],
            backgroundColor: ['aqua','black','red'],
            borderColor: 'white',
            borderWidth: 1
        }]
    }}
    const options = {
        aspectRatio: 1,
        plugins: {
            title: {
                display: true,
                text: 'Coins owned',
                align: "center",
                color: "#ffffff",
                font: {weight: 'bold'}
            },
            legend: {
              position: 'right',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                color: "#ffffff",
                
              }
            }
          }
    };
    return (<div>
        <Pie
        data={userData[props.userId]}
        options={options}
        >

        </Pie>
    </div>);
}