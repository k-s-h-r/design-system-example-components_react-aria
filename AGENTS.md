# design-system-example-components

## Scope

このリポジトリは、デジタル庁デザインシステムのコンポーネントを React と Tailwind CSS で実装するサンプル集です。特に headless UI は `react-aria-components` を優先して使います。

## Skill

コンポーネントを追加・更新するときは、必ず [`.agents/skills/digital-agency-react-aria-components/SKILL.md`](./.agents/skills/digital-agency-react-aria-components/SKILL.md) を使ってください。

この skill を使う対象:

- デジタル庁デザインシステムのコンポーネント追加
- オフィシャル React サンプルの移植
- 既存コンポーネントの API / a11y / styling 改修

## Working rules

- まず `src/components/utils.ts` と、最も近い既存コンポーネントを読むこと
- `react-aria-components` の primitive を優先し、生 DOM 実装へ逃げないこと
- スタイルは `tv(...)`、`focusRing`、`composeTailwindRenderProps` / `composeRenderProps` の既存パターンに揃えること
- デジタル庁デザインシステムのトークン名を使い、独自命名の色や spacing を増やさないこと
- オフィシャルサンプルの DOM / class 名をそのまま写さず、この repo の設計へ再配置すること

## Required updates for component work

コンポーネントを追加・更新したら、必要に応じて次も更新してください。

- `src/components/<Name>/<Name>.stories.tsx`
- `src/components/<Name>/index.ts` または `index.tsx`
- `src/components/index.ts`
- `src/index.ts`

## Commands

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run storybook`

必要な確認だけを行い、無関係なファイルは変更しないでください。
