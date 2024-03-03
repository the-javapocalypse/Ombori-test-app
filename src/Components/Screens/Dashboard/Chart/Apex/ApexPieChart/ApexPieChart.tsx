// @ts-nocheck
import React, {useEffect} from 'react';
import Chart from 'react-apexcharts'
import {bgColor} from "../../meta/metaColors";
import "../../../../../../index.scss";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {switchTheme} from "../../../../../../Global/Actions";

const ApexPieChart = ({
                          isDarkTheme = false,
                          height = "200%",
                          width = "100%",
                          chartTitle = "Chart",
                          legendPosition = 'bottom',
                          data = [],
                          labels = []
                      }) => {

    const [isDarkThemeEnabled, setIsDarkThemeEnabled] = React.useState(isDarkTheme);

    // Redux
    const theme = useSelector(
        (state: RootStateOrAny) => state.global.global.theme,
    );

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
                    colors: isDarkThemeEnabled ? "white": "black",
                    useSeriesColors: false
                }
            },
            chart: {
                id: 'pieChart',
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
                        customIcons: []
                    },
                },
                export: {
                    csv: {
                        filename: undefined,
                        columnDelimiter: ',',
                        headerCategory: 'Category',
                        headerValue: 'Value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    png: {
                        filename: chartTitle.replaceAll(" ", "_") + new Date().toISOString(),
                    }
                },
            },
            labels: labels,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        type: 'pie',
                    },
                    legend: {
                        position: legendPosition
                    }
                }
            }]
        }
    }

    return (
        <>
            {isDarkThemeEnabled &&
                <div className={"card shadow-lg rounded mt-5 py-3 bg-dark"}>
                    <h4 className={'mx-4 text-custom-primary'}>{chartTitle}</h4>
                    <Chart
                        options={config.options}
                        series={config.series}
                        type="pie"
                        width={width}
                        height={height}
                    />
                </div>
            }

            {!isDarkThemeEnabled &&
                <div className={"card shadow-lg rounded mt-5 py-3"}>
                    <h4 className={'mx-4 text-custom-primary'}>{chartTitle}</h4>
                    <Chart
                        options={config.options}
                        series={config.series}
                        type="pie"
                        width={width}
                        height={height}
                    />
                </div>
            }
            </>
    )
}

export default ApexPieChart;
