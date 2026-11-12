const en = {
    common: {
        dashboard: "Dashboard",
        profile: "Profile",
        cancel: "Cancel",
        continue: "Continue",
        loading: "Loading...",
        notLoggedIn: "Not logged in",
        user: "User",
    },

    brand: {
        name: "PairMock",
        tagline: "Peer-to-Peer Mock Technical Interview Platform",
        description: "PairMock is a collaborative platform where developers practice technical coding interviews together. Schedule sessions, solve problems in a real-time shared code editor, and exchange structured feedback.",
        features: {
            scheduleTitle: "Schedule & Match",
            scheduleDesc: "Publish mock interview slots or book available sessions filtered by difficulty and time.",
            calendarTitle: "Google Calendar & Meet",
            calendarDesc: "Automatically creates Google Calendar invitations and Google Meet video links for booked interviews.",
            editorTitle: "Live Collaborative Editor",
            editorDesc: "Write and debug code together in real time with multi-language syntax highlighting.",
            feedbackTitle: "Peer & AI Feedback",
            feedbackDesc: "Evaluate problem solving, code quality, and Big-O complexity with rubric-based and AI-assisted reviews.",
        },
    },

    footer: {
        dashboard: "Dashboard",
        login: "Log in",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        language: "Language",
    },

    theme: {
        toggle: "Toggle theme",
        light: "Light",
        dark: "Dark",
        system: "System",
    },

    auth: {
        email: "Email",
        emailPlaceholder: "you@example.com",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        serverUnreachable: "Unable to connect to the server.",
        login: {
            title: "Login to your account",
            description: "Enter your email below to login to your account",
            signUp: "Sign Up",
            submit: "Login",
            google: "Login with Google",
            failed: "Login failed.",
        },
        register: {
            title: "Create an account",
            description: "Enter your information below to create your account",
            signIn: "Sign in",
            username: "Username",
            usernamePlaceholder: "Choose a username",
            confirmPassword: "Confirm Password",
            confirmPasswordPlaceholder: "Confirm your password",
            submit: "Register",
            mismatch: "Passwords do not match.",
            failed: "Registration failed.",
            consent: "By creating an account, you agree to our <terms>Terms of Service</terms> and acknowledge our <privacy>Privacy Policy</privacy>.",
        },
    },

    nav: {
        notifications: "Notifications",
        noNotifications: "No notifications",
        deleteNotification: "Delete notification",
        logOut: "Log Out",
        notifDeleted: {
            title: "Notification deleted!",
            description: "Your notification has been deleted successfully.",
        },
        notifDeleteFailed: {
            title: "Deletion failed",
            description: "Unable to delete this notification.",
        },
        logoutDialog: {
            title: "Are you absolutely sure?",
            description: "You will be logged out.",
        },
    },

    dashboard: {
        bookedSlots: "Booked slots:",
        availableSlots: "Available slots:",
        noSlots: "No slots available. Create your own!",
        timePlaceholder: "Time",
        difficultyPlaceholder: "Difficulty",
        sort: {
            asc: "Earliest First",
            desc: "Latest First",
        },
        filter: {
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",
            all: "All",
        },
        toast: {
            booked: { title: "Slot booked!", description: "This slot has been booked successfully." },
            bookFailed: { title: "Booking failed", description: "Unable to book this slot. Retry later." },
            canceled: { title: "Slot canceled!", description: "This slot has been canceled successfully." },
            cancelFailed: { title: "Cancelation failed", description: "Unable to cancel this slot. Retry later." },
            deleted: { title: "Slot deleted!", description: "Slot deleted successfully." },
            deleteFailed: { title: "Deletion failed", description: "Unable to delete this slot." },
        },
    },

    pagination: {
        previous: "Previous",
        next: "Next",
    },

    difficulty: {
        EASY: "Easy",
        MEDIUM: "Medium",
        HARD: "Hard",
    },

    slot: {
        deleteAria: "Delete slot",
        duration: "{{count}} min",
        book: "Book Slot",
        hosted: "Hosted Slot",
        enter: "Enter interview",
        cancel: "Cancel",
        history: "View history",
        deleteDialog: {
            title: "Are you sure?",
            description: "This slot will be deleted.",
            deleting: "Deleting...",
            confirm: "Delete slot",
        },
    },

    slotCreation: {
        trigger: "Create Slot",
        title: "Create a Slot",
        description: "Configure your new interview slot.",
        connectTitle: "Connect Google Calendar",
        connectDescription: "When someone books your slot, PairMock automatically creates a Google Calendar invite and a Google Meet link for both of you. Connect your Google Account once to start hosting slots.",
        connectButton: "Connect Google Calendar",
        form: {
            description: "Description",
            descriptionPlaceholder: "What would you like to practice?",
            descriptionHelp: "Describe the interview session.",
            difficulty: "Difficulty",
            dateTime: "Date & Time",
            duration: "Duration (minutes)",
            submit: "Create Slot",
            failedFallback: "Failed to create slot",
        },
        toast: {
            created: { title: "Slot created!", description: "Your interview slot is now available." },
            failed: { title: "Slot creation failed!", description: "Unable to create your slot." },
        },
    },

    profile: {
        imageLabel: "Profile image",
        username: "Username",
        save: "Save",
        noChanges: "No changes have actually been made",
        saved: "Profile information has been saved",
        error: "An unexpected error occurred",
        stats: {
            passed: "Passed interviews: {{count}}",
            hours: "Hours of practice: {{count}}",
            score: "Feedback score: {{score}}",
        },
        passedHeading: "Passed interviews:",
        analytics: "View Analytics",
        emptyDescription: "No completed interviews"
    },

    interview: {
        loading: "Loading interview session...",
        languagePlaceholder: "Language",
        joinMeet: "Join Google Meet",
        thanks: "Thanks for providing feedback!",
        exit: "Exit Interview",
        console: "Console",
        questionnaire: {
            previous: "Previous",
            skip: "Skip",
            next: "Next",
            submit: "Save feedback",
        },
        toast: {
            feedbackSaved: "Feedback has been saved",
            feedbackFailed: "Failed to save feedback",
            codeSaved: { title: "Code added to review!", description: "This slot has been updated." },
            updateFailed: { title: "Update failed", description: "Unable to update this slot. Retry later." },
        },
        exitDialog: {
            title: "Are you absolutely sure?",
            description: "Once you leave this interview, you won't be able to rejoin the session. Make sure you've completed everything before leaving.",
            saving: "Saving...",
        },
        timer: {
            notStarted: "Interview has not started yet",
            over: "Interview is over",
        },
    },

    review: {
        loading: "Loading interview review session...",
        readOnly: "REVIEW PAGE (READ-ONLY)",
        feedbackHeading: "Feedback:",
    },

    questionnaire: {
        problemSolving: {
            title: "Problem Solving & Algorithm Design",
            description: "Rate from 0 (did not solve) to 5 (optimal approach without hints).",
            choices: {
                "5": "Optimal approach without hints",
                "4": "Solved with minor guidance",
                "3": "Solved with significant guidance",
                "2": "Suboptimal or brute-force approach",
                "1": "Struggled to make progress",
                "0": "Did not solve",
            },
        },
        codeQuality: {
            title: "Code Quality & Implementation",
            description: "Rate from 0 (broken/unreadable) to 5 (clean, idiomatic, bug-free).",
            choices: {
                "5": "Clean, idiomatic, bug-free",
                "4": "Readable with minor style flaws",
                "3": "Working but messy or unorganized",
                "2": "Significant bugs or syntax issues",
                "1": "Hard to follow, multiple bugs",
                "0": "Broken and unreadable",
            },
        },
        complexityAnalysis: {
            title: "Time & Space Complexity (Big-O)",
            description: "Rate from 0 (incorrect/missing) to 5 (accurate Time & Space Big-O analysis).",
            choices: {
                "5": "Accurate Time & Space Big-O analysis",
                "4": "Correct with minor prompting",
                "3": "Partially correct analysis",
                "2": "Confused time and space complexity",
                "1": "Guessed without reasoning",
                "0": "Incorrect or missing analysis",
            },
        },
        communication: {
            title: "Communication & Thought Process",
            description: "Rate from 0 (silent/unclear) to 5 (structured thinking out loud).",
            choices: {
                "5": "Structured thinking out loud",
                "4": "Good communication with slight hesitation",
                "3": "Needed occasional prompting to speak",
                "2": "Quiet, unclear explanations",
                "1": "Minimal communication",
                "0": "Silent or incoherent",
            },
        },
        signals: {
            title: "Which positive signals did the candidate show?",
            description: "Select all that apply, or skip this question.",
            choices: {
                "clarified-constraints": "Clarified constraints & edge cases early",
                "compared-tradeoffs": "Compared trade-offs before coding",
                "dry-run": "Dry-ran code with test cases",
                "self-debugged": "Caught and fixed bugs independently",
            },
        },
        outcome: {
            title: "What was the final result of the coding task?",
            description: "Select the outcome of the coding task.",
            inputLabel: "Custom feedback note",
            inputPlaceholder: "Add specific advice or missed edge cases…",
            choices: {
                "optimal-no-hints": "Solved optimally without hints",
                "optimal-with-hints": "Solved optimally with minor hints",
                "suboptimal": "Working brute-force / suboptimal solution",
                "incomplete": "Did not finish a working solution",
            },
        },
    },

    ai: {
        heading: "AI Feedback",
        empty: "Click a button to get AI feedback on the code.",
        errorTitle: "Issue with AI",
        buttons: {
            tips: "Tips",
            complexity: "Complexity",
            bugs: "Bugs",
            optimal: "Optimal solution",
        },
        errors: {
            NO_CODE: "There is no code to review.",
            CODE_TOO_LONG: "The code is too long to review.",
            INVALID_TYPE: "Unknown review type.",
            UNAUTHORIZED: "Please log in again.",
            FORBIDDEN: "You don't have access to this interview.",
            NOT_FOUND: "Interview not found.",
            AI_FAILED: "The AI review failed. Please try again later.",
        },
    },

    legal: {
        lastUpdated: "Last updated: {{date}}",
        back: "Back",
        privacy: {
            title: "Privacy Policy",
            intro: "PairMock (https://pairmock.duckdns.org) is a peer-to-peer mock technical interview platform built as an educational student project. This Privacy Policy explains in detail what personal data and Google user data we collect when you use PairMock, how we use, store, protect, and share that data, how we comply with the Google API Services User Data Policy, and how you can exercise your privacy rights or delete your data.",
            sections: [
                {
                    heading: "1. Data We Collect (Including Google User Data)",
                    paragraphs: [
                        "We collect only the minimum personal information necessary to operate PairMock and provide mock technical interview scheduling, collaborative coding, and feedback features:",
                    ],
                    items: [
                        "Account Registration Data: When you register with an email and password, we collect your chosen username, email address, password (stored strictly as a cryptographic hash, never in plain text), and optional profile image URL.",
                        "Google Sign-In Data (OAuth Scopes: openid, email, profile): If you sign in using Google OAuth, we collect your Google account unique identifier, display name, email address, and profile picture URL provided by Google to authenticate you and populate your PairMock profile.",
                        "Google Calendar Data (OAuth Scope: https://www.googleapis.com/auth/calendar.events): If you choose to host interview slots and connect Google Calendar, we store OAuth 2.0 access and refresh tokens granted by Google. We use this scope solely to create, update, and delete Google Calendar events (and their attached Google Meet video conference links) that PairMock schedules when another user books or cancels your mock interview slot. PairMock does NOT read, scan, modify, or delete any existing personal events on your Google Calendar.",
                        "Interview & Practice Data: We store the interview slots you publish or book (topic description, difficulty level, scheduled date/time, duration, and booking status), the source code written in the shared collaborative editor during an interview session, structured peer feedback and ratings submitted by participants, and in-app notifications.",
                        "Technical & Session Data: For security and session management, we record session identifiers, session expiration timestamps, IP addresses, and browser user-agent strings associated with active login sessions.",
                        "Local Preferences: Your UI language (English, Spanish, or French) and visual theme (Light, Dark, or System) are stored locally in your browser's localStorage and are not transmitted to our servers.",
                    ],
                },
                {
                    heading: "2. How We Use Your Data",
                    paragraphs: [
                        "We use the collected information strictly to deliver and maintain the PairMock service:",
                    ],
                    items: [
                        "Authentication & Account Management: To create and maintain your account, authenticate you via email/password or Google Sign-In, and display your username and avatar to your interview partners.",
                        "Mock Interview Scheduling & Matchmaking: To allow users to publish available interview slots, browse open sessions, and book or cancel practice interviews.",
                        "Google Calendar & Google Meet Automation: When a user books a slot hosted by you, PairMock uses your connected Google Calendar token to automatically insert a calendar event for the session, generate a Google Meet video link for both participants, and remove or update that specific calendar event if the booking is canceled or deleted.",
                        "Collaborative Coding & History: To synchronize code in real time between the two participants during an active interview and display your past interview code, peer feedback, and performance analytics on your dashboard and profile.",
                        "On-Demand AI Code Review: Only when you explicitly click an AI feedback button (Tips, Complexity, Bugs, or Optimal Solution), PairMock sends the source code from the interview editor to our AI inference provider (Groq) to generate educational suggestions.",
                    ],
                },
                {
                    heading: "3. Google API Services User Data Policy & Limited Use Compliance",
                    paragraphs: [
                        "PairMock's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
                    ],
                    items: [
                        "Limited Use: We only use Google user data (your Google profile details and Google Calendar event permissions) to provide user-facing features that are prominent in the PairMock application—specifically signing you in and automatically scheduling Google Calendar invitations and Google Meet links for your booked mock interviews.",
                        "No Advertising or Data Brokering: We never sell, rent, license, or trade your Google user data or personal information to any third party, data broker, or advertiser, and we never use Google user data for targeted or personalized advertising.",
                        "No AI Training on Google User Data: We never transfer your Google account data, email address, or Google Calendar data to any artificial intelligence provider or external model, nor is Google user data ever used to train AI models.",
                        "No Human Reading of Google Data: No human reads your Google user data unless we have your affirmative agreement for a specific support request, it is necessary for security/abuse investigation, or it is required to comply with applicable law.",
                    ],
                },
                {
                    heading: "4. Legal Basis for Processing (GDPR)",
                    paragraphs: [
                        "For users in the European Economic Area (EEA) and United Kingdom, we process your personal data under the following legal bases under the General Data Protection Regulation (GDPR): (a) Performance of a Contract (Article 6(1)(b) GDPR) to provide account access, slot booking, collaborative coding, and feedback features you register for; (b) Consent (Article 6(1)(a) GDPR) when you optionally connect your Google Calendar or trigger on-demand AI code feedback; and (c) Legitimate Interests (Article 6(1)(f) GDPR) to maintain session security and prevent unauthorized access.",
                    ],
                    items: [],
                },
                {
                    heading: "5. Data Sharing, Third-Party Service Providers & International Transfers",
                    paragraphs: [
                        "We share your information only in the limited circumstances below:",
                    ],
                    items: [
                        "Other PairMock Users: Authenticated users can see your username, profile picture, and any available interview slots you publish. When an interview is booked, both participants see each other's username, shared interview code, peer feedback, and—via the Google Calendar invitation—the participant email addresses included on the calendar invite.",
                        "Google LLC (OAuth & Google Calendar API): When you sign in with Google or when a hosted slot is booked, PairMock communicates directly with Google APIs to verify your identity or create the calendar event (title, description, start/end time, and participant emails) and Google Meet link.",
                        "Groq, Inc. (AI Code Feedback): When you click an AI feedback button, only the code snippet written in the interview editor and the selected programming language are transmitted to Groq's API to generate a response. Your name, email address, and Google user data are never sent to Groq. We do not permanently store the AI response on our servers.",
                        "International Data Transfers: Google LLC and Groq, Inc. process data on servers that may be located in the United States. Such transfers are safeguarded under the EU-U.S. Data Privacy Framework and European Commission Standard Contractual Clauses (SCCs).",
                    ],
                },
                {
                    heading: "6. Cookies and Tracking Technologies",
                    paragraphs: [
                        "PairMock does not use advertising cookies, third-party tracking pixels, or behavioral analytics cookies. We set only strictly necessary first-party authentication session cookies required to keep you securely signed in as you navigate the platform.",
                    ],
                    items: [],
                },
                {
                    heading: "7. Data Storage and Security Measures",
                    paragraphs: [
                        "We implement technical and organizational security safeguards to protect your personal data and Google OAuth tokens against unauthorized access, alteration, disclosure, or destruction:",
                    ],
                    items: [
                        "Encryption in Transit: All communications between your browser, PairMock's servers, and Google APIs are encrypted using HTTPS/TLS.",
                        "Credential & Token Protection: Passwords are hashed using industry-standard cryptographic hashing before storage. Google OAuth tokens are stored in a restricted database accessible only by the backend application server.",
                        "Access Control: Access to active interview sessions, shared code, and review pages is strictly enforced on the backend so that only the two participants of an interview can view or modify session data.",
                    ],
                },
                {
                    heading: "8. Data Retention, Account Deletion & Revoking Google Access",
                    paragraphs: [
                        "We retain your personal data only for as long as your PairMock account remains active or as needed to provide you with the service:",
                    ],
                    items: [
                        "Session Expiry: Authentication sessions expire automatically after their configured validity period or immediately when you log out.",
                        "Revoking Google Access: You can revoke PairMock's access to your Google account and Google Calendar at any time from your Google Account Permissions page at https://myaccount.google.com/permissions or by emailing us at {{email}}.",
                        "Account & Data Deletion: You may request complete deletion of your PairMock account and associated personal data (including your profile, email, login sessions, and stored Google OAuth tokens) at any time by contacting us at {{email}}. Upon receiving a deletion request, we permanently delete your account credentials and Google tokens within 30 days. Completed interview code and feedback records may be retained in anonymized form (disassociated from your name and email) so your past interview partners do not lose their practice history.",
                    ],
                },
                {
                    heading: "9. Your Privacy Rights",
                    paragraphs: [
                        "Under the GDPR and applicable privacy laws, you have the right to access your personal data, rectify inaccurate data, request erasure of your data, restrict or object to processing, and request data portability. You can update your username and profile image directly from your Profile page. To exercise any other privacy right or ask questions about our data practices, contact the PairMock maintainers at {{email}}. You also have the right to lodge a complaint with your local data protection supervisory authority (such as the CNIL in France).",
                    ],
                    items: [],
                },
                {
                    heading: "10. Changes to This Privacy Policy",
                    paragraphs: [
                        "We may update this Privacy Policy from time to time to reflect changes in PairMock's features or legal requirements. Whenever we make changes, we will update the 'Last updated' date at the top of this page.",
                    ],
                    items: [],
                },
            ],
        },
        terms: {
            title: "Terms of Service",
            intro: "These Terms of Service govern your use of PairMock. By creating an account or using the platform, you agree to them. If you do not agree, please do not use PairMock.",
            sections: [
                {
                    heading: "1. The service",
                    paragraphs: [
                        "PairMock lets users practice technical interviews together: you can publish interview slots, book slots offered by others, code together in a shared editor, exchange feedback and request AI-generated suggestions. PairMock is a student project provided free of charge, for practice purposes only.",
                    ],
                    items: [],
                },
                {
                    heading: "2. Your account",
                    paragraphs: [],
                    items: [
                        "You must provide accurate information and keep your password confidential.",
                        "You are responsible for all activity on your account.",
                        "One person, one account: do not impersonate anyone or create accounts for others.",
                        "You must be at least 15 years old (the age of digital consent in France) or have parental permission to use PairMock.",
                    ],
                },
                {
                    heading: "3. Acceptable use",
                    paragraphs: ["When using PairMock, you agree not to:"],
                    items: [
                        "harass, insult or discriminate against other users, during interviews or in slot descriptions;",
                        "share content that is illegal, offensive, or that you do not have the right to share;",
                        "paste secrets, passwords or other people's personal data into the shared editor;",
                        "try to access interviews or data that are not yours, or disrupt the service;",
                        "book slots you do not intend to attend, or repeatedly cancel at the last minute.",
                    ],
                },
                {
                    heading: "4. Your content",
                    paragraphs: [
                        "You keep ownership of the code and feedback you write. You allow PairMock to store and display it to your interview partner, and to send code to our AI provider when you or your partner request AI feedback, solely to operate the service.",
                    ],
                    items: [],
                },
                {
                    heading: "5. Google services",
                    paragraphs: [
                        "Hosting slots requires connecting a Google account so PairMock can create calendar events and Google Meet links. Your use of those services is also governed by Google's own terms.",
                    ],
                    items: [],
                },
                {
                    heading: "6. AI feedback",
                    paragraphs: [
                        "AI feedback is generated automatically and may be incomplete or wrong. Treat it as a learning aid, not as an authoritative evaluation.",
                    ],
                    items: [],
                },
                {
                    heading: "7. Availability and liability",
                    paragraphs: [
                        "PairMock is provided \"as is\", without any guarantee of availability, accuracy or fitness for a particular purpose. Interviews on PairMock are practice sessions and do not lead to any job offer. To the extent permitted by law, we are not liable for any loss resulting from your use of the service.",
                    ],
                    items: [],
                },
                {
                    heading: "8. Suspension and termination",
                    paragraphs: [
                        "You can stop using PairMock at any time. We may suspend or delete accounts that break these terms.",
                    ],
                    items: [],
                },
                {
                    heading: "9. Changes and contact",
                    paragraphs: [
                        "We may update these terms; continuing to use PairMock after a change means you accept the new version. These terms are governed by French law. Questions? Contact us at {{email}}.",
                    ],
                    items: [],
                },
            ],
        },
    },

    analytics: {
        title: "Data Dashboard Analytics",
        description: "Your progress across all completed interviews",
        filter: {
            all: "All difficulties",
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",
        },
        exportCsv: "Export CSV",
        lastUpdated: "Last updated: {{time}}",
        kpis: {
            interviews: "Interviews",
            averageScore: "Average score",
            strength: "Strength",
            workOn: "Work on",
        },
        skills: {
            problemSolving: "Problem solving",
            codeQuality: "Code Quality",
            complexityAnalysis: "Complexity Analysis",
            communication: "Communication",
            average: "Average",
        },
        charts: {
            scoreEvolution: {
                title: "Score Evolution",
                description: "Score received in each interview",
            },
            skillsRadar: {
                title: "Skills profile",
                description: "Average per skill",
            },
            difficultyBar: {
                title: "Notes per difficulty",
                description: "Order by ascending difficulty",
                tooltip_one: "{{count}} interview",
                tooltip_other: "{{count}} interviews",
            },
        },
    },
};

export default en;

type Widen<T> = T extends string
    ? string
    : T extends readonly (infer U)[]
        ? Widen<U>[]
        : { [K in keyof T]: Widen<T[K]> };

/** Shape every translation file must follow (same keys as English). */
export type Translation = Widen<typeof en>;
