

function init() {

    setupExperiment();

    addProjects();

    var main = document.getElementById('main');
    main.style.opacity = '1';

    update();
}

function update() {

    if (experiment) {
        experiment.update();
    }

    requestAnimationFrame(update);
}


function addProjects() {
    var l = experiments.length;
    var projects = document.getElementById('projects');

    for (var i=0; i<l; i++) {
        var exp = experiments[i];
        var project = document.createElement('a');
        project.classList = 'project';
        project.setAttribute('href', baseUrl + exp.url);

        var title = document.createElement('div');
        title.innerHTML = exp.title;
        title.classList = 'projectTitle';

        var description = document.createElement('div');
        description.innerHTML = exp.description;
        description.classList = 'projectDescription';

        var button = document.createElement('div');
        button.innerHTML = 'Launch';
        button.classList = 'projectButton';

        projects.appendChild(project);
        project.appendChild(title);
        project.appendChild(description);
        project.appendChild(button);
    }
}
