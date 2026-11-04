import { Given, Then, When } from '@wdio/cucumber-framework';
import iosFlowNavigator from '../helpers/iosFlowNavigator.ts';
import { BaseCatchRecordPage } from '../page-objects/baseCatchRecordPage.ts';
import SignInPage from '../page-objects/signInPage.ts';
import { getPage, type PageName } from '../support/pages.ts';

function catchRecordPage(name: PageName): BaseCatchRecordPage {
    const { page } = getPage(name);
    if (!(page instanceof BaseCatchRecordPage)) {
        throw new Error(`The ${name} page is not part of the catch record journey`);
    }
    return page;
}

async function assertOnPage(name: PageName) {
    const { page, heading, scrollToHeading } = getPage(name);
    if (scrollToHeading) {
        await page.scrollToElement(heading());
    }
    await expect(heading()).toBeDisplayed();
}

Given('I have opened the app', async () => {
    await SignInPage.openApp();
});

Given('I am signed in', async () => {
    await iosFlowNavigator.signIn();
});

Given('I am on the {page} page', assertOnPage);

Then('I should be on the {page} page', assertOnPage);

When('I save and continue on the {page} page', async (name: PageName) => {
    await catchRecordPage(name).continueToNextStep();
});

When('I tap the back button', async () => {
    await new BaseCatchRecordPage().backButton.click();
});

Then('I should see a validation error on the {page} page', async (name: PageName) => {
    const { validationError } = getPage(name);
    if (!validationError) {
        throw new Error(`No validation error is defined for the ${name} page`);
    }
    await expect(validationError()).toBeDisplayed();
});

Then('I should see the save and continue button on the {page} page', async (name: PageName) => {
    await expect(catchRecordPage(name).saveContinueButton).toBeDisplayed();
});

Then('I should see the catch record header on the {page} page', async (name: PageName) => {
    const page = catchRecordPage(name);
    await expect(page.referenceNumber).toBeDisplayed();
    await expect(page.branding).toBeDisplayed();
    await expect(page.backButton).toBeDisplayed();
});
