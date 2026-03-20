#Partie 1#
Pourquoi l’application n’a-t-elle pas besoin de stocker directement les mots de passe ?
L’application ne stocke pas directement les mots de passe, car cette gestion est confiée à Firebase Authentication.
Elle envoie simplement les informations saisies par l’utilisateur à Firebase, qui vérifie le mot de passe et gère l’authentification. 

#partie 2#
L’utilisateur existe-t-il dans l’application ou chez le fournisseur ?
Que contrôle encore l’application cliente ?
L’utilisateur existe chez le fournisseur, c’est-à-dire dans Firebase Authentication, pas directement dans l’application.
L’application cliente contrôle encore les formulaires, la validation des champs, l’affichage des messages,
la redirection et ce qu’on montre à l’écran selon que l’utilisateur est connecté ou non.  ￼

#Partie 3#

En quoi la création de compte depuis l’application change-t-elle le rôle de l’application ?
L’application ne sert plus seulement à connecter un utilisateur existant : elle permet aussi d’envoyer à Firebase une demande de création de compte. 
Elle devient donc l’interface entre l’utilisateur et le fournisseur d’authentification.  ￼

Pourquoi faut-il valider les champs côté client même si Firebase vérifie déjà certaines contraintes ?
Parce que ça permet d’éviter d’envoyer des données incorrectes, d’afficher des messages plus clairs et d’améliorer l’expérience utilisateur.
Firebase vérifie bien de son côté, mais la validation côté client rend l’application plus pratique et réactive.

#Partie 4#

Une politique plus stricte améliore-t-elle toujours la sécurité réelle ?
Quel est le risque d’un mot de passe “conforme” mais réutilisé ailleurs ?

Non, une politique plus stricte n’améliore pas toujours la sécurité réelle, car si elle est trop compliquée,
l’utilisateur peut choisir un mot de passe facile à deviner ou le noter.
Un mot de passe conforme mais réutilisé ailleurs reste dangereux,
s’il fuit sur un autre site, il peut aussi être utilisé pour accéder à cette application.
