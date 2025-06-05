import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chat } from 'src/app/interfaces/Chat';
import { Message } from 'src/app/interfaces/Message';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer?: ElementRef;
  @ViewChild('fileInput') fileInput?: ElementRef;
  @ViewChild('galleryInput') galleryInput?: ElementRef;

  originUsername?: string;
  targetUsername?: string;
  targetUser?: User;
  chatId?: string;
  chat?: Chat;
  user?: User;
  messages: Message[] = [];
  
  // UI States
  isLoading: boolean = true;
  isSending: boolean = false;
  isTyping: boolean = false;
  currentMessage: string = '';
  showPhotoOptions: boolean = false;
  
  // Real-time updates
  private messagePollingSubscription?: Subscription;
  private typingTimeout?: any;
  private readonly POLLING_INTERVAL = 2000; // 2 seconds
  private lastMessageCount = 0;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadChat();
  }

  ngOnDestroy(): void {
    this.stopMessagePolling();
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  loadChat(): void {
    const targetUsername = this.route.snapshot.paramMap.get('targetUsername');
    const chatId = this.route.snapshot.paramMap.get('chatId');

    if (targetUsername && chatId) {
      this.chatId = chatId;
      this.isLoading = true;

      this.userService.getUser().subscribe({
        next: (originUser) => {
          this.originUsername = originUser?.username;
          
          this.userService.getUserByUsername(targetUsername).subscribe({
            next: (targetUser) => {
              if (targetUser.status === 404) {
                console.error('Error 404, USER NOT FOUND');
                this.isLoading = false;
                return;
              }
              this.targetUsername = targetUser?.username;
              this.targetUser = targetUser; // Store the full user object
              this.loadMessages();
            },
            error: (error) => {
              console.error('Error loading target user:', error);
              this.isLoading = false;
            }
          });
        },
        error: (error) => {
          console.error('Error loading origin user:', error);
          this.isLoading = false;
        }
      });
    }
  }

  loadMessages(): void {
    if (!this.chatId) return;

    this.userService.getChatById(this.chatId).subscribe({
      next: (chat) => {
        if (chat.status === 404) {
          console.error('Error 404, CHAT NOT FOUND');
          this.isLoading = false;
          return;
        }
        
        this.chat = chat;
        if (!chat?.messagesIds || chat.messagesIds.length === 0) {
          this.messages = [];
          this.lastMessageCount = 0;
          this.isLoading = false;
          this.startMessagePolling();
          return;
        }

        // Load all messages
        const messagePromises = chat.messagesIds.map((id: string) => 
          this.messageService.getMessageById(id).toPromise()
        );

        Promise.all(messagePromises).then(messages => {
          this.messages = messages
            .filter(msg => msg && msg.text) // Filter out invalid messages
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
          this.lastMessageCount = chat.messagesIds.length; // Use chat messagesIds length
          this.isLoading = false;
          this.scrollToBottom();
          this.startMessagePolling();
        }).catch(error => {
          console.error('Error loading messages:', error);
          this.messages = [];
          this.lastMessageCount = 0;
          this.isLoading = false;
          this.startMessagePolling();
        });
      },
      error: (error) => {
        console.error('Error loading chat:', error);
        this.isLoading = false;
      }
    });
  }

  startMessagePolling(): void {
    this.stopMessagePolling();
    this.messagePollingSubscription = interval(this.POLLING_INTERVAL).subscribe(() => {
      this.checkForNewMessages();
    });
  }

  stopMessagePolling(): void {
    if (this.messagePollingSubscription) {
      this.messagePollingSubscription.unsubscribe();
      this.messagePollingSubscription = undefined;
    }
  }

  checkForNewMessages(): void {
    if (!this.chatId) return;

    this.userService.getChatById(this.chatId).subscribe({
      next: (chat) => {
        if (chat.status === 404 || !chat.messagesIds) return;
        
        // Check if there are new messages
        if (chat.messagesIds.length > this.lastMessageCount) {
          const newMessageIds = chat.messagesIds.slice(this.lastMessageCount);
          
          // Load new messages
          const newMessagePromises = newMessageIds.map((id: string) => 
            this.messageService.getMessageById(id).toPromise()
          );

          Promise.all(newMessagePromises).then(newMessages => {
            const validNewMessages = newMessages.filter(msg => msg && msg.text);
            
            if (validNewMessages.length > 0) {
              // Sort new messages by date
              validNewMessages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
              
              this.messages.push(...validNewMessages);
              this.lastMessageCount = chat.messagesIds.length;
              
              // Auto-scroll to bottom for new messages
              setTimeout(() => this.scrollToBottom(), 100);
            } else {
              // Update count even if no valid messages to prevent infinite polling
              this.lastMessageCount = chat.messagesIds.length;
            }
          }).catch(error => {
            console.error('Error loading new messages:', error);
            // Update count to prevent infinite retries on the same message
            this.lastMessageCount = chat.messagesIds.length;
          });
        }
      },
      error: (error) => {
        console.error('Error checking for new messages:', error);
      }
    });
  }

  sendMessage(): void {
    const message = this.currentMessage?.trim();
    if (!message || this.isSending || !this.originUsername || !this.targetUsername || !this.chatId) {
      return;
    }

    this.isSending = true;
    const messageId = Date.now().toString(); // Better ID generation

    const newMessage: Message = { 
      id: messageId, 
      originUsername: this.originUsername, 
      targetUsername: this.targetUsername, 
      text: message, 
      date: new Date() 
    };

    // Add message optimistically to UI
    this.messages.push(newMessage);
    this.currentMessage = '';
    this.scrollToBottom();

    // Update chat with new message
    const updatedMessagesIds = [...(this.chat?.messagesIds || []), messageId];
    const updatedChat: Chat = { id: this.chatId, messagesIds: updatedMessagesIds };

    this.messageService.sendMessage(newMessage).subscribe({
      next: () => {
        this.userService.updateChat(updatedChat).subscribe({
          next: (chat) => {
            if (chat.status === 404) {
              console.error('Error 404, CHAT NOT FOUND');
              // Remove the optimistically added message
              this.messages = this.messages.filter(m => m.id !== messageId);
            } else {
              this.chat = { ...this.chat!, messagesIds: updatedMessagesIds };
              this.lastMessageCount = updatedMessagesIds.length;
            }
            this.isSending = false;
          },
          error: (error) => {
            console.error('Error updating chat:', error);
            // Remove the optimistically added message
            this.messages = this.messages.filter(m => m.id !== messageId);
            this.isSending = false;
          }
        });
      },
      error: (error) => {
        console.error('Error sending message:', error);
        // Remove the optimistically added message
        this.messages = this.messages.filter(m => m.id !== messageId);
        this.isSending = false;
      }
    });
  }

  onTyping(): void {
    // Show typing indicator simulation (for future implementation)
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    
    // Here you could emit a typing event to other users
    this.typingTimeout = setTimeout(() => {
      // Stop typing indicator
    }, 1000);
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }

  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.messagesContainer) {
          const element = this.messagesContainer.nativeElement;
          element.scrollTop = element.scrollHeight;
        }
      }, 50);
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-user-avatar.svg';
  }

  // Photo functionality
  openPhotoOptions(): void {
    this.showPhotoOptions = true;
  }

  closePhotoOptions(): void {
    this.showPhotoOptions = false;
  }

  takePicture(): void {
    this.closePhotoOptions();
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  selectFromGallery(): void {
    this.closePhotoOptions();
    if (this.galleryInput) {
      this.galleryInput.nativeElement.click();
    }
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.sendPhoto(file);
    }
    // Reset the input
    event.target.value = '';
  }

  sendPhoto(file: File): void {
    if (!this.originUsername || !this.targetUsername || !this.chatId) {
      return;
    }

    this.isSending = true;
    
    // Create a FileReader to convert the image to base64
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const messageId = Date.now().toString();
      
      const photoMessage: Message = {
        id: messageId,
        originUsername: this.originUsername!,
        targetUsername: this.targetUsername!,
        text: `[PHOTO:${e.target.result}]`, // Store base64 image data
        date: new Date()
      };

      // Add message optimistically to UI
      this.messages.push(photoMessage);
      this.scrollToBottom();

      // Update chat with new message
      const updatedMessagesIds = [...(this.chat?.messagesIds || []), messageId];
      const updatedChat: Chat = { id: this.chatId!, messagesIds: updatedMessagesIds };

      this.messageService.sendMessage(photoMessage).subscribe({
        next: () => {
          this.userService.updateChat(updatedChat).subscribe({
            next: (chat) => {
              if (chat.status === 404) {
                console.error('Error 404, CHAT NOT FOUND');
                this.messages = this.messages.filter(m => m.id !== messageId);
              } else {
                this.chat = { ...this.chat!, messagesIds: updatedMessagesIds };
                this.lastMessageCount = updatedMessagesIds.length;
              }
              this.isSending = false;
            },
            error: (error) => {
              console.error('Error updating chat:', error);
              this.messages = this.messages.filter(m => m.id !== messageId);
              this.isSending = false;
            }
          });
        },
        error: (error) => {
          console.error('Error sending photo:', error);
          this.messages = this.messages.filter(m => m.id !== messageId);
          this.isSending = false;
        }
      });
    };
    
    reader.readAsDataURL(file);
  }
}
