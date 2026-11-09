import { LikeStatus } from '../../../posts/api/view-dto/post.view-dto.js';

export type CommentViewDto = {
  id: string;
  content: string;
  commentatorInfo: CommentatorInfo;
  createdAt: string;
  likesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus;
  };
};
export type CommentatorInfo = {
  userId: string;
  userLogin: string;
};
