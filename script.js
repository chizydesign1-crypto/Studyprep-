
// STUDYPREP JAVASCRIPT

// ===================================
// 0. STUDYPREP STORAGE SYSTEM
// ===================================

let storageAvailable = false;

try {
    localStorage.setItem("storageTest", "working");
    localStorage.removeItem("storageTest");
    storageAvailable = true;
} catch (error) {
    console.log("Storage is unavailable in this browser.");
}

// 1. Display a welcome message
const getStartedButton = document.querySelector(".signup-btn");

if (getStartedButton) {
    getStartedButton.addEventListener("click", function(event) {
        event.preventDefault();
        alert("Welcome to StudyPrep! Your learning journey starts here.");
    });
}

// 2. Toggle password visibility
function togglePassword(inputId, button) {
    const passwordInput = document.getElementById(inputId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        button.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        button.textContent = "👁";
    }
}

// ===================================
// 3. STUDYPREP STUDENT REGISTRATION
// ===================================

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {

    registrationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password.length < 8) {
            alert("Your password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Your passwords do not match.");
            return;
        }

        const selectedSubjects = Array.from(
            document.querySelectorAll('input[name="subjects"]:checked')
        ).map(subject => subject.value);

        const selectedExams = Array.from(
            document.querySelectorAll('input[name="exams"]:checked')
        ).map(exam => exam.value);

        if (selectedSubjects.length === 0) {
            alert("Please select your subjects.");
            return;
        }

        if (selectedExams.length === 0) {
            alert("Please select your examination goal.");
            return;
        }

        const studentData = {
            fullName: document.getElementById("fullname").value.trim(),
            email: document.getElementById("email").value.trim(),
            studentClass: document.getElementById("studentClass").value,
            department: document.getElementById("department").value,
            subjects: selectedSubjects,
            examinations: selectedExams
        };

        if (!storageAvailable) {
            alert("Please open StudyPrep in a browser that supports website storage.");
            return;
        }

        try {

            localStorage.setItem(
                "studyPrepStudent",
                JSON.stringify(studentData)
            );

            window.location.href = "dashboard.html";

        } catch (error) {
            alert("Unable to save your registration. Please try again.");
            console.log(error);
        }

    });

}

// ===================================
// 4. STUDYPREP SUBJECT SELECTION
// ===================================

const departmentSelect = document.getElementById("department");
const subjectsSection = document.getElementById("subjectsSection");
const subjectsList = document.getElementById("subjectsList");

// Subjects for each department
const departmentSubjects = {

    Science: [
        "English Language",
        "Mathematics",
        "Biology",
        "Chemistry",
        "Physics",
        "Geography",
        "Further Mathematics",
        "Agricultural Science",
        "Computer Studies",
        "Marketing",
        "Civic Education",
        "Igbo Language"
    ],

    Arts: [
        "English Language",
        "Mathematics",
        "Literature in English",
        "Government",
        "Economics",
        "Christian Religious Studies (CRS)",
        "Islamic Religious Studies (IRS)",
        "History",
        "Geography",
        "Visual Arts",
        "Civic Education",
        "Igbo Language"
    ],

    Commercial: [
        "English Language",
        "Mathematics",
        "Economics",
        "Government",
        "Commerce",
        "Financial Accounting",
        "Business Studies",
        "Computer Studies",
        "Civic Education",
        "Igbo Language"
    ]

};

// Listen for department selection
if (departmentSelect && subjectsSection && subjectsList) {

    departmentSelect.addEventListener("change", function() {

        const selectedDepartment = departmentSelect.value;

        subjectsList.innerHTML = "";

        if (!selectedDepartment || !departmentSubjects[selectedDepartment]) {
            subjectsSection.style.display = "none";
            return;
        }

        subjectsSection.style.display = "block";

        const subjects = departmentSubjects[selectedDepartment];

        subjects.forEach(function(subject) {

            const label = document.createElement("label");
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.name = "subjects";
            checkbox.value = subject;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + subject));

            subjectsList.appendChild(label);

        });

    });

}

// ===================================
// 5. STUDYPREP DASHBOARD AVATAR SYSTEM
// ===================================

const avatarOptions = document.querySelectorAll(".avatar-option");
const avatarMessage = document.getElementById("avatarMessage");
const studentProfile = document.querySelector(".student-profile");

// Retrieve saved avatar
let savedAvatar = null;

if (storageAvailable) {
    try {
        savedAvatar = localStorage.getItem("studyPrepAvatar");
    } catch (error) {
        console.log("Unable to retrieve saved avatar.");
    }
}

// Display saved avatar
if (savedAvatar && studentProfile) {

    studentProfile.textContent = savedAvatar;

    avatarOptions.forEach(function(option) {

        if (option.dataset.avatar === savedAvatar) {
            option.classList.add("selected");
        }

    });

    if (avatarMessage) {
        avatarMessage.textContent = "Your avatar is selected!";
    }

}

// Avatar selection
avatarOptions.forEach(function(option) {

    option.addEventListener("click", function(event) {

        event.preventDefault();

        const chosenAvatar = option.dataset.avatar;

        avatarOptions.forEach(function(item) {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        if (studentProfile) {
            studentProfile.textContent = chosenAvatar;
        }

        if (storageAvailable) {
            try {
                localStorage.setItem("studyPrepAvatar", chosenAvatar);
            } catch (error) {
                console.log("Avatar could not be saved permanently.");
            }
        }

        if (avatarMessage) {
            avatarMessage.textContent = "Avatar selected successfully!";
        }

    });

});

// ===================================
// 6. STUDYPREP DASHBOARD STUDENT DATA
// ===================================

const displayName = document.getElementById("displayName");

if (displayName && storageAvailable) {

    try {

        const savedStudent = localStorage.getItem("studyPrepStudent");

        if (savedStudent) {

            const student = JSON.parse(savedStudent);

            document.getElementById("displayName").textContent =
                student.fullName;

            document.getElementById("displayEmail").textContent =
                student.email;

            document.getElementById("displayClass").textContent =
                student.studentClass;

            document.getElementById("displayDepartment").textContent =
                student.department;

            document.getElementById("displayExams").textContent =
                student.examinations.join(", ");

            const subjectsContainer =
                document.getElementById("displaySubjects");

            subjectsContainer.innerHTML = "";

            student.subjects.forEach(function(subject) {

                const subjectItem = document.createElement("p");

                subjectItem.textContent = "✓ " + subject;

                subjectsContainer.appendChild(subjectItem);

            });

            const welcomeHeading =
                document.querySelector(".welcome-section h2");

            if (welcomeHeading) {
                welcomeHeading.textContent =
                    "Welcome, " + student.fullName + "!";
            }

        }

    } catch (error) {

        console.log("Unable to retrieve student information:", error);

    }

}
