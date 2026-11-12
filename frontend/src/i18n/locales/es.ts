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

    brand: {
        name: "PairMock",
        tagline: "Plataforma de entrevistas técnicas simuladas entre pares",
        description: "PairMock es una plataforma colaborativa donde los desarrolladores practican entrevistas técnicas de programación juntos. Programa sesiones, resuelve problemas en un editor de código en tiempo real e intercambia comentarios estructurados.",
        features: {
            scheduleTitle: "Programa y conecta",
            scheduleDesc: "Publica horarios de entrevista o reserva sesiones disponibles filtradas por dificultad y fecha.",
            calendarTitle: "Google Calendar y Meet",
            calendarDesc: "Crea automáticamente invitaciones de Google Calendar y enlaces de Google Meet para las entrevistas reservadas.",
            editorTitle: "Editor colaborativo en vivo",
            editorDesc: "Escribe y depura código en tiempo real con resaltado de sintaxis para múltiples lenguajes.",
            feedbackTitle: "Evaluación de pares e IA",
            feedbackDesc: "Evalúa la resolución de problemas, la calidad del código y la complejidad Big-O con rúbricas y ayuda de IA.",
        },
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
            intro: "PairMock (https://pairmock.duckdns.org) es una plataforma de simulacros de entrevistas técnicas entre pares desarrollada como un proyecto estudiantil con fines educativos. Esta Política de privacidad explica en detalle qué datos personales y datos de usuario de Google recogemos cuando usas PairMock, cómo los utilizamos, almacenamos, protegemos y compartimos, cómo cumplimos la Política de datos de usuario de los servicios API de Google y cómo puedes ejercer tus derechos o eliminar tus datos.",
            sections: [
                {
                    heading: "1. Datos que recogemos (incluidos los datos de usuario de Google)",
                    paragraphs: [
                        "Solo recogemos la información personal mínima necesaria para operar PairMock y ofrecer las funciones de programación de entrevistas, edición colaborativa de código y evaluación:",
                    ],
                    items: [
                        "Datos de registro de cuenta: Cuando te registras con correo y contraseña, recogemos tu nombre de usuario, dirección de correo electrónico, contraseña (almacenada únicamente como un hash criptográfico seguro, nunca en texto plano) y la URL opcional de tu foto de perfil.",
                        "Datos de inicio de sesión con Google (alcances OAuth: openid, email, profile): Si inicias sesión con Google OAuth, recogemos el identificador único de tu cuenta de Google, tu nombre visible, tu correo electrónico y la URL de tu foto de perfil proporcionados por Google para autenticarte.",
                        "Datos de Google Calendar (alcance OAuth: https://www.googleapis.com/auth/calendar.events): Si decides publicar sesiones como anfitrión y conectas Google Calendar, almacenamos los tokens OAuth 2.0 de acceso y actualización otorgados por Google. Utilizamos este permiso exclusivamente para crear, actualizar y eliminar los eventos de Google Calendar (y sus enlaces de videollamada de Google Meet asociados) que PairMock programa cuando otro usuario reserva o cancela tu sesión. PairMock NO lee, analiza, modifica ni elimina ningún otro evento personal de tu calendario de Google.",
                        "Datos de las entrevistas y práctica: Almacenamos las sesiones que creas o reservas (descripción, dificultad, fecha y hora, duración y estado), el código fuente escrito en el editor colaborativo durante la entrevista, las evaluaciones estructuradas enviadas por los participantes y tus notificaciones.",
                        "Datos técnicos y de sesión: Por seguridad y gestión de sesiones, registramos identificadores de sesión, fechas de caducidad, direcciones IP y el agente de usuario del navegador asociados a las sesiones activas.",
                        "Preferencias locales: Tu idioma (inglés, español o francés) y el tema visual se guardan únicamente en el almacenamiento local (localStorage) de tu navegador y no se envían a nuestros servidores.",
                    ],
                },
                {
                    heading: "2. Cómo utilizamos tus datos",
                    paragraphs: [
                        "Utilizamos la información recogida exclusivamente para prestar y mantener el servicio PairMock:",
                    ],
                    items: [
                        "Autenticación y gestión de cuenta: Para crear y mantener tu cuenta, autenticarte mediante correo/contraseña o Google Sign-In y mostrar tu nombre de usuario y avatar a tus compañeros de práctica.",
                        "Programación de entrevistas simuladas: Para permitir a los usuarios publicar sesiones disponibles, explorar horarios y reservar o cancelar entrevistas de práctica.",
                        "Automatización de Google Calendar y Google Meet: Cuando un usuario reserva una sesión que tú ofreces, PairMock utiliza tu token de Google Calendar conectado para insertar automáticamente el evento en el calendario, generar un enlace de Google Meet para ambos participantes y eliminar o actualizar dicho evento si se cancela la reserva.",
                        "Edición colaborativa e historial: Para sincronizar el código en tiempo real entre los dos participantes durante la entrevista y mostrarte tu historial de código, evaluaciones y estadísticas en tu panel y perfil.",
                        "Revisión de código con IA bajo demanda: Únicamente cuando pulsas explícitamente un botón de comentarios de IA, PairMock envía el código del editor a nuestro proveedor de IA (Groq) para generar sugerencias educativas.",
                    ],
                },
                {
                    heading: "3. Cumplimiento de la Política de datos de usuario de los servicios API de Google (Uso Limitado)",
                    paragraphs: [
                        "El uso y la transferencia por parte de PairMock a cualquier otra aplicación de la información recibida de las API de Google se ajustarán a la Política de datos de usuario de los servicios API de Google (Google API Services User Data Policy), incluidos los requisitos de Uso Limitado (Limited Use).",
                    ],
                    items: [
                        "Uso Limitado: Solo utilizamos los datos de usuario de Google (tu perfil básico y permisos de eventos de Google Calendar) para ofrecer funciones visibles para el usuario en PairMock: iniciar sesión y programar automáticamente invitaciones de Google Calendar y enlaces de Google Meet para tus entrevistas reservadas.",
                        "Sin publicidad ni venta de datos: Nunca vendemos, alquilamos ni comercializamos tus datos de usuario de Google ni tu información personal a terceros, intermediarios de datos ni anunciantes, y nunca usamos datos de Google para publicidad personalizada.",
                        "Sin entrenamiento de IA con datos de Google: Nunca transferimos los datos de tu cuenta de Google, tu correo electrónico ni los datos de Google Calendar a ningún proveedor de inteligencia artificial, ni se utilizan para entrenar modelos de IA.",
                        "Sin lectura humana de datos de Google: Ninguna persona lee tus datos de usuario de Google salvo con tu consentimiento explícito para soporte técnico, por motivos de seguridad o por obligación legal.",
                    ],
                },
                {
                    heading: "4. Base jurídica del tratamiento (RGPD)",
                    paragraphs: [
                        "Para los usuarios del Espacio Económico Europeo (EEE) y el Reino Unido, tratamos tus datos personales conforme al Reglamento General de Protección de Datos (RGPD) sobre las siguientes bases: (a) Ejecución de un contrato (art. 6.1.b RGPD) para proporcionar acceso a la cuenta, reserva de sesiones, edición colaborativa y evaluaciones; (b) Consentimiento (art. 6.1.a RGPD) cuando conectas opcionalmente Google Calendar o solicitas comentarios de IA; y (c) Interés legítimo (art. 6.1.f RGPD) para mantener la seguridad del servicio.",
                    ],
                    items: [],
                },
                {
                    heading: "5. Compartición de datos, proveedores externos y transferencias internacionales",
                    paragraphs: [
                        "Solo compartimos tu información en las circunstancias estrictamente necesarias que se detallan a continuación:",
                    ],
                    items: [
                        "Otros usuarios de PairMock: Los usuarios autenticados ven tu nombre de usuario, foto de perfil y las sesiones disponibles que publicas. Al reservar una entrevista, ambos participantes ven el nombre de usuario, el código compartido, la evaluación y, a través de la invitación de Google Calendar, las direcciones de correo electrónico incluidas en el evento.",
                        "Google LLC (OAuth y Google Calendar API): Al iniciar sesión con Google o reservarse una sesión, PairMock se comunica con las API de Google para verificar tu identidad o crear el evento de calendario y el enlace de Google Meet.",
                        "Groq, Inc. (Comentarios de IA): Al pulsar un botón de IA, solo se envía el fragmento de código escrito en el editor y el lenguaje de programación a la API de Groq. Tu nombre, correo y datos de Google nunca se envían a Groq.",
                        "Transferencias internacionales: Google LLC y Groq, Inc. procesan datos en servidores que pueden estar ubicados en Estados Unidos, amparados por el Marco de Privacidad de Datos UE-EE. UU. y las Cláusulas Contractuales Tipo (CCT) de la Comisión Europea.",
                    ],
                },
                {
                    heading: "6. Cookies y tecnologías de seguimiento",
                    paragraphs: [
                        "PairMock no utiliza cookies publicitarias, píxeles de seguimiento de terceros ni cookies de análisis de comportamiento. Únicamente establecemos la cookie de sesión propia estrictamente necesaria para mantener tu sesión iniciada de forma segura.",
                    ],
                    items: [],
                },
                {
                    heading: "7. Almacenamiento y medidas de seguridad",
                    paragraphs: [
                        "Aplicamos medidas técnicas y organizativas para proteger tus datos personales y tokens OAuth de Google frente a accesos no autorizados, alteraciones o destrucciones:",
                    ],
                    items: [
                        "Cifrado en tránsito: Todas las comunicaciones entre tu navegador, nuestros servidores y las API de Google están cifradas mediante HTTPS/TLS.",
                        "Protección de credenciales y tokens: Las contraseñas se almacenan mediante hash criptográfico seguro. Los tokens OAuth de Google se guardan en una base de datos restringida accesible únicamente por el servidor backend.",
                        "Control de acceso: El acceso a las sesiones de entrevista, al código compartido y a las evaluaciones está restringido en el servidor exclusivamente a los dos participantes de la entrevista.",
                    ],
                },
                {
                    heading: "8. Conservación de datos, eliminación de cuenta y revocación de acceso de Google",
                    paragraphs: [
                        "Conservamos tus datos personales únicamente mientras tu cuenta de PairMock permanezca activa:",
                    ],
                    items: [
                        "Caducidad de sesiones: Las sesiones de inicio de sesión caducan automáticamente o al cerrar sesión.",
                        "Revocación del acceso de Google: Puedes revocar el acceso de PairMock a tu cuenta de Google y a Google Calendar en cualquier momento desde la página de permisos de tu cuenta de Google en https://myaccount.google.com/permissions o escribiéndonos a {{email}}.",
                        "Eliminación de cuenta y datos: Puedes solicitar la eliminación completa de tu cuenta de PairMock y de tus datos personales (incluidos tu perfil, correo, sesiones y tokens de Google almacenados) escribiendo a {{email}}. Eliminamos tus credenciales y tokens de Google en un plazo máximo de 30 días. Los registros de entrevistas completadas pueden conservarse de forma anonimizada para que tus compañeros mantengan su historial de práctica.",
                    ],
                },
                {
                    heading: "9. Tus derechos de privacidad",
                    paragraphs: [
                        "De acuerdo con el RGPD, tienes derecho a acceder a tus datos personales, rectificarlos, solicitar su supresión, limitar u oponerte a su tratamiento y solicitar la portabilidad de los datos. Puedes editar tu nombre de usuario y foto desde tu página de Perfil. Para ejercer cualquier otro derecho o realizar consultas sobre privacidad, escríbenos a {{email}}. También tienes derecho a presentar una reclamación ante tu autoridad de protección de datos (como la CNIL en Francia o la AEPD en España).",
                    ],
                    items: [],
                },
                {
                    heading: "10. Cambios en esta Política de privacidad",
                    paragraphs: [
                        "Podemos actualizar esta Política de privacidad periódicamente para reflejar mejoras del servicio o requisitos legales. La fecha de «Última actualización» al inicio de esta página indica cuándo se realizó el último cambio.",
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
                        "Debes tener al menos 15 años (edad de consentimiento digital en Francia) o contar con la autorización de tus tutores legales para utilizar PairMock.",
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

    analytics: {
        title: "Panel de análisis de datos",
        description: "Tu progreso en todas las entrevistas completadas",
        filter: {
            all: "Todas las dificultades",
            easy: "Fácil",
            medium: "Medio",
            hard: "Difícil",
        },
        exportCsv: "Exportar CSV",
        lastUpdated: "Última actualización: {{time}}",
        kpis: {
            interviews: "Entrevistas",
            averageScore: "Puntuación media",
            strength: "Punto fuerte",
            workOn: "A mejorar",
        },
        skills: {
            problemSolving: "Resolución de problemas",
            codeQuality: "Calidad del código",
            complexityAnalysis: "Análisis de complejidad",
            communication: "Comunicación",
            average: "Promedio",
        },
        charts: {
            scoreEvolution: {
                title: "Evolución de puntuaciones",
                description: "Puntuación obtenida en cada entrevista",
            },
            skillsRadar: {
                title: "Perfil de habilidades",
                description: "Promedio por habilidad",
            },
            difficultyBar: {
                title: "Notas por dificultad",
                description: "Ordenado por dificultad ascendente",
                tooltip_one: "{{count}} entrevista",
                tooltip_other: "{{count}} entrevistas",
            },
        },
    },
};

export default es;
