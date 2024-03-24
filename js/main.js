/**
 * Assignment name: Lab 6 - main
 * First name: 
 * Last name:
 * Student ID:
*/
let data, barchart, parallelCoordinates;
import { ParallelCoordinates } from './parallelCoordinates.js';
d3.csv('data/penguins_size.csv').then(_data => {
    

    data = _data;
    const keys = ['culmen_length_mm', 'culmen_depth_mm', 'flipper_length_mm', 'body_mass_g'];
     
    // Todos
    // grabs "data" and iterates each d in keys, updates that key to a float with parseFloat
    data.forEach(d => {
        keys.forEach(key =>{
            d[key] = parseFloat(d[key]);
        })
    });
    const scale_color = d3.scaleOrdinal(d3.schemeSet1)
        .domain(data.map(d=>d.species));
    

        barchart = new BarChart({parentElement: '.bar'}, data, scale_color);
        parallelCoordinates = new ParallelCoordinates({ parentElement: '.parallel' }, data, scale_color);
        
    console.log("Sample Record:", data[0]);
    barchart.updateVis();
    parallelCoordinates.renderVis()
})
.catch(error => console.error(error));

// Todos