import { World, setWorldConstructor } from '@wdio/cucumber-framework';

export class CatchRecordWorld extends World {
    enteredEmail = '';
    enteredPassword = '';
}

setWorldConstructor(CatchRecordWorld);
