import Dexie from 'dexie'

export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

const database = new Dexie('markdown-editor')
database.version(1).stores({ memos: '&datetime' })
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

// メモを保存する関数
export const putMemo = async (title: string, text: string): Promise<void> => {
  // ISO8601形式での日時の生成 (保存のタイミングで自動的に付与)
  const datetime = new Date().toISOString()
  // IndexedDB に保存
  await memos.put({ datetime, title, text })
}