// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultImageUrl: 'red-raptor-1200x675.jpg',
  imagesUrl: 'http://localhost:4200/images/', // url for the service (be) that serves images (S3)
  apiUrl: '',

  domain: 'http://localhost:4200/',
  googleVerificationId: 'yQdgz7Tq72QQcbVy-jMOrcoUDXjOF8r_ODPch02CpBQ',
  blogName: 'AI HOUSES Blog',
  twitterName: '@...'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
