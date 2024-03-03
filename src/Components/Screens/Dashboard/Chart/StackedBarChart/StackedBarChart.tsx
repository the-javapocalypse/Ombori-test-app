// @ts-nocheck
import React, {useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



function StackedBarChart({dataset = null, labels = null, title = '', axis = 'x', axisLabel = ''}) {

    const borderColor = ['rgba(230, 25, 75, 1)', 'rgba(60, 180, 75, 1)', 'rgba(255, 225, 25, 1)', 'rgba(0, 130, 200, 1)', 'rgba(245, 130, 48, 1)', 'rgba(145, 30, 180, 1)', 'rgba(70, 240, 240, 1)', 'rgba(240, 50, 230, 1)', 'rgba(210, 245, 60, 1)', 'rgba(250, 190, 212, 1)', 'rgba(0, 128, 128, 1)', 'rgba(220, 190, 255, 1)', 'rgba(170, 110, 40, 1)', 'rgba(255, 250, 200, 1)', 'rgba(128, 0, 0, 1)', 'rgba(170, 255, 195, 1)', 'rgba(128, 128, 0, 1)', 'rgba(255, 215, 180, 1)', 'rgba(0, 0, 128, 1)', 'rgba(128, 128, 128, 1)', 'rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)'];
    const bgColor = ['rgba(230, 25, 75, 0.5)', 'rgba(60, 180, 75, 0.5)', 'rgba(255, 225, 25, 0.5)', 'rgba(0, 130, 200, 0.5)', 'rgba(245, 130, 48, 0.5)', 'rgba(145, 30, 180, 0.5)', 'rgba(70, 240, 240, 0.5)', 'rgba(240, 50, 230, 0.5)', 'rgba(210, 245, 60, 0.5)', 'rgba(250, 190, 212, 0.5)', 'rgba(0, 128, 128, 0.5)', 'rgba(220, 190, 255, 0.5)', 'rgba(170, 110, 40, 0.5)', 'rgba(255, 250, 200, 0.5)', 'rgba(128, 0, 0, 0.5)', 'rgba(170, 255, 195, 0.5)', 'rgba(128, 128, 0, 0.5)', 'rgba(255, 215, 180, 0.5)', 'rgba(0, 0, 128, 0.5)', 'rgba(128, 128, 128, 0.5)', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)'];

    const data = {
        labels,
        datasets: dataset,
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' ' + axisLabel;
                        }
                        return label;
                    }
                }
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    // add colors
    if(data.datasets != null && data.datasets.length > 0){
        for(let i=0; i<data.datasets.length; i++){
            data.datasets[i].backgroundColor = borderColor[i];
        }
    }

    return (
        <div className={'mb-4'}>
            <h3 className={'py-2 mb-3 fw-bolder bg-custom-gradient text-white text-center'}>{title}</h3>
            {/*
// @ts-ignore */}
            <Bar options={options} data={data}/>
        </div>
    );

}

export default StackedBarChart;
