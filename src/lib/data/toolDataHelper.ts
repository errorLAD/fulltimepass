import { Language } from "../language/types";
import * as HI from "./toolData";
import * as EN from "./toolDataEn";

export function getRoastTraits(lang: Language) {
  return lang === "en" ? EN.ROAST_TRAITS_EN : HI.ROAST_TRAITS;
}

export function getRoastStyles(lang: Language) {
  return lang === "en" ? EN.ROAST_STYLES_EN : HI.ROAST_STYLES;
}

export function getRoastTemplates(lang: Language) {
  return lang === "en" ? EN.ROAST_TEMPLATES_EN : HI.ROAST_TEMPLATES;
}

export function getRoastTraitBurns(lang: Language) {
  return lang === "en" ? EN.ROAST_TRAIT_BURNS_EN : HI.ROAST_TRAIT_BURNS;
}

export function getRoastBadges(lang: Language) {
  return lang === "en" ? EN.ROAST_BADGES_EN : HI.ROAST_BADGES;
}

export function getRoastMetricsList(lang: Language) {
  return lang === "en" ? EN.ROAST_METRICS_LIST_EN : HI.ROAST_METRICS_LIST;
}

export function getRedFlagQuestions(lang: Language) {
  return lang === "en" ? EN.RED_FLAG_QUESTIONS_EN : HI.RED_FLAG_QUESTIONS;
}

export function getRedFlagDiagnoses(lang: Language) {
  return lang === "en" ? EN.RED_FLAG_DIAGNOSES_EN : HI.RED_FLAG_DIAGNOSES;
}

export function getExYaadQuestions(lang: Language) {
  return lang === "en" ? EN.EX_YAAD_QUESTIONS_EN : HI.EX_YAAD_QUESTIONS;
}

export function getExYaadDiagnoses(lang: Language) {
  return lang === "en" ? EN.EX_YAAD_DIAGNOSES_EN : HI.EX_YAAD_DIAGNOSES;
}

export function getChatRolesPool(lang: Language) {
  return lang === "en" ? EN.CHAT_ROLES_POOL_EN : HI.CHAT_ROLES_POOL;
}

export function getShaadiQuestions(lang: Language) {
  return lang === "en" ? EN.SHAADI_QUESTIONS_EN : HI.SHAADI_QUESTIONS;
}

export function getShaadiValuations(lang: Language) {
  return lang === "en" ? EN.SHAADI_VALUATIONS_EN : HI.SHAADI_VALUATIONS;
}

export function getAukaatQuestions(lang: Language) {
  return lang === "en" ? EN.AUKAAT_QUESTIONS_EN : HI.AUKAAT_QUESTIONS;
}

export function getAukaatDiagnoses(lang: Language) {
  return lang === "en" ? EN.AUKAAT_DIAGNOSES_EN : HI.AUKAAT_DIAGNOSES;
}

export function getFamilyChatThemes(lang: Language) {
  return lang === "en" ? EN.FAMILY_CHAT_THEMES_EN : HI.FAMILY_CHAT_THEMES;
}

export function getPersonalityQuestions(lang: Language) {
  return lang === "en" ? EN.PERSONALITY_QUESTIONS_EN : HI.PERSONALITY_QUESTIONS;
}

export function getPersonalityResults(lang: Language) {
  return lang === "en" ? EN.PERSONALITY_RESULTS_EN : HI.PERSONALITY_RESULTS;
}

export function getUdhaarLineItems(lang: Language) {
  return lang === "en" ? EN.UDHAAR_LINE_ITEMS_EN : HI.UDHAAR_LINE_ITEMS;
}

export function getUdhaarPunchlines(lang: Language) {
  return lang === "en" ? EN.UDHAAR_PUNCHLINES_EN : HI.UDHAAR_PUNCHLINES;
}

export function getKaleshQuestions(lang: Language) {
  return lang === "en" ? EN.KALESH_QUESTIONS_EN : HI.KALESH_QUESTIONS;
}

export function getKaleshDiagnoses(lang: Language) {
  return lang === "en" ? EN.KALESH_DIAGNOSES_EN : HI.KALESH_DIAGNOSES;
}

export function getTripDestinations(lang: Language) {
  return lang === "en" ? EN.TRIP_DESTINATIONS_EN : HI.TRIP_DESTINATIONS;
}

export function getCbiExcuses(lang: Language) {
  return lang === "en" ? EN.CBI_EXCUSES_EN : HI.CBI_EXCUSES;
}

export function getCbiRolesPool(lang: Language) {
  return lang === "en" ? EN.CBI_ROLES_POOL_EN : HI.CBI_ROLES_POOL;
}

export function getReplyWaitTimes(lang: Language) {
  return lang === "en" ? EN.REPLY_WAIT_TIMES_EN : HI.REPLY_WAIT_TIMES;
}

export function getReplyMessageTypes(lang: Language) {
  return lang === "en" ? EN.REPLY_MESSAGE_TYPES_EN : HI.REPLY_MESSAGE_TYPES;
}

export function getSalaryBrackets(lang: Language) {
  return lang === "en" ? EN.SALARY_BRACKETS_EN : HI.SALARY_BRACKETS;
}

export function getExpenseSinkholes(lang: Language) {
  return lang === "en" ? EN.EXPENSE_SINKHOLES_EN : HI.EXPENSE_SINKHOLES;
}

export function getGoalOptions(lang: Language) {
  return lang === "en" ? EN.GOAL_OPTIONS_EN : HI.GOAL_OPTIONS;
}

export function getProcrastinationExcuses(lang: Language) {
  return lang === "en" ? EN.PROCRASTINATION_EXCUSES_EN : HI.PROCRASTINATION_EXCUSES;
}

export function getMainCharacterQuestions(lang: Language) {
  return lang === "en" ? EN.MAIN_CHARACTER_QUESTIONS_EN : HI.MAIN_CHARACTER_QUESTIONS;
}

export function getDeliveryDelayOptions(lang: Language) {
  return lang === "en" ? EN.DELIVERY_DELAY_OPTIONS_EN : HI.DELIVERY_DELAY_OPTIONS;
}

export function getHungerLevels(lang: Language) {
  return lang === "en" ? EN.HUNGER_LEVELS_EN : HI.HUNGER_LEVELS;
}

export function getFoodCrimeLogs(lang: Language) {
  return lang === "en" ? EN.FOOD_CRIME_LOGS_EN : HI.FOOD_CRIME_LOGS;
}

export function getPhotoFlaws(lang: Language) {
  return lang === "en" ? EN.PHOTO_FLAWS_EN : HI.PHOTO_FLAWS;
}

export function getFakeRichHabits(lang: Language) {
  return lang === "en" ? EN.FAKE_RICH_HABITS_EN : HI.FAKE_RICH_HABITS;
}

export function getStartupIdeas(lang: Language) {
  return lang === "en" ? EN.STARTUP_IDEAS_EN : HI.STARTUP_IDEAS;
}

export function getPreRevenueHabits(lang: Language) {
  return lang === "en" ? EN.PRE_REVENUE_HABITS_EN : HI.PRE_REVENUE_HABITS;
}

export function getTreatOccasions(lang: Language) {
  return lang === "en" ? EN.TREAT_OCCASIONS_EN : HI.TREAT_OCCASIONS;
}

export function getTreatEnforcementPunchlines(lang: Language) {
  return lang === "en" ? EN.TREAT_ENFORCEMENT_PUNCHLINES_EN : [
    "Enforcement Rule: Washroom ka darwaza bahar se lock kar diya gaya hai, escape strictly impossible!",
    "Bakchodi Clause 420: Agar {name} ne bola 'Mera UPI server down hai', toh squad iska phone chheen ke hotspot on karega!",
    "Penalty Warning: Scan karne mein 2 minute se zyada delay par extra dessert order compulsory hai!",
    "Squad Verdict: Bhaichara apni jagah hai, par treat ke time koi compromise nahi!",
  ];
}
