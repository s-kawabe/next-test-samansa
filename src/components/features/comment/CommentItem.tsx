import { Avatar } from '@/components/ui/Avatar';
import { LikeCount } from '@/components/features/video/LikeCount';
import { formatRelative } from '@/lib/format';

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
    <div
      style={{
        display: 'flex',
        gap: 'var(--spacing-3)',
        padding: 'var(--spacing-4) 0',
        borderTop: first ? 'none' : '1px solid var(--color-border)',
      }}
    >
      <Avatar label={userName} size={32} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-2)' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--color-foreground)',
            }}
          >
            {userName}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-foreground-subtle)',
            }}
          >
            {formatRelative(comment.createdAt)}
          </span>
        </div>
        {comment.contents && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--color-foreground)',
            }}
          >
            {comment.contents}
          </p>
        )}
        <LikeCount count={comment.likeNum ?? 0} />
      </div>
    </div>
  );
}
