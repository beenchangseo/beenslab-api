import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
    providers: [BlogService, FirebaseModule],
    controllers: [BlogController],
})
export class BlogModule {}
