
/*Basically reorganized the file since it was all over the place and split things into separate functions*/

var numTabs = 0; 

$(document).ready(function () {
    setupTabs();
    sliders();
    formValidation();
});

function setupTabs() {
    var tabs = $("#table_tabs").tabs();

    //got it from http://www.java2s.com/Tutorials/Javascript/jQuery_UI/Tab/Build_jQuery_UI_Tabs_Simple_manipulation_in_JavaScript.htm
    tabs.delegate("span.ui-icon-close", "click", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
        numTabs--;
    });
}

function sliders() {
    $("#Xmin_slider").slider({
        orientation: "horizontal",
        min: -50,
        max: 50,
        range: [-50, 50],
        step: 1,
        value: 0,
        slide: function (event, ui) {
            $("#Xmin").val(ui.value);
        }
    });
    $("#Xmin").change(function () {//changes the slider when the input is changed
        $("#Xmin_slider").slider("value", this.value);
    });

    $("#Xmax_slider").slider({
        orientation: "horizontal",
        min: -50,
        max: 50,
        range: [-50, 50],
        step: 1,
        value: 0,
        slide: function (event, ui) {
            $("#Xmax").val(ui.value);
        }
    });
    $("#Xmax").change(function () {
        $("#Xmax_slider").slider("value", this.value);
    });

    $("#Ymin_slider").slider({
        orientation: "horizontal",
        min: -50,
        max: 50,
        range: [-50, 50],
        step: 1,
        value: 0,
        slide: function (event, ui) {
            $("#Ymin").val(ui.value);
        }
    });
    $("#Ymin").change(function () {
        $("#Ymin_slider").slider("value", this.value);
    });

    $("#Ymax_slider").slider({
        orientation: "horizontal",
        min: -50,
        max: 50,
        range: [-50, 50],
        step: 1,
        value: 0,
        slide: function (event, ui) {
            $("#Ymax").val(ui.value);
        }
    });
    $("#Ymax").change(function () {
        $("#Ymax_slider").slider("value", this.value);
    });
}


function formValidation() {
    $("form").submit(function (e) {
        e.preventDefault();
        readInput();
    }).validate({
        rules: {
            Xmin: {
                required: true,
                min: -50,
                max: 50,
                range: [-50, 50]
            },
            Xmax: {
                required: true,
                min: -50,
                max: 50,
                range: [-50, 50]
            },
            Ymin: {
                required: true,
                min: -50,
                max: 50,
                range: [-50, 50]
            },
            Ymax: {
                required: true,
                min: -50,
                max: 50,
                range: [-50, 50]
            }
        },
        messages: {
            Xmin: {
                required: "Please enter a minimum value. Must be an integer.",
                min: "Error, value is too small, please enter value greater than -50",
                max: "Error, value is too large, please enter value less than 50",
                range: "Value must be between -50 and 50."
            },
            Xmax: {
                required: "Please enter a maximum value. Must be an integer.",
                min: "Error, value is too small, please enter value greater than -50",
                max: "Error, value is too large, please enter value less than 50",
                range: "Value must be between -50 and 50."
            },
            Ymin: {
                required: "Please enter a minimum value. Must be an integer.",
                min: "Error, value is too small, please enter value greater than -50",
                max: "Error, value is too large, please enter value less than 50",
                range: "Value must be between -50 and 50."
            },
            Ymax: {
                required: "Please enter a maximum value. Must be an integer.",
                min: "Error, value is too small, please enter value greater than -50",
                max: "Error, value is too large, please enter value less than 50",
                range: "Value must be between -50 and 50."
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },

        submitHandler: function () {
            generateTable();
        }
    });
}

function readInput() {
    let minX = parseInt(document.querySelector("#Xmin").value);
    let maxX = parseInt(document.querySelector("#Xmax").value);
    let minY = parseInt(document.querySelector("#Ymin").value);
    let maxY = parseInt(document.querySelector("#Ymax").value);

    console.log("Horizontal start: ", minX, "Horizontal end: ", maxX,
        "\n Vertical start: ", minY, "Vertical end: ", maxY);

    var table = "";
    if (isNaN(minX) || isNaN(maxX) || isNaN(minY) || isNaN(maxY)) {
        $("#error_msg").append("Error, one or more of values is NaN");
    }
    else if (minX < -50 || maxX > 50 || minY < -50 || maxY > 50) {
        $("#error_msg").append("Error, one or more values is outside the range of [-50, 50]");
    }
    else if ((minX % 1 != 0) || (maxX % 1 != 0) || (minY % 1 != 0) || (maxY % 1 != 0)) {
        $("#error_msg").append("Error, one or more values is not an integer");
    }
    else {
        return;
    }
}

function generateTable() {
    let minX = parseInt(document.querySelector("#Xmin").value);
    let maxX = parseInt(document.querySelector("#Xmax").value);
    let minY = parseInt(document.querySelector("#Ymin").value);
    let maxY = parseInt(document.querySelector("#Ymax").value);

    //swap values if min is greater than max and let user know
    if (minX > maxX) {
        let tmp;
        tmp = maxX;
        maxX = minX;
        minX = tmp;
        $("#error_msg").append("Swapping values since min is greater than max");
    }
    if (minY > maxY) {
        let tmp;
        tmp = maxY;
        maxY = minY;
        minY = tmp;
        $("#error_msg").append("Swapping values since min is greater than max");
    }

    var i, j;
    var table = "<table>";

    for (j = minY - 1; j <= maxY; j++) {
        table += "<tr>";
        if (j == minY - 1) {
            table += "<td></td>";
            for (i = minX; i <= maxX; i++) {
                table += "<td>" + i + "</td>";
            }
        } else {
            table += "<td>" + j + "</td>";
            for (i = minX; i <= maxX; i++) {
                table += "<td>" + (i * j) + "</td>";
            }
        }
        table += "</tr>";
    }
     table += "</table>"
    //document.getElementById("mult_table").innerHTML = table;

    //pass the table to function
    makeTab(minX, maxX, minY, maxY, table);
}

function makeTab(Xmin, Xmax, Ymin, Ymax, tableHTML) {
    numTabs++;
    var title = "[" + Xmin + ", " + Xmax + "] by [" + Ymin + ", " + Ymax + "]";
  
    $("#table_tabs ul").append('<li><a href= "#' + numTabs + '">' + title + "</a><input type='checkbox'/><span class = 'ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>");
    $("#table_tabs").append("<div id='" + numTabs + "' ><p>" + tableHTML + "</p></div>");
    $("#table_tabs").tabs("refresh");
}

function closeAllTabs() {
    console.log("in closeAllTabs function");

    $("#table_tabs ul li").each(function () {
        var del = $(this).attr("aria-controls");
        if ($(this).find('input').prop("checked")) {
            $(this).remove();
            $("#" + del).remove();
            $("#table_tabs").tabs("refresh");
        }
    });
}