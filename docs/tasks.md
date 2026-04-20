# 実装タスク一覧

プロトタイプ（`prototyping/Samansa Mock _Standalone.html`）の見た目・UI遷移を参考に、`src/` 配下へ本実装を進める。
コンポーネント構造はプロトタイプに縛られず、以下の設計方針に従う。

---

## 設計方針

### ディレクトリ構成

```
src/
  app/
    layout.tsx
    page.tsx                        # トップページ（RSC）
    loading.tsx                     # トップページのローディング
    not-found.tsx                   # 404ページ
    categories/[id]/
      page.tsx                      # カテゴリ詳細（RSC）
      loading.tsx
    videos/[id]/
      page.tsx                      # 映画詳細（RSC）
      loading.tsx
  components/
    ui/                             # ドメイン知識を持たない汎用UIコンポーネント
      Avatar.tsx                    # Server Component
      Breadcrumb.tsx                # Server Component
      DurationBadge.tsx             # Server Component
      Eyebrow.tsx                   # Server Component
      Shelf.tsx                     # Client Component（スクロール制御）
      Drawer.tsx                    # Client Component（base-ui Drawer）
    features/
      video/
        VideoCard.tsx               # Server Component
        VideoHero.tsx               # Server Component（フルブリードサムネイル）
        LikeButton.tsx              # Client Component（楽観的更新）
        LikeCount.tsx               # Server Component
      category/
        CategoryShelf.tsx           # Server Component（Shelf + VideoCard を組み合わせ）
        CategoryVideoCard.tsx       # Server Component
      comment/
        CommentItem.tsx             # Server Component
        CommentsDrawer.tsx          # Client Component（Drawer + Apollo fetchMore）
      navigation/
        TopBar.tsx                  # Server Component
        Footer.tsx                  # Server Component
  lib/
    format.ts
    apolloClient.ts
    apolloRSC.ts
    graphql/...
```

### Server / Client Component の原則

- **デフォルトはServer Component**。`useState` / `useEffect` / ブラウザAPI が必要な場合のみ `'use client'`
- Client Component は末端（葉）に閉じ込め、Server Component が Client Component を子として渡す構成を優先する
- RSCでのデータ取得は `lib/apolloRSC.ts` の `query()` を使用する

### デザイントークン早見表

| トークン                    | 値                    | 用途                                      |
| --------------------------- | --------------------- | ----------------------------------------- |
| `--font-display`            | Space Grotesk         | ブランドロゴ・大見出し                    |
| `--font-sans`               | Zen Kaku Gothic New   | 本文・UIラベル                            |
| `--font-mono`               | JetBrains Mono        | Eyebrow・バッジ・タイムスタンプ・カウント |
| `--color-primary`           | oklch(0.495 0.170 22) | アクション・LikeButton アクティブ         |
| `--color-foreground-muted`  | oklch(0.440 0 0)      | サブテキスト                              |
| `--color-foreground-subtle` | oklch(0.560 0 0)      | 薄いラベル                                |
| `--color-background-muted`  | oklch(0.970 0 0)      | バッジ背景                                |
| `--radius-sm`               | 4px                   | バッジ・小コンポーネント                  |
| `--radius-md`               | 6px                   | ボタン・カード                            |
| `--tracking-wider`          | 0.08em                | Eyebrow・モノスペースラベル               |

---

## Phase 1: 基盤セットアップ

### T-01: グローバルCSS・デザイントークンの構築

ファイル: `src/styles/globals.css`

- oklch ベースのカラースケール（neutral / primary-crimson）定義済み
- セマンティックカラー、タイポグラフィ、スペーシング、ラジウス、シャドウ、モーション変数定義済み
- `.container-max`、`.no-scrollbar` ユーティリティ実装済み
- Tailwind `@theme inline` ブリッジ定義済み

### T-02: フォント・レイアウト設定の更新 ⚠️ 修正必要

ファイル: `src/app/layout.tsx`

現状: `Playfair_Display` + `Geist_Mono` を使用中（Figmaデザインと不一致）

**修正内容:**

- `Playfair_Display` を削除し `Space_Grotesk` を `--font-display` に割り当て
- `Geist_Mono` を削除し `JetBrains_Mono` を `--font-mono` に割り当て
- `Zen_Kaku_Gothic_New` を `--font-geist-sans` ではなく直接 `--font-sans` に割り当て
- globals.css の `--font-sans` 定義も `var(--font-zen-kaku)` 参照に修正
- `next/font/google` からのインポートに変更

```tsx
// 修正後のイメージ
const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});
const zenKakuGothic = Zen_Kaku_Gothic_New({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});
```

### T-03: lib/format.ts の実装

ファイル: `src/lib/format.ts` — 実装・テスト済み

### T-04: GraphQL クエリの更新と型再生成

ファイル: `src/lib/graphql/query/*.graphql` — 更新済み

### T-05: lib/apolloRSC.ts の追加

ファイル: `src/lib/apolloRSC.ts`, `src/lib/apolloClientFactory.ts` — 実装済み

---

## Phase 2: ui/ コンポーネント実装

ドメイン知識を持たない汎用UIコンポーネント群。

### T-06: Eyebrow コンポーネント

ファイル: `src/components/ui/Eyebrow.tsx` — **Server Component**

**ビジュアル仕様:**

- `font-family: var(--font-mono)` / `font-size: var(--text-xs)` (12px) / `font-weight: 500`
- `letter-spacing: var(--tracking-wider)` (0.08em) / `text-transform: uppercase`
- `tone` prop による色分け:
  - `'subtle'` (default): `color: var(--color-foreground-subtle)`
  - `'muted'`: `color: var(--color-foreground-muted)`
  - `'foreground'`: `color: var(--color-foreground)`

**インターフェース:**

```tsx
type EyebrowProps = {
  tone?: 'subtle' | 'muted' | 'foreground';
  children: React.ReactNode;
};
```

### T-07: Avatar コンポーネント

ファイル: `src/components/ui/Avatar.tsx` — **Server Component**

**ビジュアル仕様:**

- 正円: `border-radius: var(--radius-full)` / `aspect-ratio: var(--aspect-square)`
- 背景: `background: var(--color-foreground)` (ダーク) / テキスト: `color: var(--color-foreground-inverse)` (白)
- フォント: `font-family: var(--font-sans)` / `font-weight: 600`
- サイズ: `width` / `height` を `size` prop (px) で制御、デフォルト 36px
- イニシャル: `label` の先頭1文字を大文字で表示

**インターフェース:**

```tsx
type AvatarProps = {
  label: string; // ユーザー名（イニシャル表示用）
  size?: number; // px, default: 36
};
```

### T-08: DurationBadge コンポーネント

ファイル: `src/components/ui/DurationBadge.tsx` — **Server Component**

**ビジュアル仕様:**

- `position: absolute; bottom: var(--spacing-2); right: var(--spacing-2)`
- 背景: `background: oklch(0 0 0 / 0.65)` (半透明ブラック)
- テキスト: `color: var(--color-foreground-inverse)` (白)
- `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / `font-weight: 500`
- `letter-spacing: var(--tracking-wider)` / `padding: 2px var(--spacing-2)`
- `border-radius: var(--radius-xs)` (2px)
- `Duration` 型を受け取り `formatDurationShort` で表示
- `duration` が null の場合は `null` を返す

**インターフェース:**

```tsx
type DurationBadgeProps = {
  duration: Duration | null | undefined;
};
```

### T-09: Breadcrumb コンポーネント

ファイル: `src/components/ui/Breadcrumb.tsx` — **Server Component**

**ビジュアル仕様:**

- `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / `font-weight: 400`
- `letter-spacing: var(--tracking-wider)` / `text-transform: uppercase`
- セパレーター `/` の色: `var(--color-foreground-subtle)`
- リンクあり項目: `color: var(--color-foreground-muted)`, hover: `color: var(--color-foreground)`, transition: `var(--duration-fast)`
- 末尾項目（現在地）: `color: var(--color-foreground)`, `<span>` でレンダリング（リンクなし）

**インターフェース:**

```tsx
type BreadcrumbProps = {
  items: { label: string; href?: string }[];
};
```

### T-10: Shelf コンポーネント

ファイル: `src/components/ui/Shelf.tsx` — **Client Component** (`'use client'`)

**ビジュアル仕様:**

- コンテナ: `overflow-x: auto` / `scroll-snap-type: x mandatory` / `.no-scrollbar`
- 子要素: `scroll-snap-align: start` / `flex-shrink: 0`
- 左右矢印ボタン:
  - デフォルト `opacity: 0`、スクロール位置に応じて表示（左端以外で左矢印、右端以外で右矢印）
  - `transition: opacity var(--duration-base) var(--ease-standard)`
  - `position: absolute`、コンテナに `position: relative`
  - クリックで `scrollBy({ left: ±(cardWidth + gap), behavior: 'smooth' })`
- `useRef` + `addEventListener('scroll')` + `ResizeObserver` で制御

**インターフェース:**

```tsx
type ShelfProps = {
  children: React.ReactNode;
  gap?: number; // px, default: 16
};
```

### T-11: Drawer コンポーネント

ファイル: `src/components/ui/Drawer.tsx` — **Client Component** (`'use client'`)

**概要:** `@base-ui-components/react` の Drawer プリミティブをラップした再利用可能なドロワーUI。映画詳細ページのコメント表示に使用する。

**パッケージ:**

```bash
pnpm add @base-ui-components/react
```

**実装パターン（base-ui Drawer）:**

```tsx
import * as Drawer from '@base-ui-components/react/drawer';

// Drawer.Root / Drawer.Trigger / Drawer.Portal / Drawer.Backdrop / Drawer.Popup
// Drawer.Title / Drawer.Description / Drawer.Close を使用
```

**ビジュアル仕様:**

- `Drawer.Popup`: 右端から `width: 400px` のサイドパネル、`position: fixed; inset: 0 0 0 auto`
- 背景: `background: var(--color-background)` / `border-left: 1px solid var(--color-border)`
- `Drawer.Backdrop`: `background: var(--color-overlay)` (oklch 0 0 0 / 0.6)
- アニメーション:
  - open: `translateX(0)` from `translateX(100%)`, `var(--duration-slow) var(--ease-standard)`
  - close: `translateX(100%)`, `var(--duration-base) var(--ease-exit)`
- `Drawer.Title`: 非表示（アクセシビリティ用 `sr-only`）

**インターフェース（ラッパー）:**

```tsx
type DrawerProps = {
  trigger: React.ReactNode; // Drawer.Trigger の中身
  title: string; // アクセシビリティ用タイトル（sr-only）
  children: React.ReactNode; // Drawer.Popup の中身
};
```

---

## Phase 3: features/ コンポーネント実装

### T-12: LikeCount コンポーネント

ファイル: `src/components/features/video/LikeCount.tsx` — **Server Component**

**ビジュアル仕様:**

- 表示形式: `♥ 12.5k` — ハートはUnicode `♥` (U+2665)
- `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / `font-weight: 500`
- `color: var(--color-foreground-muted)` (通常) / `color: var(--color-primary)` (emphasized)
- `formatLikes()` で数値をフォーマット

**インターフェース:**

```tsx
type LikeCountProps = {
  count: number;
  emphasized?: boolean;
};
```

### T-13: VideoCard コンポーネント

ファイル: `src/components/features/video/VideoCard.tsx` — **Server Component**

**ビジュアル仕様:**

- カードコンテナ: `Link` to `/videos/[id]`, `display: flex; flex-direction: column; gap: var(--spacing-3)`
- サムネイルラッパー: `position: relative` / `aspect-ratio: var(--aspect-video)` (16/9) / `overflow: hidden` / `border-radius: var(--radius-sm)`
- 画像: `object-fit: cover` / `width: 100%` / hover で `scale(1.03)` + `transition: transform var(--duration-slow) var(--ease-standard)`
- `DurationBadge` をサムネイル右下に絶対配置
- タイトル: `font-family: var(--font-sans)` / `font-size: var(--text-sm)` / `font-weight: 600` / `color: var(--color-foreground)` / 2行クランプ
- `LikeCount` をタイトル下に配置
- `width` prop でカード全体の幅を指定（Shelf内での使用を想定）

**インターフェース:**

```tsx
type VideoCardProps = {
  video: {
    id: string;
    title: string;
    thumbnailUrl: string;
    duration: Duration | null;
    likeNum: number;
  };
  width?: number | string;
};
```

### T-14: VideoHero コンポーネント

ファイル: `src/components/features/video/VideoHero.tsx` — **Server Component**

**ビジュアル仕様:**

- コンテナ: `width: 100%` / `aspect-ratio: var(--aspect-video)` (16/9) / `position: relative` / `overflow: hidden`
- 画像: `object-fit: cover` / `width: 100%` / `height: 100%`
- グラデーションオーバーレイ: `position: absolute; inset: 0`
  - `background: linear-gradient(to bottom, transparent 40%, var(--color-background) 100%)`
  - 下端へのフェードアウトでページ背景色に溶け込む

**インターフェース:**

```tsx
type VideoHeroProps = {
  src: string;
  alt: string;
};
```

### T-15: LikeButton コンポーネント

ファイル: `src/components/features/video/LikeButton.tsx` — **Client Component** (`'use client'`)

**ビジュアル仕様:**

- ボタン形状: `border-radius: var(--radius-sm)` / `padding: var(--spacing-3) var(--spacing-4)`
- デフォルト（未いいね）: `border: 1px solid var(--color-border-strong)` / `background: transparent` / `color: var(--color-foreground-muted)`
- アクティブ（いいね済み）: `background: var(--color-primary)` / `border-color: var(--color-primary)` / `color: var(--color-primary-foreground)` (白)
- hover（未いいね）: `border-color: var(--color-foreground)` / `color: var(--color-foreground)`
- hover（いいね済み）: `background: var(--color-primary-hover)` (oklch 0.420)
- transition: `var(--duration-fast) var(--ease-standard)`
- ラベル: 未いいね `♡ Like this film` / いいね済み `♥ Liked`
- カウント表示: `N people` (`font-family: var(--font-mono)` / `font-size: var(--text-xs)`)
- 楽観的更新: `useState` で `liked` / `count` を管理
- TODO: `addLike` / `removeLike` Mutation への接続は別タスク

**インターフェース:**

```tsx
type LikeButtonProps = {
  videoId: string;
  initialLiked?: boolean;
  initialCount: number;
};
```

### T-16: CategoryVideoCard コンポーネント

ファイル: `src/components/features/category/CategoryVideoCard.tsx` — **Server Component**

**ビジュアル仕様:**

- カードコンテナ: `Link` to `/videos/[id]`, `display: flex; flex-direction: column; gap: var(--spacing-3)`
- サムネイルラッパー: `position: relative` / `aspect-ratio: var(--aspect-video)` (16/9) / `overflow: hidden` / `border-radius: var(--radius-sm)`
- 画像: `object-fit: cover` / hover で `scale(1.03)` トランジション
- `DurationBadge` をサムネイル右下に絶対配置
- メタ行: `Eyebrow` で連番（`#01` 形式、`tone="subtle"`）を左端に
- タイトル: `font-size: var(--text-base)` / `font-weight: 600` / 2行クランプ
- 説明文: `font-size: var(--text-sm)` / `color: var(--color-foreground-muted)` / 最大60文字で切り詰め（`…` 付加）
- フッター行: `LikeCount` を右端に配置

**インターフェース:**

```tsx
type CategoryVideoCardProps = {
  video: {
    id: string;
    title: string;
    description: string | null;
    thumbnailUrl: string;
    duration: Duration | null;
    likeNum: number;
  };
  index: number; // 1始まり（#01 形式の連番に使用）
};
```

### T-17: CategoryShelf コンポーネント

ファイル: `src/components/features/category/CategoryShelf.tsx` — **Server Component**

**ビジュアル仕様:**

**ヘッダー部分:**

- コンテナ: `display: flex; align-items: baseline; gap: var(--spacing-4); margin-bottom: var(--spacing-6)`
- 連番 `Eyebrow`: `indexOfTotal(index, total)` 形式（`01 / 05`）、`tone="subtle"`
- カテゴリ名: `font-family: var(--font-display)` (Space Grotesk) / `font-size: var(--text-3xl)` / `font-weight: 700` / `letter-spacing: var(--tracking-tight)` / `line-height: var(--leading-tight)`
- タグライン: `font-size: var(--text-sm)` / `color: var(--color-foreground-muted)` / `margin-left: auto` 右寄せ
- "View all →" リンク: `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / `color: var(--color-foreground-subtle)` / hover: `color: var(--color-foreground)`

**シェルフ部分:**

- `Shelf` コンポーネントに `VideoCard` を並べる
- `VideoCard` の幅: 280px (デフォルト) / Shelf の gap: 16px (`var(--spacing-4)`)
- セクション padding-bottom: `var(--spacing-12)` (48px)

**インターフェース:**

```tsx
type CategoryShelfProps = {
  categoryId: string;
  categoryName: string;
  tagline: string | null;
  index: number;
  total: number;
  videos: VideoCardProps['video'][];
};
```

### T-18: CommentItem コンポーネント

ファイル: `src/components/features/comment/CommentItem.tsx` — **Server Component**

**ビジュアル仕様:**

- コンテナ: `display: flex; gap: var(--spacing-3); padding: var(--spacing-4) 0`
- `first` が false の場合: `border-top: 1px solid var(--color-border)`
- `Avatar` (size=32) を左端に配置
- 右カラム:
  - ユーザー名: `font-size: var(--text-sm)` / `font-weight: 600` / `color: var(--color-foreground)`
  - タイムスタンプ: `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / `color: var(--color-foreground-subtle)` / `formatRelative()` でフォーマット
  - コメント本文: `font-size: var(--text-sm)` / `line-height: var(--leading-relaxed)` / `color: var(--color-foreground)` / `margin-top: var(--spacing-1)`
  - `LikeCount` を本文下に配置

**インターフェース:**

```tsx
type CommentItemProps = {
  comment: {
    id: string;
    contents: string; // GraphQL フィールド名に合わせる（body ではない）
    likeNum: number;
    createdAt: string; // ISO 8601
    user: { id: string; name: string; avatar: string | null };
  };
  first?: boolean;
};
```

### T-19: CommentsDrawer コンポーネント

ファイル: `src/components/features/comment/CommentsDrawer.tsx` — **Client Component** (`'use client'`)

**概要:** T-11 の `Drawer` コンポーネントを使って右側からスライドするコメントドロワーを実装する。Apollo `useSuspenseQuery` + `fetchMore` でカーソルベースページネーション。

**データフェッチ:**

- `useSuspenseQuery(GetVideoCommentsDocument, { variables: { id: videoId, first: COMMENTS_PAGE_SIZE } })`
- PreloadQuery で RSC 側がキャッシュに積んだデータにキャッシュヒットするため初回ネットワーク不要
- `fetchMore` で追加ページを取得し `updateQuery` でエッジをマージ

```ts
// updateQuery パターン（example-page-client.tsx と同様）
updateQuery: (prev, { fetchMoreResult }) => ({
  videoComments: {
    ...prev.videoComments,
    edges: [
      ...(prev.videoComments.edges ?? []),
      ...(fetchMoreResult.videoComments.edges ?? []),
    ],
    pageInfo: fetchMoreResult.videoComments.pageInfo,
  },
});
```

**ビジュアル仕様:**

- トリガー: `"Comments (N)"` ボタン — `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / `border: 1px solid var(--color-border-strong)` / `border-radius: var(--radius-sm)`
- Drawer 内コンテンツ (`padding: var(--spacing-6)`):
  - ヘッダー: `COMMENTS · N` ラベル（`--font-mono` / `--text-xs` / uppercase）+ 閉じるボタン
  - コメントリスト: `CommentItem` を `allCount` の数だけ並べる（`videoComments.edges.map(e => e.node)`）
  - "Load more" ボタン: `hasNextPage` が true の場合のみ表示
    - ラベル: `Load more (N remaining)` — N = `allCount - edges.length`
    - `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / `color: var(--color-foreground-muted)`

**GraphQL フィールドマッピング:**

```ts
// getVideoComments の node フィールド
node.id /
  node.contents /
  node.user.name /
  node.user.avatar /
  node.createdAt /
  node.likeNum;
```

**インターフェース:**

```tsx
const COMMENTS_PAGE_SIZE = 10; // src/lib/constants.ts で定義

type CommentsDrawerProps = {
  videoId: string;
  // PreloadQuery が RSC 側で積むため initialData は不要
};
```

---

## Phase 4: navigation/ コンポーネント実装

### T-20: TopBar コンポーネント

ファイル: `src/components/features/navigation/TopBar.tsx` — **Server Component**

**ビジュアル仕様:**

- `position: sticky; top: 0; z-index: var(--z-sticky)` (20)
- 高さ: `height: var(--spacing-16)` (64px)
- 背景: `background: color-mix(in oklch, var(--color-background) 85%, transparent)` + `backdrop-filter: blur(12px)`
- 下ボーダー: `border-bottom: 1px solid var(--color-border)`
- 内側: `.container-max` でラップ / `display: flex; align-items: center; gap: var(--spacing-8)`

**左: ブランドロゴ** (`/` へのリンク)

- 「S」マーク: 正方形バッジ（`background: var(--color-foreground)` / `color: var(--color-foreground-inverse)`）、`var(--radius-xs)` / 28px 程度
- 「samansa」テキスト: `font-family: var(--font-display)` / `font-size: var(--text-lg)` / `font-weight: 700` / `letter-spacing: var(--tracking-wide)`

**中央: ナビゲーション**

- `display: flex; gap: var(--spacing-8)` / `margin-inline: auto`
- リンク: `font-size: var(--text-sm)` / `color: var(--color-foreground-muted)` / hover: `color: var(--color-foreground)` / transition: `var(--duration-fast)`
- 項目: `Home` / `Categories` / `Search`

**右: ユーザーアバター**

- `Avatar` コンポーネント (size=32) をダミーデータで表示

### T-21: Footer コンポーネント

ファイル: `src/components/features/navigation/Footer.tsx` — **Server Component**

**ビジュアル仕様:**

- `border-top: 1px solid var(--color-border)` / `padding: var(--spacing-16) 0`
- 内側: `.container-max` でラップ / `display: flex; flex-direction: column; gap: var(--spacing-4)`
- ロゴ: `"samansa."` / `font-family: var(--font-display)` / `font-size: var(--text-5xl)` / `font-weight: 900` / `letter-spacing: var(--tracking-tighter)` / `color: var(--color-foreground)`
- コピーライト: `"© 2026 · Curated cinema"` / `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / `color: var(--color-foreground-subtle)` / `letter-spacing: var(--tracking-wider)`

---

## Phase 5: ページ実装

### データフェッチの共通パターン

全ページで `example/page.tsx` と同じ **PreloadQuery → useSuspenseQuery** パターンを使う。

```tsx
// RSC (page.tsx) — PreloadQuery でキャッシュに積む
export default function Page({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <PreloadQuery query={XxxDocument} variables={{ id: params.id }}>
        <PageClient id={params.id} />
      </PreloadQuery>
    </Suspense>
  );
}

// CC (*-client.tsx) — useSuspenseQuery でキャッシュヒット（ネットワーク不要）
('use client');
export function PageClient({ id }) {
  const { data } = useSuspenseQuery(XxxDocument, { variables: { id } });
  // ...
}
```

### T-22: トップページ

ファイル: `src/app/page.tsx`（RSC）、`src/app/_components/home-page-client.tsx`（CC）、`src/app/loading.tsx`

**使用クエリ: `getHomeScreens`**

```graphql
# レスポンス構造
homeScreens[].id
homeScreens[].category { id, name }
homeScreens[].videos[] { id, title, duration { minutes, seconds }, landscapeThumbnail, likeNum }
```

**page.tsx（RSC）:**

```tsx
export const revalidate = 60;

export default function HomePage() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <PreloadQuery query={GetHomeScreensDocument}>
        <HomePageClient />
      </PreloadQuery>
    </Suspense>
  );
}
```

**HomePageClient（CC）:**

- `useSuspenseQuery(GetHomeScreensDocument)` でデータ取得（キャッシュヒット）
- `homeScreens` をループして `CategoryShelf` を並べる
  - `homeScreen.category.id` → `categoryId`
  - `homeScreen.category.name` → `categoryName`
  - `homeScreen.videos` → `videos`（`landscapeThumbnail` を `thumbnailUrl` として渡す）
  - `tagline` は `null` でOK（クエリに含まれないため）

**Hero セクション:**

- padding: `var(--spacing-24) 0 var(--spacing-16)`
- キャッチコピー: `font-family: var(--font-display)` / `font-size: var(--text-7xl)` / `font-weight: 900` / `letter-spacing: var(--tracking-tighter)` / `line-height: var(--leading-tight)`
- サブコピー: `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / uppercase / `color: var(--color-foreground-subtle)` — `${homeScreens.length} CATEGORIES · CURATED SHORT CINEMA`

**loading.tsx:** カテゴリシェルフのスケルトン（ヘッダーバー + カード複数の `animate-pulse`）

### T-23: カテゴリ詳細ページ

ファイル: `src/app/categories/[id]/page.tsx`（RSC）、`src/app/categories/[id]/_components/category-page-client.tsx`（CC）、`src/app/categories/[id]/loading.tsx`

**使用クエリ: `getCategory`**

```graphql
# レスポンス構造
category.id / category.name
category.videos[] { id, title, duration { minutes, seconds }, landscapeThumbnail, likeNum, description }
# ※ category 自体の description フィールドはなし
```

**page.tsx（RSC）:**

```tsx
export const revalidate = 60;

export default function CategoryPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <PreloadQuery query={GetCategoryDocument} variables={{ id: params.id }}>
        <CategoryPageClient id={params.id} />
      </PreloadQuery>
    </Suspense>
  );
}
```

**CategoryPageClient（CC）:**

- `useSuspenseQuery(GetCategoryDocument, { variables: { id } })`
- `data.category` が null → `notFound()` を呼ぶ
- `Breadcrumb` items: `[{ label: 'Home', href: '/' }, { label: category.name }]`

**ページヘッダー:**

- カテゴリ名: `font-family: var(--font-display)` / `font-size: var(--text-6xl)` / `font-weight: 900` / `letter-spacing: var(--tracking-tighter)`
- メタ行: `font-family: var(--font-mono)` / `font-size: var(--text-xs)` / `color: var(--color-foreground-subtle)` / uppercase — `${category.videos.length} FILMS`
- 説明文なし（クエリに含まれないため省略、もしくはプレースホルダー）

**グリッド:**

- `display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--spacing-8)`
- `CategoryVideoCard` を `index`（1始まり）付きで並べる

**loading.tsx:** グリッドのスケルトンUI

### T-24: 映画詳細ページ

ファイル: `src/app/videos/[id]/page.tsx`（RSC）、`src/app/videos/[id]/_components/video-page-client.tsx`（CC）、`src/app/videos/[id]/loading.tsx`

**使用クエリ: `getOriginalVideo` + `getVideoComments`**

```graphql
# getOriginalVideo レスポンス
originalVideo.id / .title / .description / .landscapeThumbnail / .likeNum
originalVideo.duration { minutes, seconds }
originalVideo.categories[0] { id, name, videos[] { id, title, landscapeThumbnail, likeNum, duration } }

# getVideoComments レスポンス
videoComments.id / .allCount
videoComments.pageInfo { endCursor, hasNextPage }
videoComments.edges[].node { id, contents, user { id, name, avatar }, createdAt, likeNum }
```

**page.tsx（RSC）:**

```tsx
export const revalidate = 60;

export default function VideoPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<VideoLoading />}>
      <PreloadQuery
        query={GetOriginalVideoDocument}
        variables={{ id: params.id }}
      >
        <PreloadQuery
          query={GetVideoCommentsDocument}
          variables={{ id: params.id, first: COMMENTS_PAGE_SIZE }}
        >
          <VideoPageClient id={params.id} />
        </PreloadQuery>
      </PreloadQuery>
    </Suspense>
  );
}
```

**VideoPageClient（CC）:**

- `useSuspenseQuery(GetOriginalVideoDocument, { variables: { id } })`
- `data.originalVideo` が null → `notFound()`
- `useSuspenseQuery` の呼び出しは video のみ。コメントは `CommentsDrawer` 内部で行う

**レイアウト構成:**

```
VideoHero（landscapeThumbnail、aspect-video 16:9）
.container-max
  ├─ Breadcrumb [Home, categories[0].name（href: /categories/[id]）, title]
  ├─ タイトル（font-display / text-5xl / font-weight-900）
  ├─ メタ行（font-mono / text-xs / uppercase）
  │     formatDurationFull(duration) · categories[0].name · LikeCount
  ├─ Synopsis（description / leading-relaxed / container-prose）
  ├─ LikeButton + CommentsDrawer トリガーを横並びに配置
  └─ 関連動画セクション
        Eyebrow "RELATED FILMS"
        categories[0].videos（現在の動画を除く最大3件）を VideoCard グリッドで
```

**CommentsDrawer の配置:**

- `<CommentsDrawer videoId={id} />` を Synopsis 下のアクションエリアに配置
- Drawer トリガーボタンは `"Comments (N)"` 形式（N は `allCount`）
- Drawer 内で `getVideoComments` を `useSuspenseQuery` で参照（PreloadQuery キャッシュヒット）

**loading.tsx:** VideoHero スケルトン + コンテンツエリアスケルトン

### T-25: Not Found ページ

ファイル: `src/app/not-found.tsx`

**ビジュアル仕様:**

- `.container-max` 内に中央配置
- `"404"`: `font-family: var(--font-display)` / `font-size: var(--text-9xl)` / `font-weight: 900` / `color: var(--color-border-strong)` (薄いグレー)
- `"ページが見つかりません"`: `font-size: var(--text-xl)` / `color: var(--color-foreground-muted)`
- トップへのリンク: `font-family: var(--font-mono)` / `font-size: var(--text-sm)` / `color: var(--color-foreground-subtle)` / hover: `color: var(--color-foreground)`

---

## Phase 6: テスト実装

### T-26: lib/format.ts のユニットテスト

### T-27: ui/ コンポーネントのユニットテスト

ファイル: `src/components/ui/*.test.tsx`

- `Eyebrow`: tone ごとの色クラス・テキスト表示・uppercase 適用確認
- `Breadcrumb`: href あり→`<a>` レンダリング、href なし→`<span>` レンダリング、末尾要素の非リンク確認
- `DurationBadge`: duration null → null レンダリング、通常値 → "N min" 表示、フォントクラス確認
- `Avatar`: label の先頭1文字大文字表示、size による width/height 適用

### T-28: features/ コンポーネントのユニットテスト

ファイル: `src/components/features/**/*.test.tsx`

- `VideoCard`: サムネイル alt テキスト・`/videos/[id]` リンク・タイトル表示・DurationBadge 描画
- `CategoryVideoCard`: 連番ゼロ埋め（`#01`）・説明60文字切り詰め・LikeCount 描画
- `LikeCount`: emphasized あり/なしのクラス差異・`♥ N` 形式表示
- `CommentItem`: ユーザー名・本文・タイムスタンプ・first=false 時の border-top 付与
- `LikeButton`: 初期状態のラベル・クリックで liked 状態トグル・カウント変化

### T-29: ページの統合テスト（要件シナリオ）

ファイル: `src/app/**/*.test.tsx`

**トップページ**

- カテゴリ名と映画サムネイルが表示される
- 各カテゴリの「View all」リンクが `/categories/[id]` を向く
- 各映画カードが `/videos/[id]` を向く

**カテゴリ詳細ページ**

- カテゴリ名と映画一覧が表示される
- 映画カードが `/videos/[id]` を向く
- 存在しない ID で `notFound` が呼ばれる

**映画詳細ページ**

- タイトル・説明・いいね数が表示される
- コメント一覧が表示される
- 存在しない ID で `notFound` が呼ばれる

---

## 実装順序の目安

```
Phase 1
  ↓
T-02 フォント修正（Space Grotesk / Zen Kaku Gothic New / JetBrains Mono）
  ↓
Phase 2（T-06〜T-11）  ← ui/ コンポーネント（Drawer は T-11 で追加）
  ↓
Phase 3（T-12〜T-19）  ← features/ コンポーネント
                          video: T-12〜T-15
                          category: T-16〜T-17
                          comment: T-18〜T-19（CommentsDrawer は T-11 Drawer に依存）
                          navigation: T-20〜T-21
  ↓
Phase 5（T-22〜T-25）  ← ページ
                          T-22 トップページ（getHomeScreens）
                          T-23 カテゴリ詳細（getCategory）
                          T-24 映画詳細（getOriginalVideo + getVideoComments）
                          T-25 Not Found
  ↓
Phase 6（T-27〜T-29）  ← テスト（T-26 完了済み）
```
