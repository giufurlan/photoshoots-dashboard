# PhotoshootsDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.9.

I didn't use addictional libraries.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## System design

`AppComponent` contains all Rest API calls to collect data, before handle them I wait the answer of both.

I create a data structure `PhotoshootData` to collect only needed data.

There are other 2 component: 
* `DashboardTypeComponent`
* `DashboardClientComponent`

that have respectively the break down for each type of photography and for clients for each day of the week.
 


