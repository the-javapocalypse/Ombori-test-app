// @ts-nocheck
import React, {useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {PolarArea} from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


function PolarChart({dataset = null, labels = null, title = '', axis = 'x', axisLabel = '', height = '', width = ''}) {

    const borderColor = ['rgba(255, 140, 0, 1)', 'rgba(255, 94, 14, 1)', 'rgba(255, 99, 71, 1)', 'rgba(255, 168, 54, 1)', 'rgba(255, 79, 0, 1)', 'rgba(195, 82, 20, 1)', 'rgba(83, 45, 27, 1)', 'rgba(37, 21, 26, 1)', 'rgba(7, 6, 25, 1)', 'rgba(227, 74, 39, 1)', 'rgba(235, 104, 65, 1)', 'rgba(232, 145, 73, 1)', 'rgba(250, 186, 95, 1)', 'rgba(138, 51, 36, 1)', 'rgba(255, 241, 215, 1)', 'rgba(254, 111, 94, 1)', 'rgba(255, 200, 42, 1)', 'rgba(255, 215, 180, 1)', 'rgba(0, 0, 128, 1)', 'rgba(128, 128, 128, 1)', 'rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)'];
    const bgColor = ['rgba(255, 140, 0, 0.5)', 'rgba(255, 94, 14, 0.5)', 'rgba(255, 99, 71, 0.5)', 'rgba(255, 168, 54, 0.5)', 'rgba(255, 79, 0, 0.5)', 'rgba(195, 82, 20, 0.5)', 'rgba(83, 45, 27, 0.5)', 'rgba(37, 21, 26, 0.5)', 'rgba(7, 6, 25, 0.5)', 'rgba(227, 74, 39, 0.5)', 'rgba(235, 104, 65, 0.5)', 'rgba(232, 145, 73, 0.5)', 'rgba(250, 186, 95, 0.5)', 'rgba(138, 51, 36, 0.5)', 'rgba(255, 241, 215, 0.5)', 'rgba(254, 111, 94, 0.5)', 'rgba(255, 200, 42, 0.5)', 'rgba(255, 215, 180, 0.5)', 'rgba(0, 0, 128, 0.5)', 'rgba(128, 128, 128, 0.5)', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)'];


    const data = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: dataset,
                backgroundColor: bgColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };


    const options = {
        // maintainAspectRatio: false,
        indexAxis: axis as const,
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.r + ' ' + axisLabel;
                        }
                        return label;
                    }
                }
            },
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    color: '#fff',
                }
            },
        },
        scales: {
            r: {
                ticks: {
                    display: false
                }
            }
        }
    };


    return (
        <div className={'mb-4 rounded'}>
            <h6 className={'py-2 mb-3 fw-bolder bg-custom-gradient text-white rounded'}>
                &nbsp;&nbsp;{title}
            </h6>
            {/*
            // @ts-ignore */}
            <div style={{height, width}}>
                <PolarArea options={options} data={data} />
            </div>
        </div>
    );

}

export default PolarChart;
