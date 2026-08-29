// =====================================================
// BACKEND URL
// =====================================================

const API_URL = "http://127.0.0.1:5000";


// =====================================================
// GET STUDENT ID FROM URL
// =====================================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const studentId =
    urlParams.get("id");


// =====================================================
// CHECK STUDENT ID
// =====================================================

if (!studentId) {

    alert("Student ID is missing");

    window.location.href =
        "student.html";

}


// =====================================================
// GET STUDENT BY ID
// =====================================================

function getStudent() {

    fetch(
        `${API_URL}/students/${studentId}`
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Student not found"
                );

            }

            return response.json();

        })

        .then(student => {


            // Put existing data into form

            document.getElementById("name").value =
                student.name;


            document.getElementById("email").value =
                student.email;


            document.getElementById("course").value =
                student.course;


            document.getElementById("age").value =
                student.age;

        })

        .catch(error => {

            console.error(error);

            alert(
                "Unable to load student"
            );

        });
}


// =====================================================
// UPDATE STUDENT
// =====================================================

document
    .getElementById("updateStudentForm")
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
                `${API_URL}/students/${studentId}`,
                {

                    method: "PUT",

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
                        "Failed to update student"
                    );

                }

                return response.json();

            })

            .then(data => {

                alert(
                    data.message ||
                    "Student updated successfully"
                );


                // Go back to student table

                window.location.href =
                    "student.html";

            })

            .catch(error => {

                console.error(error);

                alert(
                    "Unable to update student"
                );

            });

        }
    );


// =====================================================
// CANCEL
// =====================================================

function goBack() {

    window.location.href =
        "student.html";

}


// =====================================================
// LOAD EXISTING STUDENT
// =====================================================

getStudent();