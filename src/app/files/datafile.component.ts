import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import {Subscription} from 'rxjs';
import { ActivatedRoute} from '@angular/router';

import { User } from '../_models';
import { AccountService } from '../_services';

@Component({ templateUrl: 'datafile.component.html' })
export class DatafileComponent {
    user: User;
    data: string;
    fileId: number;
    fileName: string;
    page: number;
    pages: number[];
    pageLength: number;

    private querySubscription: Subscription;

    constructor(private accountService: AccountService,
                private route: ActivatedRoute) {
        this.user = this.accountService.userValue;
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.fileName = queryParam['filename'];
                this.fileId = queryParam['file-id'];
                this.page = queryParam['page'];
                this.accountService.getPageDataFile(this.fileId, this.page)
                  .pipe(first())
                  .subscribe(data => {
                      this.data = data.results;
                      if (this.pageLength === undefined) {
                        this.pageLength = this.data.length;
                      }
                      this.pages = Array.from(Array(data.total_pages), (_, i) => i + 1);
                  })
            }
        );
    }

}
