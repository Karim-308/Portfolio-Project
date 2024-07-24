// Function to get the query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch and display the project details
function displayProjectDetails() {
    const projectId = getQueryParam('id');
    fetch('data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const project = projects.find(p => p.id === projectId);
            if (project) {

                document.getElementById('project-image').src = project.image;
                document.getElementById('project-image').alt = project.title + " Image";
                document.getElementById('project-image').className = "project-img";

                // Set the project name
                document.getElementById('project-name').textContent = project.title;

                // Set the description
                document.getElementById('project-description').textContent = project.description;

                 // Set the contributors
                document.getElementById('project-contributors').textContent = project.contributors;

                // Set the project date
                document.getElementById('project-date').textContent = project.date || 'Date not provided';

                // Set the GitHub link if available
                const githubLink = document.getElementById('project-github');
                if (project.githubUrl) {
                    githubLink.href = project.githubUrl;
                    githubLink.textContent = 'Check it on GitHub';
                } else {
                    githubLink.style.display = 'none'; // Hide if no URL
                }
            } else {
                document.getElementById('project-details-container').textContent = 'Project not found.';
            }
        })
        .catch(error => console.error('Failed to load project details:', error));
}

// Load project details when the page loads
window.onload = displayProjectDetails;
