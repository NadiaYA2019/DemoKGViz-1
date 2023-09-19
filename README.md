# DemoKGViz-1

## Repository files
Le dossier src est organisé comme suit:
* assets: contient la représentation en région de la France
* component : Ensemble des components permettant d'afficher la bar latéralles et les différents graphiques
* config: contient la description de tous les paramètres affichables
* img: les images
* queries: contient l'ensembles des queries SPARQL
* store: continent les différents stores permettant nottament de gérer les appel à la base de données
* utils: fonctions de traitement supplémentaires
* App.vue: fichier paramètre de Vue
* main.js : fichier paramètre de javascript



## Déploiement du site

### Compilation

Tout d'abord, il faut se rendre sur la branche main du projet.

Ensuite, il faut effectuer la commande permettant de compiler le projet ci-dessous

```
npm run build
``` 

Une fois que la compilation est terminée, on peut voir qu'un nouveau dossier appelé dist est apparu. A l'intérieur se trouve les fichiers notre site Internet.

### Github Pages

#### Mettre le site sur le dépôt

Après avoir compilé le projet, se rendre sur la page du dépôt et sélectionner la branche de déploiement `deploy`

![Alt text](https://cdn.discordapp.com/attachments/1092435460879556618/1116752893949780048/168632496218260488.png)

Ensuite, cliquer sur `Add File`, puis `Upload File`.

![Alt text](https://cdn.discordapp.com/attachments/1092435460879556618/1116753140356763738/168632502018319099.png)

Pour finir, glisser l'intégralité des fichiers présents dans le dossier `/dist` à l'intérieur et cliquer sur `Commit changes`.

![Alt text](https://cdn.discordapp.com/attachments/1092435460879556618/1116753289803993138/168632505618354668.png)

#### Créer la page GitHub

La prochaine étape est de déployer le site en ligne. Pour cela, il faut se rendre sur le dépôt, puis dans les réglages du dépôt.

![Alt text](https://cdn.discordapp.com/attachments/1092435460879556618/1116747428641648680/168632365816957270.png)

Ensuite, se rendre dans la catégorie `Pages`.

![Alt text](https://cdn.discordapp.com/attachments/1092435460879556618/1116751459212611614/168632461917918226.png)

Puis, cliquer sur `Source` et sélectionner `Deploy from a branch`.

![Alt text](https://cdn.discordapp.com/attachments/1092435460879556618/1116747616940732466/168632370317002231.png)

Il faut sélectionner la branche qui contient notre site, qui est la branche `deploy`.

![Alt text](https://cdn.discordapp.com/attachments/1092435460879556618/1116747655327010917/168632371317011848.png)

Pour finir, il reste à appuyer sur `Save` pour mettre en ligne le site. On peut voir l'adresse à laquelle le site sera disponible.

![Alt text](https://cdn.discordapp.com/attachments/1092435460879556618/1116747842946605147/168632375717055982.png)