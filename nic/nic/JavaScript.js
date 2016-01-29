var table = [];
function submit() {
    var row = [];
    var subregex = /^\d+$/;
    var name = /^[^\&\<\>\\\*\%\:\!\"\#\$\(\)\+\;\=\@\[\]\{\}\~\^\|\`\n\t\r\d\/\?]{1,100}$/i;

    //alert('hi');
    var inputs = document.getElementsByTagName("input");


    for (var x = 0; x <= 5 ; x++) {
        if (x <= 1) {
            if (!inputs[x].value.match(name)) {
                alert('Please enter a proper name');
                return;
            } else {
                row.push(inputs[x].value);
            }
        } else {
            if (inputs[x].value.match(subregex) && inputs[x].value >= 0 && inputs[x].value <= 100) {
                if (inputs[x] != "" && (inputs[x].type == "text" || inputs[x].type == "number")) {
                    row.push(inputs[x].value);
                }
            } else {
                alert('Please enter a proper ' + inputs[x].id + ' score');
                return;
            }
        }

    }
    table.push(row);
    for (var x = 0; x <= 5 ; x++) {
        inputs[x].value = "";
    }
};

function show() {
    var code = "<table><tr><th>Name</th><th>Midterm</th><th>Homework</th><th>Exam</th><th>Attendance</th><th>Total</th></tr>";

    
    for (var i = 0; i < table.length; i++) {
        var totalgrade = (table[i][2] * 0.3) + (table[i][4] * 0.4) + (table[i][3] * 0.2) + (table[i][5] * 0.1);
        totalgrade = totalgrade.toFixed(2);
        table[i].push(totalgrade);
        code = code.concat("<tr><td>" + table[i][0] + " " + table[i][1] + "</td><td>" + table[i][2] + "</td><td>" + table[i][3] + "</td><td>" + table[i][4] + "</td><td>" + table[i][5] + "</td><td>" + table[i][6] + "</td></tr>");
    }
    code = code.concat("</table>");

        document.getElementById("table").innerHTML = code;

       


   
};

