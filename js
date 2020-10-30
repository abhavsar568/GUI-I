
function validateInput() {
  //get the numbers from the html page
    var xBegin = document.getElementById('x-min').value;
    var xEnd = document.getElementById('x-max').value;
    var yBegin = document.getElementById('y-min').value;
    var yEnd = document.getElementById('y-max').value;

    console.log("Horizontal start: ", xBegin, "Horizontal end: ", xEnd,
    "\n Vertical start: ", yBegin, "Vertical end: ", yEnd);

  //if any of the 4 values are bad, let user know
    if(xBegin == '0' || xBegin < -100 || xBegin > 100)
    {
        document.getElementById("x-min-error").innerHTML = "Error, the number should not be 0 and between -100 and 100\n";
        xBegin = '1';
    }

    if(xEnd == '0' || xEnd > 100 || xEnd < -100)
    {
        document.getElementById("x-max-error").innerHTML = "Error, the number should not be 0 and between -100 and 100\n";
        xEnd = '10';
    }

    if(yBegin == '0' || yBegin < -100 || yBegin > 100)
    {
        document.getElementById("y-min-error").innerHTML = "Error, the number should not be 0 and between -100 and 100\n";
        yBegin = '1';
    }

    if(yEnd == '0' || yEnd > 100 || yEnd < -100)
    {
        document.getElementById("y-max-error").innerHTML = "Error, the number should not be 0 and between -100 and 100\n";
        yEnd = '10';
    }

  //if the Begin value is greater than the End, swap the two
    if(xBegin > xEnd)
    {
        var tmp = xBegin;
        xBegin = xEnd;
        xEnd = tmp;
    }

    if(yBegin > yEnd)
    {
        var tmp = yBegin;
        yBegin = yEnd;
        yEnd = tmp;
    }

    generateTable(xBegin, xEnd, yBegin, yEnd);
}


function generateTable(xBegin, xEnd, yBegin, yEnd)
{
    var myTable = '<table>';

    for(var i = yBegin - 1; i <= yEnd; i++)
    {
        myTable += "<tr>";
        if(i == yBegin - 1)
        {
            myTable += "<td></td>"; //empty cell

            for( var j = xBegin; j <= xEnd; j++)
            {
                myTable += "<td>" + j + "</td>";
            }
        }
        else
        {
            myTable += "<td>" + i + "</td>";

            for(j = xBegin; j <= xEnd; j++)
            {
                myTable += "<td>" + (i*j) + "</td>";
            }
        }
        myTable += "</tr>";
    }
    myTable += '</table>';
    document.getElementById("mult_table").innerHTML = myTable;
}
