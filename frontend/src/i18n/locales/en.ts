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
            intro: "PairMock is a peer-to-peer mock technical interview platform built as a student project. This policy explains what personal data we collect when you use PairMock, why we collect it, who we share it with and what rights you have over it.",
            sections: [
                {
                    heading: "1. Data we collect",
                    paragraphs: ["We only collect the data needed to run the service:"],
                    items: [
                        "Account data: your username, email address, password (stored only as a secure hash) and, if you add one, the URL of your profile picture.",
                        "Google account data: if you sign in with Google or connect Google Calendar, we store your Google account identifier and the access tokens Google gives us, limited to the permission to create calendar events.",
                        "Interview data: the slots you create or book (description, difficulty, date, duration, status), the code written during an interview, the feedback you give and receive, and your notifications.",
                        "Technical data: for each login session, its expiry date, your IP address and your browser's user agent, used to keep you signed in and protect your account.",
                        "Preferences: your language and theme are saved in your browser's local storage, not on our servers.",
                    ],
                },
                {
                    heading: "2. Why we use it",
                    paragraphs: [],
                    items: [
                        "To create and secure your account and keep you logged in.",
                        "To let you publish, book and run mock interviews with other users.",
                        "To create the Google Calendar invitation and Google Meet link for a booked interview.",
                        "To show you your history, statistics and the feedback left by your partners.",
                        "To generate AI feedback on interview code when you ask for it.",
                    ],
                },
                {
                    heading: "3. Legal basis",
                    paragraphs: [
                        "We process your data because it is necessary to provide the service you signed up for (performance of a contract). Connecting Google Calendar and requesting AI feedback are optional and rely on your consent, which you can withdraw at any time by unlinking your Google account or simply not using the AI feature.",
                    ],
                    items: [],
                },
                {
                    heading: "4. Who can see your data",
                    paragraphs: [],
                    items: [
                        "Other users see your username, profile picture and the slots you publish.",
                        "Your interview partner sees your name, the shared code, the feedback you leave them and, through the calendar invitation, your email address.",
                        "Google receives the details of the calendar event (title, description, date and attendees) when an interview is booked.",
                        "Groq, our AI provider, receives the interview code (and nothing else) when you click an AI feedback button. We do not store the AI's answer.",
                    ],
                },
                {
                    heading: "5. What we never do",
                    paragraphs: [
                        "We do not sell your data, show advertising or use tracking or analytics cookies. The only cookie we set is the session cookie strictly needed to keep you logged in.",
                    ],
                    items: [],
                },
                {
                    heading: "6. How long we keep it",
                    paragraphs: [
                        "Your data is kept for as long as your account exists. Login sessions expire automatically. When your account is deleted, your account, sessions and linked Google tokens are deleted with it.",
                    ],
                    items: [],
                },
                {
                    heading: "7. Security",
                    paragraphs: [
                        "All traffic is encrypted with HTTPS, passwords are hashed and never stored in plain text, and access to interview data is restricted to the two participants. No system is perfectly secure, but we take reasonable measures to protect your data.",
                    ],
                    items: [],
                },
                {
                    heading: "8. Your rights",
                    paragraphs: [
                        "Under the GDPR you can access, correct, export or delete your data, and object to or restrict its processing. You can edit your name and picture from your profile page; for anything else, contact us at {{email}}. If you believe your rights are not respected, you can file a complaint with your data protection authority (in France, the CNIL).",
                    ],
                    items: [],
                },
                {
                    heading: "9. Changes",
                    paragraphs: [
                        "We may update this policy as the project evolves. The date at the top of this page shows when it was last changed.",
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
};

export default en;

type Widen<T> = T extends string
    ? string
    : T extends readonly (infer U)[]
        ? Widen<U>[]
        : { [K in keyof T]: Widen<T[K]> };

/** Shape every translation file must follow (same keys as English). */
export type Translation = Widen<typeof en>;
