import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export default function CryptoPiechart(){
    const data = {
        labels: ['Mon','Tue','Wed'],
        datasets: [{
            label: '369',
            data: [3,6,9],
            backgroundColor: ['aqua','black','red'],
            borderColor: 'white',
            borderWidth: 1
        }]
    }
    const options = {

    };
    return (<div>
        <Pie
        data={data}
        options={options}
        >

        </Pie>
    </div>);
}