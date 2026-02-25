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