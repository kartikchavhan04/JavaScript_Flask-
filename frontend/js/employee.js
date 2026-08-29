// =====================================================
// BACKEND URL
// =====================================================

const API_URL = "http://127.0.0.1:5000";


// =====================================================
// GET ALL EMPLOYEES
// =====================================================

function getEmployees() {

    fetch(`${API_URL}/employees`)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to fetch employees"
                );

            }

            return response.json();

        })

        .then(employees => {

            const tableBody =
                document.getElementById(
                    "employeeTableBody"
                );


            // Clear old table data

            tableBody.innerHTML = "";


            // Add employees to table

            employees.forEach(employee => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${employee.id}
                    </td>

                    <td>
                        ${employee.name}
                    </td>

                    <td>
                        ${employee.email}
                    </td>

                    <td>
                        ${employee.salary}
                    </td>

                    <td>

                        <button
                            class="update-btn"
                            onclick="updateEmployee(${employee.id})"
                        >
                            Update
                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteEmployee(${employee.id})"
                        >
                            Delete
                        </button>

                    </td>

                `;


                tableBody.appendChild(row);

            });

        })

        .catch(error => {

            console.error(error);

            alert("Unable to load employees");

        });
}


// =====================================================
// ADD EMPLOYEE
// =====================================================

document
    .getElementById("employeeForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value;


            const email =
                document.getElementById("email").value;


            const salary =
                document.getElementById("salary").value;


            const employeeData = {

                name: name,

                email: email,

                salary: Number(salary)

            };


            fetch(`${API_URL}/employees`, {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(employeeData)

            })

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Failed to create employee"
                    );

                }

                return response.json();

            })

            .then(data => {

                alert(
                    data.message ||
                    "Employee created successfully"
                );


                document
                    .getElementById("employeeForm")
                    .reset();


                getEmployees();

            })

            .catch(error => {

                console.error(error);

                alert(
                    "Unable to create employee"
                );

            });

        }
    );


// =====================================================
// OPEN UPDATE PAGE
// =====================================================

function updateEmployee(id) {

    window.location.href =
        `employee-update.html?id=${id}`;

}


// =====================================================
// DELETE EMPLOYEE
// =====================================================

function deleteEmployee(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this employee?"
        );


    if (!confirmDelete) {

        return;

    }


    fetch(`${API_URL}/employees/${id}`, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to delete employee"
            );

        }

        return response.json();

    })

    .then(data => {

        alert(
            data.message ||
            "Employee deleted successfully"
        );


        getEmployees();

    })

    .catch(error => {

        console.error(error);

        alert(
            "Unable to delete employee"
        );

    });

}


// =====================================================
// LOAD EMPLOYEES
// =====================================================

getEmployees();