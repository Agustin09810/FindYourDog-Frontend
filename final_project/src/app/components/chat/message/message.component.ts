import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/interfaces/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {
  @Input() message?: Message;
  @Input() localUsername?: string;
  @ViewChild('msg') msgDiv?: ElementRef;
  
  messageDate?: string;
  isOwnMessage: boolean = false;
  isRead: boolean = false; // For future implementation of read receipts
  isPhotoMessage: boolean = false;

  @HostBinding('class.message-sent') get messageSent() { return this.isOwnMessage; }
  @HostBinding('class.message-received') get messageReceived() { return !this.isOwnMessage; }

  constructor() { }

  ngOnInit(): void {
    this.messageDate = this.calculateTime(this.message!.date);
    this.isOwnMessage = this.localUsername === this.message?.originUsername;
    this.isPhotoMessage = this.message?.text?.startsWith('[PHOTO:') || false;
  }

  ngAfterViewInit() { 
    // Classes are now applied via HostBinding
  }

  calculateTime(date: Date): string {
    if (date) {
      const messageDate = new Date(date);
      const now = new Date();
      const diffMs = now.getTime() - messageDate.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      // Same day - show time
      if (diffDays === 0) {
        return messageDate.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      }
      // Yesterday
      else if (diffDays === 1) {
        return 'Ayer ' + messageDate.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      }
      // More than 1 day - show date
      else if (diffDays < 7) {
        return messageDate.toLocaleDateString('es-ES', { 
          weekday: 'short',
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      }
      // More than a week - show full date
      else {
        return messageDate.toLocaleDateString('es-ES', { 
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      }
    }
    return '';
  }

  getPhotoUrl(): string {
    if (this.isPhotoMessage && this.message?.text) {
      const photoData = this.message.text.replace('[PHOTO:', '').replace(']', '');
      return photoData;
    }
    return '';
  }
}
