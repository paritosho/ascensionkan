/**
 * メルマガ変換スクリプト
 * FTPfilesのvol*.html (Shift_JIS) → src/mm/*.md (UTF-8) に変換
 */

const iconv = require('../node_modules/iconv-lite');
const fs = require('fs');
const path = require('path');

const SRC_DIR = 'C:/Users/user/Documents/FTPfiles/Acsention Kan/mm';
const OUT_DIR = path.join(__dirname, '../src/mm');

// 出力ディレクトリ作成
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// vol*.html ファイル一覧を取得
const files = fs.readdirSync(SRC_DIR)
  .filter(f => /^vol\d+\.html$/i.test(f))
  .sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0]);
    const nb = parseInt(b.match(/\d+/)[0]);
    return na - nb;
  });

console.log(`変換対象: ${files.length} ファイル`);

let success = 0;
let errors = [];

files.forEach(file => {
  const volNum = parseInt(file.match(/\d+/)[0]);
  const filePath = path.join(SRC_DIR, file);

  try {
    // Shift_JIS → UTF-8
    const buf = fs.readFileSync(filePath);
    const text = iconv.decode(buf, 'Shift_JIS');

    // タイトル抽出
    const titleMatch = text.match(/<TITLE[^>]*>([\s\S]*?)<\/TITLE>/i);
    const title = titleMatch ? titleMatch[1].trim() : `アセンション館通信 第${volNum}号`;

    // PRE/TTブロック内のコンテンツ抽出
    const contentMatch = text.match(/<PRE><TT>([\s\S]*?)<\/TT><\/PRE>/i);
    if (!contentMatch) {
      errors.push(`${file}: PRE/TTブロックが見つかりません`);
      return;
    }

    let content = contentMatch[1];

    // 日付抽出（ヘッダー行から）
    const dateMatch = content.match(/(\d{4})[,\/年](\d{1,2})[\/月](\d{1,2})/);
    const date = dateMatch
      ? `${dateMatch[1]}-${String(dateMatch[2]).padStart(2, '0')}-${String(dateMatch[3]).padStart(2, '0')}`
      : '';

    // HTMLタグを除去（aタグのテキストは残す）
    content = content.replace(/<a\s+href=["'][^"']*["'][^>]*>([\s\S]*?)<\/a>/gi, '$1');
    content = content.replace(/<A\s+HREF=["'][^"']*["'][^>]*>([\s\S]*?)<\/A>/gi, '$1');
    content = content.replace(/<[^>]+>/g, '');

    // HTMLエンティティをデコード
    content = content
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, ' ');

    // 末尾の空白を整理
    content = content.trim();

    // Markdownフロントマター付きで出力
    const volStr = String(volNum).padStart(4, '0');
    const md = `---
vol: ${volNum}
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
layout: "mm-post.njk"
---

\`\`\`
${content}
\`\`\`
`;

    const outFile = path.join(OUT_DIR, `vol${volStr}.md`);
    fs.writeFileSync(outFile, md, 'utf8');
    success++;

    if (volNum % 100 === 0) console.log(`  ... ${volNum}号 完了`);

  } catch (e) {
    errors.push(`${file}: ${e.message}`);
  }
});

console.log(`\n完了: ${success}件 成功`);
if (errors.length > 0) {
  console.log(`エラー: ${errors.length}件`);
  errors.forEach(e => console.log(`  - ${e}`));
}
