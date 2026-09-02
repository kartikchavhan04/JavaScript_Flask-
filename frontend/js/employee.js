const API_URL = "http://127.0.0.1:5000";

function getEmployees() {
    $.ajax({
        url: `${API_URL}/employees`,
        method: "GET",
        dataType: "json"
    })
        .done(function (employees) {
            const tableBody = $("#employeeTableBody").empty();

            employees.forEach(function (employee) {
                tableBody.append(`
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.email}</td>
                        <td>${employee.salary}</td>
                        <td>
                            <button class="update-btn" onclick="updateEmployee(${employee.id})">Update</button>
                            <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
                        </td>
                    </tr>
                `);
            });
        })
        .fail(function (xhr, status, error) {
            console.error(error);
            alert("Unable to load employees");
        });
}

$(function () {
    $("#employeeForm").on("submit", function (event) {
        event.preventDefault();

        const employeeData = {
            name: $("#name").val(),
            email: $("#email").val(),
            salary: Number($("#salary").val())
        };

        $.ajax({
            url: `${API_URL}/employees`,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(employeeData)
        })
            .done(function (data) {
                alert(data.message || "Employee created successfully");
                $("#employeeForm")[0].reset();
                getEmployees();
            })
            .fail(function (xhr, status, error) {
                console.error(error);
                alert("Unable to create employee");
            });
    });

    getEmployees();
});

function updateEmployee(id) {
    window.location.href = `employee-update.html?id=${id}`;
}

function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    $.ajax({
        url: `${API_URL}/employees/${id}`,
        method: "DELETE",
        dataType: "json"
    })
        .done(function (data) {
            alert(data.message || "Employee deleted successfully");
            getEmployees();
        })
        .fail(function (xhr, status, error) {
            console.error(error);
            alert("Unable to delete employee");
        });
}
