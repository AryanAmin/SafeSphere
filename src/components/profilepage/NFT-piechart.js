import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, Title} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, ArcElement, Title);

export default function NFTPiechart(props){
    const userData = {'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': {
        labels: ['NFT Gurus','Secret Society','Wonderpals'],
        datasets: [{
            data: [3,2,3],
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
                text: 'NFTs owned',
                align: "center",
                color: "#ffffff",
                font: {weight: 'bold'}
            },
            legend: {
              position: 'left',
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
        height={null}
        width={null}
        options={options}
        >

        </Pie>
    </div>);
}