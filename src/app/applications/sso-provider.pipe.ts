import { Pipe, PipeTransform } from '@angular/core';
import { SsoProviderCode } from './applications.model';

@Pipe({ name: 'ssoProvider' })
export class SsoProviderPipe implements PipeTransform {
    transform(value?: SsoProviderCode): string {
        switch (value) {
            case SsoProviderCode.Internal:
                return 'Internal';
            case SsoProviderCode.Microsoft:
                return 'Microsoft';
            case SsoProviderCode.Facebook:
                return 'Facebook';
            case SsoProviderCode.Google:
                return 'Google';
        }
    }
}
