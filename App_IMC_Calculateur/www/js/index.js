document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log("=== Outil IMC initialise par Mahamat ===");
    document.getElementById('calculerBtn').addEventListener('click', executerCalcul);
    document.getElementById('resetBtn').addEventListener('click', reinitialiserFormulaire);
}

function executerCalcul() {
    const poids = parseFloat(document.getElementById('poids').value);
    const taille = parseFloat(document.getElementById('taille').value);

    if (isNaN(poids) || isNaN(taille) || poids <= 0 || taille <= 0) {
        alert("Veuillez saisir des données valides pour le calcul.");
        return;
    }

    const imc = poids / (taille * taille);
    document.getElementById('valeurIMC').innerText = imc.toFixed(1);

    let diagnostic = "";
    let badgeClass = "";
    let recommandation = "";

    // Seuils officiels OMS
    if (imc < 18.5) {
        diagnostic = "Insuffisance pondérale (Maigreur)";
        badgeClass = "bg-maigre";
        recommandation = "Un suivi nutritionnel avec un professionnel est conseillé pour atteindre un poids d'équilibre.";
    } else if (imc < 25) {
        diagnostic = "Poids normal (Corpulence saine)";
        badgeClass = "bg-normal";
        recommandation = "Votre indice est excellent. Maintenez vos habitudes de vie saines et votre alimentation variée.";
    } else if (imc < 30) {
        diagnostic = "Surpoids (Excès de poids)";
        badgeClass = "bg-surpoids";
        recommandation = "Attention à l'évolution de votre courbe. Une activité physique régulière et un ajustement alimentaire sont recommandés.";
    } else if (imc < 35) {
    diagnostic     = "Obésité modérée (grade I)";
    badgeClass     = "bg-obese";
    recommandation = "Consultez un médecin pour un bilan et un suivi adapté.";
    } else if (imc < 40) {
        diagnostic     = "Obésité sévère (grade II)";
        badgeClass     = "bg-obese2";
        recommandation = "Une prise en charge médicale spécialisée est recommandée.";
    } else {
        diagnostic     = "Obésité morbide (grade III)";
        badgeClass     = "bg-obese3";
        recommandation = "Consultez un médecin spécialiste rapidement pour un bilan global.";
    }
    const badge = document.getElementById('statusBadge');
    badge.innerText = diagnostic;
    badge.className = "status-badge " + badgeClass;
    
    document.getElementById('conseilIMC').innerText = recommandation;
    document.getElementById('inputCard').classList.add('hidden');
    document.getElementById('resultatArea').classList.remove('hidden');
}

function reinitialiserFormulaire() {
    document.getElementById('poids').value = '';
    document.getElementById('taille').value = '';
    document.getElementById('resultatArea').classList.add('hidden');
    document.getElementById('inputCard').classList.remove('hidden');
}