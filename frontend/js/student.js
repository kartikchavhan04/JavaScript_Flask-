// =====================================================
// BACKEND URL
// =====================================================

const API_URL = "http://127.0.0.1:5000";


// =====================================================
// GET ALL STUDENTS
// =====================================================

function getStudents() {

    fetch(`${API_URL}/students`)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to fetch students"
                );

            }

            return response.json();

        })

        .then(students => {

            const tableBody =
                document.getElementById(
                    "studentTableBody"
                );


            // Clear old table

            tableBody.innerHTML = "";


            // Add students

            students.forEach(student => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${student.id}
                    </td>

                    <td>
                        ${student.name}
                    </td>

                    <td>
                        ${student.email}
                    </td>

                    <td>
                        ${student.course}
                    </td>

                    <td>
                        ${student.age}
                    </td>

                    <td>

                        <button
                            class="update-btn"
                            onclick="updateStudent(${student.id})"
                        >
                            Update
                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteStudent(${student.id})"
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

            alert(
                "Unable to load students"
            );

        });
}


// =====================================================
// ADD STUDENT
// =====================================================

document
    .getElementById("studentForm")
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


            const course =
                document.getElementById(
                    "course"
                ).value;


            const age =
                document.getElementById(
                    "age"
                ).value;


            const studentData = {

                name: name,

                email: email,

                course: course,

                age: Number(age)

            };


            fetch(
                `${API_URL}/students`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            studentData
                        )

                }
            )

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Failed to create student"
                    );

                }

                return response.json();

            })

            .then(data => {

                alert(
                    data.message ||
                    "Student created successfully"
                );


                document
                    .getElementById(
                        "studentForm"
                    )
                    .reset();


                getStudents();

            })

            .catch(error => {

                console.error(error);

                alert(
                    "Unable to create student"
                );

            });

        }
    );


// =====================================================
// OPEN UPDATE PAGE
// =====================================================

function updateStudent(id) {

    window.location.href =
        `student-update.html?id=${id}`;

}


// =====================================================
// DELETE STUDENT
// =====================================================

function deleteStudent(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {

        return;

    }


    fetch(
        `${API_URL}/students/${id}`,
        {

            method: "DELETE"

        }
    )

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to delete student"
            );

        }

        return response.json();

    })

    .then(data => {

        alert(
            data.message ||
            "Student deleted successfully"
        );


        getStudents();

    })

    .catch(error => {

        console.error(error);

        alert(
            "Unable to delete student"
        );

    });

}


// =====================================================
// LOAD STUDENTS
// =====================================================

getStudents();