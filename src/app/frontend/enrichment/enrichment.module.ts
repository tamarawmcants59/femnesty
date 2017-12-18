import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnrichmentComponent } from './enrichment.component';
import { EnrichmentRouting } from './enrichment-routing';
import { BooksComponent } from './books/books.component';
import { VideosComponent } from './videos/videos.component';
import { EventsComponent } from './events/events.component';
import { EnrichmentService } from "./enrichment.service";
/*import { ApiService} from "../../service/api.service";
import { JwtService} from "../../service/jwt.service";
import { Http,HttpModule } from "@angular/http";*/
//import { TruncatePipe,SafePipe } from '../../exponential-strength.pipe';

import { BookdetailsComponent } from './books/bookdetails.component';
import { VideodetailsComponent } from './videos/videodetails.component';
import { ApplicationPipes } from "../../application-pipe.module";
import { EventcatComponent } from './events/eventcat.component';
import { EventcatlistComponent } from './events/eventcatlist.component';
import { EventdetailsComponent } from './events/eventdetails.component';
import { BookcatComponent } from './books/bookcat.component';
import {RatingModule} from "ng2-rating";
@NgModule({
  imports: [
    CommonModule,
    RatingModule,
    EnrichmentRouting,
    ApplicationPipes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EnrichmentComponent, 
    BooksComponent, 
    VideosComponent, 
    EventsComponent,
    BookdetailsComponent, 
    VideodetailsComponent, 
    EventcatComponent, 
    EventcatlistComponent, 
    EventdetailsComponent, 
    BookcatComponent
  ],
  //declarations: [EnrichmentComponent, BooksComponent, VideosComponent, EventsComponent, BookdetailsComponent, VideodetailsComponent],
  //providers: [ApiService,EnrichmentService,JwtService]
  providers: [EnrichmentService]
})
export class EnrichmentModule { }
