const API_URL = "http://127.0.0.1:5000";

function getStudents() {
    $.ajax({
        url: `${API_URL}/students`,
        method: "GET",
        dataType: "json"
    })
        .done(function (students) {
            const tableBody = $("#studentTableBody").empty();

            students.forEach(function (student) {
                tableBody.append(`
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.course}</td>
                        <td>${student.age}</td>
                        <td>
                            <button class="update-btn" onclick="updateStudent(${student.id})">Update</button>
                            <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    </tr>
                `);
            });
        })
        .fail(function (xhr, status, error) {
            console.error(error);
            alert("Unable to load students");
        });
}

$(function () {
    $("#studentForm").on("submit", function (event) {
        event.preventDefault();

        const studentData = {
            name: $("#name").val(),
            email: $("#email").val(),
            course: $("#course").val(),
            age: Number($("#age").val())
        };

        $.ajax({
            url: `${API_URL}/students`,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(studentData)
        })
            .done(function (data) {
                alert(data.message || "Student created successfully");
                $("#studentForm")[0].reset();
                getStudents();
            })
            .fail(function (xhr, status, error) {
                console.error(error);
                alert("Unable to create student");
            });
    });

    getStudents();
});

function updateStudent(id) {
    window.location.href = `student-update.html?id=${id}`;
}

function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    $.ajax({
        url: `${API_URL}/students/${id}`,
        method: "DELETE",
        dataType: "json"
    })
        .done(function (data) {
            alert(data.message || "Student deleted successfully");
            getStudents();
        })
        .fail(function (xhr, status, error) {
            console.error(error);
            alert("Unable to delete student");
        });
}
