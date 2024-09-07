import { Pipe, PipeTransform } from '@angular/core';
import { ApplicationUrlTypeCode } from './applications.model';

@Pipe({ name: 'urlType' })
export class UrlTypePipe implements PipeTransform {
    transform(value?: ApplicationUrlTypeCode): string {
        switch (value) {
            case ApplicationUrlTypeCode.Callback:
                return 'Callback URL (URL for receive a redirect with access token)';
        }
    }
}
