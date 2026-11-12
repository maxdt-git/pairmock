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
            intro: "PairMock est une plateforme d'entretiens techniques blancs entre pairs, réalisée dans le cadre d'un projet étudiant à visée pédagogique. Cette politique explique quelles données personnelles nous collectons lorsque vous utilisez PairMock, pourquoi nous les collectons, avec qui nous les partageons et quels sont vos droits.",
            sections: [
                {
                    heading: "1. Données collectées",
                    paragraphs: ["Nous ne collectons que les données nécessaires au fonctionnement du service :"],
                    items: [
                        "Données de compte : votre nom d'utilisateur, votre adresse e-mail, votre mot de passe (conservé uniquement sous forme de hachage sécurisé) et, si vous en ajoutez une, l'URL de votre photo de profil.",
                        "Données de compte Google : si vous vous connectez avec Google ou reliez Google Agenda, nous conservons l'identifiant de votre compte Google et les jetons d'accès fournis par Google, limités à la gestion des événements de vos entretiens blancs (création et suppression des créneaux planifiés).",
                        "Données d'entretien : les créneaux que vous créez ou réservez (description, difficulté, date, durée, statut), le code écrit pendant l'entretien, les évaluations données et reçues, ainsi que vos notifications.",
                        "Données techniques : pour chaque session de connexion, sa date d'expiration, votre adresse IP et l'agent utilisateur de votre navigateur, afin de vous garder connecté et de protéger votre compte.",
                        "Préférences : votre langue et votre thème sont enregistrés dans le stockage local de votre navigateur, et non sur nos serveurs.",
                    ],
                },
                {
                    heading: "2. Finalités",
                    paragraphs: [],
                    items: [
                        "Créer et sécuriser votre compte et maintenir votre connexion.",
                        "Vous permettre de publier, réserver et mener des entretiens blancs avec d'autres utilisateurs.",
                        "Créer l'invitation Google Agenda et le lien Google Meet d'un entretien réservé.",
                        "Afficher votre historique, vos statistiques et les évaluations laissées par vos partenaires.",
                        "Générer un retour de l'IA sur le code d'un entretien lorsque vous le demandez.",
                    ],
                },
                {
                    heading: "3. Base légale",
                    paragraphs: [
                        "Nous traitons vos données parce que c'est nécessaire pour fournir le service auquel vous vous êtes inscrit (exécution d'un contrat). La connexion à Google Agenda et l'utilisation du retour de l'IA sont facultatives et reposent sur votre consentement. Vous pouvez retirer votre consentement à tout moment en révoquant les autorisations accordées à PairMock dans les paramètres de sécurité de votre compte Google (myaccount.google.com/permissions), en nous écrivant à {{email}}, ou simplement en n'utilisant pas la fonctionnalité d'IA.",
                    ],
                    items: [],
                },
                {
                    heading: "4. Qui peut voir vos données",
                    paragraphs: [],
                    items: [
                        "Les autres utilisateurs voient votre nom d'utilisateur, votre photo de profil et les créneaux que vous publiez.",
                        "Votre partenaire d'entretien voit votre nom, le code partagé, l'évaluation que vous lui laissez et, via l'invitation d'agenda, votre adresse e-mail.",
                        "Google reçoit les détails de l'événement d'agenda (titre, description, date et participants) lorsqu'un entretien est réservé.",
                        "Groq, notre fournisseur d'IA, reçoit le code de l'entretien (et rien d'autre) lorsque vous cliquez sur un bouton de retour de l'IA. Nous ne conservons pas la réponse de l'IA.",
                        "Transferts internationaux : Google et Groq traitent les données sur des serveurs situés aux États-Unis, sous la protection du cadre UE-États-Unis de protection des données (Data Privacy Framework) et de clauses contractuelles types.",
                    ],
                },
                {
                    heading: "5. Ce que nous ne faisons jamais",
                    paragraphs: [
                        "Nous ne vendons pas vos données, n'affichons aucune publicité et n'utilisons aucun cookie de suivi ou de mesure d'audience. Le seul cookie que nous déposons est le cookie de session strictement nécessaire pour vous garder connecté.",
                    ],
                    items: [],
                },
                {
                    heading: "6. Durée de conservation",
                    paragraphs: [
                        "Vos données sont conservées tant que votre compte existe. Les sessions de connexion expirent automatiquement. Lorsque vous demandez la suppression de votre compte, vos identifiants, vos sessions et vos jetons Google associés sont supprimés. Les enregistrements d'entretiens terminés sont conservés sous forme anonymisée afin que vos partenaires puissent conserver leur historique d'entraînement.",
                    ],
                    items: [],
                },
                {
                    heading: "7. Sécurité",
                    paragraphs: [
                        "Tout le trafic est chiffré en HTTPS, les mots de passe sont hachés et jamais stockés en clair, et l'accès aux données d'un entretien est réservé à ses deux participants. Aucun système n'est parfaitement sûr, mais nous prenons des mesures raisonnables pour protéger vos données.",
                    ],
                    items: [],
                },
                {
                    heading: "8. Vos droits",
                    paragraphs: [
                        "Conformément au RGPD, vous pouvez accéder à vos données, les rectifier, les exporter ou les supprimer, et vous opposer à leur traitement ou en demander la limitation. Vous pouvez modifier votre nom et votre photo depuis votre page de profil ; pour toute autre demande (y compris la suppression de compte), contactez l'équipe étudiante à {{email}}. Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.",
                    ],
                    items: [],
                },
                {
                    heading: "9. Modifications",
                    paragraphs: [
                        "Nous pouvons mettre à jour cette politique au fil de l'évolution du projet. La date en haut de cette page indique sa dernière modification.",
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
