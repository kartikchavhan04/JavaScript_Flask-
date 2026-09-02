const API_URL = "http://127.0.0.1:5000";
$(function () {
    const employeeId = new URLSearchParams(window.location.search).get("id");

    if (!employeeId) {
        alert("Employee ID is missing");
        window.location.href = "employee.html";
        return;
    }

    function getEmployee() {
        $.ajax({
            url: `${API_URL}/employees/${employeeId}`,
            method: "GET",
            dataType: "json"
        })
            .done(function (employee) {
                $("#name").val(employee.name);
                $("#email").val(employee.email);
                $("#salary").val(employee.salary);
            })
            .fail(function (xhr, status, error) {
                console.error(error);
                alert("Unable to load employee");
            });
    }

    $("#updateEmployeeForm").on("submit", function (event) {
        event.preventDefault();

        const employeeData = {
            name: $("#name").val(),
            email: $("#email").val(),
            salary: Number($("#salary").val())
        };

        $.ajax({
            url: `${API_URL}/employees/${employeeId}`,
            method: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(employeeData)
        })
            .done(function (data) {
                alert(data.message || "Employee updated successfully");
                window.location.href = "employee.html";
            })
            .fail(function (xhr, status, error) {
                console.error(error);
                alert("Unable to update employee");
            });
    });

    getEmployee();
});

function goBack() {
    window.location.href = "employee.html";
}
