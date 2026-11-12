import type { Translation } from "./en";

const fr: Translation = {
    common: {
        dashboard: "Tableau de bord",
        profile: "Profil",
        cancel: "Annuler",
        continue: "Continuer",
        loading: "Chargement...",
        notLoggedIn: "Non connecté",
        user: "Utilisateur",
    },

    brand: {
        name: "PairMock",
        tagline: "Plateforme d'entretiens techniques simulés entre pairs",
        description: "PairMock est une plateforme collaborative où les développeurs s'entraînent ensemble aux entretiens techniques de programmation. Planifiez des sessions, résolvez des problèmes dans un éditeur de code partagé en temps réel et échangez des retours structurés.",
        features: {
            scheduleTitle: "Planifiez et pratiquez",
            scheduleDesc: "Publiez des créneaux d'entretien ou réservez des sessions disponibles filtrées par difficulté et horaire.",
            calendarTitle: "Google Calendar et Meet",
            calendarDesc: "Crée automatiquement des invitations Google Calendar et des liens vidéo Google Meet pour les entretiens réservés.",
            editorTitle: "Éditeur collaboratif en direct",
            editorDesc: "Écrivez et déboguez du code ensemble en temps réel avec coloration syntaxique multilingue.",
            feedbackTitle: "Retours entre pairs et IA",
            feedbackDesc: "Évaluez la résolution de problèmes, la qualité du code et la complexité Big-O grâce à une grille détaillée et à l'IA.",
        },
    },

    footer: {
        dashboard: "Tableau de bord",
        login: "Connexion",
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
        language: "Langue",
    },

    theme: {
        toggle: "Changer de thème",
        light: "Clair",
        dark: "Sombre",
        system: "Système",
    },

    auth: {
        email: "E-mail",
        emailPlaceholder: "vous@exemple.com",
        password: "Mot de passe",
        passwordPlaceholder: "Saisissez votre mot de passe",
        serverUnreachable: "Impossible de joindre le serveur.",
        login: {
            title: "Connectez-vous à votre compte",
            description: "Saisissez votre e-mail pour vous connecter à votre compte",
            signUp: "S'inscrire",
            submit: "Se connecter",
            google: "Se connecter avec Google",
            failed: "Échec de la connexion.",
        },
        register: {
            title: "Créer un compte",
            description: "Renseignez vos informations pour créer votre compte",
            signIn: "Se connecter",
            username: "Nom d'utilisateur",
            usernamePlaceholder: "Choisissez un nom d'utilisateur",
            confirmPassword: "Confirmer le mot de passe",
            confirmPasswordPlaceholder: "Confirmez votre mot de passe",
            submit: "S'inscrire",
            mismatch: "Les mots de passe ne correspondent pas.",
            failed: "Échec de l'inscription.",
            consent: "En créant un compte, vous acceptez nos <terms>Conditions d'utilisation</terms> et reconnaissez avoir lu notre <privacy>Politique de confidentialité</privacy>.",
        },
    },

    nav: {
        notifications: "Notifications",
        noNotifications: "Aucune notification",
        deleteNotification: "Supprimer la notification",
        logOut: "Se déconnecter",
        notifDeleted: {
            title: "Notification supprimée !",
            description: "Votre notification a bien été supprimée.",
        },
        notifDeleteFailed: {
            title: "Échec de la suppression",
            description: "Impossible de supprimer cette notification.",
        },
        logoutDialog: {
            title: "Êtes-vous vraiment sûr ?",
            description: "Vous allez être déconnecté.",
        },
    },

    dashboard: {
        bookedSlots: "Créneaux réservés :",
        availableSlots: "Créneaux disponibles :",
        noSlots: "Aucun créneau disponible. Créez le vôtre !",
        timePlaceholder: "Date",
        difficultyPlaceholder: "Difficulté",
        sort: {
            asc: "Plus proches d'abord",
            desc: "Plus lointains d'abord",
        },
        filter: {
            easy: "Facile",
            medium: "Moyen",
            hard: "Difficile",
            all: "Tous",
        },
        toast: {
            booked: { title: "Créneau réservé !", description: "Ce créneau a bien été réservé." },
            bookFailed: { title: "Échec de la réservation", description: "Impossible de réserver ce créneau. Réessayez plus tard." },
            canceled: { title: "Créneau annulé !", description: "Ce créneau a bien été annulé." },
            cancelFailed: { title: "Échec de l'annulation", description: "Impossible d'annuler ce créneau. Réessayez plus tard." },
            deleted: { title: "Créneau supprimé !", description: "Le créneau a bien été supprimé." },
            deleteFailed: { title: "Échec de la suppression", description: "Impossible de supprimer ce créneau." },
        },
    },

    pagination: {
        previous: "Précédent",
        next: "Suivant",
    },

    difficulty: {
        EASY: "Facile",
        MEDIUM: "Moyen",
        HARD: "Difficile",
    },

    slot: {
        deleteAria: "Supprimer le créneau",
        duration: "{{count}} min",
        book: "Réserver",
        hosted: "Votre créneau",
        enter: "Rejoindre l'entretien",
        cancel: "Annuler",
        history: "Voir l'historique",
        deleteDialog: {
            title: "Êtes-vous sûr ?",
            description: "Ce créneau va être supprimé.",
            deleting: "Suppression...",
            confirm: "Supprimer le créneau",
        },
    },

    slotCreation: {
        trigger: "Créer un créneau",
        title: "Créer un créneau",
        description: "Configurez votre nouveau créneau d'entretien.",
        connectTitle: "Connecter Google Agenda",
        connectDescription: "Lorsque quelqu'un réserve votre créneau, PairMock crée automatiquement une invitation Google Agenda et un lien Google Meet pour vous deux. Connectez votre compte Google une seule fois pour commencer à proposer des créneaux.",
        connectButton: "Connecter Google Agenda",
        form: {
            description: "Description",
            descriptionPlaceholder: "Sur quoi souhaitez-vous vous entraîner ?",
            descriptionHelp: "Décrivez la session d'entretien.",
            difficulty: "Difficulté",
            dateTime: "Date et heure",
            duration: "Durée (minutes)",
            submit: "Créer le créneau",
            failedFallback: "Impossible de créer le créneau",
        },
        toast: {
            created: { title: "Créneau créé !", description: "Votre créneau d'entretien est maintenant disponible." },
            failed: { title: "Échec de la création !", description: "Impossible de créer votre créneau." },
        },
    },

    profile: {
        imageLabel: "Photo de profil",
        username: "Nom d'utilisateur",
        save: "Enregistrer",
        noChanges: "Aucune modification n'a été apportée",
        saved: "Vos informations de profil ont été enregistrées",
        error: "Une erreur inattendue est survenue",
        stats: {
            passed: "Entretiens passés : {{count}}",
            hours: "Heures d'entraînement : {{count}}",
            score: "Note moyenne : {{score}}",
        },
        passedHeading: "Entretiens passés :",
        analytics: "Afficher les statistiques",
        emptyDescription: "Aucun entretien terminé"
    },

    interview: {
        loading: "Chargement de la session d'entretien...",
        languagePlaceholder: "Langage",
        joinMeet: "Rejoindre Google Meet",
        thanks: "Merci pour votre retour !",
        exit: "Quitter l'entretien",
        console: "Console",
        questionnaire: {
            previous: "Précédent",
            skip: "Passer",
            next: "Suivant",
            submit: "Enregistrer l'évaluation",
        },
        toast: {
            feedbackSaved: "Votre évaluation a été enregistrée",
            feedbackFailed: "Impossible d'enregistrer l'évaluation",
            codeSaved: { title: "Code ajouté à la revue !", description: "Ce créneau a été mis à jour." },
            updateFailed: { title: "Échec de la mise à jour", description: "Impossible de mettre à jour ce créneau. Réessayez plus tard." },
        },
        exitDialog: {
            title: "Êtes-vous vraiment sûr ?",
            description: "Une fois sorti de cet entretien, vous ne pourrez plus rejoindre la session. Assurez-vous d'avoir tout terminé avant de partir.",
            saving: "Enregistrement...",
        },
        timer: {
            notStarted: "L'entretien n'a pas encore commencé",
            over: "L'entretien est terminé",
        },
    },

    review: {
        loading: "Chargement de la revue d'entretien...",
        readOnly: "PAGE DE REVUE (LECTURE SEULE)",
        feedbackHeading: "Évaluation :",
    },

    questionnaire: {
        problemSolving: {
            title: "Résolution de problème et conception d'algorithme",
            description: "Notez de 0 (non résolu) à 5 (approche optimale sans indice).",
            choices: {
                "5": "Approche optimale sans indice",
                "4": "Résolu avec un léger accompagnement",
                "3": "Résolu avec un accompagnement important",
                "2": "Approche sous-optimale ou force brute",
                "1": "A eu du mal à avancer",
                "0": "Non résolu",
            },
        },
        codeQuality: {
            title: "Qualité du code et implémentation",
            description: "Notez de 0 (cassé/illisible) à 5 (propre, idiomatique, sans bug).",
            choices: {
                "5": "Propre, idiomatique, sans bug",
                "4": "Lisible avec de petits défauts de style",
                "3": "Fonctionnel mais brouillon ou désorganisé",
                "2": "Bugs ou erreurs de syntaxe importants",
                "1": "Difficile à suivre, plusieurs bugs",
                "0": "Cassé et illisible",
            },
        },
        complexityAnalysis: {
            title: "Complexité en temps et en espace (Big-O)",
            description: "Notez de 0 (incorrecte/absente) à 5 (analyse Big-O exacte en temps et en espace).",
            choices: {
                "5": "Analyse Big-O exacte en temps et en espace",
                "4": "Correcte avec une légère aide",
                "3": "Analyse partiellement correcte",
                "2": "Confusion entre complexité en temps et en espace",
                "1": "Deviné sans raisonnement",
                "0": "Analyse incorrecte ou absente",
            },
        },
        communication: {
            title: "Communication et raisonnement",
            description: "Notez de 0 (silencieux/confus) à 5 (réflexion structurée à voix haute).",
            choices: {
                "5": "Réflexion structurée à voix haute",
                "4": "Bonne communication, légères hésitations",
                "3": "A parfois eu besoin d'être relancé",
                "2": "Discret, explications peu claires",
                "1": "Communication minimale",
                "0": "Silencieux ou incohérent",
            },
        },
        signals: {
            title: "Quels signaux positifs le candidat a-t-il montrés ?",
            description: "Sélectionnez toutes les réponses applicables, ou passez cette question.",
            choices: {
                "clarified-constraints": "A clarifié les contraintes et cas limites dès le début",
                "compared-tradeoffs": "A comparé les compromis avant de coder",
                "dry-run": "A déroulé le code à la main avec des cas de test",
                "self-debugged": "A trouvé et corrigé ses bugs seul",
            },
        },
        outcome: {
            title: "Quel a été le résultat final de l'exercice ?",
            description: "Sélectionnez le résultat de l'exercice de code.",
            inputLabel: "Commentaire personnalisé",
            inputPlaceholder: "Ajoutez des conseils précis ou les cas limites oubliés…",
            choices: {
                "optimal-no-hints": "Résolu de façon optimale sans indice",
                "optimal-with-hints": "Résolu de façon optimale avec quelques indices",
                "suboptimal": "Solution fonctionnelle en force brute / sous-optimale",
                "incomplete": "N'a pas terminé de solution fonctionnelle",
            },
        },
    },

    ai: {
        heading: "Retour de l'IA",
        empty: "Cliquez sur un bouton pour obtenir un retour de l'IA sur le code.",
        errorTitle: "Problème avec l'IA",
        buttons: {
            tips: "Conseils",
            complexity: "Complexité",
            bugs: "Bugs",
            optimal: "Solution optimale",
        },
        errors: {
            NO_CODE: "Il n'y a aucun code à analyser.",
            CODE_TOO_LONG: "Le code est trop long pour être analysé.",
            INVALID_TYPE: "Type d'analyse inconnu.",
            UNAUTHORIZED: "Veuillez vous reconnecter.",
            FORBIDDEN: "Vous n'avez pas accès à cet entretien.",
            NOT_FOUND: "Entretien introuvable.",
            AI_FAILED: "L'analyse par l'IA a échoué. Réessayez plus tard.",
        },
    },

    legal: {
        lastUpdated: "Dernière mise à jour : {{date}}",
        back: "Retour",
        privacy: {
            title: "Politique de confidentialité",
            intro: "PairMock (https://pairmock.duckdns.org) est une plateforme d'entretiens techniques blancs entre pairs, développée dans le cadre d'un projet étudiant à vocation pédagogique. Cette Politique de confidentialité détaille quelles données personnelles et données utilisateur Google nous collectons lorsque vous utilisez PairMock, comment nous les utilisons, stockons, protégeons et partageons, comment nous respectons la Politique relative aux données utilisateur des services API Google, et comment exercer vos droits ou supprimer vos données.",
            sections: [
                {
                    heading: "1. Données collectées (y compris les données utilisateur Google)",
                    paragraphs: [
                        "Nous collectons uniquement le strict minimum d'informations personnelles nécessaires au fonctionnement de PairMock et à ses fonctionnalités de planification d'entretiens, d'édition collaborative de code et d'évaluation :",
                    ],
                    items: [
                        "Données d'inscription au compte : Lorsque vous créez un compte avec une adresse e-mail et un mot de passe, nous collectons votre nom d'utilisateur, votre adresse e-mail, votre mot de passe (stocké exclusivement sous forme de hachage cryptographique sécurisé, jamais en clair) et l'URL facultative de votre photo de profil.",
                        "Données de connexion Google (scopes OAuth : openid, email, profile) : Si vous vous connectez via Google OAuth, nous collectons l'identifiant unique de votre compte Google, votre nom d'affichage, votre adresse e-mail et l'URL de votre photo de profil transmis par Google afin de vous authentifier.",
                        "Données Google Agenda (scope OAuth : https://www.googleapis.com/auth/calendar.events) : Si vous choisissez d'héberger des créneaux d'entretien et de connecter Google Agenda, nous stockons les jetons d'accès et d'actualisation OAuth 2.0 fournis par Google. Nous utilisons cette autorisation uniquement pour créer, mettre à jour et supprimer les événements Google Agenda (ainsi que leurs liens de visioconférence Google Meet associés) que PairMock planifie lorsqu'un autre utilisateur réserve ou annule votre créneau. PairMock ne lit, n'analyse, ne modifie et ne supprime AUCUN autre événement personnel de votre agenda Google.",
                        "Données d'entretiens et d'entraînement : Nous conservons les créneaux que vous publiez ou réservez (description, difficulté, date et heure, durée et statut), le code source écrit dans l'éditeur collaboratif pendant l'entretien, les évaluations structurées soumises par les participants et vos notifications.",
                        "Données techniques et de session : Pour la sécurité et le maintien de votre connexion, nous enregistrons l'identifiant de session, sa date d'expiration, votre adresse IP et l'agent utilisateur (user-agent) de votre navigateur.",
                        "Préférences locales : Votre langue d'interface (anglais, espagnol ou français) et votre thème visuel sont enregistrés uniquement dans le stockage local (localStorage) de votre navigateur et ne sont pas transmis à nos serveurs.",
                    ],
                },
                {
                    heading: "2. Comment nous utilisons vos données",
                    paragraphs: [
                        "Nous utilisons les informations collectées exclusivement pour fournir et faire fonctionner le service PairMock :",
                    ],
                    items: [
                        "Authentification et gestion du compte : Créer et sécuriser votre compte, vous authentifier par e-mail/mot de passe ou Google Sign-In, et afficher votre nom d'utilisateur et votre avatar à vos partenaires d'entretien.",
                        "Planification d'entretiens blancs : Permettre aux utilisateurs de publier des créneaux disponibles, de parcourir les sessions ouvertes et de réserver ou d'annuler des entretiens d'entraînement.",
                        "Automatisation Google Agenda et Google Meet : Lorsqu'un utilisateur réserve un créneau que vous hébergez, PairMock utilise votre jeton Google Agenda pour créer automatiquement l'événement dans l'agenda, générer un lien vidéo Google Meet pour les deux participants, et supprimer ou mettre à jour cet événement si la réservation est annulée.",
                        "Édition collaborative et historique : Synchroniser le code en temps réel entre les deux participants pendant l'entretien et afficher votre historique de code, vos évaluations et vos statistiques sur votre tableau de bord et votre profil.",
                        "Analyse de code par IA à la demande : Uniquement lorsque vous cliquez explicitement sur un bouton de retour de l'IA, PairMock transmet le code de l'éditeur à notre fournisseur d'IA (Groq) afin de générer des conseils pédagogiques.",
                    ],
                },
                {
                    heading: "3. Conformité à la Politique relative aux données utilisateur des services API Google (Usage Limité)",
                    paragraphs: [
                        "L'utilisation et le transfert par PairMock à toute autre application des informations reçues des API Google respectent la Politique relative aux données utilisateur des services API Google (Google API Services User Data Policy), y compris les exigences d'Usage Limité (Limited Use).",
                    ],
                    items: [
                        "Usage Limité : Nous utilisons les données utilisateur Google (vos informations de profil et les autorisations d'événements Google Agenda) uniquement pour fournir des fonctionnalités visibles par l'utilisateur dans PairMock : vous connecter et planifier automatiquement les invitations Google Agenda et les liens Google Meet de vos entretiens réservés.",
                        "Aucune publicité ni revente de données : Nous ne vendons, ne louons et ne cédons jamais vos données utilisateur Google ou vos données personnelles à des tiers, courtiers en données ou régies publicitaires, et nous ne les utilisons jamais à des fins de ciblage publicitaire.",
                        "Aucun entraînement d'IA sur les données Google : Nous ne transférons jamais les données de votre compte Google, votre adresse e-mail ou vos données Google Agenda à un fournisseur d'intelligence artificielle, et ces données ne sont jamais utilisées pour entraîner des modèles d'IA.",
                        "Aucune lecture humaine des données Google : Aucun humain ne consulte vos données utilisateur Google, sauf avec votre accord explicite dans le cadre d'une demande d'assistance, pour des raisons de sécurité ou si la loi l'exige.",
                    ],
                },
                {
                    heading: "4. Base légale du traitement (RGPD)",
                    paragraphs: [
                        "Pour les utilisateurs situés dans l'Espace économique européen (EEE) et au Royaume-Uni, nous traitons vos données personnelles conformément au Règlement général sur la protection des données (RGPD) sur les bases suivantes : (a) l'exécution d'un contrat (article 6(1)(b) du RGPD) pour fournir l'accès au compte, la réservation de créneaux, l'éditeur collaboratif et les évaluations ; (b) votre consentement (article 6(1)(a) du RGPD) lorsque vous connectez facultativement Google Agenda ou demandez une analyse par l'IA ; et (c) notre intérêt légitime (article 6(1)(f) du RGPD) pour assurer la sécurité des sessions.",
                    ],
                    items: [],
                },
                {
                    heading: "5. Partage des données, sous-traitants et transferts internationaux",
                    paragraphs: [
                        "Nous ne partageons vos informations que dans les cas strictement nécessaires décrits ci-dessous :",
                    ],
                    items: [
                        "Autres utilisateurs de PairMock : Les utilisateurs connectés voient votre nom d'utilisateur, votre photo de profil et les créneaux disponibles que vous publiez. Lorsqu'un entretien est réservé, les deux participants voient leur nom d'utilisateur, le code partagé, l'évaluation et, via l'invitation Google Agenda, les adresses e-mail figurant sur l'invitation.",
                        "Google LLC (OAuth et API Google Agenda) : Lorsque vous vous connectez avec Google ou qu'un créneau est réservé, PairMock communique avec les API Google pour vérifier votre identité ou créer l'événement d'agenda et le lien Google Meet.",
                        "Groq, Inc. (Analyse de code par IA) : Lorsque vous cliquez sur un bouton d'aide IA, seul le code écrit dans l'éditeur d'entretien et le langage choisi sont envoyés à l'API de Groq. Votre nom, votre adresse e-mail et vos données Google ne sont jamais transmis à Groq.",
                        "Transferts internationaux : Google LLC et Groq, Inc. traitent des données sur des serveurs situés aux États-Unis, encadrés par le Cadre de protection des données UE-États-Unis (Data Privacy Framework) et les Clauses Contractuelles Types (CCT) de la Commission européenne.",
                    ],
                },
                {
                    heading: "6. Cookies et technologies de suivi",
                    paragraphs: [
                        "PairMock n'utilise aucun cookie publicitaire, pixel de suivi tiers ni cookie de mesure d'audience comportementale. Le seul cookie déposé est le cookie de session strictement nécessaire au maintien sécurisé de votre connexion.",
                    ],
                    items: [],
                },
                {
                    heading: "7. Stockage et mesures de sécurité",
                    paragraphs: [
                        "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données personnelles et vos jetons OAuth Google contre tout accès non autorisé, altération ou divulgation :",
                    ],
                    items: [
                        "Chiffrement en transit : Toutes les communications entre votre navigateur, les serveurs de PairMock et les API Google sont chiffrées via HTTPS/TLS.",
                        "Protection des identifiants et jetons : Les mots de passe sont hachés à l'aide d'un algorithme cryptographique robuste. Les jetons OAuth Google sont conservés dans une base de données restreinte accessible uniquement par le serveur backend.",
                        "Contrôle d'accès : L'accès aux sessions d'entretien, au code partagé et aux pages de révision est strictement vérifié côté serveur afin que seuls les deux participants puissent y accéder.",
                    ],
                },
                {
                    heading: "8. Durée de conservation, suppression du compte et révocation de l'accès Google",
                    paragraphs: [
                        "Nous conservons vos données personnelles uniquement tant que votre compte PairMock reste actif :",
                    ],
                    items: [
                        "Expiration des sessions : Les sessions de connexion expirent automatiquement ou dès votre déconnexion.",
                        "Révocation de l'accès Google : Vous pouvez révoquer l'accès de PairMock à votre compte Google et à Google Agenda à tout moment depuis la page des autorisations de votre compte Google (https://myaccount.google.com/permissions) ou en nous écrivant à {{email}}.",
                        "Suppression du compte et des données : Vous pouvez demander la suppression complète de votre compte PairMock et de vos données personnelles (y compris votre profil, votre adresse e-mail, vos sessions et vos jetons Google enregistrés) à tout moment en nous contactant à {{email}}. Nous supprimons définitivement vos identifiants et jetons Google dans un délai maximal de 30 jours. Les entretiens terminés peuvent être conservés sous forme anonymisée afin que vos anciens partenaires conservent leur historique d'entraînement.",
                    ],
                },
                {
                    heading: "9. Vos droits en matière de protection des données",
                    paragraphs: [
                        "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données personnelles. Vous pouvez modifier votre nom d'utilisateur et votre photo directement depuis votre page Profil. Pour exercer tout autre droit ou poser une question sur la protection de vos données, contactez l'équipe PairMock à {{email}}. Vous avez également le droit d'introduire une réclamation auprès de la CNIL (France) ou de votre autorité nationale de protection des données.",
                    ],
                    items: [],
                },
                {
                    heading: "10. Modifications de cette Politique de confidentialité",
                    paragraphs: [
                        "Nous pouvons mettre à jour cette Politique de confidentialité afin de refléter les évolutions de PairMock ou des exigences légales. La date de « Dernière mise à jour » figurant en haut de cette page indique la date de la dernière révision.",
                    ],
                    items: [],
                },
            ],
        },
        terms: {
            title: "Conditions d'utilisation",
            intro: "Les présentes conditions d'utilisation encadrent votre utilisation de PairMock. En créant un compte ou en utilisant la plateforme, vous les acceptez. Si vous n'êtes pas d'accord, merci de ne pas utiliser PairMock.",
            sections: [
                {
                    heading: "1. Le service",
                    paragraphs: [
                        "PairMock permet aux utilisateurs de s'entraîner ensemble aux entretiens techniques : vous pouvez publier des créneaux, réserver ceux proposés par d'autres, coder ensemble dans un éditeur partagé, échanger des évaluations et demander des suggestions générées par IA. PairMock est un projet étudiant gratuit, destiné uniquement à l'entraînement.",
                    ],
                    items: [],
                },
                {
                    heading: "2. Votre compte",
                    paragraphs: [],
                    items: [
                        "Vous devez fournir des informations exactes et garder votre mot de passe confidentiel.",
                        "Vous êtes responsable de toute activité effectuée depuis votre compte.",
                        "Une personne, un compte : n'usurpez l'identité de personne et ne créez pas de compte pour autrui.",
                        "Vous devez avoir au moins 15 ans (âge de la majorité numérique en France) ou l'accord d'un représentant légal pour utiliser PairMock.",
                    ],
                },
                {
                    heading: "3. Utilisation acceptable",
                    paragraphs: ["En utilisant PairMock, vous vous engagez à ne pas :"],
                    items: [
                        "harceler, insulter ou discriminer d'autres utilisateurs, pendant les entretiens ou dans les descriptions de créneaux ;",
                        "partager de contenu illégal, offensant, ou que vous n'avez pas le droit de partager ;",
                        "coller de secrets, de mots de passe ou de données personnelles de tiers dans l'éditeur partagé ;",
                        "tenter d'accéder à des entretiens ou données qui ne sont pas les vôtres, ou perturber le service ;",
                        "réserver des créneaux auxquels vous n'avez pas l'intention de participer, ou annuler à répétition au dernier moment.",
                    ],
                },
                {
                    heading: "4. Votre contenu",
                    paragraphs: [
                        "Vous restez propriétaire du code et des évaluations que vous rédigez. Vous autorisez PairMock à les conserver et à les afficher à votre partenaire d'entretien, ainsi qu'à transmettre le code à notre fournisseur d'IA lorsque vous ou votre partenaire demandez un retour de l'IA, uniquement pour faire fonctionner le service.",
                    ],
                    items: [],
                },
                {
                    heading: "5. Services Google",
                    paragraphs: [
                        "Proposer des créneaux nécessite de connecter un compte Google afin que PairMock puisse créer des événements d'agenda et des liens Google Meet. Votre utilisation de ces services est également soumise aux conditions de Google.",
                    ],
                    items: [],
                },
                {
                    heading: "6. Retour de l'IA",
                    paragraphs: [
                        "Les retours de l'IA sont générés automatiquement et peuvent être incomplets ou erronés. Considérez-les comme une aide à l'apprentissage, pas comme une évaluation faisant autorité.",
                    ],
                    items: [],
                },
                {
                    heading: "7. Disponibilité et responsabilité",
                    paragraphs: [
                        "PairMock est fourni « en l'état », sans garantie de disponibilité, d'exactitude ou d'adéquation à un usage particulier. Les entretiens sur PairMock sont des sessions d'entraînement et ne débouchent sur aucune offre d'emploi. Dans les limites permises par la loi, nous ne sommes pas responsables des préjudices résultant de votre utilisation du service.",
                    ],
                    items: [],
                },
                {
                    heading: "8. Suspension et résiliation",
                    paragraphs: [
                        "Vous pouvez cesser d'utiliser PairMock à tout moment. Nous pouvons suspendre ou supprimer les comptes qui enfreignent ces conditions.",
                    ],
                    items: [],
                },
                {
                    heading: "9. Modifications et contact",
                    paragraphs: [
                        "Nous pouvons mettre à jour ces conditions ; continuer à utiliser PairMock après une modification vaut acceptation de la nouvelle version. Ces conditions sont régies par le droit français. Une question ? Contactez-nous à {{email}}.",
                    ],
                    items: [],
                },
            ],
        },
    },

    analytics: {
        title: "Tableau de bord analytique",
        description: "Votre progression sur l'ensemble des entretiens terminés",
        filter: {
            all: "Toutes les difficultés",
            easy: "Facile",
            medium: "Moyen",
            hard: "Difficile",
        },
        exportCsv: "Exporter en CSV",
        lastUpdated: "Dernière mise à jour : {{time}}",
        kpis: {
            interviews: "Entretiens",
            averageScore: "Note moyenne",
            strength: "Point fort",
            workOn: "À travailler",
        },
        skills: {
            problemSolving: "Résolution de problèmes",
            codeQuality: "Qualité du code",
            complexityAnalysis: "Analyse de complexité",
            communication: "Communication",
            average: "Moyenne",
        },
        charts: {
            scoreEvolution: {
                title: "Évolution des notes",
                description: "Notes obtenues à chaque entretien",
            },
            skillsRadar: {
                title: "Profil de compétences",
                description: "Moyenne par compétence",
            },
            difficultyBar: {
                title: "Notes par difficulté",
                description: "Classé par ordre croissant de difficulté",
                tooltip_one: "{{count}} entretien",
                tooltip_other: "{{count}} entretiens",
            },
        },
    },
};

export default fr;
