# Tailwind Merge Config

このリポジトリの `tailwind-merge` 設定は [`src/lib/tailwind-merge-config.ts`](../../src/lib/tailwind-merge-config.ts) を source of truth にしています。

利用箇所:

- [`src/components/utils.ts`](../../src/components/utils.ts)

## 方針

- `@digital-go-jp/tailwind-theme-plugin` の theme 定義を基準に、`tailwind-merge` の公式な theme namespace に合わせて登録します。
- 色は明示列挙しません。`tailwind-merge` の既定設定が custom color names を color group として扱えるためです。
- `list-lower-latin` / `list-circle` / `list-square` は theme namespace がないため、`classGroups` 側で追加します。
- 既存コードに旧 typography token が残っているため、repo 互換の legacy token も同じ `text` group に含めています。

## 登録している namespace

- `text`: digital-go-jp typography token
- `font-weight`: `400`, `500`, `700`
- `leading`: `100`, `120`, `130`, `140`, `150`, `160`, `170`, `175`, `1-0`, `1-2`, `1-3`, `1-4`, `1-5`, `1-6`, `1-7`, `1-75`
- `radius`: `4`, `6`, `8`, `12`, `16`, `24`, `32`, `full`
- `breakpoint`: `desktop`, `desktop-admin`
- `aspect`: `1/1`, `3/2`, `16/9`
- `shadow`: `1` から `8`
- `classGroups.list-style-type`: `lower-latin`, `circle`, `square`

## 更新手順

1. `@digital-go-jp/tailwind-theme-plugin` の `theme.extend` を確認する。
2. `tailwind-merge` の対応 namespace に載るものは `theme` に追加する。
3. namespace が存在しない utility だけ `classGroups` に追加する。
4. current token を変えたら必要に応じて legacy token の整理も行う。
5. `npm run test` で [`src/components/utils.test.ts`](../../src/components/utils.test.ts) を含む検証を通す。

## 参照元

- `@digital-go-jp/tailwind-theme-plugin@0.3.4`
- [tailwind-merge configuration docs](https://github.com/dcastil/tailwind-merge/tree/v3.5.0/docs/configuration.md)
- [tailwind-merge API reference](https://github.com/dcastil/tailwind-merge/tree/v3.5.0/docs/api-reference.md)
