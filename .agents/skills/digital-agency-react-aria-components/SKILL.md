---
name: digital-agency-react-aria-components
description: このリポジトリでデジタル庁デザインシステムのコンポーネントを react-aria-components ベースで追加・更新するときに使う。
---

# Digital Agency React Aria Components

この skill は、このリポジトリでデジタル庁デザインシステムのコンポーネントを `react-aria-components` ベースで追加・更新するときに使う。

対象:

- デジタル庁デザインシステムの既存コンポーネントを React 化したい
- オフィシャル React サンプルを、このリポジトリの `react-aria-components` 構成へ移植したい
- 既存コンポーネントと同じ API / スタイリング / Storybook 構成で新規コンポーネントを増やしたい

非対象:

- 単なるページ組み立て
- デザイントークン自体の追加設計
- `react-aria-components` を使わない独自ウィジェット実装

## First pass

1. 追加対象コンポーネントの仕様を確認する。
2. まず `src/components/utils.ts` を読む。
3. 次に最も近い既存実装を読む。
4. 必要ならオフィシャル React サンプルと `react-aria-components` の公式 docs を参照する。

類似実装の当たり先:

- 基本操作: `src/components/Button/Button.tsx`
- リンク系: `src/components/Link/Link.tsx`
- 階層ナビゲーション: `src/components/Breadcrumb/Breadcrumb.tsx`
- 開閉 UI: `src/components/Accordion/Accordion.tsx`
- 単純な線: `src/components/Divider/Divider.tsx`
- 単体開閉 UI: `src/components/Disclosure/Disclosure.tsx`

## Core rules

### 1. Headless primitive は `react-aria-components` を優先する

- 可能な限り低レベルな DOM 実装ではなく `react-aria-components` の primitive を使う。
- `Button`, `Link`, `Breadcrumbs`, `Disclosure`, `DisclosurePanel`, `Separator` など、意味に対応する primitive を選ぶ。
- 複雑なキーボード操作や ARIA 状態は、まず `react-aria-components` に寄せる。

### 2. デジタル庁デザインシステムの見た目は Tailwind class に閉じ込める

- スタイルはコンポーネント本体に散らさず、先に `tv(...)` か近い形で定義する。
- 配色・余白・タイポグラフィは既存トークン名を使う。
- state ごとの差分は `data-hovered:*`, `data-pressed:*`, `data-focus-visible:*`, `aria-disabled:*` のように state class へ寄せる。
- インタラクティブ要素は既存の `focusRing` / `focusVisibleRing` を優先して再利用する。
- `react-aria-components` の state は `renderProps` や `data-*` 属性に寄せ、擬似クラスへ直接書き散らさない。

### 3. `className` は上書き可能に保つ

- `react-aria-components` の render props 対応 `className` を壊さない。
- 既存パターンに合わせて `composeTailwindRenderProps` または `composeRenderProps` を使い、内部スタイルと外部 `className` を合成する。
- 利用者が `className` を追加しても、既定スタイルが不自然に失われない構成にする。

### 4. API は「薄い wrapper + 必要最小限の拡張」に留める

- props は元の `react-aria-components` props をベースに拡張する。
- 独自 props は、デザインシステムの差分を表す最小限に絞る。
- 既存の例では `variant`, `size`, `separator`, `icon`, `linkClassName`, `panelClassName` のような拡張だけを足している。
- 元の primitive が持つ意味を壊す独自抽象化は避ける。

### 4.1 Field wrapper は convenience と composition を両立させる

- `TextField`, `SelectField`, `CheckboxGroup`, `RadioGroup` のような field wrapper では、`label`, `description`, `errorMessage`, `requirement` の convenience props を足してよい。
- ただし同時に child の `<Label />`, `<Description />`, `<FieldError />` も正式サポートにする。
- convenience props がある場合だけ同種 child を除外し、二重描画を避ける。
- group 系は `<Label />`, `<Description />`, `<FieldError />` と選択肢 children を分離して配置する。

### 5. 合成コンポーネントは part ごとに export する

- 1 ファイルに閉じてもよいが、利用者が組み替えられるように part 単位で export する。
- 例:
  - Accordion: `Accordion`, `AccordionGroup`, `AccordionSummary`, `AccordionContent`, `AccordionBackLink`
  - Disclosure: `Disclosure`, `DisclosureSummary`, `DisclosurePanel`, `DisclosureBackLink`
- 単機能コンポーネントは単体 export でよい。

### 6. 子要素カスタマイズは render props で逃がす

- アイコン差し替えのような UI 差し替えは boolean prop を増やすより render props を優先する。
- 既定アイコンを消さずに差し替えられるよう、`defaultIcon` と状態をまとめて渡す設計を検討する。

### 7. `use client` は必要なときだけ付ける

- Hook や context を使うファイルにだけ付ける。
- ただの style wrapper や stateless component には付けない。

## Implementation workflow

### 1. Primitive と責務を決める

- オフィシャルサンプルの DOM 構造をそのまま写すのではなく、責務を `react-aria-components` の primitive に再配置する。
- 例:
  - 押下可能要素は `Button` / `Link`
  - 開閉は `Disclosure` 系
  - パンくずは `Breadcrumbs` 系
  - 区切り線は `Separator`

### 2. まず variants を定義する

- `tv(...)` で base と variants を先に作る。
- variant 名は見た目ではなく意味で付ける。
- default variants を持つ場合は明示する。
- state class は base / variants のどちらに置くべきかを整理してから書く。

### 3. Component を実装する

- 元 primitive の props を継承する。
- 追加 props がある場合だけ interface を拡張する。
- `className` は merge する。
- render props が必要な箇所だけ `composeRenderProps` を使う。
- `Input`, `TextArea`, native `select` のような leaf は native / ARIA props を正として扱い、必要なら wrapper 内で `isDisabled`, `isRequired`, `isReadOnly` の variant state に正規化する。
- field wrapper 側の `isDisabled`, `isInvalid`, `isRequired`, `isReadOnly` と、leaf 側の `disabled`, `required`, `readOnly`, `aria-invalid` を混同しない。

### 4. アクセシビリティを埋める

- `aria-current`, `aria-label`, `aria-labelledby`, `aria-hidden` など、既存実装にある意味付けを落とさない。
- 装飾アイコンは基本 `aria-hidden={true}`。
- 読み上げが必要な補助情報だけ `aria-label` を付ける。
- disabled は `isDisabled` と `aria-disabled` の双方の見え方を確認する。

### 5. Storybook を作る

- `src/components/<Name>/<Name>.stories.tsx` を追加または更新する。
- 最低でも 1 つは基本例を置く。
- variant や状態差分がある場合は比較しやすい story を置く。
- render props で差し替え可能な API を持つ場合は、その使用例を 1 つ含める。
- field wrapper は convenience props の例と child composition の例を両方用意する。

### 6. Export を通す

- `src/components/<Name>/index.ts` または `index.tsx`
- `src/components/index.ts`
- `src/index.ts`

export 名は既存命名に揃える。`Props` 型や variant helper を外に出す必要がある場合だけ追加 export する。

## File conventions

- 実装本体: `src/components/<Name>/<Name>.tsx`
- Storybook: `src/components/<Name>/<Name>.stories.tsx`
- ローカル export: `src/components/<Name>/index.ts` または `index.tsx`

1 コンポーネント 1 ディレクトリを基本とする。複数 part を持つ場合も同一ディレクトリにまとめる。

## Definition of done

- `react-aria-components` primitive で構成されている
- 既存トークンと Tailwind class で見た目を表現している
- `className` が安全に上書きできる
- 必要な a11y 属性が入っている
- Storybook がある
- export が `src/components/index.ts` と `src/index.ts` まで通っている
- `biome lint` に加えて、必要なら対象ファイルに絞った `tsc --noEmit --skipLibCheck` でも確認している
- Storybook の `Meta<typeof Component>` で型が漏れる場合に備えて、公開コンポーネントの `Props` interface は `export` を検討する

## Guardrails

- オフィシャル React サンプルの class 名や DOM を機械的に移植しない。意味と state を維持したまま、このリポジトリの設計へ写経し直す。
- 生 DOM にイベントを大量実装して `react-aria-components` を迂回しない。
- variant を増やしすぎない。まずはデジタル庁デザインシステムの仕様差分だけに絞る。
- Storybook だけ整って本体 export が漏れる、またはその逆、を避ける。

## Useful references

- オフィシャル React サンプル: `https://github.com/digital-go-jp/design-system-example-components-react/`
- React Aria Components: `https://react-aria.adobe.com/`
- リポジトリ内の基礎 utility: `src/components/utils.ts`
- 既存の完成例:
  - `src/components/Button/Button.tsx`
  - `src/components/Link/Link.tsx`
  - `src/components/Breadcrumb/Breadcrumb.tsx`
  - `src/components/Accordion/Accordion.tsx`
  - `src/components/Divider/Divider.tsx`
  - `src/components/Disclosure/Disclosure.tsx`
