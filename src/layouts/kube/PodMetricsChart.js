import { ExpandMoreRounded } from '@mui/icons-material';
import { Card, FormControl, MenuItem } from '@mui/material';
import pxToRem from 'assets/theme/functions/pxToRem';
import GuiBox from 'components/GuiBox';
import GuiSelect from 'components/GuiSelect';
import GuiTypography from 'components/GuiTypography';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Line } from 'recharts';

const grafanaClassicColorPallete = [
  "#8884d8",
  "#7EB26D",  // Green
  "#EAB839",  // Yellow
  "#6ED0E0",  // Light Blue
  "#EF843C",  // Orange
  "#E24D42",  // Red
  "#1F78C1",  // Blue
  "#BA43A9",  // Purple
  "#705DA0",  // Violet
  "#508642",  // Dark Green
  "#CCA300",  // Mustard
  "#447EBC",  // Dark Blue
  "#C15C17",  // Dark Orange
  "#890F02",  // Dark Red
  "#0A437C",  // Navy Blue
  "#6D1F62",  // Dark Purple
  "#584477"   // Deep Violet
]

const PodMetricsChart = ({ podMetrics, allClusterNames, allNamespaces }) => {

  return (
    <GuiBox sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <ResponsiveContainer width="100%" height={400} style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "0px", paddingRight: "0px", backgroundColor: "#0f1011", borderRadius: "0.75rem", border: "1px solid #26282d" }}>
        <LineChart>
          <XAxis
            dataKey="x"
            type="number"
            scale="time"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            tick={{ fill: 'white', fontSize: '12px' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            // label={{ value: 'CPU Usage (%)', position: 'top', fill: 'white', fontSize: '24px' }}
            tick={{ fill: 'white', fontSize: '12px' }}
            tickFormatter={(value) => `${value}%`}
            axisLine={false}
            tickLine={false}
          />
          <RechartsTooltip
            className="custom-tooltip" // Added className for custom styling
            labelFormatter={(value) => new Date(value).toLocaleString()}
            contentStyle={{ backgroundColor: '#05050a', color: 'white', borderRadius: '8px', border: '1px solid #26282d', fontSize: '12px' }}
            formatter={((value) => <span style={{ "color": 'white', "fontSize": '14px', "paddingBottom": '4px', "marginTop": '12px', flexGrow: 1 }}>{value}%</span>)}
            itemStyle={{ color: 'white', fontSize: '14px', fontWeight: 'bold', display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
            separator=""
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="top"
            wrapperStyle={{
              fontSize: '12px',
              paddingLeft: '8px',
              maxHeight: '320px',
              marginTop: '36px',
              overflowY: 'auto',
            }}
            formatter={((value) => <span style={{ "color": 'white', "fontSize": '14px', "borderBottom": '1px solid #3e3e3e', "paddingBottom": '4px', "marginTop": '12px', "width": '100%', "textAlign": 'left', display: "inline", alignItems: "start" }}>{value}</span>)}
            payload={podMetrics.reduce((acc, metric) => {
              const existingSeries = acc.find(series => series.id === metric.pod_name);
              if (!existingSeries) {
                acc.push({
                  id: metric.pod_name,
                  value: metric.cpu_usage ? Number((metric.cpu_usage / 10000000).toFixed(1)) : 0,
                  min: metric.cpu_usage ? Number((metric.cpu_usage / 10000000).toFixed(1)) : 0,
                  max: metric.cpu_usage ? Number((metric.cpu_usage / 10000000).toFixed(1)) : 0
                });
              } else {
                existingSeries.min = Math.min(existingSeries.min, metric.cpu_usage ? Number((metric.cpu_usage / 10000000).toFixed(1)) : 0);
                existingSeries.max = Math.max(existingSeries.max, metric.cpu_usage ? Number((metric.cpu_usage / 10000000).toFixed(1)) : 0);
              }
              return acc;
            }, [])
              .sort((a, b) => b.max - a.max)
              .map((series, index) => ({
                value: `${series.id} (Min: ${series.min}%, Max: ${series.max}%)`,
                color: grafanaClassicColorPallete[index % grafanaClassicColorPallete.length],
                type: 'line',
                dot: false
              }))}
            onClick={(payload) => {
              const highlightedSeries = payload.text;
              const seriesData = podMetrics.reduce((acc, metric) => {
                const existingSeries = acc.find(series => series.id === metric.pod_name);
                if (!existingSeries) {
                  acc.push({
                    id: metric.pod_name,
                    data: [{ x: new Date(metric.timestamp).getTime(), y: metric.cpu_usage ? Number((metric.cpu_usage / 10000000).toFixed(1)) : null }],
                    visible: metric.pod_name === highlightedSeries ? true : false
                  });
                } else {
                  existingSeries.data.push({ x: new Date(metric.timestamp).getTime(), y: metric.cpu_usage ? Number((metric.cpu_usage / 10000000).toFixed(1)) : null });
                  existingSeries.visible = metric.pod_name === highlightedSeries ? true : false;
                }
                return acc;
              }, [])
                .sort((a, b) => b.data[b.data.length - 1].y - a.data[a.data.length - 1].y);
            }}
          />
          {podMetrics.reduce((acc, metric) => {
            const existingSeries = acc.find(series => series.id === metric.pod_name);
            const cpuUsage = metric.cpu_usage ? Number((metric.cpu_usage / 10000000).toFixed(1)) : null;
            const timestamp = new Date(metric.timestamp).getTime();

            if (existingSeries) {
              existingSeries.data.push({ x: timestamp, y: cpuUsage });
            } else {
              acc.push({
                id: metric.pod_name,
                data: [{ x: timestamp, y: cpuUsage }],
                cluster: metric.cluster,
                namespace: metric.namespace,
              });
            }
            return acc;
          }, [])
            .sort((a, b) => b.data[b.data.length - 1].y - a.data[a.data.length - 1].y)
            .map((series, index) => (
              <Line
                key={series.id}
                type="monotone"
                data={series.data.sort((a, b) => a.x - b.x)}
                dataKey="y"
                name={series.id}
                stroke={grafanaClassicColorPallete[index % grafanaClassicColorPallete.length]}
                dot={false}
                animationDuration={300}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </GuiBox>
  );
};

export default PodMetricsChart;