import { defineParameterType } from '@wdio/cucumber-framework';

defineParameterType({ name: 'vessel', regexp: /ACHILLES|HERCULES/ });

defineParameterType({ name: 'answer', regexp: /yes|no/ });

defineParameterType({ name: 'portDirection', regexp: /departure|return/ });

// Inline literal regex so the Cucumber VS Code extension can statically resolve {page} steps.
// Keep in sync with the keys in pages.ts.
defineParameterType({
    name: 'page',
    regexp: /catch location manual entry|select departure port|record species weights|select return port|trip departure date|check your answers|gear measurements|submission nudge|trip return date|landing storage|catch location|select vessel|select gear|add species|trip today|add port|add gear|sign-in|home/,
});
