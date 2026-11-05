import { Given, Then, When } from '@wdio/cucumber-framework';
import iosFlowNavigator from '../helpers/iosFlowNavigator.ts';
import AddPortPage from '../page-objects/addPortPage.ts';
import SelectPortDeparturePage from '../page-objects/selectPortDeparturePage.ts';
import SelectPortReturnPage from '../page-objects/selectPortReturnPage.ts';

type PortDirection = 'departure' | 'return';

const portPage = (direction: PortDirection) =>
    direction === 'departure' ? SelectPortDeparturePage : SelectPortReturnPage;

Given('I have added {string} as both the departure and return port', async (port: string) => {
    await iosFlowNavigator.addPort(port);
    await iosFlowNavigator.confirmSamePort(port, 'yes');
});

When('I add the port {string}', async (port: string) => {
    await iosFlowNavigator.addPort(port);
});

When(
    'I answer {answer} to departing from and returning to {string}',
    async (answer: 'yes' | 'no', port: string) => {
        await iosFlowNavigator.confirmSamePort(port, answer);
    },
);

Then('I should see the port search field', async () => {
    await expect(AddPortPage.searchField).toBeDisplayed();
});

When('I search for the port {string}', async (term: string) => {
    await AddPortPage.enterPortSearch(term);
});

Then('the port result {string} should not be displayed', async (port: string) => {
    await expect(AddPortPage.portResult(port)).not.toBeDisplayed();
});

Then('the port result {string} should be displayed', async (port: string) => {
    const result = AddPortPage.portResult(port);
    await result.waitForExist({ timeout: 10000 });
    await AddPortPage.scrollToElement(result);
    await expect(result).toBeDisplayed();
});

When('I select the port result {string}', async (port: string) => {
    await AddPortPage.portResult(port).click();
});

Then('the port search field should contain {string}', async (value: string) => {
    await expect(AddPortPage.searchField).toHaveAttribute('value', value);
});

Then(
    'the {portDirection} port option {string} should be displayed',
    async (direction: PortDirection, port: string) => {
        await expect(portPage(direction).portOption(port)).toBeDisplayed();
    },
);

Then(
    'the {portDirection} port option {string} should not be selected',
    async (direction: PortDirection, port: string) => {
        await expect(portPage(direction).portOption(port)).not.toBeSelected();
    },
);

Then(
    'the {portDirection} port option {string} should be selected',
    async (direction: PortDirection, port: string) => {
        await expect(portPage(direction).portOption(port)).toBeSelected();
    },
);

When(
    'I tap the {portDirection} port option {string}',
    async (direction: PortDirection, port: string) => {
        await portPage(direction).portOption(port).click();
    },
);

When(
    'I choose {string} as the {portDirection} port',
    async (port: string, direction: PortDirection) => {
        await portPage(direction).portOption(port).click();
        await portPage(direction).continueToNextStep();
    },
);

Then(
    'I should see the add another port button on the {portDirection} port page',
    async (direction: PortDirection) => {
        await expect(portPage(direction).addAnotherPortButton).toBeDisplayed();
    },
);

When('I choose to add another {portDirection} port', async (direction: PortDirection) => {
    await portPage(direction).addAnotherPortButton.click();
});
