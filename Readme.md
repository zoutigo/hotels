# Environnement de developpement

NODE 16.13.0
LAMP
Ubuntu 20.14
NPM 8.1.0
Postgresql 12.9
VsCode

# Lancer l'environnement de developpement

- demarrer apache
  `sudo systemctl apache2 start`

- demarrer postgres avec la commande
  `sudo systemctl postgresql start`

## Lancement environnement backend

### créer une base de données postgres sur votre poste de travail LAMP

- se mettre sur un user , par exemple postgres

  `sudo -i -u postgres`

- Entrer dans l'outil psql
  `psql`
- créer une base de données ,par exemple hotels_dev
  `create database hotels_dev ;`

- Créer un fichier .env à la racine du projet et insérer les variables suivantes :

  POSTGRES_DB
  POSTGRES_PASSWORD
  POSTGRES_USER=postgres

  TOKEN_SECRET=cequevousvoulezmettreici
  TOKEN_LOGIN_DURATION=18000s

- Vous pouvez aussi simplement ne remplir que les variables d'environnement gérer la création avec sequelize

### Jouer les migrations et charger les données fictives

- installer les dépendences depuis un terminal à la racine du projet
  ` npm install`

- On peut désormais se servir de sequelize qui est une dependence de developpement .
  Si elle n'a pas été crée , lancez la commande suivante pour creer la base de données

  `npx sequelize-cli db:create`

- Les migrations necessaires au projet sont stockées dans de dossier
  ./backend/database/migrations
  Dans le meme dossier vous y trouvez les modèles qui assurent l'intégrité des données
  Pour jouer la migration lancez la commande suivante:
  `npm run migrate` ou bien `npx sequelize-cli db:migrate`

- Les fixtures se trouvent dans le dossier seeders , pres des migrations . pour les charger , lancez
  `npm run seedall` ou `npx sequelize-cli db:seed:all --debug`

- A tout moment vous pouvez défaire les migrations et recommencer
  [La documentation de sequelize](https://sequelize.org/docs/v6/other-topics/migrations/) est tres brève et très efficace à ce sujet

### Demmarrage du server backend : Express

- Démarrer le server
  `npm run back-server`

  La console vous indique le port sur lequel vous pouvez vous connecter sur le site : localhost:3500
  A ce niveau vous pouvez deja consulter une version du site sur http://localhost:3500

  En effet le server sert la version build qui se trouve dans le front-end.
  Mais ce n'est pas elle qui est utisée en developpement.

## environnement Frontend : React

- naviguer sur dans le dossier frontend
  `cd ./frontend `

- installer les dépendences
  `npm install`

- Lancer le serveur de production
  `npm run front-server`

Le serveur vous signale que le projet est servi sur le port 3000.
Cors reconnait ce port 3000 . il se pourrait qu'un autre port ne fonctionne pas pour les requettes ajax

## Jeux de role

- Pour simuler les différents roles , des profils ont été crée dans les fixtures
  notamment l'admin.
- l'adminstateur a pour identifiants admin@test.com || password
- les gérants ont manager{i}@test.com || password
- le role manager a été crée , mais il n'es pas d'utilité . Les gérants sont ceux à qui des etablissements ont été assignés: les devmanagers

### option 2 :

- installer les dépendances du projet
  `npm install`
- créer la base donnée grace à sequelize
  `npx sequelize-cli db:create`

c'est la base de donnée indiquée dans les variables d'environnement qui est crée

## mettre à jour les variables d'environnement du projet

- dans le fichier .env situé à la racine du site , renseignez les informations de votre base de données

## Environnement Backend

- Installer les dépendances
  `npm install`

- Réaliser les migrations
  `npm run migrate`

- Démarrer le site
  `npm run back-server`

  La console vous indique le port sur lequel vous pouvez vous connecter sur le site : localhost:3500

## environnement Frontend

- naviguer sur dans le dossier frontend
  `cd ./fronted `

-installer les dépendences
`npm install`

- demarrer le projet
  `npm run front-server`

Le projet frontend
