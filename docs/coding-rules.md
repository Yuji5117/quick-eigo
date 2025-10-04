# コーディングルール

## 型定義

### TypeScript型定義の基本ルール

- TypeScriptの型定義は `interface` ではなく `type` を使用する
- import時は `import type` を使用する（型のみをimportする場合）

#### 理由
- `type` の方がUnion型やMapped Typeなどの高度な型定義に対応しやすい
- 型情報のみのimportを明示的にすることで、実行時コードと型定義を分離

#### 例

```typescript
// ❌ 避けるべき
interface User {
  id: number
  name: string
}

import { User } from './types'

// ✅ 推奨
export type User = {
  id: number
  name: string
}

import type { User } from './types'
```

### 型定義ファイルの構成

- 型定義は `src/types/` ディレクトリに配置
- 関連する型はファイルごとにグループ化
- `src/types/index.ts` ですべての型をre-export

#### ファイル例
```
src/types/
├── index.ts        # 全型定義のre-export
├── feedback.ts     # フィードバック関連の型
├── session.ts      # セッション関連の型
└── ...
```