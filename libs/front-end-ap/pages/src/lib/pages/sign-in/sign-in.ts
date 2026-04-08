import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignIn } from '@fe/auth';
import { SeoService } from '@fe/shared';
import { ImageType, Role, SEOBasic } from '@shared';

@Component({
  selector: 'lib-sign-in-page',
  imports: [SignIn],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignInPage implements OnInit {
  adminRole = Role.Admin;
  private router = inject(Router);
  seoData: SEOBasic = {
    id: 'sign-in',
    title: 'AP Sign In - AI HOUSES',
    headline: 'AP Sign In',
    description:
      'Sign in to your AI Houses account to access personalized features, manage your profile, and explore AI-generated content. Enter your credentials to get started.',
    url: '',
    image: {
      id: 'sign-in-hero',
      src: '',
      alt: 'AI Houses',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setCommonPageSeoData(this.seoData);
  }

  onSignIn() {
    this.router.navigate(['/']);
  }
}
