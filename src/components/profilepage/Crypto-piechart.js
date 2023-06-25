import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, Title} from 'chart.js';
import {Pie, Doughnut} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, ArcElement, Title);

export default function CryptoPiechart(props){
    const userData = {
        labels: props.coin_names,
        datasets: [{
            data: props.coin_prices,
            backgroundColor: ['aqua','black','red','white','pink','yellow','green','blue','cyan', 'cerulean','beige','cream','orange','purple'],
            borderColor: 'white',
            borderWidth: 1
        }]
    }
    const options = {
        aspectRatio: 1,
        plugins: {
            title: {
                display: false,
                text: 'Coins owned',
                align: "left",
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
        <Doughnut
        data={userData}
        options={options}
        >

        </Doughnut>
    </div>);
}