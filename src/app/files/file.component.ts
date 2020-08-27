import {Component} from '@angular/core';
import { first, flatMap } from 'rxjs/operators';

import { User } from '../_models';
import { AccountService } from '../_services';
import {Subscription,  interval } from 'rxjs';
import {ActivatedRoute} from '@angular/router';

import { environment } from './../../environments/environment';

@Component({ templateUrl: 'file.component.html' })
export class FileComponent {
    user: User;
    files: string;
    page: number;
    pages: number[] = [];

    private querySubscription: Subscription;

    constructor(private accountService: AccountService,
                private route: ActivatedRoute) {
        this.user = this.accountService.userValue;
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.page = queryParam['page'];
                if (this.page === undefined) {
                  this.page = 1;
                }
                this.accountService.getPageFiles(this.page)
                  .pipe(first())
                  .subscribe(files => {
                      this.files = files.results;
                      this.pages = Array.from(Array(files.total_pages), (_, i) => i + 1);
                  });

                interval(environment.timeUpdate)
                  .pipe(
                      flatMap(() => this.accountService.getPageFiles(this.page))
                  )
                  .subscribe(files => {
                      this.files = files.results;
                      this.pages = Array.from(Array(files.total_pages), (_, i) => i + 1);
                  });
            }
        );
    }
}
