// @ts-nocheck
import React, {useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import {Chart} from 'react-chartjs-2';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

function MultiTypeChart({dataset = null, labels = null, title = '', axis = 'x', avgLabel = 'Avg', axisLabel = ''}) {

    const borderColor = ['rgba(230, 25, 75, 1)', 'rgba(60, 180, 75, 1)', 'rgba(255, 225, 25, 1)', 'rgba(0, 130, 200, 1)', 'rgba(245, 130, 48, 1)', 'rgba(145, 30, 180, 1)', 'rgba(70, 240, 240, 1)', 'rgba(240, 50, 230, 1)', 'rgba(210, 245, 60, 1)', 'rgba(250, 190, 212, 1)', 'rgba(0, 128, 128, 1)', 'rgba(220, 190, 255, 1)', 'rgba(170, 110, 40, 1)', 'rgba(255, 250, 200, 1)', 'rgba(128, 0, 0, 1)', 'rgba(170, 255, 195, 1)', 'rgba(128, 128, 0, 1)', 'rgba(255, 215, 180, 1)', 'rgba(0, 0, 128, 1)', 'rgba(128, 128, 128, 1)', 'rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)'];
    const bgColor = ['rgba(230, 25, 75, 0.5)', 'rgba(60, 180, 75, 0.5)', 'rgba(255, 225, 25, 0.5)', 'rgba(0, 130, 200, 0.5)', 'rgba(245, 130, 48, 0.5)', 'rgba(145, 30, 180, 0.5)', 'rgba(70, 240, 240, 0.5)', 'rgba(240, 50, 230, 0.5)', 'rgba(210, 245, 60, 0.5)', 'rgba(250, 190, 212, 0.5)', 'rgba(0, 128, 128, 0.5)', 'rgba(220, 190, 255, 0.5)', 'rgba(170, 110, 40, 0.5)', 'rgba(255, 250, 200, 0.5)', 'rgba(128, 0, 0, 0.5)', 'rgba(170, 255, 195, 0.5)', 'rgba(128, 128, 0, 0.5)', 'rgba(255, 215, 180, 0.5)', 'rgba(0, 0, 128, 0.5)', 'rgba(128, 128, 128, 0.5)', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)'];

    const trendLine = [];
    // calculate trend line

    if (labels != null) {
        // number of labels is equal to the number of records
        for (let i = 0; i < labels.length; i++) {
            let avg = 0;

            dataset.forEach(_item => {
                avg += parseFloat(_item.data[i]);
            });

            trendLine.push(avg / dataset.length);
        }
    }


    const data = {
        labels: labels,
        datasets: [],
    };

    if (dataset != null) {
        dataset.forEach((_item, _i) => {
            data.datasets.push({
                type: (_item.type ? _item.type : 'bar') as const,
                label: _item.label,
                backgroundColor: borderColor[_i],
                data: _item.data,
            })
        });
    }


    // push trend line
    data.datasets.push({
        type: 'line' as const,
        label: avgLabel,
        backgroundColor: 'rgba(174, 38, 99, 1)',
        borderColor: 'rgba(174, 38, 99, 1)',
        data: trendLine,
    })

    const options = {
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
                            label += context.parsed.y + ' ' + axisLabel;
                        }
                        return label;
                    }
                }
            },
            legend: {
                position: 'bottom' as const,
            }
        },
    };


    return (
        <div className={'mb-4'}>
            <h3 className={'py-2 mb-3 fw-bolder'}>{title}</h3>
            {/*
// @ts-ignore */}
            <Chart type='bar' options={options} data={data}/>
        </div>
    );

}

export default MultiTypeChart;
