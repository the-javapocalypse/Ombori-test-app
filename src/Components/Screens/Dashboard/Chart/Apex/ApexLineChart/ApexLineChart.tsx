// @ts-nocheck
import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import {bgColor, borderColor} from '../../meta/metaColors';
import '../../../../../../index.scss';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { switchTheme } from '../../../../../../Global/Actions';

const ApexLineChart = ({
                           isDarkTheme = true,
                           height = '200%',
                           width = '100%',
                           chartTitle = 'Chart',
                           legendPosition = 'bottom',
                           data = [],
                           labels = [],
                           showDataLabels = true,
                           dataLabelPosition = 'top',
                           dataLabelUnit = '#',
                           yAxisText = 'Y Axis',
                       }) => {
    const [isDarkThemeEnabled, setIsDarkThemeEnabled] = React.useState(isDarkTheme);

    // Redux
    const theme = useSelector((state: RootStateOrAny) => state.global.global.theme);

    useEffect(() => {
        setIsDarkThemeEnabled(theme == 'dark');
    }, [theme]);


    const config = {
        series: data,
        options: {
            colors: bgColor,
            legend: {
                position: legendPosition,
                labels: {
                    colors: isDarkThemeEnabled ? 'white' : 'black',
                    useSeriesColors: false,
                },
            },
            chart: {
                id: 'lineChart', // Change id to identify the line chart
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true | '<img src="/static/icons/reset.png" width="20">',
                        customIcons: [],
                    },
                },
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                export: {
                    csv: {
                        filename: undefined,
                        columnDelimiter: ',',
                        headerCategory: 'Category',
                        headerValue: 'Value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString();
                        },
                    },
                    png: {
                        filename: chartTitle.replaceAll(' ', '_') + new Date().toISOString(),
                    },
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            type: 'line',
                        },
                        legend: {
                            position: legendPosition,
                        },
                    },
                },
            ],
            plotOptions: {
                line: {
                    dataLabels: {
                        position: dataLabelPosition, // top, center, bottom
                    },
                },
            },
            dataLabels: {
                enabled: showDataLabels,
                formatter: function (val) {
                    return val + dataLabelUnit;
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: [isDarkThemeEnabled ? '#fff' : '#000'],
                },
            },
            stroke: {
                show: true,
                width: 3,
                colors: borderColor,
            },
            grid: {
                show: false,
                row: {
                    colors: ['transparent'], // takes an array which will be repeated on columns
                    opacity: 0.2
                },
            },
            xaxis: {
                categories: labels,
                labels: {
                    style: {
                        colors: new Array(labels.length).fill(isDarkThemeEnabled ? '#fff' : '#000'),
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [isDarkThemeEnabled ? '#fff' : '#000'],
                    },
                },
                title: {
                    text: yAxisText,
                    style: {
                        color: isDarkThemeEnabled ? '#fff' : '#000',
                    },
                },
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                enabled: true,
                theme: isDarkThemeEnabled ? 'dark' : 'light',
            },
        },
    };

    return (
        <>
            {isDarkThemeEnabled && (
                <div className={'card shadow-lg rounded mt-2 py-3 px-3 bg-dark'}>
                    <h3 className={'mx-4 text-custom-secondary fw-bolder'}>{chartTitle}</h3>
                    <Chart
                        options={config.options}
                        series={config.series}
                        type="line" // Change type to "line"
                        width={width}
                        height={height}
                    />
                </div>
            )}

            {!isDarkThemeEnabled && (
                <div className={'card shadow-lg rounded mt-2 py-3'}>
                    <h3 className={'mx-4 text-custom-primary fw-bolder'}>{chartTitle}</h3>
                    <Chart
                        options={config.options}
                        series={config.series}
                        type="line" // Change type to "line"
                        width={width}
                        height={height}
                    />
                </div>
            )}
        </>
    );
};

export default ApexLineChart;
