# 📱 Projet Développement Mobile - Master 2 SRT (2026)

Bienvenue dans le dépôt officiel de notre projet de développement d'applications mobiles , réalisé dans le cadre du **Master 2 Systèmes et Réseaux de Télécommunications (SRT)**. 

Ce projet regroupe un écosystème de **3 applications mobiles fonctionnelles**, entièrement optimisées pour les environnements mobiles et conçues avec une architecture légère et robuste.

---

## Membres de l'équipe
* **Hamit Amir MAHAMAT**
* **Bonco SOW**

---

## Présentation des 3 Applications

### 1.  Calculateur d'IMC (Indice de Masse Corporelle)
Une application de santé épurée permettant aux utilisateurs de calculer rapidement leur IMC à partir de leur poids et de leur taille.
* **Fonctionnalités clés :** * Calcul instantané de l'IMC avec interprétation selon les normes de l'OMS.
  * Code couleur dynamique selon le résultat (Insuffisance, Normal, Surpoids, Obésité).
  * Persistance des données : Historique des calculs précédents sauvegardé localement via `LocalStorage`.

### 2.  TaskFlow (Gestionnaire de Tâches)
Un outil de productivité (To-Do List) agile et intuitif pour organiser ses activités quotidiennes.
* **Fonctionnalités clés :**
  * Ajout, complétion, modification et suppression de tâches.
  * Barre de progression visuelle qui calcule le pourcentage de tâches terminées.
  * Rendu visuel universel grâce à l'intégration d'icônes vectorielles SVG personnalisées.
  * Sauvegarde automatique de l'état des tâches dans le navigateur de l'émulateur.

### 3.  Gestion de Contacts
Un carnet d'adresses mobile moderne, ergonomique et hautement interactif.
* **Fonctionnalités clés :**
  * Triage alphabétique automatique en temps réel lors de l'ajout d'un contact (`localeCompare`).
  * Génération automatique d'avatars circulaires stylisés utilisant l'initiale du nom de la personne.
  * Intégration native avec l'application "Téléphone" du smartphone grâce aux liaisons d'URL `href="tel:"`.
  * Recherche prédictive intégrée (Filtre natif jQuery Mobile) pour retrouver un contact instantanément.

---

## Technologies Utilisées

L'ensemble des applications repose sur une stack technologique hybride, garantissant légèreté et compatibilité multiplateforme (Android / iOS) :

* **Frontend :** HTML5, CSS3 (Polissage UI, Flexbox, cartes en relief, animations fluides), JavaScript (ES6+).
* **Framework Mobile :** [jQuery Mobile 1.4.5](https://jquerymobile.com/) & jQuery 1.11.1 (pour la structure de navigation en Single Page Application et les widgets UI).
* **Wrapper Hybride :** [Apache Cordova](https://cordova.apache.org/) (`cordova.js`) permettant de compiler le code web en applications natives Android (.apk).
* **Stockage :** API Web `LocalStorage` pour la persistance locale des données hors-ligne.

---

## Structure du Répertoire

```text
├── 1_Calculateur_IMC/
│   ├── index.html
│   ├── css/
│   │   └── index.css
│   └── js/
│       └── index.js
├── 2_ToDoList_TaskFlow/
│   ├── index.html
│   ├── css/
│   │   └── index.css
│   └── js/
│       └── index.js
├── 3_Gestion_Contacts/
│   ├── index.html
│   ├── css/
│   │   └── index.css
│   └── js/
│       └── index.js
└── README.md
