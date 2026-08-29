// =====================================================
// BACKEND URL
// =====================================================

const API_URL = "http://127.0.0.1:5000";


// =====================================================
// GET EMPLOYEE ID FROM URL
// =====================================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const employeeId =
    urlParams.get("id");


// =====================================================
// CHECK EMPLOYEE ID
// =====================================================

if (!employeeId) {

    alert("Employee ID is missing");

    window.location.href =
        "employee.html";

}


// =====================================================
// GET EMPLOYEE BY ID
// =====================================================

function getEmployee() {

    fetch(
        `${API_URL}/employees/${employeeId}`
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Employee not found"
                );

            }

            return response.json();

        })

        .then(employee => {


            // Put existing data into form

            document.getElementById("name").value =
                employee.name;


            document.getElementById("email").value =
                employee.email;


            document.getElementById("salary").value =
                employee.salary;

        })

        .catch(error => {

            console.error(error);

            alert(
                "Unable to load employee"
            );

        });
}


// =====================================================
// UPDATE EMPLOYEE
// =====================================================

document
    .getElementById("updateEmployeeForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value;


            const email =
                document.getElementById(
                    "email"
                ).value;


            const salary =
                document.getElementById(
                    "salary"
                ).value;


            const employeeData = {

                name: name,

                email: email,

                salary: Number(salary)

            };


            fetch(
                `${API_URL}/employees/${employeeId}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            employeeData
                        )

                }
            )

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Failed to update employee"
                    );

                }

                return response.json();

            })

            .then(data => {

                alert(
                    data.message ||
                    "Employee updated successfully"
                );


                // Go back to employee table

                window.location.href =
                    "employee.html";

            })

            .catch(error => {

                console.error(error);

                alert(
                    "Unable to update employee"
                );

            });

        }
    );


// =====================================================
// CANCEL
// =====================================================

function goBack() {

    window.location.href =
        "employee.html";

}


// =====================================================
// LOAD EXISTING EMPLOYEE
// =====================================================

getEmployee();