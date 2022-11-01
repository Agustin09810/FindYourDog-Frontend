import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  @Input() dogName?: string 
  constructor() { }

  ngOnInit(): void {
  }

  
}
