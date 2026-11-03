import { logStep } from '../common/logger.ts';
import AddGearPage from '../page-objects/addGearPage.ts';
import AddPortPage from '../page-objects/addPortPage.ts';
import AddSpeciesPage from '../page-objects/addSpeciesPage.ts';
import CatchLocationPage from '../page-objects/catchLocationPage.ts';
import ConfirmSamePortPage from '../page-objects/confirmSamePortPage.ts';
import GearMeasurementsPage from '../page-objects/gearMeasurementsPage.ts';
import HomePage from '../page-objects/homePage.ts';
import RecordSpeciesWeightsPage from '../page-objects/recordSpeciesWeightsPage.ts';
import SelectGearPage from '../page-objects/selectGearPage.ts';
import SelectPortDeparturePage from '../page-objects/selectPortDeparturePage.ts';
import SelectPortReturnPage from '../page-objects/selectPortReturnPage.ts';
import SelectVesselPage from '../page-objects/selectVesselPage.ts';
import SignInPage from '../page-objects/signInPage.ts';
import TripTodayPage from '../page-objects/tripTodayPage.ts';
import { getIosTestCredentials } from './testCredentials.ts';

export interface CatchRecordJourneyData {
    vessel: 'ACHILLES' | 'HERCULES';
    port: string;
    gear: string;
    meshSize: string;
    gearVariables: Record<string, string>;
    catchArea: string;
    species: string;
    weight: string;
    landingStorage: 'yes' | 'no';
}

export class IosFlowNavigator {
    async signIn() {
        logStep('signIn');
        await SignInPage.openApp();
        const { email, password } = getIosTestCredentials();
        await SignInPage.signIn(email, password);
    }

    async openCreateRecord() {
        logStep('openCreateRecord');
        await HomePage.scrollToElement(HomePage.createRecordButton);
        await HomePage.clickCreateRecordButton();
    }
    async selectVessel(vessel: 'ACHILLES' | 'HERCULES') {
        logStep(`selectVessel vessel=${vessel}`);
        await SelectVesselPage.selectVessel(vessel);
    }

    async selectTripToday(tripToday: 'yes' | 'no') {
        logStep(`selectTripToday tripToday=${tripToday}`);
        await TripTodayPage.selectTripToday(tripToday);
        await TripTodayPage.continueToNextStep();
    }

    async addPort(portName: string) {
        logStep(`addPort portName=${portName}`);
        await AddPortPage.selectPort(portName);
        await AddPortPage.continueToNextStep();
    }

    async confirmSamePort(portName: string, option: 'yes' | 'no') {
        logStep(`confirmSamePort option=${option}`);
        await expect(ConfirmSamePortPage.headingForPort(portName)).toBeDisplayed();
        if (option === 'yes') {
            await ConfirmSamePortPage.yesOption.click();
            await ConfirmSamePortPage.continueToNextStep();
        } else {
            await ConfirmSamePortPage.noOption.click();
            await ConfirmSamePortPage.continueToNextStep();
        }
    }

    async selectDeparturePort(portName: string) {
        logStep(`selectDeparturePort portName=${portName}`);
        await SelectPortDeparturePage.portOption(portName).click();
        await SelectPortDeparturePage.continueToNextStep();
    }

    async selectReturnPort(portName: string) {
        logStep(`selectReturnPort portName=${portName}`);
        await SelectPortReturnPage.portOption(portName).click();
        await SelectPortReturnPage.continueToNextStep();
    }
    async addGear(gearName: string) {
        logStep(`addGear gearName=${gearName}`);
        await AddGearPage.selectGear(gearName);
        await AddGearPage.continueToNextStep();
    }

    async enterGearMeasurements(meshSize: string) {
        logStep(`enterGearMeasurements meshSize=${meshSize}`);
        await GearMeasurementsPage.enterMeshSize(meshSize);
        await GearMeasurementsPage.continueToNextStep();
    }

    async selectGearDetails(gearCode: string, variables: Record<string, string>) {
        logStep(`selectGearDetails gearCode=${gearCode}`);
        await SelectGearPage.selectGear(gearCode);
        for (const [varName, varValue] of Object.entries(variables)) {
            await SelectGearPage.enterGearVariable(gearCode, varName, varValue);
        }
        await SelectGearPage.continueToNextStep();
    }

    async completeCatchLocation(area: string) {
        logStep(`area=${area}`);
        await CatchLocationPage.selectArea(area);
        await CatchLocationPage.continueToNextStep();
    }
    async addSpecies(species: string) {
        logStep(`addSpecies species=${species}`);
        await AddSpeciesPage.selectSpecies(species);
        await AddSpeciesPage.continueToNextStep();
    }

    async enterSpeciesWeights(species: string, weight: string) {
        logStep(`enterSpeciesWeights weight=${weight}`);
        await RecordSpeciesWeightsPage.enterWeight(species, weight);
        await RecordSpeciesWeightsPage.continueToNextStep();
    }
}

export default new IosFlowNavigator();
