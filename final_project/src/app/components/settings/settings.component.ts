import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Department } from 'src/app/interfaces/Department';
import { User } from 'src/app/interfaces/User';
import { Image } from 'src/app/interfaces/Image';
import { DepartmentService } from 'src/app/services/department.service';
import { ImageByIdService } from 'src/app/services/image-by-id.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private userService:UserService,
    private imageService:ImageByIdService,
    private departmentService:DepartmentService,
    private cd: ChangeDetectorRef
    ) { }

  currentUser?:User;
  profileImgUrl?:string;
  departments?:Department[];
  currentDepartmentId?:string;
  dissableButton: string = 'disabled';
  
  // Default avatar path
  defaultAvatarUrl: string = 'assets/images/default-avatar.svg';
  
  // Photo upload states
  isUploadingPhoto: boolean = false;
  photoUploadSuccess: boolean = false;
  selectedFile?: File;

  ngOnInit(): void {
    this.getCurrentUser();
    this.getDepartments();
  }

  getCurrentUser(){
    this.userService.getUser().subscribe(x => {
      this.currentUser = x;
      
      // Check if user has a profile image
      if (!this.currentUser?.profileImg || this.currentUser.profileImg === '') {
        this.profileImgUrl = this.defaultAvatarUrl;
        return;
      }
      
      this.imageService.getImagesById(this.currentUser!.profileImg).subscribe(img => {
        if(img.status==404){
          console.error("Error 404: IMAGE NOT FOUND - Using default avatar");
          this.profileImgUrl = this.defaultAvatarUrl;
          return;
        }
        this.profileImgUrl = img.url;
      }, error => {
        console.error("Error loading profile image - Using default avatar:", error);
        this.profileImgUrl = this.defaultAvatarUrl;
      });
    });
  }

  getDepartments(){
    this.departmentService.getDepartments().subscribe(departments =>{
      if(departments.status==404){
        console.error("Error 404: DEPARTMENTS NOT FOUND");
        return;
      }
       this.departments = departments
       this.currentDepartmentId = departments.find((x: { id: string | undefined; }) => x.id == this.currentUser?.departmentId)?.id; });
  }

  updateDepartment(department: string){
    if(this.currentUser){
      this.currentUser.departmentId = department
      this.userService.updateUser(this.currentUser).subscribe(
        x => {
          if(x.status==404){
            console.error("Error 404: USER NOT FOUND");
            return
          }
          this.currentDepartmentId = x.departmentId;
          window.location.reload();

        }
      );
    }
  }

  checkDepartment(department: string){
    if(this.currentUser){
      if(this.currentUser.departmentId == department){
        this.dissableButton = 'disabled';
        return true;
      }
      this.dissableButton = '';
      return false;
    }
    return false
  }

  // Photo upload methods
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.uploadProfilePhoto();
    } else {
      console.error('Please select a valid image file');
    }
  }

  onImageError(event: any): void {
    console.log('Image failed to load, switching to default avatar');
    event.target.src = this.defaultAvatarUrl;
    this.profileImgUrl = this.defaultAvatarUrl;
  }

  async uploadProfilePhoto(): Promise<void> {
    if (!this.selectedFile || !this.currentUser) {
      return;
    }

    try {
      this.isUploadingPhoto = true;
      this.photoUploadSuccess = false;

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        try {
          // Create image object
          const imageData: Image = {
            id: '', // Will be set by backend
            url: e.target.result
          };

          // Upload image to cloudinary via backend
          const uploadResult = await this.imageService.uploadImage(imageData).toPromise();
          
          if (uploadResult && uploadResult.id) {
            // Store the old profile image ID to potentially delete it later
            const oldProfileImg = this.currentUser!.profileImg;
            
            // Update user profile with new image ID
            this.currentUser!.profileImg = uploadResult.id;
            
            // Update user in database
            const userUpdateResult = await this.userService.updateUser(this.currentUser!).toPromise();
            
            if (userUpdateResult && userUpdateResult.status !== 404) {
              // Update local image URL
              this.profileImgUrl = uploadResult.url;
              
              // If there was a previous profile image (not default), optionally delete it
              if (oldProfileImg && oldProfileImg !== '' && oldProfileImg !== 'default') {
                this.imageService.deleteImage(oldProfileImg).subscribe(
                  result => console.log('Old profile image deleted successfully'),
                  error => console.log('Note: Could not delete old profile image:', error)
                );
              }
              
              // Show success message
              this.photoUploadSuccess = true;
              setTimeout(() => {
                this.photoUploadSuccess = false;
              }, 3000);
              
              console.log('Profile photo updated successfully');
            } else {
              throw new Error('Failed to update user profile');
            }
          } else {
            throw new Error('Failed to upload image');
          }
        } catch (error) {
          console.error('Error uploading profile photo:', error);
          alert('Error al subir la foto. Por favor, inténtalo de nuevo.');
        } finally {
          this.isUploadingPhoto = false;
          this.cd.detectChanges();
        }
      };

      reader.onerror = () => {
        console.error('Error reading file');
        this.isUploadingPhoto = false;
        alert('Error al leer el archivo. Por favor, inténtalo de nuevo.');
        this.cd.detectChanges();
      };

      reader.readAsDataURL(this.selectedFile);
    } catch (error) {
      console.error('Error in uploadProfilePhoto:', error);
      this.isUploadingPhoto = false;
      alert('Error al subir la foto. Por favor, inténtalo de nuevo.');
      this.cd.detectChanges();
    }
  }
}
