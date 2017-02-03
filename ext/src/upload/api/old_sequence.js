/** 
 * Draw line on canvas
 */
function drawLineOnCanvas(ctx, { points, strokeStyle, strokeWidth }) {
  // set style
  ctx.strokeStyle = strokeStyle;
  ctx.lineJoin = 'round';
  ctx.lineWidth = strokeWidth;

  // draw points
  points.reduce((prevPoint, point) => {
    if (prevPoint === null) return point;

    ctx.beginPath();
    ctx.moveTo(prevPoint.x, prevPoint.y);
    ctx.lineTo(points.x, point.y);
    ctx.closePath();
    ctx.stroke();

    return point;
  }, null);
}

/** 
 * Draw all lines on canvas
 */
function drawAllLinesOnCanvas(lines) {
  const canvas = document.getElementById('hidden-canvas');
  const ctx = canvas.getContext('2d');

  lines.forEach(line => drawLine(ctx, line));
}



/**
 * Save lines to sequence
 * @param {Object[]} lines
 *  
 */
/*
[ 
  {
    points: { x: number, y: number }, ...],
    strokeWidth: 10,
    strokeColor: '#324344'
  },
  ...
]
*/
export function drawLinesToSequence(lines, strokeWidth, strokeColor, callback) {
  const canvas = document.getElementById('hidden-canvas');
  const ctx = canvas.getContext('2d');
  

}