import { Given, Then, When } from '@wdio/cucumber-framework';
import iosFlowNavigator from '../helpers/iosFlowNavigator.ts';
import RecordSpeciesWeightsPage from '../page-objects/recordSpeciesWeightsPage.ts';

const weightErrors: Record<string, string> = {
    'blank weight':
        '//XCUIElementTypeStaticText[contains(@name, "Enter the Weight") or contains(@name, "Weight above minimum")]',
    'discarded higher than retained':
        '//XCUIElementTypeStaticText[contains(@name, "must be higher")]',
    'decimal places':
        '//XCUIElementTypeStaticText[contains(@name, "decimal") or contains(@name, "whole number")]',
    'more than 0kg':
        '//XCUIElementTypeStaticText[contains(@name, "more than 0kg") or contains(@name, "more the 0KG")]',
    'over 10,000kg': '//XCUIElementTypeStaticText[contains(@name, "10,000")]',
    'not a number': '//XCUIElementTypeStaticText[contains(@name, "must be a number")]',
};

Given('I have added the species {string}', async (species: string) => {
    await iosFlowNavigator.addSpecies(species);
});

When('I add the species {string}', async (species: string) => {
    await iosFlowNavigator.addSpecies(species);
});

Given(
    'I have recorded a weight of {string} for {string}',
    async (weight: string, species: string) => {
        await iosFlowNavigator.enterSpeciesWeights(species, weight);
    },
);

Then('I should see the weights description and the species {string}', async (species: string) => {
    await expect(RecordSpeciesWeightsPage.description).toBeDisplayed();
    await expect(RecordSpeciesWeightsPage.speciesOption(species)).toBeDisplayed();
});

When('I tap the species {string}', async (species: string) => {
    await RecordSpeciesWeightsPage.speciesOption(species).click();
});

When('I enter a weight of {string} for {string}', async (weight: string, species: string) => {
    await RecordSpeciesWeightsPage.enterWeight(species, weight);
});

When(
    'I enter a weight below minimum size of {string} for {string}',
    async (weight: string, species: string) => {
        await RecordSpeciesWeightsPage.enterWeightBelowMin(species, weight);
    },
);

When(
    'I enter a legally discarded weight of {string} for {string}',
    async (weight: string, species: string) => {
        await RecordSpeciesWeightsPage.enterWeightDiscarded(species, weight);
    },
);

Then(
    'the weight above minimum size for {string} should be {string}',
    async (species: string, weight: string) => {
        await expect(RecordSpeciesWeightsPage.weightAboveField(species)).toHaveAttribute(
            'value',
            weight,
        );
    },
);

Then(
    'the weight below minimum size for {string} should be {string}',
    async (species: string, weight: string) => {
        await expect(RecordSpeciesWeightsPage.weightBelowField(species)).toHaveAttribute(
            'value',
            weight,
        );
    },
);

Then(
    'the legally discarded weight for {string} should be {string}',
    async (species: string, weight: string) => {
        await expect(RecordSpeciesWeightsPage.weightDiscardedField(species)).toHaveAttribute(
            'value',
            weight,
        );
    },
);

When('I choose to add another species', async () => {
    await RecordSpeciesWeightsPage.addSpecies();
});

When('I choose to remove the species', async () => {
    await RecordSpeciesWeightsPage.removeSpecies();
});

Then('I should see the remove species page', async () => {
    const removeHeading = $('//XCUIElementTypeStaticText[contains(@name, "Remove")]');
    await removeHeading.waitForDisplayed({ timeout: 10000 });
    await expect(removeHeading).toBeDisplayed();
});

Then('I should see the {string} weight error', async (error: string) => {
    const selector = weightErrors[error];
    if (!selector) {
        throw new Error(
            `Unknown weight error "${error}". Expected one of: ${Object.keys(weightErrors).join(', ')}`,
        );
    }
    await expect($(selector)).toBeDisplayed();
});
