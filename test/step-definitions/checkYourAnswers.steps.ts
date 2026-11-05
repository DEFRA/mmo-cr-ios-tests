import { type DataTable, Given, Then, When } from '@wdio/cucumber-framework';
import CheckYourAnswersPage from '../page-objects/checkYourAnswersPage.ts';
import LandingStoragePage from '../page-objects/landingStoragePage.ts';
import SubmissionSuccessPage from '../page-objects/submissionSuccessPage.ts';

type Answer = 'yes' | 'no';

const answerValues: Record<string, (value: string) => ReturnType<typeof $>> = {
    vessel: (value) => CheckYourAnswersPage.vesselValue(value),
    'departure port': (value) => CheckYourAnswersPage.departurePortValue(value),
    'return port': (value) => CheckYourAnswersPage.returnPortValue(value),
    'statistical area': (value) => CheckYourAnswersPage.statisticalAreaValue(value),
    'gear name': (value) => CheckYourAnswersPage.gearNameValue(value),
    'mesh size': (value) => CheckYourAnswersPage.meshSizeValue(value),
    'gear variable': (value) => CheckYourAnswersPage.gearVariableValue(value),
    'species name': (value) => CheckYourAnswersPage.speciesNameValue(value),
    'weight above': (value) => CheckYourAnswersPage.weightAboveValue(value),
};

const changeLinks: Record<
    string,
    { button: () => ReturnType<typeof $>; change: () => Promise<void> }
> = {
    vessel: {
        button: () => CheckYourAnswersPage.changeTripVesselButton,
        change: () => CheckYourAnswersPage.changeTripVessel(),
    },
    'statistical area': {
        button: () => CheckYourAnswersPage.changeStatisticalAreaButton,
        change: () => CheckYourAnswersPage.changeStatisticalArea(),
    },
    'gear name': {
        button: () => CheckYourAnswersPage.changeGearNameButton,
        change: () => CheckYourAnswersPage.changeGearName(),
    },
    'species name': {
        button: () => CheckYourAnswersPage.changeSpeciesNameButton,
        change: () => CheckYourAnswersPage.changeSpeciesName(),
    },
};

Given('I have answered {answer} to the landing storage question', async (answer: Answer) => {
    await LandingStoragePage.selectLandingStorage(answer);
    await LandingStoragePage.continueToNextStep();
});

When('I answer {answer} to the landing storage question', async (answer: Answer) => {
    await LandingStoragePage.selectLandingStorage(answer);
});

Then('I should see the trip, gear and species caught sections', async () => {
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.tripSection);
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.gearSection);
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.speciesCaughtSection);
});

// Rows are checked in order because the page is scrolled downwards to reach each answer.
Then('I should see the following answers:', async (answers: DataTable) => {
    for (const [answer = '', value = ''] of answers.raw()) {
        const element = answerValues[answer];
        if (!element) {
            throw new Error(
                `Unknown answer "${answer}". Expected one of: ${Object.keys(answerValues).join(', ')}`,
            );
        }
        await CheckYourAnswersPage.scrollToElement(element(value));
    }
});

Then('I should see the weight above, below and discarded labels', async () => {
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.weightAboveLabel);
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.weightBelowLabel);
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.weightDiscardedLabel);
});

Then('I should see the submission declaration and accept and submit button', async () => {
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.declarationNotice);
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.declarationStatement);
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.landedWeightAccuracyText);
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.permittedToleranceText);
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.inaccurateRecordingActionText);
    await CheckYourAnswersPage.scrollToElement(CheckYourAnswersPage.acceptAndSubmitButton);
});

When('I change the {string} answer', async (answer: string) => {
    const link = changeLinks[answer];
    if (!link) {
        throw new Error(
            `Unknown answer "${answer}". Expected one of: ${Object.keys(changeLinks).join(', ')}`,
        );
    }
    await CheckYourAnswersPage.scrollToElement(link.button());
    await link.change();
});

When('I accept and submit the catch record', async () => {
    await CheckYourAnswersPage.acceptAndSubmit();
});

Then('I should see the submission success message', async () => {
    await expect(SubmissionSuccessPage.submissionMessage).toBeDisplayed();
});
