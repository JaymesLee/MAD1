function student(name, midterm, attendance, exam, homework) {

    var totalgrade = (midterm * 0.3) + (exam * 0.4) + (homework * 0.2) + (attendance * 0.1);
    totalgrade = totalgrade.toFixed(2);

    var grade;

    if (totalgrade >= 80) {
        grade = "A";

    }
    else if (totalgrade >= 70) {
        grade = "B";

    }
    else if (totalgrade >= 60) {
        grade = "C";

    }
    else if (totalgrade >= 50) {
        grade = "D";

    }
    else {
        grade = "F";
    }
    var student = {name :name, attendance : attendance, midterm : midterm, exam : exam, grade : grade, totalgrade : totalgrade, homework : homework};

    return student;
};

var table = [];
var inputs;


function submit() {
    var row = [];
    var subregex = /^\d+$/;
    var name = /^[^\&\<\>\\\*\%\:\!\"\#\$\(\)\+\;\=\@\[\]\{\}\~\^\|\`\n\t\r\d\/\?]{1,100}$/i;

    //alert('hi');
    inputs = document.getElementsByTagName("input");


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
    var Student = student(row[0] + " " + row[1], row[2], row[3], row[4], row[5]);
    table.push(Student);
    reset();
    average();
    orderData('asc');
};

function show() {
    if (table.length != 0) {
        var code = "<table><tr><th>Name</th><th>Midterm</th><th>Homework</th><th>Exam</th><th>Attendance</th><th>Total</th><th>Grade</th><th>Edit</th><th>Delete</th></tr>";


        for (var i = 0; i < table.length; i++) {
            code = code.concat("<tr><td>" + table[i].name + "</td><td>"
                + table[i].midterm + "</td><td>"
                + table[i].homework + "</td><td>"
                + table[i].exam + "</td><td>"
                + table[i].attendance + "</td><td>"
                + table[i].totalgrade + "</td><td>"
                + table[i].grade + "</td><td>"
                + "<input type='button' onclick='edit(" + i + ")' value='Edit'/></td><td>"
                +"<input type='button' onclick='deleteRow(" + i + ")' value='Delete'/></td></tr>");

        }

        code = code.concat("</table>");

        document.getElementById("table").innerHTML = code;
    } else {
        document.getElementById("table").innerHTML = "";
    }
   
};

function edit(row) {
    var n = table[row].name.split(" ");
    inputs[0].value = n[0];
    inputs[1].value = n[1];
    inputs[2].value = table[row].midterm;
    inputs[3].value = table[row].homework;
    inputs[4].value = table[row].exam;
    inputs[5].value = table[row].attendance;
    deleteRow(row);
};

function deleteRow(row) {
    table.splice(row, 1);
    show();
};

function orderData(type) {
    if (type == 'asc') {
        for (var i = 0; i < table.length - 1; i++) {
            var x = i + 1;
            if (table[i].totalgrade > table[x].totalgrade) {
                var temp = table[i];
                table[i] = table[x];
                table[x] = temp;
                i = -1;
            }
        }
    } else {
        for (var i = 0; i < table.length - 1; i++) {
            var x = i + 1;
            if (table[i].totalgrade < table[x].totalgrade) {
                var temp = table[i];
                table[i] = table[x];
                table[x] = temp;
                i = -1;
            }
        }
    }
    show();
};

function reset()
{
    for (var x = 0; x <= 5 ; x++) {
        inputs[x].value = "";
    }

}
    
function treset() {
    reset();
    table = "";
    show();
    average();
}

function average() {
        var total = 0;
        var i = 1;//so that 0/1 gives 0, instead of infinite
        if(table.length != 0)//check if it just loaded or have 0 rows
            for (i = 0; i < table.length; i++) {
                total += parseFloat(table[i].totalgrade);
            }
        document.getElementById("avg").innerHTML = (total / i).toFixed(2);
};

