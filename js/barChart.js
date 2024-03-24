/**
 * Assignment name: Lab 6 - bar chart
 * First name: 
 * Last name:
 * Student ID:
*/
class BarChart {
    
    /**
     * class constructor with basic chart configuration
     * @param {Object} _config 
     * @param {Array} _data 
     * @param {d3.Scale} _colorScale 
     */
    constructor(_config, _data, _colorScale) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: _config.margin || {top: 5, right: 5, bottom: 20, left: 50}
        };
        this.data = _data;
        this.colorScale = _colorScale;
        this.initVis();
    }
    
    /**
     * this function is used to initialize scales/axes and append static elements
     */
    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement)
            .append('svg')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)
            .attr('id', 'barchart');

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        vis.xScale = d3.scaleBand()
            .range([0, vis.width])
            .paddingInner(0.2);
        
        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0]); 

        vis.xAxis = d3.axisBottom(vis.xScale)
            .tickSizeOuter(0);

        vis.yAxis = d3.axisLeft(vis.yScale)
            .ticks(6)
            .tickSizeOuter(0);

        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);

        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

        
        vis.svg.append('text')
            .attr('class', 'axis-title')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '.71em')
            .text('Count')
        
    }

    /**
     * this function is used to prepare the data and update the scales before we render the actual vis
     */
    updateVis() {
        let vis = this;

        // Todos

        
        const countPenguins = d3.rollup(vis.data, v => v.length, d => d.species);

        
        vis.aggregatedData = Array.from(countPenguins, ([key, count]) => ({key, count}));
        vis.colorValue = d => d.key;
        vis.xValue = d => d.key; 
        vis.yValue = d => d.count;

        vis.xScale.domain(vis.aggregatedData.map(vis.xValue));
        vis.yScale.domain([0, d3.max(vis.aggregatedData, vis.yValue)]);
        
        vis.renderVis();
    }

    
    /**
     * this function contains the d3 code for binding data to visual elements
     */
    renderVis() {
        let vis = this;
        
        // Todos
        const bars = vis.chart.selectAll('.bar')
            .data(vis.aggregatedData)
            .join('rect')
            .attr('class', 'bar')
            .attr('x', d => vis.xScale(vis.xValue(d)))
            .attr('y', d=>{
                console.log("Data Point:", d);
                const yValue = vis.yScale(vis.yValue(d))
                return yValue;
            })
            //.attr('x', d =>vis.xScale(d.species))
           // .attr('y', d=>vis.yScale(vis.yValue(d.count)))
           // .attr('y', d=>{
           //     console.log("Data Point:", d);
           //     const yValue = vis.yScale(vis.yValue(d))
           //     return yValue;
           // })
            .attr('width', vis.xScale.bandwidth())
            //.attr('height', d => vis.height - vis.yScale(d))
            .attr('height', d => vis.height - vis.yScale(vis.yValue(d)))
            .attr('fill', d => vis.colorScale(d.species))
            .attr('stroke', 'none')
            .on('mouseover', function(event, d) {
                d3.select(this).attr('stroke', 'black');
            })
            .on('mouseout', function(event, d){
                d3.select(this).attr('stroke', 'none');
            })
           .on('click', function(event, d){
            d3.select(this).attr('stroke', 'black');
           })


        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }
}