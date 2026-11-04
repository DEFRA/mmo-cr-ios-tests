import { defineParameterType } from '@wdio/cucumber-framework';
import { pageNames } from './pages.ts';

defineParameterType({ name: 'vessel', regexp: /ACHILLES|HERCULES/ });

defineParameterType({ name: 'answer', regexp: /yes|no/ });

defineParameterType({ name: 'portDirection', regexp: /departure|return/ });

defineParameterType({
    name: 'page',
    regexp: new RegExp([...pageNames].sort((a, b) => b.length - a.length).join('|')),
});
