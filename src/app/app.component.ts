import { Component } from '@angular/core';
import { RegisteredIcons } from './registered-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kapitan';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router:Router,
    private apiService:ApiService
  ) {

    this.apiService.domainName = (window.location.href || '')?.split("?")[1]?.split("=")[1];
    this.apiService.api = this.apiService.baseUrl + this.apiService.domainName + '/';
    
    // this.router.navigate(['/'], {queryParams:{slug:this.apiService.domainName}});

    for(let icon of RegisteredIcons) {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    }

  }
}
