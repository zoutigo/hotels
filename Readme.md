# Environnement de developpement

NODE 16.13.0
LAMP
Ubuntu 20.14
NPM 8.1.0
MySql 5.2
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

# Déploiement chez O2SWITCH

## Solution hebergement

- Prendre la solution tout en un chez o2switch incluant le nom de domaine.
- Les identifiants sont envoyés par mails , ainsi que le lien de connexion à l'interface cpanel

## Création de la base de donnée

- Après s'etre connecté au cpanel , se rendre dans la rubrique base de donnée mysql

- Creer une base de donnée mysql , gardez bien le nom de votre base bien à l'abris

- Créer un utilisateur avec un mot de pass de haut niveau de sécurité . Notez bien les identifiants dans un lieu secret

- Assigner à cet utilisateur les droits sur la base de donnée

## Création de l'espace de travail

Dans votre espace de travail post connexion , vous avez un panneau avec plusieurs rubriques. Il faudra en utiliser quelques unes comme suit.

### Création d'un domaine ou sous-domaine

- se reendre dans l'onglet sous-domaine

- Créer le sous domaine

- Se rendre dans le panneau terminal

- Lister les répertoires , vous pourrez alors voir un répertoire créé du type 'hotels.artsi.fr' . Ce répertoire n'est pas à supprimer ni à utiliser , car il contient le htacces qui va aider par la suite

### Création de l'espace de stockage physique des fichiers

on peut utiliser le terminal cpanel ou une connexion ssh

- A la racine de votre projet , créer un dossier qui contiendra vos fichiers.
  Il est préférable de créer 3 repertoires des ce dossier , l'un pour la production, le pour le developpement , l'un pour le release . pour notre cas , nous déployons sur la production : projects/hotels/prod

### Création de l'application node

#### Configuration

- Se rendre dans l'onglet node setup

- Cliquer sur créer l'application

- Choisir la version node 16

- Indiquer l'application root : projects/hotels/prod

- Indiquez l'url de l'application : hotles.artsi.fr

- Indiquer le chemin du fichier de demarrage de l'application: ./backend/bin/www

#### Variables d'environnement

Renseigner les variables d'environnement suivantes :

- MYSQL_DATABASE

- MYSQL_HOST : 127.0.0.1

- MYSQL_PASSWORD

- MYSQL_USER

- SERVER_ADRESS eg : http://www.hotels.artsi.fr

- TOKEN_LOGIN_DURATION : 1d

- TOKEN_SECRET eg:toutcequevoulezymettre

<!--
#### Demarrage du server
- Lancez npm install
- Lancez le script 'prodmigrate'
- Lancez le scrpit 'prodseedall'

Vous pouvez maintenant voir que le site a été déployé  -->

### Mise en place du repository

#### Création du repository

Dans l'onglet git version control

- créer un repository pour votre projet

- décocher la case clone existing repository

- nommez votre repository

- valider

Vous obtenez alors un chemin git remote qu'il faut utiliser en local dans votre projet pour faire les déploienement

`git remote add upstream ssh://kojy5082@kojy5082.odns.fr/home/kojy5082/repositories/hotels-nodejs`

#### Création du hook post-receive

Ce hook va permttre la copie des fichiers vers le répertoire physique du projet depuis le repository lorsque vous faite un push vers la branche concernée

- se rendre dans le hook post-receive
  ` cd repositories/monrepo/.git/hooks`
  ` nano post-receive`

- y mettre le code de routage

```
!/bin/sh

while read oldrev newrev ref
do
branch=`echo $ref | cut -d/ -f3`
```

if [ "master" == "$branch" ]; then
git --work-tree=/home/kojy5082/projects/hotels/prod checkout -f $branch
echo 'Changes pushed live.'
fi

if [ "develop" == "$branch" ]; then
git --work-tree=/home/kojy5082/projects/hotels/stage checkout -f $branch
echo 'Changes pushed to dev.'
fi
done

#### Tester le hook

depuis votre machine

- envoyer les données
  `git push -u upstream master`

- vous pouvez vous rendre dans la page d'acceuil du repository pour voir que c'est votre commit qui a été pris en compte

- vous pouvez constater que le dossier /prod a été mis à jour

### Demarrage du server

- se rendre dans le panneau node- setup

- cliquer sur modifier

- lancez la commande
  `npm install`

- lancez le script
  `npm run prodmigrate`

- lancez le script
  `npm run prodseedall`

- redemarrer le server

Votre site est desormais déployé !!!!!

# BRAVO
