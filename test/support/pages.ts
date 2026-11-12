import type { BasePage } from '../page-objects/basePage.ts';
import AddGearPage from '../page-objects/addGearPage.ts';
import AddPortPage from '../page-objects/addPortPage.ts';
import AddSpeciesPage from '../page-objects/addSpeciesPage.ts';
import CatchLocationManualEntryPage from '../page-objects/catchLocationManualEntryPage.ts';
import CatchLocationPage from '../page-objects/catchLocationPage.ts';
import CheckYourAnswersPage from '../page-objects/checkYourAnswersPage.ts';
import DataPreparationPage from '../page-objects/dataPreparationPage.ts';
import GearMeasurementsPage from '../page-objects/gearMeasurementsPage.ts';
import HomePage from '../page-objects/homePage.ts';
import LandingStoragePage from '../page-objects/landingStoragePage.ts';
import RecordSpeciesWeightsPage from '../page-objects/recordSpeciesWeightsPage.ts';
import SelectGearPage from '../page-objects/selectGearPage.ts';
import SelectPortDeparturePage from '../page-objects/selectPortDeparturePage.ts';
import SelectPortReturnPage from '../page-objects/selectPortReturnPage.ts';
import SelectVesselPage from '../page-objects/selectVesselPage.ts';
import SignInPage from '../page-objects/signInPage.ts';
import SubmissionNudgePage from '../page-objects/submissionNudgePage.ts';
import TripDateDeparturePage from '../page-objects/tripDateDeparturePage.ts';
import TripDateReturnPage from '../page-objects/tripDateReturnPage.ts';
import TripTodayPage from '../page-objects/tripTodayPage.ts';

type Element = ReturnType<typeof $>;

export interface PageDefinition {
    page: BasePage;
    heading: () => Element;
    validationError?: () => Element;
    scrollToHeading?: boolean;
}

// Keys are the page names used in feature files, e.g. "Then I should be on the add gear page".
const pages = {
    'sign-in': { page: SignInPage, heading: () => SignInPage.heading },
    'data preparation': {
        page: DataPreparationPage,
        heading: () => DataPreparationPage.heading,
    },
    home: {
        page: HomePage,
        heading: () => HomePage.catchRecordsHeading,
        scrollToHeading: true,
    },
    'select vessel': {
        page: SelectVesselPage,
        heading: () => SelectVesselPage.selectVesselHeading,
    },
    'trip today': { page: TripTodayPage, heading: () => TripTodayPage.questionHeading },
    'trip departure date': {
        page: TripDateDeparturePage,
        heading: () => TripDateDeparturePage.heading,
        validationError: () => TripDateDeparturePage.validationError,
    },
    'trip return date': {
        page: TripDateReturnPage,
        heading: () => TripDateReturnPage.heading,
        validationError: () => TripDateReturnPage.validationError,
    },
    'submission nudge': { page: SubmissionNudgePage, heading: () => SubmissionNudgePage.heading },
    'add port': {
        page: AddPortPage,
        heading: () => AddPortPage.heading,
        validationError: () => AddPortPage.validationError,
    },
    'select departure port': {
        page: SelectPortDeparturePage,
        heading: () => SelectPortDeparturePage.heading,
        validationError: () => SelectPortDeparturePage.validationError,
    },
    'select return port': {
        page: SelectPortReturnPage,
        heading: () => SelectPortReturnPage.heading,
        validationError: () => SelectPortReturnPage.validationError,
    },
    'add gear': {
        page: AddGearPage,
        heading: () => AddGearPage.heading,
        validationError: () => AddGearPage.validationError,
    },
    'gear measurements': {
        page: GearMeasurementsPage,
        heading: () => GearMeasurementsPage.heading,
    },
    'select gear': { page: SelectGearPage, heading: () => SelectGearPage.heading },
    'catch location': {
        page: CatchLocationPage,
        heading: () => CatchLocationPage.heading,
        validationError: () => CatchLocationPage.validationError,
        scrollToHeading: true,
    },
    'catch location manual entry': {
        page: CatchLocationManualEntryPage,
        heading: () => CatchLocationManualEntryPage.heading,
        validationError: () => CatchLocationManualEntryPage.validationError,
    },
    'add species': { page: AddSpeciesPage, heading: () => AddSpeciesPage.heading },
    'record species weights': {
        page: RecordSpeciesWeightsPage,
        heading: () => RecordSpeciesWeightsPage.heading,
    },
    'landing storage': { page: LandingStoragePage, heading: () => LandingStoragePage.heading },
    'check your answers': {
        page: CheckYourAnswersPage,
        heading: () => CheckYourAnswersPage.heading,
    },
} satisfies Record<string, PageDefinition>;

export type PageName = keyof typeof pages;

export const pageNames = Object.keys(pages) as PageName[];

export function getPage(name: PageName): PageDefinition {
    return pages[name];
}
