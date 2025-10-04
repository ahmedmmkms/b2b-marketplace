import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule
  ],
  template: `
    <nz-layout class="app-layout">
      <nz-header>
        <div class="logo">P4 B2B Marketplace</div>
        <ul nz-menu nzTheme="dark" nzMode="horizontal" class="nav-menu">
          <li nz-menu-item [nzSelected]="true">
            <a routerLink="/">{{ 'NAVIGATION.HOME' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a routerLink="/catalog">{{ 'NAVIGATION.CATALOG' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a>{{ 'NAVIGATION.RFQ' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a>{{ 'NAVIGATION.ORDERS' | translate }}</a>
          </li>
          <li nz-menu-item style="float: right;">
            <button nz-button nzType="primary">{{ 'BUTTONS.LOGIN' | translate }}</button>
          </li>
        </ul>
      </nz-header>
      <nz-layout>
        <nz-content>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
    }
    
    .logo {
      float: left;
      color: white;
      font-size: 18px;
      line-height: 64px;
      padding: 0 20px;
      font-weight: bold;
    }
    
    .nav-menu {
      float: left;
    }
    
    .content {
      padding: 24px;
      min-height: 280px;
    }
    
    nz-header {
      padding: 0;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang || 'en');
  }
}