# 開発メモ

## セッション履歴機能の設計方針

### 概要
各練習セッションの結果を保存し、後から振り返ることができる機能を実装する。セッション完了後は履歴に保存し、新しいセッションとして初期化される。

### 要件
- セッションごとにユニークなIDで管理
- 問題、回答、模範解答、アドバイス、他の表現を統合して保存
- セッション履歴として複数セッションを保持
- セッション完了後の振り返りページでの詳細表示

### フック設計方針

#### 完全責務分離型アーキテクチャ
```typescript
// 問題進行管理（既存機能維持）
usePracticeSession()

// 現在のセッション管理（一時的データ）
useAnswerResults() // sessionStorage使用（命名を明確化）

// 履歴管理（永続的データ）
useSessionHistory() // localStorage使用（将来的にDB）
```

#### 各フックの責任
- **usePracticeSession**: 問題の読み込み、進行状況、次の問題への移動
- **useAnswerResults**: 現在のセッションの回答結果蓄積（sessionStorage）
- **useSessionHistory**: 完了したセッションの履歴管理（localStorage→DB）

### データ構造

#### 使用する型定義
```typescript
// src/types/session.ts
Question          // 問題データ
QuestionResult    // 問題+回答+フィードバックの統合
SessionResult     // セッション全体の結果
SessionState      // セッション状態管理
```

#### sessionId管理
- `crypto.randomUUID()` でセッション開始時に生成
- セッション中は固定値として使用
- 完了時まで変更しない

### データ永続化戦略の修正

#### 現在のセッション（sessionStorage）
```typescript
// sessionStorage キー
"quick-eigo-current-session": {
  sessionId: string,
  results: QuestionResult[],
  startedAt: Date
}
```

#### 履歴データ（localStorage）
```typescript
// localStorage キー
"quick-eigo-session-history": SessionResult[]
```

#### ストレージ戦略
- **sessionStorage**: 現在のセッション（一時的、タブ単位管理）
- **localStorage**: 履歴データ（永続的、将来的にDB移行）

### データ保存タイミング

#### 段階的保存戦略
生成時に即座に保存することでデータロスを防止し、UXを向上させる。

```typescript
// 1. フィードバック生成時（practice/play/page.tsx）
const handleAnswerSubmit = async (answer: string) => {
  const result = await generateFeedbackAction(...)

  // 基本情報で即座に保存
  saveQuestionResult(currentQuestion, answer, result.feedback, [])
  setFeedback(result.feedback)
}

// 2. 他の表現生成時（PracticeFeedbackコンポーネント）
const handleShowOtherExpressions = async () => {
  const result = await generateAlternativeExpressionsAction(...)

  // 他の表現を追加更新
  updateQuestionResult(currentQuestion.id, {
    otherExpressions: result.expressions
  })
}
```

#### メリット
- **データロス防止**: 途中離脱時も回答が保存済み
- **UX向上**: 回答と同時にデータが確保される安心感
- **実装の単純化**: 複雑な状態管理が不要

### セッションライフサイクル

```
1. セッション開始
   ↓
2. sessionId生成 (crypto.randomUUID())
   ↓
3. 問題を順次解答
   ↓
4. 各回答結果を段階的に蓄積（フィードバック生成時→他の表現生成時）
   ↓
5. セッション完了
   ↓
6. SessionResultとして履歴に保存
   ↓
7. セッション状態初期化
   ↓
8. 新セッション開始可能
```

### ファイル構成の修正

```
src/
├── hooks/
│   ├── usePracticeSession.ts  # 既存（問題進行管理）
│   ├── useAnswerResults.ts    # 新規（回答結果管理）
│   └── useSessionHistory.ts   # 新規（履歴管理）
├── types/
│   └── session.ts            # セッション関連型定義
└── features/practice/
    └── components/
        └── SessionReview.tsx  # セッション振り返りコンポーネント
```

### 実装順序の修正

1. ~~型定義の追加~~ ✅
2. ~~開発メモの記録と修正~~ ✅
3. **useAnswerResults フックの作成**（sessionStorage）
4. usePracticeSession との連携
5. useSessionHistory フックの作成（localStorage）
6. 振り返りページコンポーネントの実装
7. セッション完了画面の更新

### 注意点

- usePracticeSession の既存機能は保持
- 既存のコンポーネント（PracticeFeedback等）との互換性維持
- sessionStorage→localStorage移行時のデータ移行考慮
- TypeScript strict mode対応