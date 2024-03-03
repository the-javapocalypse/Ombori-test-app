// @ts-nocheck
import React, {useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    LineController,
    BarController,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
    PointElement,
    LineElement,
    LineController,
    BarController,
);

ChartJS.defaults.color = '#fff';



function GroupedBarChart({dataset = null, labels = null, title = '', axis = 'x', axisLabel = '', legendPosition = 'right', height = '', width = ''}) {

    const borderColor = ['rgba(255, 140, 0, 1)', 'rgba(255, 94, 14, 1)', 'rgba(255, 99, 71, 1)', 'rgba(255, 168, 54, 1)', 'rgba(255, 79, 0, 1)', 'rgba(195, 82, 20, 1)', 'rgba(83, 45, 27, 1)', 'rgba(37, 21, 26, 1)', 'rgba(7, 6, 25, 1)', 'rgba(227, 74, 39, 1)', 'rgba(235, 104, 65, 1)', 'rgba(232, 145, 73, 1)', 'rgba(250, 186, 95, 1)', 'rgba(138, 51, 36, 1)', 'rgba(255, 241, 215, 1)', 'rgba(254, 111, 94, 1)', 'rgba(255, 200, 42, 1)', 'rgba(255, 215, 180, 1)', 'rgba(255, 255, 255, 1)', 'rgba(128, 128, 128, 1)', 'rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)'];
    const bgColor = ['rgba(255, 140, 0, 0.5)', 'rgba(255, 94, 14, 0.5)', 'rgba(255, 99, 71, 0.5)', 'rgba(255, 168, 54, 0.5)', 'rgba(255, 79, 0, 0.5)', 'rgba(195, 82, 20, 0.5)', 'rgba(83, 45, 27, 0.5)', 'rgba(37, 21, 26, 0.5)', 'rgba(7, 6, 25, 0.5)', 'rgba(227, 74, 39, 0.5)', 'rgba(235, 104, 65, 0.5)', 'rgba(232, 145, 73, 0.5)', 'rgba(250, 186, 95, 0.5)', 'rgba(138, 51, 36, 0.5)', 'rgba(255, 241, 215, 0.5)', 'rgba(254, 111, 94, 0.5)', 'rgba(255, 200, 42, 0.5)', 'rgba(255, 215, 180, 0.5)', 'rgba(255, 255, 255, 0.5)', 'rgba(128, 128, 128, 0.5)', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)'];

    const trendLine = [];

    const data = {
        labels,
        datasets: dataset,
    };


    const options = {
        maintainAspectRatio: height=='' && width=='',     // should be true if height and width are empty strings (i.e default)
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Date',
                    color: '#fff',
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: axisLabel,
                    color: '#fff',
                }
            },
        },
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
            datalabels: {
                color: '#fff',
                display: function(context) {
                    return context.dataset.data[context.dataIndex] > 0; // or >= 1 or ...
                }
            },
            legend: {
                position: legendPosition as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    color: '#fff',
                }
            },
        }
    };

    // add colors
    if(data.datasets != null && data.datasets.length > 0){
        for(let i=0; i<data.datasets.length; i++){
            if(data.datasets[i].backgroundColor == undefined){
                data.datasets[i].backgroundColor = bgColor[i];
                data.datasets[i].borderColor = borderColor[i];
            }
        }
    }


    return (
        <div className={'mb-4 bg-dark'}>
            <h6 className={'py-2 mb-3 fw-bolder bg-custom-gradient text-white rounded'}>

                &nbsp;&nbsp;{title}
            </h6>
            <div className={'mb-4 bg-dark'} style={{ width, height }}>
                {/*
            // @ts-ignore */}
                <Bar options={options} data={data} />
            </div>
        </div>
    );

}

export default GroupedBarChart;
