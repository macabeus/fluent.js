import { FluentBundle, FluentResource } from '@fluent/bundle';
import { ReactLocalization } from 'fluent-react';

const MESSAGES_ALL = {
  'pl': `
title = Witaj świecie!
today-is = Dziś jest { DATETIME($date, month: "long", day: "numeric") }.
  `,
  'en-US': `
title = Hello, world!
today-is = Today is { DATETIME($date, month: "long", day: "numeric") }.
  `,
};

const bundle = (language) => {
  console.log('bundle language', language)

  const bundle1 = new FluentBundle();
  bundle1.addResource(new FluentResource(MESSAGES_ALL.pl));
  bundle1.addResource(new FluentResource(MESSAGES_ALL["en-US"]));

  const rl = new ReactLocalization([bundle1])

  console.log('rl', rl)

  return rl
}

export default bundle





// import { FluentBundle } from 'fluent/compat';
// import { negotiateLanguages } from 'fluent-langneg/compat';

// const MESSAGES_ALL = {
//   'pl': `
// title = Witaj świecie!
// today-is = Dziś jest { DATETIME($date, month: "long", day: "numeric") }.
//   `,
//   'en-US': `
// title = Hello, world!
// today-is = Today is { DATETIME($date, month: "long", day: "numeric") }.
//   `,
// };

// export function* generateBundles(userLocales) {
//   // Choose locales that are best for the user.
//   const currentLocales = negotiateLanguages(
//     userLocales,
//     ['en-US', 'pl'],
//     { defaultLocale: 'en-US' }
//   );

//   for (const locale of currentLocales) {
//     const bundle = new FluentBundle(locale);
//     bundle.addMessages(MESSAGES_ALL[locale]);
//     yield bundle;
//   }
// }
