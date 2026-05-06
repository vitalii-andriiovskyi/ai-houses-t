import { Component } from '@angular/core';
import { CustomButton } from '../custom-button/custom-button';
import { Heading } from '../heading/heading';

@Component({
  selector: 'lib-generic',
  imports: [CustomButton, Heading],
  templateUrl: './generic.html',
  styleUrl: './generic.css',
})
export class Generic {}
