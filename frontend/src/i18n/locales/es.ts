import type { Translation } from "./en";

const es: Translation = {
    common: {
        dashboard: "Panel",
        profile: "Perfil",
        cancel: "Cancelar",
        continue: "Continuar",
        loading: "Cargando...",
        notLoggedIn: "No has iniciado sesión",
        user: "Usuario",
    },

    footer: {
        dashboard: "Panel",
        login: "Iniciar sesión",
        privacy: "Política de privacidad",
        terms: "Términos del servicio",
        language: "Idioma",
    },

    theme: {
        toggle: "Cambiar tema",
        light: "Claro",
        dark: "Oscuro",
        system: "Sistema",
    },

    auth: {
        email: "Correo electrónico",
        emailPlaceholder: "tu@ejemplo.com",
        password: "Contraseña",
        passwordPlaceholder: "Introduce tu contraseña",
        serverUnreachable: "No se puede conectar con el servidor.",
        login: {
            title: "Inicia sesión en tu cuenta",
            description: "Introduce tu correo electrónico para iniciar sesión",
            signUp: "Registrarse",
            submit: "Iniciar sesión",
            google: "Iniciar sesión con Google",
            failed: "Error al iniciar sesión.",
        },
        register: {
            title: "Crear una cuenta",
            description: "Introduce tus datos para crear tu cuenta",
            signIn: "Iniciar sesión",
            username: "Nombre de usuario",
            usernamePlaceholder: "Elige un nombre de usuario",
            confirmPassword: "Confirmar contraseña",
            confirmPasswordPlaceholder: "Confirma tu contraseña",
            submit: "Registrarse",
            mismatch: "Las contraseñas no coinciden.",
            failed: "Error en el registro.",
            consent: "Al crear una cuenta, aceptas nuestros <terms>Términos del servicio</terms> y reconoces haber leído nuestra <privacy>Política de privacidad</privacy>.",
        },
    },

    nav: {
        notifications: "Notificaciones",
        noNotifications: "No hay notificaciones",
        deleteNotification: "Eliminar notificación",
        logOut: "Cerrar sesión",
        notifDeleted: {
            title: "¡Notificación eliminada!",
            description: "Tu notificación se ha eliminado correctamente.",
        },
        notifDeleteFailed: {
            title: "Error al eliminar",
            description: "No se ha podido eliminar esta notificación.",
        },
        logoutDialog: {
            title: "¿Estás completamente seguro?",
            description: "Se cerrará tu sesión.",
        },
    },

    dashboard: {
        bookedSlots: "Sesiones reservadas:",
        availableSlots: "Sesiones disponibles:",
        noSlots: "No hay sesiones disponibles. ¡Crea la tuya!",
        timePlaceholder: "Fecha",
        difficultyPlaceholder: "Dificultad",
        sort: {
            asc: "Más próximas primero",
            desc: "Más lejanas primero",
        },
        filter: {
            easy: "Fácil",
            medium: "Media",
            hard: "Difícil",
            all: "Todas",
        },
        toast: {
            booked: { title: "¡Sesión reservada!", description: "Esta sesión se ha reservado correctamente." },
            bookFailed: { title: "Error en la reserva", description: "No se ha podido reservar esta sesión. Inténtalo más tarde." },
            canceled: { title: "¡Sesión cancelada!", description: "Esta sesión se ha cancelado correctamente." },
            cancelFailed: { title: "Error al cancelar", description: "No se ha podido cancelar esta sesión. Inténtalo más tarde." },
            deleted: { title: "¡Sesión eliminada!", description: "La sesión se ha eliminado correctamente." },
            deleteFailed: { title: "Error al eliminar", description: "No se ha podido eliminar esta sesión." },
        },
    },

    pagination: {
        previous: "Anterior",
        next: "Siguiente",
    },

    difficulty: {
        EASY: "Fácil",
        MEDIUM: "Media",
        HARD: "Difícil",
    },

    slot: {
        deleteAria: "Eliminar sesión",
        duration: "{{count}} min",
        book: "Reservar",
        hosted: "Tu sesión",
        enter: "Entrar a la entrevista",
        cancel: "Cancelar",
        history: "Ver historial",
        deleteDialog: {
            title: "¿Estás seguro?",
            description: "Esta sesión se eliminará.",
            deleting: "Eliminando...",
            confirm: "Eliminar sesión",
        },
    },

    slotCreation: {
        trigger: "Crear sesión",
        title: "Crear una sesión",
        description: "Configura tu nueva sesión de entrevista.",
        connectTitle: "Conectar Google Calendar",
        connectDescription: "Cuando alguien reserva tu sesión, PairMock crea automáticamente una invitación de Google Calendar y un enlace de Google Meet para los dos. Conecta tu cuenta de Google una sola vez para empezar a ofrecer sesiones.",
        connectButton: "Conectar Google Calendar",
        form: {
            description: "Descripción",
            descriptionPlaceholder: "¿Qué te gustaría practicar?",
            descriptionHelp: "Describe la sesión de entrevista.",
            difficulty: "Dificultad",
            dateTime: "Fecha y hora",
            duration: "Duración (minutos)",
            submit: "Crear sesión",
            failedFallback: "No se ha podido crear la sesión",
        },
        toast: {
            created: { title: "¡Sesión creada!", description: "Tu sesión de entrevista ya está disponible." },
            failed: { title: "¡Error al crear la sesión!", description: "No se ha podido crear tu sesión." },
        },
    },

    profile: {
        imageLabel: "Foto de perfil",
        username: "Nombre de usuario",
        save: "Guardar",
        noChanges: "No se ha realizado ningún cambio",
        saved: "Se ha guardado la información de tu perfil",
        error: "Se ha producido un error inesperado",
        stats: {
            passed: "Entrevistas realizadas: {{count}}",
            hours: "Horas de práctica: {{count}}",
            score: "Puntuación media: {{score}}",
        },
        passedHeading: "Entrevistas realizadas:",
        analytics: "Ver estadísticas",
        emptyDescription: "No hay entrevistas completadas"
    },

    interview: {
        loading: "Cargando la sesión de entrevista...",
        languagePlaceholder: "Lenguaje",
        joinMeet: "Unirse a Google Meet",
        thanks: "¡Gracias por tu evaluación!",
        exit: "Salir de la entrevista",
        console: "Consola",
        questionnaire: {
            previous: "Anterior",
            skip: "Omitir",
            next: "Siguiente",
            submit: "Guardar evaluación",
        },
        toast: {
            feedbackSaved: "Se ha guardado la evaluación",
            feedbackFailed: "No se ha podido guardar la evaluación",
            codeSaved: { title: "¡Código añadido a la revisión!", description: "Esta sesión se ha actualizado." },
            updateFailed: { title: "Error al actualizar", description: "No se ha podido actualizar esta sesión. Inténtalo más tarde." },
        },
        exitDialog: {
            title: "¿Estás completamente seguro?",
            description: "Una vez que salgas de esta entrevista, no podrás volver a unirte a la sesión. Asegúrate de haber terminado todo antes de salir.",
            saving: "Guardando...",
        },
        timer: {
            notStarted: "La entrevista aún no ha empezado",
            over: "La entrevista ha terminado",
        },
    },

    review: {
        loading: "Cargando la revisión de la entrevista...",
        readOnly: "PÁGINA DE REVISIÓN (SOLO LECTURA)",
        feedbackHeading: "Evaluación:",
    },

    questionnaire: {
        problemSolving: {
            title: "Resolución de problemas y diseño de algoritmos",
            description: "Puntúa de 0 (no lo resolvió) a 5 (enfoque óptimo sin pistas).",
            choices: {
                "5": "Enfoque óptimo sin pistas",
                "4": "Resuelto con poca ayuda",
                "3": "Resuelto con bastante ayuda",
                "2": "Enfoque subóptimo o de fuerza bruta",
                "1": "Le costó avanzar",
                "0": "No lo resolvió",
            },
        },
        codeQuality: {
            title: "Calidad del código e implementación",
            description: "Puntúa de 0 (roto/ilegible) a 5 (limpio, idiomático, sin errores).",
            choices: {
                "5": "Limpio, idiomático, sin errores",
                "4": "Legible con pequeños fallos de estilo",
                "3": "Funciona, pero desordenado o poco organizado",
                "2": "Errores o fallos de sintaxis importantes",
                "1": "Difícil de seguir, varios errores",
                "0": "Roto e ilegible",
            },
        },
        complexityAnalysis: {
            title: "Complejidad temporal y espacial (Big-O)",
            description: "Puntúa de 0 (incorrecta/ausente) a 5 (análisis Big-O exacto de tiempo y espacio).",
            choices: {
                "5": "Análisis Big-O exacto de tiempo y espacio",
                "4": "Correcto con un poco de ayuda",
                "3": "Análisis parcialmente correcto",
                "2": "Confundió complejidad temporal y espacial",
                "1": "Lo adivinó sin razonar",
                "0": "Análisis incorrecto o ausente",
            },
        },
        communication: {
            title: "Comunicación y razonamiento",
            description: "Puntúa de 0 (en silencio/confuso) a 5 (razonamiento estructurado en voz alta).",
            choices: {
                "5": "Razonamiento estructurado en voz alta",
                "4": "Buena comunicación con alguna duda",
                "3": "A veces hubo que animarle a hablar",
                "2": "Callado, explicaciones poco claras",
                "1": "Comunicación mínima",
                "0": "En silencio o incoherente",
            },
        },
        signals: {
            title: "¿Qué señales positivas mostró el candidato?",
            description: "Selecciona todas las que correspondan u omite esta pregunta.",
            choices: {
                "clarified-constraints": "Aclaró las restricciones y casos límite desde el principio",
                "compared-tradeoffs": "Comparó alternativas antes de programar",
                "dry-run": "Ejecutó el código a mano con casos de prueba",
                "self-debugged": "Detectó y corrigió errores por su cuenta",
            },
        },
        outcome: {
            title: "¿Cuál fue el resultado final del ejercicio?",
            description: "Selecciona el resultado del ejercicio de programación.",
            inputLabel: "Comentario personalizado",
            inputPlaceholder: "Añade consejos concretos o casos límite olvidados…",
            choices: {
                "optimal-no-hints": "Resuelto de forma óptima sin pistas",
                "optimal-with-hints": "Resuelto de forma óptima con algunas pistas",
                "suboptimal": "Solución funcional de fuerza bruta / subóptima",
                "incomplete": "No terminó una solución funcional",
            },
        },
    },

    ai: {
        heading: "Comentarios de la IA",
        empty: "Pulsa un botón para obtener comentarios de la IA sobre el código.",
        errorTitle: "Problema con la IA",
        buttons: {
            tips: "Consejos",
            complexity: "Complejidad",
            bugs: "Errores",
            optimal: "Solución óptima",
        },
        errors: {
            NO_CODE: "No hay código que revisar.",
            CODE_TOO_LONG: "El código es demasiado largo para revisarlo.",
            INVALID_TYPE: "Tipo de revisión desconocido.",
            UNAUTHORIZED: "Vuelve a iniciar sesión.",
            FORBIDDEN: "No tienes acceso a esta entrevista.",
            NOT_FOUND: "Entrevista no encontrada.",
            AI_FAILED: "La revisión de la IA ha fallado. Inténtalo más tarde.",
        },
    },

    legal: {
        lastUpdated: "Última actualización: {{date}}",
        back: "Volver",
        privacy: {
            title: "Política de privacidad",
            intro: "PairMock es una plataforma de simulacros de entrevistas técnicas entre compañeros, desarrollada como proyecto de estudiantes. Esta política explica qué datos personales recogemos cuando usas PairMock, para qué, con quién los compartimos y qué derechos tienes sobre ellos.",
            sections: [
                {
                    heading: "1. Datos que recogemos",
                    paragraphs: ["Solo recogemos los datos necesarios para que el servicio funcione:"],
                    items: [
                        "Datos de la cuenta: tu nombre de usuario, tu correo electrónico, tu contraseña (guardada únicamente como hash seguro) y, si la añades, la URL de tu foto de perfil.",
                        "Datos de la cuenta de Google: si inicias sesión con Google o conectas Google Calendar, guardamos el identificador de tu cuenta de Google y los tokens de acceso que nos proporciona Google, limitados al permiso para crear eventos de calendario.",
                        "Datos de las entrevistas: las sesiones que creas o reservas (descripción, dificultad, fecha, duración, estado), el código escrito durante la entrevista, las evaluaciones que das y recibes y tus notificaciones.",
                        "Datos técnicos: para cada sesión de inicio de sesión, su fecha de caducidad, tu dirección IP y el agente de usuario de tu navegador, para mantenerte conectado y proteger tu cuenta.",
                        "Preferencias: tu idioma y tu tema se guardan en el almacenamiento local de tu navegador, no en nuestros servidores.",
                    ],
                },
                {
                    heading: "2. Para qué los usamos",
                    paragraphs: [],
                    items: [
                        "Para crear y proteger tu cuenta y mantener tu sesión iniciada.",
                        "Para que puedas publicar, reservar y realizar simulacros de entrevista con otros usuarios.",
                        "Para crear la invitación de Google Calendar y el enlace de Google Meet de una entrevista reservada.",
                        "Para mostrarte tu historial, tus estadísticas y las evaluaciones de tus compañeros.",
                        "Para generar comentarios de la IA sobre el código de una entrevista cuando lo solicitas.",
                    ],
                },
                {
                    heading: "3. Base jurídica",
                    paragraphs: [
                        "Tratamos tus datos porque es necesario para prestarte el servicio en el que te has registrado (ejecución de un contrato). Conectar Google Calendar y solicitar comentarios de la IA es opcional y se basa en tu consentimiento, que puedes retirar en cualquier momento desvinculando tu cuenta de Google o simplemente no usando la función de IA.",
                    ],
                    items: [],
                },
                {
                    heading: "4. Quién puede ver tus datos",
                    paragraphs: [],
                    items: [
                        "Los demás usuarios ven tu nombre de usuario, tu foto de perfil y las sesiones que publicas.",
                        "Tu compañero de entrevista ve tu nombre, el código compartido, la evaluación que le dejas y, a través de la invitación de calendario, tu correo electrónico.",
                        "Google recibe los detalles del evento de calendario (título, descripción, fecha y asistentes) cuando se reserva una entrevista.",
                        "Groq, nuestro proveedor de IA, recibe el código de la entrevista (y nada más) cuando pulsas un botón de comentarios de la IA. No guardamos la respuesta de la IA.",
                    ],
                },
                {
                    heading: "5. Lo que nunca hacemos",
                    paragraphs: [
                        "No vendemos tus datos, no mostramos publicidad y no usamos cookies de seguimiento ni de analítica. La única cookie que usamos es la cookie de sesión estrictamente necesaria para mantenerte conectado.",
                    ],
                    items: [],
                },
                {
                    heading: "6. Cuánto tiempo los conservamos",
                    paragraphs: [
                        "Tus datos se conservan mientras exista tu cuenta. Las sesiones de inicio de sesión caducan automáticamente. Cuando se elimina tu cuenta, se eliminan también tus sesiones y los tokens de Google vinculados.",
                    ],
                    items: [],
                },
                {
                    heading: "7. Seguridad",
                    paragraphs: [
                        "Todo el tráfico se cifra con HTTPS, las contraseñas se guardan con hash y nunca en texto plano, y el acceso a los datos de una entrevista está limitado a sus dos participantes. Ningún sistema es totalmente seguro, pero tomamos medidas razonables para proteger tus datos.",
                    ],
                    items: [],
                },
                {
                    heading: "8. Tus derechos",
                    paragraphs: [
                        "De acuerdo con el RGPD, puedes acceder a tus datos, rectificarlos, exportarlos o suprimirlos, y oponerte a su tratamiento o pedir su limitación. Puedes cambiar tu nombre y tu foto desde tu página de perfil; para cualquier otra solicitud, escríbenos a {{email}}. Si consideras que no se respetan tus derechos, puedes presentar una reclamación ante tu autoridad de protección de datos (en Francia, la CNIL).",
                    ],
                    items: [],
                },
                {
                    heading: "9. Cambios",
                    paragraphs: [
                        "Podemos actualizar esta política a medida que evolucione el proyecto. La fecha que aparece al principio de esta página indica cuándo se modificó por última vez.",
                    ],
                    items: [],
                },
            ],
        },
        terms: {
            title: "Términos del servicio",
            intro: "Estos Términos del servicio regulan el uso de PairMock. Al crear una cuenta o usar la plataforma, los aceptas. Si no estás de acuerdo, no utilices PairMock.",
            sections: [
                {
                    heading: "1. El servicio",
                    paragraphs: [
                        "PairMock permite a los usuarios practicar entrevistas técnicas juntos: puedes publicar sesiones, reservar las que ofrecen otros, programar juntos en un editor compartido, intercambiar evaluaciones y pedir sugerencias generadas por IA. PairMock es un proyecto de estudiantes gratuito, destinado únicamente a la práctica.",
                    ],
                    items: [],
                },
                {
                    heading: "2. Tu cuenta",
                    paragraphs: [],
                    items: [
                        "Debes proporcionar información veraz y mantener tu contraseña en secreto.",
                        "Eres responsable de toda la actividad realizada con tu cuenta.",
                        "Una persona, una cuenta: no suplantes a nadie ni crees cuentas para otras personas.",
                    ],
                },
                {
                    heading: "3. Uso aceptable",
                    paragraphs: ["Al usar PairMock, te comprometes a no:"],
                    items: [
                        "acosar, insultar o discriminar a otros usuarios, durante las entrevistas o en las descripciones de las sesiones;",
                        "compartir contenido ilegal, ofensivo o que no tengas derecho a compartir;",
                        "pegar secretos, contraseñas o datos personales de otras personas en el editor compartido;",
                        "intentar acceder a entrevistas o datos que no son tuyos, ni perturbar el servicio;",
                        "reservar sesiones a las que no piensas asistir, ni cancelar repetidamente en el último momento.",
                    ],
                },
                {
                    heading: "4. Tu contenido",
                    paragraphs: [
                        "El código y las evaluaciones que escribes siguen siendo tuyos. Autorizas a PairMock a guardarlos y mostrárselos a tu compañero de entrevista, y a enviar el código a nuestro proveedor de IA cuando tú o tu compañero solicitéis comentarios de la IA, con el único fin de prestar el servicio.",
                    ],
                    items: [],
                },
                {
                    heading: "5. Servicios de Google",
                    paragraphs: [
                        "Para ofrecer sesiones es necesario conectar una cuenta de Google, de modo que PairMock pueda crear eventos de calendario y enlaces de Google Meet. El uso de esos servicios se rige también por las condiciones de Google.",
                    ],
                    items: [],
                },
                {
                    heading: "6. Comentarios de la IA",
                    paragraphs: [
                        "Los comentarios de la IA se generan automáticamente y pueden ser incompletos o incorrectos. Úsalos como ayuda para aprender, no como una evaluación definitiva.",
                    ],
                    items: [],
                },
                {
                    heading: "7. Disponibilidad y responsabilidad",
                    paragraphs: [
                        "PairMock se ofrece «tal cual», sin garantía de disponibilidad, exactitud ni idoneidad para un fin concreto. Las entrevistas en PairMock son sesiones de práctica y no conducen a ninguna oferta de empleo. En la medida en que lo permita la ley, no somos responsables de los daños derivados del uso del servicio.",
                    ],
                    items: [],
                },
                {
                    heading: "8. Suspensión y baja",
                    paragraphs: [
                        "Puedes dejar de usar PairMock en cualquier momento. Podemos suspender o eliminar las cuentas que incumplan estos términos.",
                    ],
                    items: [],
                },
                {
                    heading: "9. Cambios y contacto",
                    paragraphs: [
                        "Podemos actualizar estos términos; si sigues usando PairMock después de un cambio, aceptas la nueva versión. Estos términos se rigen por la legislación francesa. ¿Tienes preguntas? Escríbenos a {{email}}.",
                    ],
                    items: [],
                },
            ],
        },
    },
};

export default es;
