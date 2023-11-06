/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {isPlatformBrowser} from '@angular/common';
import {Directive, ElementRef, OnInit, PLATFORM_ID, inject} from '@angular/core';
import {WINDOW, isExternalLink} from '@angular/docs-shared';

/**
 * The directive will set target of anchor elements to '_blank' for the external links.
 * We can opt-out this behavior by adding `noBlankForExternalLink` attribute to anchor element.
 */
@Directive({
  selector: 'a[href]:not([noBlankForExternalLink])',
  host: {
    '[attr.target]': 'target',
  },
  standalone: true,
})
export class ExternalLink implements OnInit {
  private readonly anchor: ElementRef<HTMLAnchorElement> = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly window = inject(WINDOW);

  target?: '_blank' | '_self' | '_parent' | '_top' | '';

  ngOnInit(): void {
    this.setAnchorTarget();
  }

  private setAnchorTarget(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (isExternalLink(this.anchor.nativeElement.href, this.window.location.origin)) {
      this.target = '_blank';
    }
  }
}
