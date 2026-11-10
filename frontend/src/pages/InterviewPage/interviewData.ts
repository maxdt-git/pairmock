import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const INTERVIEW_LANGUAGES = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'sql', label: 'SQL' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' }
];

const RATING_VALUES = ["5", "4", "3", "2", "1", "0"] as const;
const RATING_QUESTIONS = ["problemSolving", "codeQuality", "complexityAnalysis", "communication"] as const;
const SIGNAL_VALUES = ["clarified-constraints", "compared-tradeoffs", "dry-run", "self-debugged"] as const;
const OUTCOME_VALUES = ["optimal-no-hints", "optimal-with-hints", "suboptimal", "incomplete"] as const;

export type QuestionName =
    | (typeof RATING_QUESTIONS)[number]
    | "signals"
    | "outcome";

export interface QuestionnaireChoiceItem {
    value: string;
    label: string;
    description?: string;
}

export interface QuestionnaireQuestion {
    name: QuestionName;
    required: boolean;
    multiple?: boolean;
    title: string;
    description: string;
    choices: QuestionnaireChoiceItem[];
    input?: { label: string; placeholder: string };
}

/**
 * Feedback questionnaire in the current UI language.
 * Choice `value`s are what gets stored in the database, so they never change with the language:
 * feedback saved in English is displayed in French on the review page, and vice versa.
 */
export function useQuestionnaireItems(): QuestionnaireQuestion[] {
    const { t } = useTranslation();

    return useMemo(() => [
        ...RATING_QUESTIONS.map((name) => ({
            name,
            required: true,
            title: t(`questionnaire.${name}.title`),
            description: t(`questionnaire.${name}.description`),
            choices: RATING_VALUES.map((value) => ({
                value,
                label: value,
                description: t(`questionnaire.${name}.choices.${value}`),
            })),
        })),
        {
            name: "signals",
            required: false,
            multiple: true,
            title: t("questionnaire.signals.title"),
            description: t("questionnaire.signals.description"),
            choices: SIGNAL_VALUES.map((value) => ({
                value,
                label: t(`questionnaire.signals.choices.${value}`),
            })),
        },
        {
            name: "outcome",
            required: true,
            title: t("questionnaire.outcome.title"),
            description: t("questionnaire.outcome.description"),
            choices: OUTCOME_VALUES.map((value) => ({
                value,
                label: t(`questionnaire.outcome.choices.${value}`),
            })),
            input: {
                label: t("questionnaire.outcome.inputLabel"),
                placeholder: t("questionnaire.outcome.inputPlaceholder"),
            },
        },
    ], [t]);
}
