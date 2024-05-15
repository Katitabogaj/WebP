const url = "https://vvri.pythonanywhere.com/api/courses";

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#course-list')) {
        fetchCourses();
    }
    if (document.querySelector('#add-course-form')) {
        document.querySelector('#add-course-form').addEventListener('submit', addCourse);
    }
    if (document.querySelector('#add-student-form')) {
        document.querySelector('#add-student-form').addEventListener('submit', addStudentToCourse);
    }
    if (document.querySelector('#student-list') && !document.querySelector('#course-name')) {
        fetchStudents();
    }
    if (document.querySelector('#edit-student-form')) {
        document.querySelector('#edit-student-form').addEventListener('submit', editStudent);
    }
    if (document.querySelector('#delete-student-form')) {
        document.querySelector('#delete-student-form').addEventListener('submit', deleteStudent);
    }
});

function fetchCourses() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const courseList = document.querySelector('#course-list');
        data.forEach(course => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="course.html?id=${course.id}">${course.name}</a>`;
            courseList.appendChild(li);
        });
    })
    .catch(error => console.log("Hiba történt: " + error));
}

function fetchCourse(courseId) {
    fetch(`${url}/${courseId}`)
    .then(response => response.json())
    .then(course => {
        document.querySelector('#course-name').innerText = course.name;
        const studentList = document.querySelector('#student-list');
        course.students.forEach(student => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="student.html?id=${student.id}">${student.name}</a>`;
            studentList.appendChild(li);
        });
    })
    .catch(error => console.log("Hiba történt: " + error));
}

function addCourse(event) {
    event.preventDefault();
    const courseName = document.querySelector('#course-name').value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: courseName })
    })
    .then(response => response.json())
    .then(() => {
        window.location.href = 'index.html';
    })
    .catch(error => console.log("Hiba történt: " + error));
}

function addStudentToCourse(event) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id');
    const studentName = document.querySelector('#student-name').value;
    const studentEmail = document.querySelector('#student-email').value;
    fetch(`${url}/${courseId}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: studentName, email: studentEmail })
    })
    .then(response => response.json())
    .then(() => {
        window.location.href = `course.html?id=${courseId}`;
    })
    .catch(error => console.log("Hiba történt: " + error));
}

function fetchStudents() {
    fetch('https://vvri.pythonanywhere.com/api/students')
    .then(response => response.json())
    .then(data => {
        const studentList = document.querySelector('#student-list');
        data.forEach(student => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="student.html?id=${student.id}">${student.name}</a>`;
            studentList.appendChild(li);
        });
    })
    .catch(error => console.log("Hiba történt: " + error));
}

function fetchStudent(studentId) {
    fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`)
    .then(response => response.json())
    .then(student => {
        document.querySelector('#student-name').innerText = student.name;
        document.querySelector('#student-email').innerText = student.email;
    })
    .catch(error => console.log("Hiba történt: " + error));
}

function editStudent(event) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const studentId = params.get('id');
    const studentName = document.querySelector('#student-name').value;
    const studentEmail = document.querySelector('#student-email').value;
    fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: studentName, email: studentEmail })
    })
    .then(() => {
        window.location.href = `student.html?id=${studentId}`;
    })
    .catch(error => console.log("Hiba történt: " + error));
}

function deleteStudent(event) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const studentId = params.get('id');
    fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`, {
        method: 'DELETE'
    })
    .then(() => {
        window.location.href = 'students.html';
    })
    .catch(error => console.log("Hiba történt: " + error));
}