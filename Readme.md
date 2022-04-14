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

## créer une base de données postgres sur votre poste de travail LAMP

### option 1 :

- se mettre sur user , par exemple postgres
  `sudo -i -u postgres`
- Entrer dans l'outil psql
  `psql`
- créer une base de données ,par exemple hotels_dev
  `create database hotels_dev ;`

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

## environnement backend

-
