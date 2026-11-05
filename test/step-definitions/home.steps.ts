import { Then, When } from '@wdio/cucumber-framework';
import HomePage from '../page-objects/homePage.ts';

Then('I should see the home page content', async () => {
    await HomePage.scrollToElement(HomePage.catchRecordsHeading);
    await expect(HomePage.catchRecordsHeading).toBeDisplayed();
    await expect(HomePage.webServiceNote).toBeDisplayed();
    await HomePage.scrollToElement(HomePage.warningBox);
    await expect(HomePage.warningBox).toBeDisplayed();
});

Then('I should see the create record button', async () => {
    await HomePage.scrollToElement(HomePage.createRecordButton);
    await expect(HomePage.createRecordButton).toBeDisplayed();
});

When('I toggle the how to record guidance', async () => {
    await HomePage.scrollToElement(HomePage.howToRecordLink);
    await HomePage.openHowToRecord();
});

Then('I should see the what you need to do guidance', async () => {
    await expect(HomePage.whatYouNeedToDoHeading).toBeDisplayed();
});

Then('I should not see the what you need to do guidance', async () => {
    await expect(HomePage.whatYouNeedToDoHeading).not.toBeDisplayed();
});

When('I toggle the catch record status help', async () => {
    await HomePage.scrollToElement(HomePage.howToRecordLink);
    await expect(HomePage.statusHelpLink).toBeDisplayed();
    await HomePage.openStatusHelp();
});

Then('I should see the unsent status description', async () => {
    await expect(HomePage.unsentStatusDescription).toBeDisplayed();
});

Then('I should not see the unsent status description', async () => {
    await expect(HomePage.unsentStatusDescription).not.toBeDisplayed();
});

Then('I should see the trip table headers', async () => {
    await expect(HomePage.tripEndDateHeader).toBeDisplayed();
    await expect(HomePage.vesselHeader).toBeDisplayed();
    await expect(HomePage.statusHeader).toBeDisplayed();
    await expect(HomePage.createdByHeader).toBeDisplayed();
});

Then(
    'the first trip should show vessel {string}, status {string} and created by {string}',
    async (vessel: string, tripStatus: string, createdBy: string) => {
        await expect(HomePage.tableRowDate(0)).toBeDisplayed();
        await expect(HomePage.tableRowVessel(0, vessel)).toBeDisplayed();
        await expect(HomePage.tableRowStatus(0, tripStatus)).toBeDisplayed();
        await expect(HomePage.tableRowCreatedBy(0, createdBy)).toBeDisplayed();
    },
);

Then('I should see the trip table pagination', async () => {
    await HomePage.scrollToElement(HomePage.pagination);
    await expect(HomePage.pagination).toBeDisplayed();
    await expect(HomePage.currentPage).toBeDisplayed();
});

Then('I should see the home, notifications and settings tabs', async () => {
    await expect(HomePage.homeTab).toBeDisplayed();
    await expect(HomePage.notificationsTab).toBeDisplayed();
    await expect(HomePage.settingsTab).toBeDisplayed();
});
