let editIndex = -1;

document.addEventListener("DOMContentLoaded", displayStudents);

function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let course = document.getElementById("course").value;

    if (name === "" || email === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    let students = getStudents();

    if (editIndex === -1) {
        students.push({ name, email, course });
    } else {
        students[editIndex] = { name, email, course };
        editIndex = -1;
    }

    saveStudents(students);
    clearFields();
    displayStudents();
}

function displayStudents() {
    let students = getStudents();
    let list = document.getElementById("studentList");

    list.innerHTML = "";

    students.forEach((s, index) => {
        list.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.email}</td>
                <td>${s.course}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editStudent(index) {
    let students = getStudents();
    let s = students[index];

    document.getElementById("name").value = s.name;
    document.getElementById("email").value = s.email;
    document.getElementById("course").value = s.course;

    editIndex = index;
}

function deleteStudent(index) {
    let students = getStudents();
    students.splice(index, 1);

    saveStudents(students);
    displayStudents();
}

function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
}