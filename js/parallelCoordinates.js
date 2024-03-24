/**
 * Assignment name: Lab 6 - parallel coordinates
 * First name: 
 * Last name:
 * Student ID:
*/

export class ParallelCoordinates {
    
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
            containerHeight: _config.containerHeight || 500,
            margin: _config.margin || {top: 25, right: 20, bottom: 20, left: 35}
        };
        this.data = _data;
        this.colorScale = _colorScale;
        
        this.keys = ['culmen_length_mm', 'culmen_depth_mm', 'flipper_length_mm', 'body_mass_g'];
        this.data.forEach(d => {
            this.keys.forEach(key => {
                d[key] = parseFloat(d[key]);
            });
        });

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
            .attr('id', 'parallelplot');;
        
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Todo: initialize scales and axes
        vis.y ={};
        vis.keys.forEach(name=>{
            vis.y[name] = d3.scaleLinear()
            .domain(d3.extent(vis.data, d=>d[name]))
            .range([vis.height,0])
        })

        vis.x = d3.scalePoint()
            .range([0,vis.width])
            .padding(1)
            .domain(vis.keys)
        // Todo: append axis groups
        vis.path = function(d){
            return d3.line()(vis.keys.map(p=>[vis.x(p), vis.y[p](d[p])]))
        }
        // Todo: append axis titles (each axis should contain 1 title)
        vis.svg.selectAll('.axis')
            .data(vis.keys).enter()
            .append('g')
            .attr('transform', function(d) {return "translate(" + vis.x(d) + ")";})
            .each(function(d){
                { d3.select(this).call(d3.axisLeft().scale(vis.y[d])); }
            })
            //ask about text names
        vis.svg.selectAll('.axis')
            .append("text")
            .attr("x", 0)
            .attr("y", -9)
            
            .text(function(d) { return d; })
            .style("fill", "black");

    }

    /**
     * this function is used to prepare the data and update the scales before we render the actual vis
     */
    updateVis() {
        let vis = this;

        // Todo

        vis.renderVis();
    }

    /**
     * this function contains the d3 code for binding data visual elements
     */
    renderVis() {
        let vis = this;
       

        vis.chart.selectAll(".path")
        .data(vis.data)
        .join('path')
        .attr("class", d => "path " + d.species) 
        .attr("d", vis.path)
        .style("fill", "none")
        .style("stroke", d => vis.colorScale(d.species))
        .style("opacity", 0.5);
        // Todo
    }
}