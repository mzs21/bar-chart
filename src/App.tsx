import {
  axisBottom,
  axisLeft,
  max,
  min,
  scaleLinear,
  scaleTime,
  select,
} from "d3";
import useData from "./hooks/useData";

const URL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const width = 960;
const height = 600;
const margin = 40; // { top: 40, right: 40, bottom: 40, left: 40 }

const innerHeight = height - 2 * margin;
const innerWidth = width - margin;
const rangeHeight = height - margin;

function App() {
  let data = useData(URL);

  if (!data) return <div>Loading...</div>;

  let GDP = data.map((d: { [key: string]: any }) => d[1]);

  let maxGDP = max(GDP);

  let datesArray = data.map((d: { [key: string]: any }) => new Date(d[0]));

  let minDate = min(datesArray);

  let maxDate = max(datesArray);

  let xAxisScale = scaleTime()
    .domain([minDate, maxDate])
    .range([margin, innerWidth]);

  let yAxisScale = scaleLinear()
    .domain([0, maxGDP])
    .range([rangeHeight, margin]);

  let svg = select("svg");

  let g1 = svg.append("g").attr("transform", `translate(${0}, ${rangeHeight})`);
  let xAxis = axisBottom(xAxisScale)(g1);

  let g2 = svg.append("g").attr("transform", `translate(${margin}, ${0})`);
  let yAxis = axisLeft(yAxisScale)(g2);

  const yScale = scaleLinear().domain([0, maxGDP]).range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, data.length - 1])
    .range([margin, innerWidth]);

  let bars = svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "rect")
    .attr("width", (width - 2 * margin) / data.length) // Each of the bar will have equal width
    .attr("data-date", (d: string) => d[0])
    .attr("data-gdp", (d: string) => d[1])
    .attr("height", (d: string) => yScale(d[1]))
    .attr("x", (d: string, i: number) => xScale(i))
    .attr("y", (d: string) => rangeHeight - yScale(d[1])) // y position of the bars
    .append("title")
    .text((d: string) => `Date: ${d[0]}, GDP: $${d[1]} Billion`);

  return (
    <div>
      <svg width={width} height={height + 30}>
        <text
          x={500}
          y={30}
          style={{ textAnchor: "middle" }}
          className="text-4xl"
          dy=".32em"
        >
          GDP of USA
        </text>
        <text
          x={-275}
          y={60}
          transform="rotate(-90)"
          style={{ textAnchor: "middle" }}
        >
          Gross Domestic Product
        </text>
        {xAxis}
        {yAxis}
        {bars}

        <text x={925} y={height} dy=".32em" style={{ textAnchor: "end" }}>
          More Information:{" "}
          <a href="http://www.bea.gov/national/pdf/nipaguid.pdf">
            http://www.bea.gov/national/pdf/nipaguid.pdf
          </a>
        </text>
      </svg>
    </div>
  );
}

export default App;