/*========== POLYGON =========*/
// tes draw 2 segitiga
var vertices = [
    -0.5,0.5,0.0,
    -0.5,-0.5,0.0,
    0.5,-0.5,0.0,
 ];

 var vertices1 = [
    -0.8,0.9,0.0,
    -0.5,-0.0,0.0,
    0.3,-0.2,0.0,
 ];
 
 indices = [1,2,3];
 
 drawShape(vertices, indices);
 drawShape(vertices1,indices);