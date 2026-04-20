import { Avatar } from '@/components/ui/Avatar';
import { LikeCount } from '@/components/features/video/LikeCount';
import { formatRelative } from '@/lib/format';
import { cn } from '@/lib/cn';

type CommentUser = {
  id: string;
  name?: string | null;
  avatar?: string | null;
};

type CommentItemComment = {
  id: string;
  contents?: string | null;
  likeNum?: number | null;
  createdAt?: string | null;
  user?: CommentUser | null;
};

type CommentItemProps = {
  comment: CommentItemComment;
  first?: boolean;
};

export function CommentItem({ comment, first = false }: CommentItemProps) {
  const userName = comment.user?.name ?? 'Anonymous';
  return (
    <div className={cn('flex gap-3 py-4', !first && 'border-t border-border')}>
      <Avatar label={userName} size={32} />
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="font-sans text-sm font-semibold text-foreground">{userName}</span>
          <span className="font-mono text-xs text-foreground-subtle">
            {formatRelative(comment.createdAt)}
          </span>
        </div>
        {comment.contents && (
          <p className="font-sans text-sm leading-relaxed text-foreground">
            {comment.contents}
          </p>
        )}
        <LikeCount count={comment.likeNum ?? 0} />
      </div>
    </div>
  );
}
