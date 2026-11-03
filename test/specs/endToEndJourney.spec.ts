import AddGearPage from '../page-objects/addGearPage.ts';
import AddPortPage from '../page-objects/addPortPage.ts';
import AddSpeciesPage from '../page-objects/addSpeciesPage.ts';
import CatchLocationPage from '../page-objects/catchLocationPage.ts';
import ConfirmSamePortPage from '../page-objects/confirmSamePortPage.ts';
import GearMeasurementsPage from '../page-objects/gearMeasurementsPage.ts';
import HomePage from '../page-objects/homePage.ts';
import RecordSpeciesWeightsPage from '../page-objects/recordSpeciesWeightsPage.ts';
import SelectGearPage from '../page-objects/selectGearPage.ts';
import SelectVesselPage from '../page-objects/selectVesselPage.ts';
import SignInPage from '../page-objects/signInPage.ts';
import CheckYourAnswersPage from '../page-objects/checkYourAnswersPage.ts';
import LandingStoragePage from '../page-objects/landingStoragePage.ts';
import SubmissionConfirmationPage from '../page-objects/submissionConfirmationPage.ts';
import SubmissionSuccessPage from '../page-objects/submissionSuccessPage.ts';
import TripTodayPage from '../page-objects/tripTodayPage.ts';
import TripDateDeparturePage from '../page-objects/tripDateDeparturePage.ts';
import TripDateReturnPage from '../page-objects/tripDateReturnPage.ts';
import { datePartsFromToday } from '../common/dateHelper.ts';
import { logStep } from '../common/logger.ts';

const endToEndJourneyData = {
    vessel: 'ACHILLES' as const,
    tripToday: 'yes' as const,
    port: 'Peel',
    confirmSamePort: 'yes' as 'yes' | 'no',
    gear: 'Gillnets (drift)',
    meshSize: '12',
    gearVariables: { netLengthHauled: '2', netLengthLeft: '1' },
    catchArea: '37E52',
    species: 'Atlantic salmon (SAL)',
    weight: '500',
    weightBelowMin: '10',
    weightDiscarded: '20',
    landingStorage: 'no' as const,
};

const notSameDayJourneyData = {
    ...endToEndJourneyData,
    tripToday: 'no' as const,
};

describe('iOS end-to-end catch record journey', () => {
    const testEmail = process.env.IOS_TEST_EMAIL;
    const testPassword = process.env.IOS_TEST_PASSWORD;

    beforeEach(async () => {
        logStep('beforeEach');
        if (!testEmail || !testPassword) {
            throw new Error(
                'IOS_TEST_EMAIL and IOS_TEST_PASSWORD must be set in .env to run end-to-end tests.',
            );
        }

        await SignInPage.openApp();
        await SignInPage.signIn(testEmail, testPassword);
        await HomePage.scrollToElement(HomePage.createRecordButton);
        await expect(HomePage.createRecordButton).toBeDisplayed();
    });

    afterEach(async () => {
        logStep('afterEach');
        await HomePage.close();
    });

    it('completes and submits the catch record journey', async () => {
        logStep('completes and submits the catch record journey');
        await HomePage.clickCreateRecordButton();

        await expect(SelectVesselPage.selectVesselHeading).toBeDisplayed();
        await SelectVesselPage.selectVessel(endToEndJourneyData.vessel);

        await expect(TripTodayPage.questionHeading).toBeDisplayed();
        await TripTodayPage.selectTripToday(endToEndJourneyData.tripToday);

        await expect(AddPortPage.heading).toBeDisplayed();
        await AddPortPage.selectPort(endToEndJourneyData.port);
        await AddPortPage.continueToNextStep();

        await expect(ConfirmSamePortPage.headingForPort(endToEndJourneyData.port)).toBeDisplayed();
        await (endToEndJourneyData.confirmSamePort === 'yes'
            ? ConfirmSamePortPage.yesOption.click()
            : ConfirmSamePortPage.noOption.click());
        await ConfirmSamePortPage.continueToNextStep();

        await expect(AddGearPage.heading).toBeDisplayed();
        await AddGearPage.selectGear(endToEndJourneyData.gear);
        await AddGearPage.continueToNextStep();

        await expect(GearMeasurementsPage.heading).toBeDisplayed();
        await GearMeasurementsPage.enterMeshSize(endToEndJourneyData.meshSize);
        await GearMeasurementsPage.continueToNextStep();

        await expect(SelectGearPage.heading).toBeDisplayed();
        await SelectGearPage.selectGear('gnd');
        await SelectGearPage.enterGearVariable(
            'gnd',
            'netLengthHauled',
            endToEndJourneyData.gearVariables.netLengthHauled,
        );
        await SelectGearPage.enterGearVariable(
            'gnd',
            'netLengthLeft',
            endToEndJourneyData.gearVariables.netLengthLeft,
        );

        await SelectGearPage.continueToNextStep();

        await expect(CatchLocationPage.heading).toBeDisplayed();
        await CatchLocationPage.selectArea(endToEndJourneyData.catchArea);
        await CatchLocationPage.continueToNextStep();

        await expect(AddSpeciesPage.heading).toBeDisplayed();
        await AddSpeciesPage.selectSpecies(endToEndJourneyData.species);
        await AddSpeciesPage.continueToNextStep();

        await expect(RecordSpeciesWeightsPage.heading).toBeDisplayed();
        await RecordSpeciesWeightsPage.enterWeight(
            endToEndJourneyData.species,
            endToEndJourneyData.weight,
        );
        await RecordSpeciesWeightsPage.enterWeightBelowMin(
            endToEndJourneyData.species,
            endToEndJourneyData.weightBelowMin,
        );
        await RecordSpeciesWeightsPage.enterWeightDiscarded(
            endToEndJourneyData.species,
            endToEndJourneyData.weightDiscarded,
        );
        await RecordSpeciesWeightsPage.continueToNextStep();

        await expect(LandingStoragePage.heading).toBeDisplayed();
        await LandingStoragePage.selectLandingStorage(endToEndJourneyData.landingStorage);
        await LandingStoragePage.continueToNextStep();

        await expect(CheckYourAnswersPage.heading).toBeDisplayed();
        await CheckYourAnswersPage.continueToNextStep();

        await expect(SubmissionConfirmationPage.heading).toBeDisplayed();
        await SubmissionConfirmationPage.confirmSubmission();
        await SubmissionConfirmationPage.acceptAndSubmit();

        await expect(SubmissionSuccessPage.submissionMessage).toBeDisplayed();
        await SubmissionSuccessPage.viewYourCatchRecords();

        /* const todayParts = datePartsFromToday(0);
         const expectedDateString = `${todayParts.day} ${todayParts.monthName.substring(0, 3)} ${todayParts.year}`;

        await expect(HomePage.catchRecordsHeading).toBeDisplayed();
        await expect(HomePage.tableRowDate(0)).toHaveAttr(
            'label',
            `View submission for ${expectedDateString}`,
        );
        await expect(HomePage.tableRowVessel(0, endToEndJourneyData.vessel)).toBeDisplayed();
        await expect(HomePage.tableRowStatus(0, 'Unsent')).toBeDisplayed();
        */
    });

    it('completes and submits the catch record journey for a trip not today', async () => {
        logStep('completes and submits the catch record journey for a trip not today');
        await HomePage.clickCreateRecordButton();

        await expect(SelectVesselPage.selectVesselHeading).toBeDisplayed();
        await SelectVesselPage.selectVessel(notSameDayJourneyData.vessel);

        await expect(TripTodayPage.questionHeading).toBeDisplayed();
        await TripTodayPage.selectTripToday(notSameDayJourneyData.tripToday);

        const departureDate = datePartsFromToday(1);
        const returnDate = datePartsFromToday(0);
        await TripDateDeparturePage.enterDepartureDate(
            departureDate.day,
            departureDate.month,
            departureDate.year,
        );
        await TripDateDeparturePage.continueToNextStep();

        await expect(TripDateReturnPage.heading).toBeDisplayed();
        await TripDateReturnPage.enterReturnDate(returnDate.day, returnDate.month, returnDate.year);
        await TripDateReturnPage.continueToNextStep();

        await expect(AddPortPage.heading).toBeDisplayed();
        await AddPortPage.selectPort(notSameDayJourneyData.port);
        await AddPortPage.continueToNextStep();

        await expect(
            ConfirmSamePortPage.headingForPort(notSameDayJourneyData.port),
        ).toBeDisplayed();
        await (notSameDayJourneyData.confirmSamePort === 'yes'
            ? ConfirmSamePortPage.yesOption.click()
            : ConfirmSamePortPage.noOption.click());
        await ConfirmSamePortPage.continueToNextStep();

        await expect(AddGearPage.heading).toBeDisplayed();
        await AddGearPage.selectGear(notSameDayJourneyData.gear);
        await AddGearPage.continueToNextStep();

        await expect(GearMeasurementsPage.heading).toBeDisplayed();
        await GearMeasurementsPage.enterMeshSize(notSameDayJourneyData.meshSize);
        await GearMeasurementsPage.continueToNextStep();

        await expect(SelectGearPage.heading).toBeDisplayed();
        await SelectGearPage.selectGear('gnd');
        await SelectGearPage.enterGearVariable(
            'gnd',
            'netLengthHauled',
            notSameDayJourneyData.gearVariables.netLengthHauled,
        );
        await SelectGearPage.enterGearVariable(
            'gnd',
            'netLengthLeft',
            notSameDayJourneyData.gearVariables.netLengthLeft,
        );

        await SelectGearPage.continueToNextStep();

        await expect(CatchLocationPage.heading).toBeDisplayed();
        await CatchLocationPage.selectArea(notSameDayJourneyData.catchArea);
        await CatchLocationPage.continueToNextStep();

        await expect(AddSpeciesPage.heading).toBeDisplayed();
        await AddSpeciesPage.selectSpecies(notSameDayJourneyData.species);
        await AddSpeciesPage.continueToNextStep();

        await expect(RecordSpeciesWeightsPage.heading).toBeDisplayed();
        await RecordSpeciesWeightsPage.enterWeight(
            notSameDayJourneyData.species,
            notSameDayJourneyData.weight,
        );
        await RecordSpeciesWeightsPage.enterWeightBelowMin(
            notSameDayJourneyData.species,
            notSameDayJourneyData.weightBelowMin,
        );
        await RecordSpeciesWeightsPage.enterWeightDiscarded(
            notSameDayJourneyData.species,
            notSameDayJourneyData.weightDiscarded,
        );
        await RecordSpeciesWeightsPage.continueToNextStep();

        await expect(LandingStoragePage.heading).toBeDisplayed();
        await LandingStoragePage.selectLandingStorage(notSameDayJourneyData.landingStorage);
        await LandingStoragePage.continueToNextStep();

        await expect(CheckYourAnswersPage.heading).toBeDisplayed();
        await CheckYourAnswersPage.continueToNextStep();

        await expect(SubmissionConfirmationPage.heading).toBeDisplayed();
        await SubmissionConfirmationPage.confirmSubmission();
        await SubmissionConfirmationPage.acceptAndSubmit();

        await expect(SubmissionSuccessPage.submissionMessage).toBeDisplayed();
        await SubmissionSuccessPage.viewYourCatchRecords();

        /* const expectedDateString = `${returnDate.day} ${returnDate.monthName.substring(0, 3)} ${returnDate.year}`;

        await expect(HomePage.catchRecordsHeading).toBeDisplayed();
        await expect(HomePage.tableRowDate(0)).toHaveAttr(
            'label',
            `View submission for ${expectedDateString}`,
        );
        await expect(HomePage.tableRowVessel(0, notSameDayJourneyData.vessel)).toBeDisplayed();
        */
    });
});
