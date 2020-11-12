$(document).ready(function() {
  $("form").submit(function(e) {
      e.preventDefault();
      readInput();
  }).validate({
    rules: {
      "Xmin": {
        required: true,
        range: [-150, 150],
      },
      "Xmax": {
        required: true,
        range: [-150, 150],
      },
      "Ymin": {
        required: true,
        range: [-150, 150],
      },
      "Ymax": {
        required: true,
        range: [-150, 150],
      }
    },
    messages: {
      Xmin: {
        required: "Please enter a minimum value. Must be an integer.",
        range: "Value must be between -150 and 150."
      },
      Xmax: {
        required: "Please enter a maximum value. Must be an integer.",
        range: "Value must be between -150 and 150."
      },
      Ymin: {
        required: "Please enter a minimum value. Must be an integer.",
        range: "Value must be between -150 and 150."
      },
      Ymax: {
        required: "Please enter a maximum value. Must be an integer.",
        range: "Value must be between -150 and 150."
      },
    },
  });
});

function readInput() {
  let minX = parseInt(document.querySelector("#Xmin").value);
  let maxX = parseInt(document.querySelector("#Xmax").value);
  let minY = parseInt(document.querySelector("#Ymin").value);
  let maxY = parseInt(document.querySelector("#Ymax").value);

  console.log("Horizontal start: ", minX, "Horizontal end: ", maxX,
  "\n Vertical start: ", minY, "Vertical end: ", maxY);
  //swap values if min > max
  if(minX > maxX) {
    let tmp;
    tmp = maxX;
    maxX = minX;
    minX = tmp;
  }
  if(minY > maxY) {
    let tmp;
    tmp = maxY;
    maxY = minY;
    minY = tmp;
  }
  var table = "";
  document.getElementById("mult_table").innerHTML = table;

  if(isNaN(minX) || isNaN(maxX) || isNaN(minY) || isNaN(maxY)) {
    document.querySelector("mult_table").innerHTML = "";
    //document.querySelector("")
  }
  else if(minX < -150 || maxX > 150 || minY < -150 || maxY > 150) {
    document.querySelector("mult_table").innerHTML = "";
  }
  else if((minX % 1 != 0) || (maxX % 1 != 0) || (minY % 1 != 0) || (maxY % 1 != 0)) {
    document.querySelector("mult_table").innerHTML = "";
  }
  else {
    generateTable(minX, maxX, minY, maxY);
  }
}

function generateTable(minX, maxX, minY, maxY) {


  var i, j;
  //document.getElementById("mult_table").innerHTML = table;
  var table = "";
  for(j = minY - 1; j <= maxY; j++) {
    table += "<tr>";
    if(j == minY - 1) {
      table += "<td></td>";
      for(i = minX; i <= maxX; i++) {
        table += "<td>" + i + "</td>";
      }
    } else {
      table += "<td>" + j + "</td>";
      for(i = minX; i <= maxX; i++) {
        table += "<td>" + (i*j) + "</td>";
      }
    }
    table += "</tr>";
  }
  document.getElementById("mult_table").innerHTML = table;
}
