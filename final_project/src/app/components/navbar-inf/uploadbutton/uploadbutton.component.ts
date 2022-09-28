import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uploadbutton',
  templateUrl: './uploadbutton.component.html',
  styleUrls: ['./uploadbutton.component.css']
})
export class UploadbuttonComponent implements OnInit {

  @Input() text: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
