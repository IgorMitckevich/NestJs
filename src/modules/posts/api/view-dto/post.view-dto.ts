import { PostDocument } from '../../domain/posts.entity.js';

export class PostViewDto {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
  extendedLikesInfo: ExtendedLikesInfoViewModel;
  static mapToView(post: PostDocument): PostViewDto {
    const dto = new PostViewDto();
    dto.id = post.id;
    dto.title = post.title;
    dto.shortDescription = post.shortDescription;
    dto.content = post.content;
    dto.blogId = post.blogId;
    dto.blogName = post.blogName;
    dto.createdAt = post.createdAt;
    dto.extendedLikesInfo = post.extendedLikesInfo;

    return dto;
  }
}
export type ExtendedLikesInfoViewModel = {
  likesCount: number;
  dislikesCount: number;
  myStatus: LikeStatus;
  newestLikes: LikeDetailsViewModel[] | null;
};
export type LikeDetailsViewModel = {
  addedAt: string;
  userId: string;
  login: string;
};
export enum LikeStatus {
  none = 'None',
  like = 'Like',
  dislike = 'Dislike',
}
