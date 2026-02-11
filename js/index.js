// Footer generation script
const today = new Date();
const thisYear = today.getFullYear();
const footerElement = document.createElement('footer');
const copyrightText = `&copy; ${thisYear} Christian Chourio. All rights reserved.`;

// Skills
const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MySQL', 'Git'];
const skillsSection = document.querySelector('#skills ul');
const skillsList = document.createElement('li');
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