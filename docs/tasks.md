# 実装タスク一覧

プロトタイプ（`prototyping/`）の見た目・UI遷移を参考に、`src/` 配下へ本実装を進める。
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
      ThemeToggle.tsx               # Client Component（localStorage）
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
        CommentsSidebar.tsx         # Client Component（Apollo fetchMore）
  layout/
    TopBar.tsx                      # Server Component（ThemeToggle を子として含む）
    Footer.tsx                      # Server Component
  lib/
    format.ts
    apolloClient.ts
    apolloRsc.ts
    graphql/...
```

### Server / Client Component の原則

- **デフォルトはServer Component**。`useState` / `useEffect` / ブラウザAPI が必要な場合のみ `'use client'`
- Client Component は末端（葉）に閉じ込め、Server Component が Client Component を子として渡す構成を優先する
- RSCでのデータ取得は `lib/apolloRsc.ts` の `query()` を使用する

---

## Phase 1: 基盤セットアップ

### T-01: グローバルCSS・テーマシステムの構築
ファイル: `src/styles/globals.css`

- CSS変数でダーク/ライトテーマを定義
  - `html[data-theme='dark']` (デフォルト) / `html[data-theme='light']`
  - `--color-background`, `--color-background-muted`, `--color-foreground`, `--color-foreground-muted`, `--color-foreground-subtle`
  - `--color-border`, `--color-border-strong`, `--color-primary`, `--color-primary-foreground`
- ユーティリティ: `.container-max`（max-width: 1440px, padding-inline: clamp(24px, 5vw, 64px)）
- ユーティリティ: `.no-scrollbar`
- ラジウス変数: `--radius-sm: 2px`, `--radius-md: 4px`
- `a { color: inherit; text-decoration: none; }` のリセット
- `html, body` にテーマ変数を適用

### T-02: フォント・レイアウト設定の更新
ファイル: `src/app/layout.tsx`

- フォント設定: display用（例: Playfair Display）・mono用（Geist Mono）を CSS変数に割り当て
  - `--font-display`, `--font-mono` の定義
- `html` に `data-theme="dark"` をデフォルト設定
- メタデータを更新（title: `"samansa"`, description: サービス説明）
- `.font-display { font-family: var(--font-display), ... }` クラスを globals.css に追加

### T-03: lib/format.ts の実装
ファイル: `src/lib/format.ts`

- `Duration` 型定義: `{ minutes: number; seconds: number }`
- `formatDurationShort(d)` — "N min" 形式（サムネイルバッジ用）
- `formatDurationFull(d)` — "N分SS秒" 形式（詳細ページ用）
- `formatLikes(n)` — "12.5k" 形式（1000未満はそのまま）
- `formatRelative(iso)` — "today / X days ago / X months ago" 形式
- `indexOfTotal(index, total)` — "01 / 05" 形式（ゼロ埋め）

### T-04: GraphQL クエリの更新と型再生成
ファイル: `src/lib/graphql/query/*.graphql`

- `getHomeScreens.graphql`: 映画に `likeNum`, カテゴリに `description` を追加
- `getCategory.graphql`: 映画に `likeNum`, `description` を追加
- `getOriginalVideo.graphql`: `description`, `likeNum`, `category.videos`（関連動画用）を追加
- `getVideoComments.graphql`: コメントに `likeNum`, `user { id name avatar }`, カーソルページネーション（`first`, `after`, `pageInfo`, `allCount`）を追加
- `pnpm codegen` を実行して `src/lib/graphql/generated/` を更新

### T-05: lib/apolloRsc.ts の追加
ファイル: `src/lib/apolloRsc.ts`

- RSC（Server Component）からApolloでデータ取得するためのユーティリティ
- `query()` 関数を実装（`makeClient` を使い毎リクエスト新規クライアントを生成）

---

## Phase 2: ui/ コンポーネント実装

ドメイン知識を持たない、汎用的なUIコンポーネント群。すべてServer Componentとして実装し、インタラクションが必要なものだけClient Componentにする。

### T-06: Eyebrow コンポーネント
ファイル: `src/components/ui/Eyebrow.tsx` — **Server Component**

- モノスペースの小見出しラベル（uppercase, letter-spacing）
- `tone` prop: `'muted'` (default) | `'subtle'` | `'foreground'`
- CSS変数を使った色指定

### T-07: Avatar コンポーネント
ファイル: `src/components/ui/Avatar.tsx` — **Server Component**

- ユーザー名イニシャルを円形チップで表示
- `label` (表示文字列), `size` (px, デフォルト36) props

### T-08: DurationBadge コンポーネント
ファイル: `src/components/ui/DurationBadge.tsx` — **Server Component**

- サムネイル右下に重ねるバッジ（`position: absolute`）
- `Duration` 型を受け取り `formatDurationShort` で表示

### T-09: Breadcrumb コンポーネント
ファイル: `src/components/ui/Breadcrumb.tsx` — **Server Component**

- `items: { label: string; href?: string }[]` を受け取る
- `href` がある場合は `<Link>` でレンダリング、末尾要素はforeground色で非リンク
- モノスペース、`/` 区切り

### T-10: Shelf コンポーネント
ファイル: `src/components/ui/Shelf.tsx` — **Client Component** (`'use client'`)

- 横スクロールコンテナ（`overflow-x: auto`, スナップ）
- スクロール状態に応じて左右の矢印ボタンを表示/非表示（`opacity` トランジション）
- `useRef` + `addEventListener('scroll')` で制御
- `children` を受け取る汎用コンテナ

### T-11: ThemeToggle コンポーネント
ファイル: `src/components/ui/ThemeToggle.tsx` — **Client Component** (`'use client'`)

- ダーク/ライトテーマ切り替えボタン
- `localStorage['samansa-theme']` で永続化
- `document.documentElement.dataset.theme` を切り替え
- 初期値は `localStorage` の値、なければ `'dark'`

---

## Phase 3: features/ コンポーネント実装

ドメイン知識（video / category / comment）を持つコンポーネント群。

### T-12: LikeCount コンポーネント
ファイル: `src/components/features/video/LikeCount.tsx` — **Server Component**

- "♥ 12.5k" 形式のいいね数表示
- `count` props, `emphasized` フラグ（色の強調）
- `formatLikes()` を使用

### T-13: VideoCard コンポーネント
ファイル: `src/components/features/video/VideoCard.tsx` — **Server Component**

- `/videos/[id]` へのリンクカード
- サムネイル画像（aspect-video, `DurationBadge` オーバーレイ）
- タイトル・いいね数（`LikeCount`）
- `width` props でサイズ調整可能

### T-14: VideoHero コンポーネント
ファイル: `src/components/features/video/VideoHero.tsx` — **Server Component**

- フルブリードのサムネイル画像（aspect: 21/9）
- 下端へのグラデーションオーバーレイ（背景色へフェードアウト）

### T-15: LikeButton コンポーネント
ファイル: `src/components/features/video/LikeButton.tsx` — **Client Component** (`'use client'`)

- いいね/解除のトグルボタン（楽観的更新）
- liked 状態で背景色・ボーダー変化
- "♥ Liked" / "♡ Like this film" のラベル切り替え
- カウント表示（"N people"）
- TODO: `addLike` / `removeLike` Mutation への接続は別タスク

### T-16: CategoryVideoCard コンポーネント
ファイル: `src/components/features/category/CategoryVideoCard.tsx` — **Server Component**

- カテゴリ詳細ページのグリッドカード
- `Eyebrow` で連番（`#01` 形式）
- サムネイル・タイトル・説明（60文字切り詰め）・再生時間・いいね数を表示
- `/videos/[id]` へのリンク

### T-17: CategoryShelf コンポーネント
ファイル: `src/components/features/category/CategoryShelf.tsx` — **Server Component**

- トップページの1カテゴリ行
- カテゴリ名・連番（`Eyebrow`）・タグライン・「View all」リンクのヘッダー
- `Shelf` に `VideoCard` を並べる
- `categoryId`, `categoryName`, `tagline`, `index`, `total`, `videos` props

### T-18: CommentItem コンポーネント
ファイル: `src/components/features/comment/CommentItem.tsx` — **Server Component**

- コメント1件の表示
- `Avatar`・ユーザー名・投稿日時（`formatRelative`）・本文・いいね数
- 先頭以外は上ボーダーで区切る（`first` prop）

### T-19: CommentsSidebar コンポーネント
ファイル: `src/components/features/comment/CommentsSidebar.tsx` — **Client Component** (`'use client'`)

- Apollo `useQuery` + `fetchMore` によるカーソルベースページネーション
- 初期データを RSC から `initialData` props で受け取り Apollo キャッシュに反映
- 「Load more (N remaining)」ボタン
- `CommentItem` を使ってコメント一覧をレンダリング

---

## Phase 4: レイアウトコンポーネント実装

### T-20: TopBar コンポーネント
ファイル: `src/layout/TopBar.tsx` — **Server Component**

- sticky ヘッダー（`position: sticky; top: 0; z-index: 20`）
- backdrop-filter blur + 半透明背景
- 左: ブランドロゴ（"S" マーク + "samansa" テキスト）、`/` へのリンク
- 中: ナビゲーション（Home / Categories / Search）
- 右: `ThemeToggle`（Client Component として配置）+ ユーザーアバター

### T-21: Footer コンポーネント
ファイル: `src/layout/Footer.tsx` — **Server Component**

- "samansa." の大きなロゴ + "© 2026 · Curated cinema" のコピーライト

---

## Phase 5: ページ実装

### T-22: トップページ
ファイル: `src/app/page.tsx`、`src/app/loading.tsx`

**page.tsx（RSC）**
- `getHomeScreens` で全カテゴリ＋映画一覧を取得
- Hero セクション: キャッチコピー・カテゴリ数表示
- カテゴリごとに `CategoryShelf` を並べる
- `export const revalidate = 60`

**loading.tsx**
- スケルトンUIまたはスピナーでローディング状態を表示

### T-23: カテゴリ詳細ページ
ファイル: `src/app/categories/[id]/page.tsx`、`src/app/categories/[id]/loading.tsx`

**page.tsx（RSC）**
- `getCategory` でカテゴリ情報＋映画一覧を取得
- 存在しないIDの場合 `notFound()` を呼ぶ
- `Breadcrumb`（Home / カテゴリ名）
- ヒーロー: カテゴリ名（大見出し）+ 映画本数 + 説明文
- `CategoryVideoCard` のグリッド（auto-fill, minmax(320px, 1fr)）
- `export const revalidate = 60`

**loading.tsx**
- スケルトンUIでローディング状態を表示

### T-24: 映画詳細ページ
ファイル: `src/app/videos/[id]/page.tsx`、`src/app/videos/[id]/loading.tsx`

**page.tsx（RSC）**
- `getOriginalVideo` と `getVideoComments` を `Promise.all` で並列取得
- 存在しないIDの場合 `notFound()` を呼ぶ
- `VideoHero`（フルブリードサムネイル）
- `Breadcrumb`（Home / カテゴリ名 / 映画タイトル）
- タイトル・再生時間・カテゴリ名・いいね数（メタ行）
- Synopsis セクション: 説明文 + `LikeButton`
- 関連動画: 同カテゴリの他動画3件を `VideoCard` グリッドで表示
- 右サイドバー: `CommentsSidebar`（初期データを props として渡す）
- `export const revalidate = 60`

**loading.tsx**
- スケルトンUIでローディング状態を表示

### T-25: Not Found ページ
ファイル: `src/app/not-found.tsx`

- `notFound()` 呼び出し時に表示される共通の404ページ
- "404" + "ページが見つかりません" + トップへのリンク

---

## Phase 6: テスト実装

### T-26: lib/format.ts のユニットテスト
ファイル: `src/lib/__tests__/format.test.ts`

- `formatDurationShort`: null, 0秒, 通常値
- `formatDurationFull`: null, 通常値
- `formatLikes`: 0, 999, 1000, 12500
- `formatRelative`: today, yesterday, X days ago, months ago
- `indexOfTotal`: 1桁・2桁のゼロ埋め確認

### T-27: ui/ コンポーネントのユニットテスト
ファイル: `src/components/ui/__tests__/*.test.tsx`

- `Eyebrow`: tone ごとの色クラス・テキスト表示
- `Breadcrumb`: href あり→`<a>` レンダリング、href なし→`<span>` レンダリング、末尾要素の非リンク
- `DurationBadge`: Duration null→空表示、通常値→"N min" 表示
- `Avatar`: label の表示、size による width/height 適用

### T-28: features/ コンポーネントのユニットテスト
ファイル: `src/components/features/**/__tests__/*.test.tsx`

- `VideoCard`: サムネイル alt テキスト・`/videos/[id]` へのリンク・タイトル表示
- `CategoryVideoCard`: 連番のゼロ埋め・説明60文字切り詰め・再生時間・いいね数
- `LikeCount`: 強調あり/なしのスタイル・"♥ N" 形式
- `CommentItem`: ユーザー名・本文・日付・first フラグによるボーダー有無

### T-29: ページの統合テスト（要件シナリオ）
ファイル: `src/app/**/__tests__/*.test.tsx`

**トップページ**
- カテゴリ名と映画サムネイルが表示される
- 各カテゴリの「View all」リンクがカテゴリ詳細ページを向く
- 各映画カードが映画詳細ページを向く

**カテゴリ詳細ページ**
- カテゴリ名と映画一覧が表示される
- 映画カードが映画詳細ページを向く
- 存在しないIDで `notFound` が呼ばれる

**映画詳細ページ**
- タイトル・説明・いいね数が表示される
- コメント一覧が表示される
- 存在しないIDで `notFound` が呼ばれる

---

## 実装順序の目安

```
Phase 1（T-01〜T-05）
  ↓
Phase 2（T-06〜T-11）  ← ui/ コンポーネント
  ↓
Phase 3（T-12〜T-19）  ← features/ コンポーネント（video → category → comment の順）
  ↓
Phase 4（T-20〜T-21）  ← layout/
  ↓
Phase 5（T-22〜T-25）  ← ページ
  ↓
Phase 6（T-26〜T-29）  ← テスト
```
