import { Given, Then, When } from '@wdio/cucumber-framework';
import { datePartsFromToday } from '../common/dateHelper.ts';
import iosFlowNavigator from '../helpers/iosFlowNavigator.ts';
import SelectVesselPage from '../page-objects/selectVesselPage.ts';
import SubmissionNudgePage from '../page-objects/submissionNudgePage.ts';
import TripDateDeparturePage from '../page-objects/tripDateDeparturePage.ts';
import TripDateReturnPage from '../page-objects/tripDateReturnPage.ts';
import TripTodayPage from '../page-objects/tripTodayPage.ts';

type Vessel = 'ACHILLES' | 'HERCULES';
type Answer = 'yes' | 'no';

async function enterReturnDate(daysAgo: number) {
    const { day, month, year } = datePartsFromToday(daysAgo);
    await TripDateReturnPage.enterReturnDate(day, month, year);
}

Given('I have started a new catch record', async () => {
    await iosFlowNavigator.openCreateRecord();
});

When('I start a new catch record', async () => {
    await iosFlowNavigator.openCreateRecord();
});

Given('I have selected the vessel {vessel}', async (vessel: Vessel) => {
    await iosFlowNavigator.selectVessel(vessel);
});

When('I select the vessel {vessel}', async (vessel: Vessel) => {
    await iosFlowNavigator.selectVessel(vessel);
});

Given(
    'I have started a catch record for vessel {vessel} with a trip ending today',
    async (vessel: Vessel) => {
        await iosFlowNavigator.openCreateRecord();
        await iosFlowNavigator.selectVessel(vessel);
        await iosFlowNavigator.selectTripToday('yes');
    },
);

Then('the vessel option {vessel} should not be selected', async (vessel: Vessel) => {
    await expect(SelectVesselPage.vesselOption(vessel)).not.toBeSelected();
});

Then('I should see the yes and no options', async () => {
    await expect(TripTodayPage.yesOption).toBeDisplayed();
    await expect(TripTodayPage.noOption).toBeDisplayed();
});

When('I answer {answer} to whether the trip ended today', async (answer: Answer) => {
    await iosFlowNavigator.selectTripToday(answer);
});

Then('I should see the departure date picker', async () => {
    await expect(TripDateDeparturePage.dateContainer).toBeDisplayed();
    await expect(TripDateDeparturePage.datePicker).toBeDisplayed();
    await expect(TripDateDeparturePage.saveContinueButton).toBeDisplayed();
});

When('I enter a departure date {int} day(s) ago', async (daysAgo: number) => {
    const { day, month, year } = datePartsFromToday(daysAgo);
    await TripDateDeparturePage.enterDepartureDate(day, month, year);
});

When('I enter a return date {int} day(s) ago', enterReturnDate);

When('I enter today as the return date', async () => {
    await enterReturnDate(0);
});

Then('I should see the submission window message and check date link', async () => {
    await expect(SubmissionNudgePage.submissionWindowMessage).toBeDisplayed();
    await expect(SubmissionNudgePage.checkDateLink).toBeDisplayed();
});

When('I choose to check the trip end date', async () => {
    await SubmissionNudgePage.checkTripEndDate();
});
