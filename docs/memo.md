# メモ

開発時の参照用メモ。要件そのものは `requirements.md` を正とする。

---

## GraphQL API

README に記載の4 Query（`getHomeScreens` / `getCategory` / `getOriginalVideo` / `getVideoComments`）以外にも、スキーマ上はフィールドが存在する。スキーマの確認は [GraphiQL](https://develop.api.samansa.com/graphiql) または `src/lib/graphql/generated/graphql.ts`（`graphql-codegen` 出力）を参照。

### README の例以外で使えそうな Query

| フィールド | 用途の例 |
|------------|----------|
| `videoRecommends` | 映画詳細で関連・おすすめ作品を表示する |
| `commentReplies` | コメントへの返信一覧（ページネーションあり） |
| `rootCategories` | ルートカテゴリのみ取得するなど |
| `keyVisuals` | トップのキービジュアル・バナー |
| `trailerVideo` / `trailerVideos` | 予告編の単体取得・一覧 |
| `tvSearchCategories` | TV 向け検索カテゴリ（要件次第） |

認証や決済・キャンペーン前提になりやすい例: `currentUser`, `notifications`, `payment`, `playlists`, `promotionCode`, `shopCampaign`, `screenPopups` など。利用可否は都度 API 側の挙動・認証要否を確認すること。

### Mutation（README 未記載）

課題の画面に足しやすい例:

- いいね: `addLike` / `removeLike`
- コメント: `addComment` / `updateComment` / `removeComment`
- コメントいいね: `addCommentLike` / `removeCommentLike`
- 返信: `addReply` / `removeReply` / `addReplyLike` / `removeReplyLike`
- 通報: `createCommentReport` / `createReplyReport`

トークン・視聴履歴・デバイス登録などは `addSamansaTokenTicket` や `updateViwewingTime` など、アプリ固有・ログイン前提のものが多い。
