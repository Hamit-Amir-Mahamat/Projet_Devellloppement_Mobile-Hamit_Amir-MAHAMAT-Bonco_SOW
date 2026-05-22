$(document).ready(function() {
    // Clé pour le stockage local
    const STORAGE_KEY = "mes_contacts_app";
    let contacts = [];
    chargerContacts();

    $('#saveContactBtn').on('click', function() {
        let nom = $('#contactName').val().trim();
        let tel = $('#contactPhone').val().trim();
        let email = $('#contactEmail').val().trim();

        if (nom === "" || tel === "") {
            alert("Le nom et le téléphone sont obligatoires !");
            return;
        }

        let nouveauContact = {
            id: Date.now(), 
            nom: nom,
            tel: tel,
            email: email
        };

        contacts.push(nouveauContact);
        sauvegarderContacts();

        // Vider le formulaire
        $('#contactName').val('');
        $('#contactPhone').val('');
        $('#contactEmail').val('');

        $(":mobile-pagecontainer").pagecontainer("change", "#home-page");
    });

    $(document).on('click', '.delete-btn', function(e) {
        e.preventDefault();
        let contactId = $(this).data('id');
        
        if (confirm("Voulez-vous vraiment supprimer ce contact ?")) {
            // Filtrer le tableau pour retirer le contact
            contacts = contacts.filter(c => c.id !== contactId);
            sauvegarderContacts();
        }
    });

    function afficherContacts() {
        let $list = $('#contactList');
        $list.empty();


        contacts.sort((a, b) => a.nom.localeCompare(b.nom));

        if (contacts.length === 0) {
            $list.append('<li><p style="text-align:center; color:#888;">Aucun contact enregistré.</p></li>');
        } else {
            contacts.forEach(function(c) {
                // Création de l'initiale pour l'avatar
                let initiale = c.nom.charAt(0).toUpperCase();
                
                let li = `
                    <li>
                        <a href="tel:${c.tel}">
                            <div class="avatar">${initiale}</div>
                            <h2>${c.nom}</h2>
                            <p><strong>📞 ${c.tel}</strong></p>
                            ${c.email ? `<p>✉️ ${c.email}</p>` : ''}
                        </a>
                        <a href="#" class="delete-btn" data-id="${c.id}" title="Supprimer">Supprimer</a>
                    </li>
                `;
                $list.append(li);
            });
        }

        if ($list.hasClass('ui-listview')) {
            $list.listview('refresh');
        }
    }

    function sauvegarderContacts() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
        afficherContacts();
    }

    function chargerContacts() {
        let data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            contacts = JSON.parse(data);
        }
        afficherContacts();
    }
});