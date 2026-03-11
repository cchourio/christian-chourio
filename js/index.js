// Footer generation script
const today = new Date();
const thisYear = today.getFullYear();
const footerElement = document.createElement('footer');
const copyrightText = `&copy; ${thisYear} Christian Chourio. All rights reserved.`;

// Skills
const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MySQL', 'Git'];
const skillsSection = document.querySelector('#skills ul');
skills.forEach(skill => {
    const skillItem = document.createElement('li');
    skillItem.textContent = skill;
    skillsSection.appendChild(skillItem);
});

footerElement.classList.add('footer');
footerElement.innerHTML = `
    <p>${copyrightText}</p>
`;
document.body.appendChild(footerElement);

// Contact form handling
const messageForm = document.querySelector('form[name="leave_message"]');

// Creating a Promise
function fakeRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "Message sent successfully!";
            resolve(data);
        }, 1000);
    });
}

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = messageForm.name.value;
    const email = messageForm.email.value;
    const message = messageForm.message.value;

    console.log(`Message from ${name} (${email}): ${message}`);

    // Using the Promise
    fakeRequest().then((result) => {
        console.log("Promise resolved with data:", result);
        
        const messageSection = document.querySelector('#messages');
        const messagesList = messageSection.querySelector('ul');
        const newMessage = document.createElement('li');
        
        newMessage.innerHTML = `<a href="mailto:${email}">${name}</a>: <span>${message}</span>`;
        
        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.innerText = 'remove';
        removeButton.type = 'button';
        
        // Add click event listener to remove button
        removeButton.addEventListener('click', function() {
            const entry = removeButton.parentNode;
            entry.remove();
        });
        
        newMessage.appendChild(removeButton);
        messagesList.appendChild(newMessage);
    }).catch((error) => {
        console.error("Something went wrong:", error);
    });

    // Clear the form
    messageForm.reset();

});

// Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub username
const GITHUB_USERNAME = 'cchourio';

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
  .then(response => response.json())
  .then(repositories => {
    console.log(repositories); // See the data in the console

    // Display repositories in the Projects section
    const projectSection = document.getElementById('projects');
    const projectList = projectSection.querySelector('ul');

    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement('li');
      project.innerText = repositories[i].name;
      projectList.appendChild(project);
    }
  })
  .catch(error => {
    console.error('Error fetching repositories:', error);
    const projectSection = document.getElementById('projects');
    projectSection.innerText = 'Unable to load projects. Please try again later.';
  });

  // Second fetch: GitHub User Profile Stats
fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
  .then(response => response.json())
  .then(user => {
    console.log('GitHub user data:', user);

    const statsContainer = document.getElementById('stats-container');

    const stats = [
      { label: 'Public Repos', value: user.public_repos },
      { label: 'Followers', value: user.followers },
      { label: 'Following', value: user.following },
    ];

    stats.forEach(stat => {
      const card = document.createElement('div');
      card.classList.add('stat-card');
      card.innerHTML = `<h3>${stat.value}</h3><p>${stat.label}</p>`;
      statsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching GitHub profile:', error);
  });