const API_URL = "http://127.0.0.1:5000";

$(function () {
    const studentId = new URLSearchParams(window.location.search).get("id");

    if (!studentId) {
        alert("Student ID is missing");
        window.location.href = "student.html";
        return;
    }

    function getStudent() {
        $.ajax({
            url: `${API_URL}/students/${studentId}`,
            method: "GET",
            dataType: "json"
        })
            .done(function (student) {
                $("#name").val(student.name);
                $("#email").val(student.email);
                $("#course").val(student.course);
                $("#age").val(student.age);
            })
            .fail(function (xhr, status, error) {
                console.error(error);
                alert("Unable to load student");
            });
    }

    $("#updateStudentForm").on("submit", function (event) {
        event.preventDefault();

        const studentData = {
            name: $("#name").val(),
            email: $("#email").val(),
            course: $("#course").val(),
            age: Number($("#age").val())
        };

        $.ajax({
            url: `${API_URL}/students/${studentId}`,
            method: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(studentData)
        })
            .done(function (data) {
                alert(data.message || "Student updated successfully");
                window.location.href = "student.html";
            })
            .fail(function (xhr, status, error) {
                console.error(error);
                alert("Unable to update student");
            });
    });

    getStudent();
});

function goBack() {
    window.location.href = "student.html";
}
