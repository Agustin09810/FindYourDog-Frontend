import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/interfaces/Post';
import { PostsService } from 'src/app/services/posts.service';
import { Zone } from 'src/app/interfaces/Zone';
import { ZonesService } from 'src/app/services/zones.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dogs-grid',
  templateUrl: './dogs-grid.component.html',
  styleUrls: ['./dogs-grid.component.css']
})
export class DogsGridComponent implements OnInit {

  posts: Post[] = []
  zone: Zone | undefined;
  constructor(
    private postsService: PostsService,
    private zoneService: ZonesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getZonePosts();
  }
  
  getZonePosts(): void {
    const id = this.route.snapshot.paramMap.get('zoneId');
    if(id)
      {
        this.zoneService.getZone(id).subscribe(zone => this.zone = zone);
      }
    this.postsService.getPosts().subscribe(posts => this.posts =
       posts.filter((post => post.id === this.zone?.id)));
  }

}
