const projects = [
    {
        title: "SPX Options Trading Strategy",
        image: "images/ctc.png",
        description: "Python-based trading strategy for European-style SPX options",
        overview: "Analyzed SPX options data (including bid/ask prices, timestamps, and strike prices) with pandas to build a robust hedging strategy aimed at achieving consistent performance across varying market conditions. Utilized Matplotlib for performance visualization and Jupyter Notebook for backtesting. Attained a total return of 123% and maximum drawdown of 0.19 using the sample dataset",
        technologies: ["Python", "pandas", "Matplotlib", "Jupyter Notebook"],
        links: [["Github", "https://github.com/gpu314/CTC-2024-Derivatives"]]
    },
    {
        title: "Artificially Intelligent and Automated Companion",
        image: "images/aiac.png",
        description: "AI-powered stuffed animal therapeutic companion.",
        overview: "Designed and implemented text response generation powered by Meta’s Llama3 8B via the GroqCloud API. Developed text-to-speech synthesis through the ElevenLabs API. Created and executed 100% code coverage test cases for output pipeline components. Synchronized motor movements and LED colours with the dominant emotion",
        technologies: ["Python", "GroqCloud API", "ElevenLabs API", "Raspberry Pi"],
        links: [["Github", "https://github.com/gpu314/aiac"]]
    },
    {
        title: "Running Route Generator",
        image: "images/wrab.png",
        description: "HTML/CSS/Javascript-based running route generator using the TomTom API",
        overview: "Implemented a route generation feature that generated pathways for runners given start and end points. Created a round-trip route generation feature given the user-inputted starting point and desired distance, using the Haversine Formula and Spherical Law of Cosines to compute accurate great-circle distances. Added an interactive feature to set points by clicking on the map instead of manual latitude/longitude entry",
        technologies: ["HTML", "CSS", "Javascript", "TomTom API"],
        links: [["Github", "https://github.com/acise03/WRAB"]]
    },
];

window.onload = function () {
    const projectsContainer = document.querySelector('#projects .row');

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('col-md-4');

        projectCard.innerHTML = `
            <div class="card" data-toggle="modal" data-target="#projectModal${index}">
                <img src="${project.image}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>
        `;

        projectsContainer.appendChild(projectCard);

        const modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.id = `projectModal${index}`;
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', `projectModalLabel${index}`);
        modal.setAttribute('aria-hidden', 'true');

        modal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="projectModalLabel${index}">${project.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h6>Project Overview</h6>
                        <p>${project.overview}</p>
                        <h6>Technologies Used</h6>
                        <ul>
                            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                        <h6>Links</h6>
                        <ul>
                            ${project.links.map(link => `<li><a href=${link[1]}>${link[0]}</a></li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    });
};
