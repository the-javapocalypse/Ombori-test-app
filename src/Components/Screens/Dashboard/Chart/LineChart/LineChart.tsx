// @ts-nocheck
import React, {useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScriptableContext
} from "chart.js";
import {bgColor, borderColor} from "../meta/metaColors";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


function LineChart({dataset = null, labels = null, title = '', axisLabel = ''}) {

    const options = {
        responsive: true,
        fill: true,
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
                position: 'top' as const,
            }
        },
    };

    const data = {
        labels,
        datasets: [],
    };

    if (dataset != null) {
        dataset.forEach((_record, _i) => {
            data.datasets.push({
                label: _record.label,
                data: _record.data,
                fill: "start",
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, borderColor[_i]);
                    gradient.addColorStop(1, bgColor[_i]);
                    return gradient;
                },
                borderColor: borderColor[_i]
            });
        })
    }

    return (
        <div className={'mb-4'}>
            <h3 className={'pt-3 ps-3 mb-3 fw-bolder'}>{title}</h3>

            {dataset!=null && labels!=null &&
                <Line options={options} data={data}/>
            }

        </div>
    );

}

export default LineChart;
