import { Injectable } from '@angular/core';
import { ContactFormValue } from 'src/app/shared/models/contact-form-value.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor() { }

    sendMail(contactFormValue: ContactFormValue) {

    }
}


// vy8310
// mlsend._domainkey.github-9e052.web.app

// SPF
// it's already merged with any pre-existing SPF record on your domain. If you don’t already have an SPF record, create a new TXT record for github-9e052.web.app
// with this value:

// v=spf1 include:_spf.mailersend.net ~all

// DKIM
// Create a TXT record for mlsend._domainkey.github - 9e052.web.app
// with this value:

// v=DKIM1;t=s;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCz8DthFYZ3KhzBGIv/dRu4kRiYPJ7+0O+2VZCshyYehEu3kTMQ9AtDtNbeUXYLK9LvUpaSSCYPkt2IYyMH5BBXH1Fz88FzAbfdyXN0h93ah51MGi7urDuthmpeCmv4yfVqBsmiBtNUIjcvUdS9iSxERc9wROmt/1m39FsDXz7KuQIDAQAB

// mta.github-9e052.web.app
