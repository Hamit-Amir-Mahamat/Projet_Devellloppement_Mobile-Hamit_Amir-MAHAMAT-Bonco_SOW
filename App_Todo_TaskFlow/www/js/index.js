$(document).ready(function () {

    let listeTaches = [];
    let filtreActuel = 'all';
    let cleSession = '';
    let indexEnModification = -1;   

    
    function dateDuJour() {
        let d = new Date();
        let mois = String(d.getMonth() + 1).padStart(2, '0');
        let jour = String(d.getDate()).padStart(2, '0');
        return d.getFullYear() + '-' + mois + '-' + jour;
    }

    function definirDateMin() {
        $('#taskDate').attr('min', dateDuJour());
    }
    definirDateMin();

    $('#footerYear').text(new Date().getFullYear());

    $('#loginBtn').on('click', function (e) {
        e.preventDefault();

        let user = $('#userName').val().trim();
        if (user === "") {
            alert("Veuillez saisir votre nom pour vous connecter.");
            return;
        }

        cleSession = 'taskflow_db_' + user.toLowerCase();
        $('#userNameDisplay').text(user);
        $('#userAvatar').text(user.charAt(0).toUpperCase());

        definirDateMin();
        chargerDonnees();
        allerVersPage('#todo-page');
    });

    $('#userName').on('keypress', function (e) {
        if (e.which === 13) { $('#loginBtn').click(); }
    });

    $('#logoutBtn').on('click', function (e) {
        e.preventDefault();
        listeTaches = [];
        cleSession = '';
        $('#userName').val('');
        reinitialiserFormulaire();
        allerVersPage('#login-page');
    });

    function allerVersPage(page) {
        try {
            $(":mobile-pagecontainer").pagecontainer("change", page, {
                transition: "fade",
                changeHash: false
            });
        } catch (err) {
            $('.ui-page').hide();
            $(page).show();
        }
    }


    $('.filter-btn').on('click', function (e) {
        e.preventDefault();
        filtreActuel = $(this).data('filter');
        $('.filter-btn').removeClass('ui-btn-active');
        $(this).addClass('ui-btn-active');
        afficherTaches();
    });

    function chargerDonnees() {
        let data = localStorage.getItem(cleSession);
        listeTaches = data ? JSON.parse(data) : [];
        afficherTaches();
    }

    function sauvegarder() {
        localStorage.setItem(cleSession, JSON.stringify(listeTaches));
        afficherTaches();
    }

    function afficherTaches() {
        let $list = $('#taskList');
        $list.empty();
        let visibles = 0;

        listeTaches.forEach(function (tache, index) {
            if (filtreActuel === 'active' && tache.done) return;
            if (filtreActuel === 'completed' && !tache.done) return;

            visibles++;
            let textClass = tache.done ? 'task-completed-text' : '';
            let coche = tache.done ? '☑' : '☐';
            let dateHtml = tache.date
                ? `<span class="task-date">📅 ${tache.date}</span>`
                : '';

            let item = `
                <li class="task-item">
                    <div class="task-row">
                        <span class="toggle-task" data-id="${index}">
                            <span class="task-check">${coche}</span>
                            <span class="task-text ${textClass}">${echapper(tache.text)}</span>
                            ${dateHtml}
                       </span>
                        <span class="task-actions">
                            <a href="#" class="edit-task" data-id="${index}" title="Modifier">
                                <svg xmlns="http://w3.org" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                </svg>
                            </a>
                            <!-- Icône Supprimer (Poubelle moderne) -->
                            <a href="#" class="delete-task" data-id="${index}" title="Supprimer">
                                <svg xmlns="http://w3.org" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                            </a>
                        </span>
                    </div>
                </li>`;
            $list.append(item);
        });

        if (visibles === 0) {
            $list.append('<li class="empty-state">Aucune tâche à afficher.</li>');
        }

        if ($list.hasClass('ui-listview')) {
            $list.listview('refresh');
        } else {
            $list.listview();
        }

        majProgression();
    }

    function majProgression() {
        let total = listeTaches.length;
        let faites = listeTaches.filter(function (t) { return t.done; }).length;
        let pourcent = total === 0 ? 0 : Math.round((faites / total) * 100);
        $('#progressFill').css('width', pourcent + '%');
        $('#progressLabel').text(faites + ' / ' + total + ' tâches terminées (' + pourcent + '%)');
    }

    function echapper(texte) {
        return $('<div>').text(texte).html();
    }

    $('#saveBtn').on('click', function (e) {
        e.preventDefault();

        let txt = $('#taskInput').val().trim();
        let dt = $('#taskDate').val();

        // Champ obligatoire : description
        if (txt === "") {
            alert("La description de la tâche est obligatoire.");
            return;
        }
        // Champ obligatoire : date
        if (dt === "") {
            alert("La date d'échéance est obligatoire.");
            return;
        }
        // Interdiction des dates antérieures à aujourd'hui
        if (dt < dateDuJour()) {
            alert("La date d'échéance ne peut pas être antérieure à aujourd'hui.");
            return;
        }

        if (indexEnModification === -1) {
            listeTaches.push({ text: txt, date: dt, done: false });
        } else {
            listeTaches[indexEnModification].text = txt;
            listeTaches[indexEnModification].date = dt;
        }

        reinitialiserFormulaire();
        sauvegarder();
    });

    $(document).on('click', '.edit-task', function (e) {
        e.preventDefault();
        let id = $(this).data('id');
        indexEnModification = id;

        $('#formTitle').text("Modifier la tâche");
        $('#saveBtn').text("Mettre à jour");
        $('#taskInput').val(listeTaches[id].text);
        $('#taskDate').val(listeTaches[id].date);
        $('#taskInput').focus();
    });

    $(document).on('click', '.delete-task', function (e) {
        e.preventDefault();
        let id = $(this).data('id');
        if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
            listeTaches.splice(id, 1);
            reinitialiserFormulaire();
            sauvegarder();
        }
    });

    $(document).on('click', '.toggle-task', function (e) {
        e.preventDefault();
        let id = $(this).data('id');
        listeTaches[id].done = !listeTaches[id].done;
        sauvegarder();
    });

    $('#cancelBtn').on('click', function (e) {
        e.preventDefault();
        reinitialiserFormulaire();
    });

    function reinitialiserFormulaire() {
        indexEnModification = -1;
        $('#formTitle').text("Nouvelle Tâche");
        $('#saveBtn').text("Enregistrer");
        $('#taskInput').val("");
        $('#taskDate').val("");
    }

});