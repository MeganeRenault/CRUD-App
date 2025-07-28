import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ParameterComponent } from './app/parameter.component';

bootstrapApplication(ParameterComponent, appConfig)
  .catch((err) => console.error(err));
