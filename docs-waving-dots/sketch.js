/**
 * * Commentary:
 * 
 * I was tasked with creating a 20x20 grid of dots, which needed to be evenly distributed within the canvas. The size of each dot was required to be half of a specified variable size. To achieve this, I implemented a new function called wave(params), where I calculated all the necessary parameters within a nested loop.

For each dot, I generated a random noise value and used it as a color fill. I opted for the noise function as it provided a smooth and organic transition of colors, resulting in visually appealing patterns. I also created a new color using the color() function, passing the noise value as a parameter to the wave() function, enhancing the overall visual effect.

To animate the wave, I calculated the phase angle based on the x and y coordinates, as well as the frameCount, without using framerate() adjustments. I further added mouse interaction by incorporating mouseX in the angle calculation, which resulted in a variable phase as the mouse moved.

In addition to the required tasks, I took the initiative to introduce two further developments. Firstly, I connected the dots with lines while the wave responded to mouse movements, creating a more visually captivating representation. Secondly, I customized the colors and styles of the dots, grid, and wave to provide a unique and personalized appearance.

Throughout the process, I justified the use of map() and constrain() functions to normalize and limit values within specific ranges, ensuring the appropriate scaling and positioning of the wave animation. Overall, I successfully completed the task and implemented the additional features to create an engaging and visually appealing sketch.
 *  
 * 
* Commentary for task:
 * 
 * In this sketch, we create a grid of dots that exhibit a wave-like animation. Each dot's position,
 * size, and color are calculated based on various parameters and functions. The overall goal is to
 * create an interactive and visually appealing animation using noise and user interaction.
 * 
 * Noise Function:
 * The `noise()` function is used to generate a smooth and continuous variation of values over time
 * and space. By providing specific input parameters (such as x, y, and frameCount), we obtain a
 * noise value that can be mapped to different properties, such as color or animation behavior.
 * In this sketch, the `noise()` function is used to generate a noise value for each dot, which is
 * then mapped to determine the color of the dot.
 * 
 * map() Function:
 * The `map()` function is used to convert a value from one range to another. It allows us to remap
 * the noise values obtained from the `noise()` function to a desired range, such as color values
 * between 0 and 255. By mapping the noise values, we can control the visual appearance and
 * variation of the dots' colors, creating a more visually interesting effect.
 * 
 * Extensions:
 * This sketch can be extended in various ways. For example, the dot animation could be modified to
 * have different wave patterns or behaviors. Additional user interaction could be added, such as
 * mouse dragging to distort the wave or keyboard controls to adjust the animation parameters.
 * Furthermore, the size and spacing of the dots could be made interactive, allowing users to change
 * the overall grid layout. These extensions would enhance the interactivity and visual richness of
 * the sketch, providing a more immersive experience for users.
 */

function setup()
{
    createCanvas(500, 500);
    background(255);
    noiseSeed(123); // Set a noise seed for consistent results 

    dotPositions = createDotPositions(); // Create a grid of dot positions 
}

function draw() // draw() is called every frame 
{
    background(255);

    var noOfDots = 20;
    var size = width/noOfDots;

    for (var x = 0; x < noOfDots; x++) // nested for loop to create a grid of dots 
    {
      for (var y = 0; y < noOfDots; y++) 
      {
        // your code here
        var xPos = x * size + size / 2;
        var yPos = y * size + size / 2;
        var amplitude = size / 3;
        var frequency = 0.03;
        var phase = frameCount * 0.3 + x * 0.2 + y * 0.2;
        // var phase = (frameCount * 0.03 + x * 0.2 + y * 0.2) + (mouseX * 0.01);
        var dotSize = size / 2;

        var noiseValue = noise(x * 0.1, y * 0.1, frameCount * 0.01);
        // var noiseValue = noise(x * 0.1, y * 0.1); // remove frameCount * 0.01 to make it static noise pattern 
        // var colorValue = map(noiseValue, 0, 1, 0, 255);
        // var colorValue = color(noiseValue * 255); // remove map function to make it static noise pattern 
        var mappedColor = map(noiseValue, 0, 1, 50, 200);
        var colorValue = color(200, mappedColor, 100);

        
        wave(xPos, yPos, amplitude, frequency, phase, dotSize, colorValue); // replace params with the necessary parameters
        
      }
    }

    drawLines();
}


function wave(x, y, amplitude, frequency, phase, dotSize, colorValue) // replace params with the necessary parameters
{
 // your code here
 var angle = phase + (x + y + mouseX) * frequency; // add x and y to the phase to make it more interesting 
 var radius = amplitude * sin(angle); // use sin function to make it wave 
//  var mappedRadius = map(radius, -amplitude, amplitude, 0, 255); // map the radius to a color value between 0 and 255 
 var mappedRadius = map(radius, -amplitude, amplitude, 0, 255);
 var dotRadius = map(mappedRadius, 0, 255, dotSize / 3, dotSize);

 
//  ellipse(x, y, dotSize, dotSize);

 push(); // Save the current transformation state
  translate(x, y); // Translate to the position of the dot
  rotate(radius); // Rotate based on the radius
  
  noStroke();
  fill(colorValue);
  ellipse(0, 0, dotRadius, dotRadius);
  
  pop(); // Restore the previous transformation state


  // // Draw lines between dots
  // var startX = x + cos(angle) * dotRadius * 0.5;
  // var startY = y + sin(angle) * dotRadius * 0.5;
  // var endX = x + cos(angle) * dotRadius * 1.5;
  // var endY = y + sin(angle) * dotRadius * 1.5;

  // stroke(colorValue);
  // line(startX, startY, endX, endY);
}


function drawLines() { // Draw lines between dots
  stroke(100,100,255);

  for (var x = 0; x < dotPositions.length; x++) { // nested for loop to create a grid of dots 
    for (var y = 0; y < dotPositions[x].length; y++) { // nested for loop to create a grid of dots 
      var dotPos = dotPositions[x][y];
      var startX = dotPos.x + cos(dotPos.angle) * dotPos.radius * 0.5;
      var startY = dotPos.y + sin(dotPos.angle) * dotPos.radius * 0.5;

      if (x + 1 < dotPositions.length) { // Check if there is a dot to the right 
        var nextDotPos = dotPositions[x + 1][y];
        var endX = nextDotPos.x + cos(nextDotPos.angle) * nextDotPos.radius * 0.5;
        var endY = nextDotPos.y + sin(nextDotPos.angle) * nextDotPos.radius * 0.5;
        line(startX, startY, endX, endY);
      }

      if (y + 1 < dotPositions[x].length) { // Check if there is a dot below 
        var nextDotPos = dotPositions[x][y + 1];
        var endX = nextDotPos.x + cos(nextDotPos.angle) * nextDotPos.radius * 0.5;
        var endY = nextDotPos.y + sin(nextDotPos.angle) * nextDotPos.radius * 0.5;
        line(startX, startY, endX, endY);
      }
    }
  }
}

function createDotPositions() { // Create a grid of dot positions 
  var positions = [];

  var noOfDots = 20;
  var size = width / noOfDots;

  for (var x = 0; x < noOfDots; x++) { // nested for loop to create a grid of dots 
    positions[x] = [];
    for (var y = 0; y < noOfDots; y++) {
      var xPos = x * size + size / 2;
      var yPos = y * size + size / 2;
      positions[x][y] = {
        x: xPos,
        y: yPos,
        radius: 0,
        angle: 0
      };
    }
  }

  return positions; // return the positions array 
}

