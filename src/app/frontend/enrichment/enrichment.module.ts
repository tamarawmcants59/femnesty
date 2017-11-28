import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  imports: [
    CommonModule,
    //HttpModule,
    EnrichmentRouting,
    ApplicationPipes
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
    EventdetailsComponent
  ],
  //declarations: [EnrichmentComponent, BooksComponent, VideosComponent, EventsComponent, BookdetailsComponent, VideodetailsComponent],
  //providers: [ApiService,EnrichmentService,JwtService]
  providers: [EnrichmentService]
})
export class EnrichmentModule { }
