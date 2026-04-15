import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { getCountry } from '@shared';

const COUNTRY_KEY = 'country';
const ZONE_KEY = 'zone';

export const zoneValidator =
  (keys = { country: COUNTRY_KEY, zone: ZONE_KEY }): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const country = control.get(keys.country)?.value;
    const zone = control.get(keys.zone)?.value;

    if (!country) {
      return null;
    }

    // zones could be states, provinces, regions, etc. depending on the country, so we will use generic name "zones"
    const zones = getCountry(country)?.zones || [];

    if (!zones?.length) {
      return null;
    }

    if (zones.length && !zone) {
      control.get(keys.zone)?.setErrors({ requiredZone: true });
      return { requiredZone: true };
    } else if (zone) {
      control.get(keys.zone)?.setErrors(null);
    }

    const zoneExists = zones.some((s) => s.code === zone);

    if (zoneExists) {
      control.get(keys.zone)?.setErrors(null);
    } else {
      control.get(keys.zone)?.setErrors({ invalidZone: true });
      return { invalidZone: true };
    }
    return null;
  };

export const zoneErrorMessages: ValidationErrors = {
  requiredZone: (label = 'Zone') =>
    `${label} is required for the selected country`,
  invalidZone: (label = 'Zone') =>
    `${label} is not valid for the selected country`,
};
