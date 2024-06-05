document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('job-application-form');
    const jobList = document.getElementById('job-list');

    const savedApplications = JSON.parse(localStorage.getItem('applications')) || [];
    savedApplications.forEach(application => addJobApplicationToList(application));

    function handleFormSubmit(event) {
        event.preventDefault();
        const jobTitle = document.getElementById('job-title').value;
        const company = document.getElementById('company').value;
        const deadline = document.getElementById('deadline').value;
        const status = document.getElementById('status').value;
        const newJobApplication = { jobTitle, company, deadline, status };
        addJobApplicationToList(newJobApplication);
        saveToLocalStorage(newJobApplication);
        form.reset(); 
    }

    function addJobApplicationToList(jobApplication) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${jobApplication.jobTitle}</strong> 
            - ${jobApplication.company} 
            <span class="status">${jobApplication.status}</span>
            <span class="deadline">${jobApplication.deadline}</span>
        `;
        li.addEventListener('click', function() {
            const status = prompt('Update status (applied, interview, offer, rejected):', jobApplication.status);
            if (status && status !== jobApplication.status) {
                jobApplication.status = status;
                li.querySelector('.status').textContent = status;
                saveToLocalStorage(jobApplication);
            }
        });
        jobList.appendChild(li);
    }

    function saveToLocalStorage(jobApplication) {
        const savedApplications = JSON.parse(localStorage.getItem('applications')) || [];
        savedApplications.push(jobApplication);
        localStorage.setItem('applications', JSON.stringify(savedApplications));
    }

    form.addEventListener('submit', handleFormSubmit);

    // New code for login and register
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const jobTrackerContent = document.getElementById('job-tracker-content');
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const logoutBtn = document.getElementById('logout-btn');

    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(user => user.username === username)) {
            alert('Username already exists!');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            loginSection.style.display = 'none';
            jobTrackerContent.style.display = 'flex';
            logoutBtn.style.display = 'block';
        } else {
            alert('Invalid Username/Password!\nTry Again');
        }
    });

    logoutBtn.addEventListener('click', () => {
        jobTrackerContent.style.display = 'none';
        loginSection.style.display = 'block';
        logoutBtn.style.display = 'none';
        document.getElementById('username').value = ''; 
        document.getElementById('password').value = ''; 
    });
});
