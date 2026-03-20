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

1. Dans l’application Firebase actuelle, quelles fonctionnalités dépendent d’un “compte local géré par le fournisseur” ?

Dans l’application Firebase actuelle, les fonctionnalités qui dépendent d’un compte local géré par le fournisseur sont celles liées au mode email / mot de passe : la création de compte, la connexion avec email et mot de passe, et la réinitialisation du mot de passe. Ces fonctions reposent sur Firebase Authentication, qui gère les utilisateurs et leurs identifiants. À l’inverse, avec un fournisseur OIDC comme PSC, l’application ne gère pas directement le mot de passe : elle délègue l’authentification au fournisseur via une redirection après configuration du client et de l’URL de retour.

2. Si on remplace Firebase par Pro Santé Connect, quels écrans deviennent inadaptés ou doivent être repensés ?

Les écrans les plus inadaptés sont ceux de connexion locale, de création de compte et en grande partie de mot de passe oublié. Avec Firebase en email/mot de passe, l’application affiche ses propres formulaires pour saisir les identifiants et demander la création ou la réinitialisation d’un compte. Avec Pro Santé Connect, l’authentification repose sur un flux OIDC avec redirection vers le fournisseur d’identité, puis retour vers l’application.  ￼

3. Qu’est-ce que l’application devrait faire à la place d’un formulaire de connexion local ?

À la place d’un formulaire de connexion local, l’application devrait proposer un bouton du type “Se connecter avec Pro Santé Connect” puis rediriger l’utilisateur vers le service d’authentification PSC. Ensuite, après authentification, l’application récupère le retour du fournisseur via l’URL de redirection prévue. Le site PSC indique aussi qu’il faut d’abord demander l’accès à l’environnement d’intégration et enregistrer le client pour obtenir les identifiants nécessaires.  ￼

4. Quelles nouvelles informations techniques faudrait-il configurer côté application ?

Il faudrait configurer des éléments qu’on n’utilise pas de la même manière avec Firebase email/mot de passe : une URL de redirection, un client ID, un client secret, ainsi que les paramètres du fournisseur OIDC, notamment les endpoints d’autorisation et de token. En résumé, l’application ne se contente plus d’appeler un SDK de connexion locale : elle doit être enregistrée comme client auprès du fournisseur d’identité.  ￼

5. Qu’est-ce qui change dans la responsabilité de l’application ?

Avec Firebase email/mot de passe, l’application gère surtout les formulaires et appelle directement les fonctions du SDK pour créer un compte, connecter l’utilisateur ou envoyer un mail de réinitialisation. Avec PSC, l’application doit surtout gérer le déclenchement du flux OIDC, la redirection, le retour d’authentification et l’exploitation des jetons reçus. Donc son rôle devient plus orienté vers l’intégration d’un protocole d’identité standard que vers des formulaires de compte local.  ￼

6. Que peut-on conserver malgré tout de l’application Firebase actuelle ?

On peut conserver une bonne partie de l’application côté interface : la structure générale des pages, le tableau de bord, l’affichage de l’utilisateur connecté, la gestion de session côté interface, les messages d’erreur et de succès, ainsi que la logique de protection des pages. Ce qui change surtout, c’est la façon d’authentifier l’utilisateur. PSC s’appuie sur OIDC, OAuth 2.0, TLS 1.2 et JWT, mais l’application garde toujours besoin d’une interface et d’une logique après connexion.  ￼

7. Pourquoi le passage à PSC est-il plus lourd qu’un simple changement de SDK ?

Parce que ce n’est pas seulement remplacer une bibliothèque par une autre. Il faut aussi changer le mode d’authentification : passer d’un modèle Firebase avec comptes locaux et appels SDK directs à un modèle OIDC avec enregistrement du client, redirections, endpoints d’autorisation et de token, gestion des jetons et contraintes techniques de sécurité. Il y a donc un changement d’architecture d’authentification, pas juste un changement de code d’import.  ￼
