import { TripDatePage } from './tripDatePage.ts';
import { logStep } from '../common/logger.ts';

export class TripDateDeparturePage extends TripDatePage {
    protected override pageId = 'tripDate.departure';

    get dateContainer() {
        return this.heading;
    }

    async enterDepartureDate(day: string, monthName: string, year: string) {
        logStep('date entry');
        await this.enterDate(day, monthName, year);
    }
}

export default new TripDateDeparturePage();
